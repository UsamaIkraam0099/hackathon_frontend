import { useState, useCallback } from "react";

// others
import axios from "axios";
import { APP_URL } from "@/constants";

let initialState: any = {
  books: [],
  loading: false,
  deleteBookId: "",
  metaData: {
    page: 1,
    total: 0,
    perPage: 10,
    totalPages: 0,
  },
};

// urls
let currentPage = 1;
const { books_url } = APP_URL;

export const useDashboard = () => {
  // states
  const [{ books, loading, metaData, deleteBookId }, setState] =
    useState(initialState);

  const updateState = (state: {}) =>
    setState((prevState: any) => ({ ...prevState, ...state }));

  const getBooks = useCallback(async () => {
    updateState({ loading: true });

    try {
      const config = {
        method: "GET",
        url: books_url,
        params: { page: currentPage, limit: metaData.perPage },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") || ""
          )}`,
        },
      };

      const response = await axios(config);
      const { page, books, total, perPage, totalPages } = response.data;

      updateState({
        books,
        loading: false,
        metaData: {
          page,
          total,
          perPage,
          totalPages,
        },
      });
    } catch (error) {
      console.log({ error });
      updateState({ loading: false });
    }
  }, [metaData.page]);

  const createAndUpdateBook = async ({
    data,
    bookId,
    callback,
    method = "POST",
  }: any) => {
    updateState({ loading: true });

    try {
      let config = {
        data,
        method,
        url: books_url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") || ""
          )}`,
        },
      };

      if (method === "PUT") {
        config = {
          ...config,
          ...{
            url: `${books_url}/${bookId}`,
            data: {
              title: data.title,
              price: data.price,
              author: data.author,
              status: data.status,
            },
          },
        };
      }

      await axios(config);

      callback();
      setTimeout(() => {
        updateState({ loading: false });
      }, 2000);
    } catch (error) {
      console.log({ error });
      updateState({ loading: false });
    }
  };

  const deleteBook = async (id: string) => {
    updateState({ deleteBookId: id });

    try {
      let config = {
        method: "DELETE",
        url: `${books_url}/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token") || ""
          )}`,
        },
      };

      await axios(config);

      setTimeout(() => {
        updateState({ deleteBookId: "" });
        setTimeout(() => {
          getBooks();
        }, 300);
      }, 1500);
    } catch (error) {
      console.log({ error });
      updateState({ deleteBookId: "" });
    }
  };

  const handlePagination = (page: number) => {
    currentPage = page;

    setTimeout(() => {
      getBooks();
    }, 300);
  };

  return {
    books,
    loading,
    metaData,
    getBooks,
    deleteBook,
    deleteBookId,
    handlePagination,
    createAndUpdateBook,
  };
};
