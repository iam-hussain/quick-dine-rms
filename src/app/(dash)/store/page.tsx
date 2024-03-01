import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import Icon from "@/components/atoms/icon";
import { ProductTable } from "@/components/organisms/product-table";
import LoginForm from "@/components/forms/login-form";

export default async function Dashboard() {
  return (
    <Container className="flex flex-col justify-start align-top items-start grow w-full h-full">
      <div className="flex justify-between w-full h-auto mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Products</h1>
        <Button className="flex gap-2">
          <Icon name="IoMdAdd" className="h-5 w-5" />
          Add Product
        </Button>
      </div>
      <div className="flex w-full">
        <ProductTable />
        <div className="flex flex-col gap-6 w-full justify-center text-center md:text-left align-middle md:w-3/6 m-auto p-4 h-full">
          <div className="bg-bw py-8 md:px-8 px-4 w-auto md:max-w-sm rounded-lg m-auto">
            <h1 className="text-3xl md:text-4xl font-bold pb-4 select-none">
              Login.
            </h1>
            <div className="flex flex-col w-full mb-2">
              <LoginForm redirect={"/stores"} />
            </div>
            <div className="flex flex-col w-full gap-3 md:max-w-xs pt-2">
              <h6 className="text-md font-sans">Need it for your store?</h6>

              <Button variant={"outline"}>Create Account</Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0">
        <div className="bg-bw-foreground/50 w-full h-full"></div>
        <div className="min-h-60 bg-bw min-w-60"></div>
      </div> */}
    </Container>
  );
}
