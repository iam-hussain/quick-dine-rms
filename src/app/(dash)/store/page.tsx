import { Button } from "@/components/atoms/button";
import { Container } from "@/components/atoms/container";
import Icon from "@/components/atoms/icon";

export default async function Dashboard() {
  return (
    <Container className="flex justify-start align-top items-start grow w-full h-full">
      <div className="flex justify-between w-full h-auto">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <Button className="flex gap-2">
          <Icon name="IoMdAdd" className="h-5 w-5" />
          Add New Product
        </Button>
      </div>
    </Container>
  );
}
