import { Container } from "@/components/atoms/container";
import BrandStack from "@/components/atoms/brand/stack";
import { Separator } from "@/components/atoms/separator";
import UserBadge from "@/components/molecules/user-badge";
import SideMenu from "@/components/organisms/side-menu";

export default function Dash({ children }: { children: React.ReactNode }) {
  return (
    <Container variant={"screen"}>
      <Container className=" w-2/12 flex justify-center flex-col align-middle items-center py-8 px-4 border-r-2 border-secondary">
        <SideMenu />

        <Separator className="my-4" />
        <Container className="w-full">
          <UserBadge name={"John Wick"} image={""} />
        </Container>
        <Separator className="my-4" />
        <BrandStack className="w-full h-14" />
      </Container>
      {children}
    </Container>
  );
}
