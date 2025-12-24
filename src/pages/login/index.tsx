import { FormLogin } from "./components/form-login";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-white lg:flex-row">
      <div className="flex flex-1 flex-col">
        <div className="p-4">
          <h1>Store App</h1>
        </div>
        <div className="flex w-full flex-1 flex-col justify-center p-4 lg:mx-auto lg:max-w-md">
          <FormLogin />
        </div>
      </div>
      <div className="hidden flex-1 lg:block">Banner</div>
    </div>
  );
}
