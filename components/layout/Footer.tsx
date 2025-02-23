import { FOOTER_HEIGHT } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-ful min-w-[340px] bg-slate-900 text-slate-100 flex items-center"
      style={{ height: `${FOOTER_HEIGHT}px` }}
    >
      <div className="w-full max-w-[800px] mx-auto">
        Minyoung Kuk
        <Link href="https://github.com/minyoungKuk" target="_blank">
          @GitHub
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
