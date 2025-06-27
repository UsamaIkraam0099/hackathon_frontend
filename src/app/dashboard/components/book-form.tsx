"use client";

import { useEffect } from "react";

// others
import "../../globals.css";
import en from "@/language/en.json";
import { Modal, Button } from "antd";
import { useDashboard } from "@/hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Loading, TextField, SelectField } from "@/components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type DataType = {
  key: React.Key;
  title: string;
  price: number;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

interface ModalProps {
  open: boolean;
  selectedBook: any;
  refresh: () => void;
  updateState: (obj: object) => void;
}

interface IFormInput {
  title: string;
  price: string;
  author: string;
  status: string;
}

type Field = "title" | "price" | "author" | "status";

const btnStyle = {
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "2px",
  backgroundColor: "#145da0",
};

const index = ({ open, refresh, updateState, selectedBook }: ModalProps) => {
  // hooks initialization
  const { loading, createAndUpdateBook } = useDashboard();
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const isValidField = (key: string): key is Field => {
    return ["title", "price", "author", "status"].includes(key);
  };

  useEffect(() => {
    for (const key in selectedBook)
      if (isValidField(key)) setValue(key, selectedBook[key]);
  }, [selectedBook]);

  const onSubmit: SubmitHandler<IFormInput> = (data: any) =>
    createAndUpdateBook({
      data,
      callback: handleCancel,
      bookId: selectedBook?._id,
      method: selectedBook?._id ? "PUT" : "POST",
    });

  const handleCancel = () => {
    refresh();

    reset();
    updateState({ open: false, selectedBook: {} });
  };

  return (
    <Modal
      open={open}
      footer={null}
      className="custom-modal"
      onCancel={handleCancel}
      closable={{ "aria-label": "Custom Close Button" }}
      title={selectedBook?._id ? en.update_book : en.add_new_book}
    >
      <Loading loading={loading} className="fullcondent-loader" />

      <div className="flex mt-8 justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: en.title_input.required }}
            render={({ field }) => (
              <TextField
                {...field}
                errors={errors}
                mainClass="mt-4"
                label={en.title_input.label}
                placeholder={en.title_input.placeholder}
              />
            )}
          />

          <Controller
            name="author"
            control={control}
            rules={{ required: en.author_input.required }}
            render={({ field }) => (
              <TextField
                {...field}
                errors={errors}
                mainClass="mt-4"
                label={en.author_input.label}
                placeholder={en.author_input.placeholder}
              />
            )}
          />

          <Controller
            name="price"
            control={control}
            rules={{ required: en.price_input.required }}
            render={({ field }) => (
              <TextField
                {...field}
                errors={errors}
                mainClass="mt-4"
                label={en.price_input.label}
                placeholder={en.price_input.placeholder}
                iProps={{ type: "number", min: 0 }}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: en.status_input.required }}
            render={({ field }) => (
              <SelectField
                {...field}
                errors={errors}
                mainClass="mt-4 w-full"
                label={en.status_input.label}
                placeholder={en.status_input.placeholder}
                options={[
                  { value: "available", label: "Available" },
                  { value: "occupied", label: "Occupied" },
                ]}
              />
            )}
          />

          <div className="flex justify-end">
            <Button
              key="cancel"
              onClick={handleCancel}
              className="mt-12 mr-4"
              style={{ borderRadius: "2px" }}
            >
              {en.cancel}
            </Button>

            <Button
              type="primary"
              variant="solid"
              style={btnStyle}
              htmlType="submit"
              className="mt-12"
              icon={<PlusOutlined />}
            >
              {selectedBook?._id ? en.update : en.add}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default index;
