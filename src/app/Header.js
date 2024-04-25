import MentorWebIco from "./MentorWebIco.png";
import Image from "next/image";

const Header = () => {
  return (
    <header>
        <div className="grid grid-cols-2 p-8 gap-8 ">
            <Image src={MentorWebIco} alt="MentorWeb Icon" width={50} height={50} />
            <h1 className="pt-3">MentorWeb</h1> 
        </div>
    </header>
  );
};

export default Header;