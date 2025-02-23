import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full">
      <div className="mx-auto w-full max-w-[800px] px-2 py-4 flex items-center justify-between">
        <Link href="/">GKN TODO</Link>
        <div>오늘 날짜</div>
      </div>
    </header>
  );
};

export default Header;
