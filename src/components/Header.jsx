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
        <span className="text-xl font-roboto">Delivering in {Math.floor(Math.random() * 100)} Minutes</span>
        <span className="text-xl font-roboto">
                    
        </span>
      </div>
      <div className="w-[50%] flex justify-center items-center"><input type="text" placeholder="Search milk" className="w-[90%] border-1 border-neutral/15 py-2.5 rounded-3xl pl-1.5"/></div>
    </header>
  );
}

export default Header;
