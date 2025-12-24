import { SessionInterface } from "@/context/session";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export interface RouterSharedData {
  auth: SessionInterface | null;
}

export const Route = createRootRouteWithContext<RouterSharedData>()({
  component: RootLayout,
});

function RootLayout() {
  return <Outlet />;
}
