import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import Icon from "@/components/atoms/icon";
import { ProductTable } from "@/components/organisms/product-table";

export default async function Dashboard() {
  return (
    <Container className="flex flex-col justify-start align-top items-start grow w-full h-full">
      <div className="flex justify-between w-full h-auto">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Products</h1>
        <Button className="flex gap-2">
          <Icon name="IoMdAdd" className="h-5 w-5" />
          Add Product
        </Button>
      </div>
      <ProductTable />
    </Container>
  );
}
