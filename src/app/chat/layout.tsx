export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={'section flex w-full h-full'}>
      {/* Include shared UI here e.g. a header or sidebar */}
      {children}
    </section>
  );
}
