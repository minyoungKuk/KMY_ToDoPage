import { FOOTER_HEIGHT, HEADER_HEIGHT } from "@/constants";
import { PropsWithChildren } from "react";

const Page = ({ children }: PropsWithChildren) => {
  return (
    <main
      className="p-4 w-full max-w-[800px] min-w-[340px] mx-auto md:px-0 box-border"
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
    >
      {children}
    </main>
  );
};

export default Page;
