"use client";

// others
import "../../globals.css";
import en from "@/language/en.json";
import { Input, Select, Button } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

type IFilter = {
  text: string;
  column: string;
};

const fieldStyle = { borderRadius: "2px" };

const btnStyle = {
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "2px",
  backgroundColor: "#145da0",
};

const index = ({ metaData, updateState }: any) => {
  // hooks initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFilter>();

  const onSubmit: SubmitHandler<IFilter> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between"
    >
      <div className="font-bold">
        Total: <span className="font-normal">{metaData.total}</span>
      </div>

      <div className="flex mb-2 items-center justify-end">
        <div className="w-50">
          <Input
            style={fieldStyle}
            placeholder="Enter search keyword"
            {...register("text", { required: true })}
          />
        </div>

        <div className="w-50 ml-4">
          <Select
            style={fieldStyle}
            placeholder="Select column"
            className="w-50 custom-select"
            {...register("column", { required: true })}
            options={[
              { value: "title", label: "Title" },
              { value: "author", label: "Author" },
              { value: "price", label: "Price" },
              { value: "status", label: "Status" },
            ]}
          />
        </div>

        <div className="ml-4">
          <Button
            type="primary"
            variant="solid"
            htmlType="submit"
            style={btnStyle}
            icon={<SearchOutlined />}
          >
            {en.search}
          </Button>
        </div>

        <div className="ml-4">
          <Button
            variant="solid"
            style={btnStyle}
            icon={<PlusOutlined />}
            onClick={() => updateState({ open: true, actionType: true })}
          >
            {en.add_book}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default index;
