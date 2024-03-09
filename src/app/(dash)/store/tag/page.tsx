import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import TagsBox from "@/components/organisms/tags-box";

export default async function Dashboard() {
  return (
    <div className="flex flex-col justify-start align-top items-start grow w-full h-full gap-4">
      <section className="flex justify-between w-full h-auto mb-4">
        <h1 className="text-xl md:text-2xl font-semibold">Manage Tags</h1>
        <Button className="flex gap-2">
          <Icon name="IoMdAdd" className="h-5 w-5" />
          Add Tag
        </Button>
      </section>
      <section className="flex w-full h-auto gap-8 md:flex-row flex-col-reverse">
        <TagsBox className="h-auto" />
      </section>
      {/* <div className="w-screen h-screen absolute top-0 bottom-0 left-0 right-0">
        <div className="bg-bw-foreground/50 w-full h-full"></div>
        <div className="min-h-60 bg-bw min-w-60"></div>
      </div> */}
    </div>
  );
}
