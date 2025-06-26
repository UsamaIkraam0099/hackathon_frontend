import React from "react";

// others
import { Spin } from "antd";
import "../app/globals.css";

const index = ({
  loading,
  className,
}: {
  loading: boolean;
  className?: string;
}) => {
  if (!loading) return null;

  return (
    <div className={`fullscreen-loader ${className}`}>
      <Spin size="large" className="custom-spin" />
    </div>
  );
};

export default index;
