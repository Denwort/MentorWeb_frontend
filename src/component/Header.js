import React from "react";
import MentorWebIco from "./MentorWebIco.png";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white ">
        <div className="flex flex-row p-8 gap-8">
            <Image src={MentorWebIco} alt="MentorWeb Icon" width={50} height={50} />
            <div className="pt-3"> <h1>MentorWeb</h1> </div>
            
        </div>
    </header>
  );
};

export default Header;