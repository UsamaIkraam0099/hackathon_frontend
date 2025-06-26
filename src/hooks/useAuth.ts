import { useState } from "react";
import { useRouter } from "next/navigation";

// others
import axios from "axios";
import { APP_URL } from "@/constants";

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

// urls
const { login_url, register_url } = APP_URL;

export const useAuth = () => {
  // hooks initialization
  const router = useRouter();

  // states
  const [loading, setLoading] = useState(false);

  const register = async (data: RegisterProps) => {
    setLoading(true);

    try {
      const config = {
        data,
        method: "POST",
        url: register_url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      const { token, userDetails } = response.data;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      router.replace("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const login = async (data: LoginProps) => {
    setLoading(true);

    try {
      const config = {
        data: data,
        url: login_url,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      const { token, userDetails } = response.data;

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      router.replace("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  return { login, register, loading };
};
