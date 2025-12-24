import { PropsWithChildren } from "react";

export const LayoutAuth = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-white lg:flex-row">
      <div className="flex w-full flex-col md:max-w-xl lg:max-w-3xl">
        <div className="p-4">
          <h1>Store App</h1>
        </div>
        <div className="flex w-full flex-1 flex-col justify-center p-4 lg:mx-auto lg:max-w-md">
          {children}
        </div>
      </div>

      <div className="hidden flex-1 bg-neutral-950 lg:block"></div>
    </div>
  );
};
