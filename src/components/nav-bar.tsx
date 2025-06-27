"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// others
import "../app/globals.css";
import { Tooltip } from "antd";
import en from "@/language/en.json";
import { LogoutOutlined } from "@ant-design/icons";

const toolTipStyle = {
  fontSize: 12,
  color: "#fff",
  fontWeight: "500",
  borderRadius: "2px",
  backgroundColor: "#c2b280",
};

const index = () => {
  // hooks initialization
  const router = useRouter();

  // states
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    const user = localStorage.getItem("userDetails");

    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    router.replace("/login");
  };

  return (
    <div className="top-0 px-8 w-full flex fixed items-center z-999999999 justify-between h-16 bg-(--primary-button-bg)">
      <div className="flex">
        <Image
          height={2}
          width={150}
          src="/header.svg"
          alt="Hackathon logo"
          style={{ marginLeft: "-26px", color: "#fff" }}
        />
      </div>
      <div className="flex">
        <p className="text-1xl font-bold text-white">{userDetails.name}</p>

        <Tooltip
          arrow={false}
          title={en.logout}
          placement="bottom"
          styles={{ body: toolTipStyle }}
        >
          <LogoutOutlined
            style={{ color: "#fff" }}
            className="ml-4 cursor-pointer"
            onClick={() => handleLogout()}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default index;
