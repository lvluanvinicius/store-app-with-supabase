-- ==============================================================================
-- MIGRATION: SETUP AMBIENTE DE SIMULAÇÃO (CONECTA+ INTEGRAÇÃO)
-- OBJETIVO: Estrutura para Profiles, Organizações e Controle de Limites (SVA)
-- ==============================================================================

-- 1. TIPOS E ENUMS
-- Necessário para definir papéis dentro da organização
CREATE TYPE "organization_role" AS ENUM ('admin', 'member');

-- 2. TABELAS PRINCIPAIS

-- Tabela: PROFILES
-- Vinculada ao auth.users do Supabase. Contém os dados do plano e limites.
CREATE TABLE "profiles" (
  "id" uuid PRIMARY KEY NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "username" varchar(255) UNIQUE NOT NULL,
  "full_name" varchar(255) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "avatar_url" text,
  
  -- Controle de Assinatura/Plano (Alvo da ativação Sva Standard)
  "subscription_plan" text DEFAULT 'free', 
  
  -- Controle de Storage (Bytes)
  "storage_used_bytes" BIGINT DEFAULT 0 NOT NULL,
  "max_storage_bytes" BIGINT, -- Será atualizado ao ativar o plano
  
  -- Controle de Geração de Imagens
  "images_generated_today" INTEGER DEFAULT 0,
  "last_image_reset_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

-- Tabela: ORGANIZATIONS
-- Estrutura multi-tenant básica
CREATE TABLE "organizations" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "name" varchar(255) UNIQUE NOT NULL,
  "owner_id" uuid NOT NULL REFERENCES "profiles" ("id"),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

-- Tabela: ORGANIZATION_MEMBERS
-- Vínculo entre usuários e organizações
CREATE TABLE "organization_members" (
  "id" uuid PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "organization_id" uuid NOT NULL REFERENCES "organizations" ("id") ON DELETE CASCADE,
  "profile_id" uuid NOT NULL REFERENCES "profiles" ("id") ON DELETE CASCADE,
  "role" organization_role NOT NULL DEFAULT 'member',
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now()),
  UNIQUE("organization_id", "profile_id")
);

-- 3. AUTOMATIZAÇÃO (TRIGGERS)

-- Função para atualizar o updated_at automaticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  new.updated_at = now();
  return new;
END; $$;

-- Trigger para Profiles
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Trigger para Organizations
CREATE TRIGGER organizations_set_updated_at BEFORE UPDATE ON public.organizations
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Função CRÍTICA: Cria o perfil público automaticamente quando o usuário faz Sign Up
-- Isso simula a chegada do usuário vindo do Conecta+
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email, avatar_url, created_at, updated_at)
  VALUES (
    new.id,
    -- Usa parte do email como username provisório
    COALESCE(split_part(new.email, '@', 1), gen_random_uuid()::text),
    COALESCE(split_part(new.email, '@', 1), 'user'),
    new.email,
    null,
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END; $$;

-- Trigger vinculada à tabela interna auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. SEGURANÇA (ROW LEVEL SECURITY - RLS)
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- Policies para Profiles
CREATE POLICY "profiles_select_own" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Policies para Organizations
CREATE POLICY "organizations_select_member" ON public.organizations
FOR SELECT USING (
  owner_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.organization_members m
    WHERE m.organization_id = organizations.id AND m.profile_id = auth.uid()
  )
);

CREATE POLICY "organizations_insert_owner" ON public.organizations
FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Policies para Organization Members
CREATE POLICY "org_members_select_same_org" ON public.organization_members
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.organization_members m
    WHERE m.organization_id = organization_members.organization_id
      AND m.profile_id = auth.uid()
  )
);
