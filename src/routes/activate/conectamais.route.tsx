import { ConnectsPlusPage } from "@/pages/activate/connects-plus";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activate/conectamais")({
  component: ConnectsPlusPage,
  // validateSearch: (search: Record<string, unknown>) => {
  //   return {
  //     document: search.document ?? "",
  //     email: search.email ?? "",
  //   };
  // },
});
