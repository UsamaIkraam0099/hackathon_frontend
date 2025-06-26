import React from "react";
import Image from "next/image";

interface Props {
  heading: string;
  children: React.ReactNode;
}
const index = ({ heading, children }: Props) => {
  return (
    <div className="p-24 flex flex-col items-center bg-white shadow-2xl rounded-xs">
      <Image
        width={300}
        height={38}
        alt="Hackathon logo"
        src="/hackathon-logo.svg"
        style={{ marginTop: "-120px" }}
      />

      <p
        style={{ marginTop: "-32px" }}
        className="w-70 text-2xl font-bold text-center mb-8"
      >
        {heading}
      </p>
      {children}
    </div>
  );
};

export default index;
