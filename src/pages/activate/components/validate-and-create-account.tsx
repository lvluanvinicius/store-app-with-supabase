import { Route as RouteConnectPlus } from "@/routes/activate/conectamais.route";
import { useMutation } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";

export interface ValidateAndCreateAccountResponse {
  exists: boolean;
}

export const ValidateAndCreateAccountForm = ({
  onValidate,
}: {
  onValidate(response: ValidateAndCreateAccountResponse): void;
}) => {
  const queryParams = useSearch({
    from: RouteConnectPlus.fullPath,
  });

  const { mutate: validateAccount, isPending: validateAccountIsPending } =
    useMutation({
      mutationFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onValidate({ exists: false });
      },
    });

  return <div className="border">{JSON.stringify(queryParams)}</div>;
};
