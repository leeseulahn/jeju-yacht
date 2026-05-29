import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/yacht/AdminNav";

export default async function AdminPanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const store = await cookies();
  if (store.get("yacht_admin")?.value !== "1") {
    redirect("/admin/login");
  }

  return (
    <div className="y-admin">
      <AdminNav />
      <div className="y-admin__main">{children}</div>
    </div>
  );
}
