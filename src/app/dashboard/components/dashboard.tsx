"use client";

import { useState, useEffect } from "react";

// others
import dayjs from "dayjs";
import { BookForm } from "./index";
import en from "@/language/en.json";
import { Table, Tooltip } from "antd";
import { TableHeader } from "./index";
import { NavBar } from "@/components";
import { useDashboard } from "@/hooks";
import type { TableColumnsType } from "antd";
import { Empty, Loading } from "@/components";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

let initialState: any = {
  open: false,
  selectedBook: {},
};

const FORMAT = "DD/MM/YYYY";

type DataType = {
  key: React.Key;
  title: string;
  price: number;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const toolTipStyle = {
  fontSize: 12,
  color: "#fff",
  fontWeight: "500",
  borderRadius: "2px",
  backgroundColor: "#c2b280",
};

const index = () => {
  // hooks initialization
  const {
    books,
    loading,
    metaData,
    getBooks,
    deleteBook,
    deleteBookId,
    handlePagination,
  } = useDashboard();

  // states
  const [{ open, selectedBook }, setState] = useState(initialState);

  const updateState = (state: {}) =>
    setState((prevState: any) => ({ ...prevState, ...state }));

  useEffect(() => {
    getBooks();
  }, []);

  const columns: TableColumnsType<DataType> = [
    { title: "Title", dataIndex: "title" },
    { title: "Author", dataIndex: "author" },
    { title: "Price", dataIndex: "price" },
    {
      // key: "status",
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <span
          className={`font-bold capitalize ${
            record.status === "available" ? "text-green-500" : "text-gray-400"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      // key: "createdAt",
      title: "Created At",
      dataIndex: "createdAt",
      render: (_, record) => (
        <span>{dayjs(record.updatedAt).format(FORMAT)}</span>
      ),
    },
    {
      // key: "updatedAt",
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (_, record) => (
        <span>{dayjs(record.updatedAt).format(FORMAT)}</span>
      ),
    },
    {
      // key: "actions",
      title: "Actions",
      dataIndex: "actions",
      render: (_, record: any) => (
        <div className="">
          <Tooltip
            arrow={false}
            placement="bottom"
            title={en.update_book}
            styles={{ body: toolTipStyle }}
          >
            <EditOutlined
              className="cursor-pointer"
              style={{ color: "#145da0" }}
              onClick={() =>
                updateState({
                  open: true,
                  selectedBook: record,
                })
              }
            />
          </Tooltip>

          {deleteBookId !== record._id ? (
            <Tooltip
              arrow={false}
              placement="bottom"
              title={en.delete_book}
              styles={{ body: toolTipStyle }}
            >
              <DeleteOutlined
                style={{ color: "red" }}
                className="ml-4 cursor-pointer"
                onClick={() => deleteBook(record._id)}
              />
            </Tooltip>
          ) : (
            <LoadingOutlined className="ml-4" style={{ color: "#145da0" }} />
          )}
        </div>
      ),
    },
  ];

  const booksCopy = books.map((book: any) => ({ ...book, key: book._id }));

  return (
    <>
      <div className="w-full h-full">
        <NavBar />

        <Loading loading={loading} />

        {!loading && (
          <div className="px-8 mt-28 w-full">
            <TableHeader metaData={metaData} updateState={updateState} />

            <Table<DataType>
              bordered
              columns={columns}
              scroll={{ y: 400 }}
              dataSource={booksCopy}
              className="custom-table"
              pagination={{
                total: metaData.total,
                current: metaData.page,
                pageSize: metaData.perPage,
                onChange: (page) => handlePagination(page),
              }}
            />
          </div>
        )}

        {!loading && books.length === 0 && <Empty />}

        <BookForm
          open={open}
          refresh={getBooks}
          updateState={updateState}
          selectedBook={selectedBook}
        />
      </div>
    </>
  );
};

export default index;
