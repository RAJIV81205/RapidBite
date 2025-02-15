import { useState, useEffect } from "react";


function Header() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude.toFixed(4));
        setLon(position.coords.longitude.toFixed(4));
      });
    }
  }, []);

  const t = Math.floor(Math.random() * 100);
  const time = t >= 10 ? t : `0${t}`;

  return (
    <header className="fixed bg-background w-full h-[12vh] border-b-2 border-neutral/15 flex flex-row justify-evenly items-center">
      <div className="w-fit flex justify-center items-center h-full px-[20px] border-r-neutral/15 border-r-1 ">
        <span className="text-secondary font-noto text-3xl not-italic tracking-wide font-medium">
          Rapid
        </span>
        <span className="text-accent font-noto text-3xl not-italic tracking-wide font-medium">
          Bite
        </span>
      </div>
      <div className="h-full w-fit flex flex-col justify-center items-center px-[20px]">
        <span className="text-xl font-roboto font-semibold">Delivering in {time} Minutes</span>
        <span className="text-xl font-roboto">
          {lat && lon ? `${lat}, ${lon}` : "Fetching location..."}
        </span>
      </div>
      <div className="w-[50%] flex justify-center items-center relative">
        <img src="public/search.png" alt="search" className="absolute aspect-square invert-50 left-[55px] h-[20px]"/>
        <input
          type="text"
          placeholder="Search milk"
          className="w-[90%] border-1 border-neutral/15 py-2.5 rounded-3xl pl-12 bg-neutral/5 focus:outline-neutral/50"
        />
        <div className="">Login</div>
      </div>
    </header>
  );
}

export default Header;
