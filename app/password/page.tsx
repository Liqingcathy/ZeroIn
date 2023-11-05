"use client";
import React from "react";
import { account } from "@/src/utils/appwrite";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  email: string;
};

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log("submit email", data);
    try {
      await account.createRecovery(data.email, "http://localhost:3000/resetpw");
      console.log("find password using email submission", data.email);
      localStorage.setItem("email", data.email.toString());
    } catch (error) {
      console.log("Rest Password Error: ", error);
    }
  };

  return (
    <>
      <p className="my-6">
        Please provide email address when signed up for your account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email Address</label>
        <input
          className="border border-gray-300 m-4 w-60"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Password;
