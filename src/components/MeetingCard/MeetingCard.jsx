"use client";

import Image from "next/image";

const MeetingCard = ({ img, title, desc, handleClick, bgColor }) => {
  return (
    <div
      onClick={handleClick}
      className={`${bgColor} p-3 flex flex-row md:flex-col justify-start gap-6 items-center md:items-start md:justify-around w-full xl:max-w-[240px] md:min-h-[200px] rounded-[14px] cursor-pointer`}
    >
      <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt={title} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{desc}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
