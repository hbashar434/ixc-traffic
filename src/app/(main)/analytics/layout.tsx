const AnalyticsPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <div>Hello! from Analytics...</div>
      <div>{children}</div>
    </section>
  );
};

export default AnalyticsPage;
