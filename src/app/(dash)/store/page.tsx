import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import Icon from "@/components/atoms/icon";
import TagTable from "@/components/organisms/tag-table";
import LoginForm from "@/components/forms/login-form";
import TagForm from "@/components/forms/tag-form";

export default async function Dashboard() {
  return (
    <div className="flex flex-col justify-start align-top items-start grow w-full h-full">
      <section className="flex justify-between w-full h-auto mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Products</h1>
        <Button className="flex gap-2">
          <Icon name="IoMdAdd" className="h-5 w-5" />
          Add Product
        </Button>
      </section>
      <section className="flex w-full h-full gap-8 md:flex-row flex-col-reverse">
        <TagTable />
        <div className="flex flex-col gap-2 md:gap-6 w-auto md:min-w-[400px] justify-center text-center md:text-left align-middle md:h-full h-auto">
          <div className="bg-bw py-8 md:px-8 px-4 w-full rounded-lg m-auto">
            <h1 className="text-3xl md:text-4xl font-bold pb-4 select-none">
              Tag.
            </h1>
            <div className="flex flex-col w-full mb-2">
              <TagForm />
            </div>
          </div>
        </div>
      </section>
      {/* <div className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0">
        <div className="bg-bw-foreground/50 w-full h-full"></div>
        <div className="min-h-60 bg-bw min-w-60"></div>
      </div> */}
    </div>
  );
}
