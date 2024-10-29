const AnalyticsPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
      <div className="text-blue-600 ">Hello! from Analytics...</div>
      <div>{children}</div>
    </section>
  );
};

export default AnalyticsPage;
