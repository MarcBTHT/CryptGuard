export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full px-4 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto text-center justify-center">
        {children}
      </div>
    </section>
  );
}
