import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import { SessionProvider } from "./context/session";
import { useSession } from "./hooks/use-session";
import "./index.css";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <SessionProvider>
    <Inner />
  </SessionProvider>,
);

function Inner() {
  const { session } = useSession();

  if (session.loading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} context={{ auth: session }} />;
}
