import { SmoothScroll } from "@/components/yacht/SmoothScroll";
import { YachtHeader } from "@/components/yacht/YachtHeader";
import { YachtFooter } from "@/components/yacht/YachtFooter";

export default function YachtPublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SmoothScroll />
      <YachtHeader />
      <main>{children}</main>
      <YachtFooter />
    </>
  );
}
