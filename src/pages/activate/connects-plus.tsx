import { ActivateLayout } from "@/layout/activate";
import { useState } from "react";
import { ValidateAndCreateAccountResponse } from "./components/validate-and-create-account";
import {
  ValidateDocument,
  ValidateResponse,
} from "./components/validate-document";

export const ConnectsPlusPage = () => {
  const [document, setDocument] = useState<string>("");
  const [documentValidated, setDocumentValidated] =
    useState<ValidateResponse | null>(null);

  const [accountCreated, setAccountCreated] =
    useState<ValidateAndCreateAccountResponse | null>(null);

  return (
    <ActivateLayout>
      <div>
        <div className="flex flex-col gap-4">
          <h2 className="text-md text-gray-400">
            Para ativar seu benefício, informe seu CPF ou CNPJ abaixo:
          </h2>

          <ValidateDocument
            value={document}
            onChange={setDocument}
            onFinish={setDocumentValidated}
          />
        </div>

        {documentValidated?.valid && (
          <div className="mt-6 rounded-lg bg-green-900/20 p-4 text-green-400">
            Documento validado com sucesso! Você já pode prosseguir com a
            ativação do seu benefício Connects Plus.
          </div>
        )}
      </div>
    </ActivateLayout>
  );
};
