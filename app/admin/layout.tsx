import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Admin — Prompted IRL" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <AdminNav />
      <main className="pt-16">{children}</main>
    </div>
  );
}
