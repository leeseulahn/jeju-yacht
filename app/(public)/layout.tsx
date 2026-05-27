import { Splash } from "@/components/yacht/Splash";
import { YachtHeader } from "@/components/yacht/YachtHeader";
import { YachtFooter } from "@/components/yacht/YachtFooter";

export default function YachtPublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Splash />
      <YachtHeader />
      <main>{children}</main>
      <YachtFooter />
    </>
  );
}
