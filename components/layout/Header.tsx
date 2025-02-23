"use client";

import { HEADER_HEIGHT } from "@/constants";
import useCurrentDate from "@/hooks/useCurrentDate";
import Link from "next/link";

const Header = () => {
  const currentDate = useCurrentDate();

  return (
    <header
      className="w-full min-w-[340px] bg-slate-900 text-slate-100"
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <div className="mx-auto w-full max-w-[800px] px-2 py-4 flex items-center justify-between">
        <Link href="/">
          <h1>MinBoard</h1>
        </Link>
        <div className="text-sm">{currentDate}</div>
      </div>
    </header>
  );
};

export default Header;
