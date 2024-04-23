import React from "react";

const Header = () => {
  return (
    <header className="bg-white ">
        <div className="flex flex-row p-8 gap-4">
            <imge src="/MentorWebIco.png" alt="" className="h-1 w-1"></imge>
            <h1>MentorWeb</h1>
        </div>
    </header>
  );
};

export default Header;