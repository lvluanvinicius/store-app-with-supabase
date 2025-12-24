import { LayoutAuth } from "@/layout/auth";
import { FormLogin } from "./components/form-login";

export function LoginPage() {
  return (
    <LayoutAuth>
      <FormLogin />
    </LayoutAuth>
  );
}
