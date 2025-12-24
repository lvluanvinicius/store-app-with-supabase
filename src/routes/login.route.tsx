import { LoginPage } from "@/pages/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: async ({ context }) => {
    if (context.auth?.user) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});
