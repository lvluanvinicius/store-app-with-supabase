import { LayoutAuth } from "@/layout/auth";
import { FormRegister } from "./components/form-register";

export const RegisterPage = () => {
  return (
    <LayoutAuth>
      <FormRegister />
    </LayoutAuth>
  );
};
