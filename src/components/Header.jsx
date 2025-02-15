function Header() {


  return (
    <header className="fixed bg-background w-full h-[12vh] border-b-2 border-neutral/15 flex flex-row justify-center items-center">
      <div className="w-fit flex justify-center items-center h-full px-[20px]">
        <span className="text-secondary font-noto text-3xl not-italic tracking-wide font-medium">
          Rapid
        </span>
        <span className="text-accent font-noto text-3xl not-italic tracking-wide font-medium">
          Bite
        </span>
      </div>
      <div className="h-full w-fit border-neutral/15 border-r-1 border-l-1 flex flex-col justify-center items-center px-[20px]">
      <span className="text-xl">Delivering in</span>
      <span className="text-2xl">{Math.floor(Math.random()*100)} Minutes</span>
      </div>
    </header>
  );
}

export default Header;
