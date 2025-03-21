function PageContainer({ pageTitle, children }: { pageTitle?: string; children?: React.ReactNode }) {
  return (
    <div data-page-title={pageTitle ?? ''} className={`w-full flex justify-center items-center bg-foreground/10`}>
      {children}
    </div>
  );
}

export default PageContainer;
