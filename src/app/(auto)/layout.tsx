import SideMenu from "@/components/organisms/side-menu";
import TopMenu from "@/components/organisms/top-menu";
import BasePage from "@/components/templates/base-page";

export default function POS({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-wrapper">
      <SideMenu />
      <main className={"page-main bg-paper"}>
        <TopMenu className="block z-30 fixed bg-background w-full" />
        <BasePage>{children}</BasePage>
      </main>
    </div>
  );
}