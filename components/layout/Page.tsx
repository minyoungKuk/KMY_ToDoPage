import { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => {
  const HEADER_HEIGHT = 60;
  const FOOTER_HEIGHT = 60;

  return (
    <main
      className="w-full max-w-[800px] mx-auto"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
    >
      {children}
    </main>
  );
};

export default Page;
