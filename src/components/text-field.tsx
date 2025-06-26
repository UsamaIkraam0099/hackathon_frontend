"use client";

import React from "react";

// others
import "../app/globals.css";
import { Input } from "antd";

interface Props {
  errors?: any;
  label: string;
  iProps?: object;
  mainClass?: string;
  placeholder?: string;
}

const index = ({
  label,
  errors,
  iProps,
  mainClass,
  placeholder,
  ...rest
}: Props) => {
  return (
    <div className={`w-90 ${mainClass}`}>
      <label className="text-sm font-bold">{label}</label>
      <Input
        className="text-2xl"
        placeholder={placeholder}
        style={{ height: "40px", borderRadius: "2px" }}
        status={errors?.[label.toLowerCase()] ? "error" : ""}
        {...iProps}
        {...rest}
      />

      {errors?.[label.toLowerCase()] && (
        <p className="italic text-xs text-red-600">
          {errors[label.toLowerCase()].message}
        </p>
      )}
    </div>
  );
};

export default index;
