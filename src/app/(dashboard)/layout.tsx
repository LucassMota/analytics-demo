import Layout from "../components/Layout/Layout";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <Layout>{children}</Layout>
    </div>
  );
}
