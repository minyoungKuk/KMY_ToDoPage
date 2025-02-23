import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Page from "@/components/layout/Page";
import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Page>{children}</Page>
      <Footer />
    </>
  );
};

export default RootLayout;
