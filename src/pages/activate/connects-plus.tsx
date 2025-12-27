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
      </div>
    </ActivateLayout>
  );
};
