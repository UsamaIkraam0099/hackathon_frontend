"use client";

import React from "react";
import { useRouter } from "next/navigation";

// others
import { useAuth } from "@/hooks";
import en from "@/language/en.json";
import { Button, Loading, TextField } from "@/components";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const index = () => {
  // hooks initialization
  const router = useRouter();
  const { login, loading } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => login(data);

  return (
    <div>
      <Loading loading={loading} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: en.email_input.required }}
          render={({ field }) => (
            <TextField
              {...field}
              errors={errors}
              mainClass="mt-4"
              label={en.email_input.label}
              placeholder={en.email_input.placeholder}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: en.password_input.required }}
          render={({ field }) => (
            <TextField
              {...field}
              errors={errors}
              mainClass="mt-4"
              label={en.password_input.label}
              placeholder={en.password_input.placeholder}
            />
          )}
        />

        <Button label={en.login} mainClass="mt-16" />
      </form>

      <div className="flex flex-col items-center mt-10">
        <p>
          Don't have an account?{" "}
          <a
            onClick={() => router.push("/register")}
            className="text-(--primary-button-bg) cursor-pointer"
          >
            {en.register}
          </a>
        </p>
      </div>
    </div>
  );
};

export default index;
