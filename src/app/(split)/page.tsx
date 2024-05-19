import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/atoms/button";

export default function LoginPage() {
  return (
    <div className="bg-bw py-8 md:px-8 px-4 w-auto md:max-w-sm rounded-lg">
      <h1 className="text-3xl md:text-4xl font-bold pb-4 select-none">
        Login.
      </h1>
      <div className="flex flex-col w-full mb-2">
        <LoginForm />
      </div>
      <div className="flex flex-col w-full gap-3 md:max-w-xs pt-2">
        <h6 className="text-md font-sans">Need it for your store?</h6>

        <Button variant={"outline"}>Create Account</Button>
      </div>
    </div>
  );
}
