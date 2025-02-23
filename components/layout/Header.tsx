"use client";

import useCurrentDate from "@/hooks/useCurrentDate";
import Link from "next/link";

const Header = () => {
  const currentDate = useCurrentDate();

  return (
    <header className="w-full">
      <div className="mx-auto w-full max-w-[800px] px-2 py-4 flex items-center justify-between">
        <Link href="/">
          <h1>MinBoard</h1>
        </Link>
        <div>{currentDate}</div>
      </div>
    </header>
  );
};

export default Header;
