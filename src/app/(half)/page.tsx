import LoginForm from "@/components/forms/login-form";
import { Button } from "@/components/atoms/button";

export default function Home() {
  return (
    <div className="bg-bw py-8 md:px-8 px-4 w-auto md:max-w-sm rounded-lg">
      <h1 className="text-3xl md:text-4xl font-bold pb-4 select-none">
        Login.
      </h1>
      {/* <h3 className="md:text-3xl text-2xl font-bold">Login</h3> */}
      <div className="flex flex-col w-full mb-2">
        <LoginForm redirect={"/stores"} />
      </div>
      <div className="flex flex-col w-full gap-3 md:max-w-xs pt-2">
        <h6 className="text-md font-sans">Need it for your store?</h6>

        <Button variant={"secondary"}>Create Account</Button>
      </div>
    </div>
  );
}
