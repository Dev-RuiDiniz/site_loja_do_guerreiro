import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[color:rgba(248,245,237,0.96)] transition-colors dark:bg-[var(--color-background)]">
        <AdminSidebar />
        <div className="lg:pl-72">
          <AdminTopbar user={{ name: session.name, email: session.email }} />
          <main className="p-8">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
