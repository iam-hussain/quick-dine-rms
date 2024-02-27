import Link from "next/link";
import { ThemeModeToggle } from "@/components/organisms/theme-mode-toggle";
import BrandStackSlogan from "@/components/atoms/brand/stack-with-slogan";

export default function Half({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-fill flex flex-col py-10 px-4 gap-10 justify-center align-middle items-center bg-paper">
      <div className="p-2 w-auto absolute top-0 right-0">
        <ThemeModeToggle />
      </div>
      <section className="md:grid md:grid-cols-12 md:w-full justify-center align-middle flex flex-col items-center gap-10 w-11/12">
        <div className="flex flex-col justify-center align-middle col-span-full md:col-span-7 items-center w-full gap-4 text-center">
          <h6 className="md:text-3xl text-2xl font-bold text-secondary hidden">
            Elevate Your <br />
            Social Hub with
          </h6>

          <Link href={"/"}>
            <BrandStackSlogan className={"w-full"} />
          </Link>
        </div>

        <div className="flex flex-col gap-6 w-full md:col-span-5 justify-center text-center md:text-left align-middle">
          {children}
        </div>
        <div className="flex flex-col gap-6 w-full md:col-span-5 justify-center text-center md:text-left align-middle"></div>
      </section>
    </main>
  );
}
