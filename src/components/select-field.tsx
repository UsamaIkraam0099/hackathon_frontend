"use client";

import React from "react";

// others
import "../app/globals.css";
import { Select } from "antd";

interface Props {
  errors?: any;
  label: string;
  mainClass?: string;
  placeholder?: string;
  options: Array<any>;
}

const index = ({
  label,
  errors,
  options,
  mainClass,
  placeholder,
  ...rest
}: Props) => {
  return (
    <div className={`w-90 flex flex-col ${mainClass}`}>
      <label className="text-sm font-bold">{label}</label>
      <Select
        options={options}
        className="custom-select"
        placeholder={placeholder}
        style={{ height: "40px" }}
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
