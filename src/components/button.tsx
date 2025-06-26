"use client";

import React from "react";

// others
import { Button } from "antd";

interface Props {
  label: string;
  mainClass?: string;
}

const index = ({ label, mainClass }: Props) => {
  const btnStyle = {
    width: "100%",
    height: "50px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "2px",
    backgroundColor: "#145da0",
  };

  return (
    <div className={`${mainClass}`}>
      <Button
        type="primary"
        color="purple"
        variant="solid"
        style={btnStyle}
        htmlType="submit"
      >
        {label}
      </Button>
    </div>
  );
};

export default index;
