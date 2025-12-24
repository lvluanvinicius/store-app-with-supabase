import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import { queryClient } from "@/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "./context/session";
import { useSession } from "./hooks/use-session";
import "./index.css";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      <Inner />
    </SessionProvider>
    ,
  </QueryClientProvider>,
);

function Inner() {
  const { session } = useSession();

  if (session.loading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} context={{ auth: session }} />;
}
