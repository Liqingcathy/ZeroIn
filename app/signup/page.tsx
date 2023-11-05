"use client";
import React, { useState } from "react";

import { ID } from "appwrite";
import Link from "next/link";

import { account } from "../../src/utils/appwrite";
import { googleAuth, login, verifyEmail } from "../../src/utils/auth";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.username,
      );
      await login(user.email, user.password);
      await verifyEmail();
      setIsVerified(true);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const signWithGoogle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    googleAuth();
  };

  return (
    <>
      <Link href={"/"}>Home</Link>
      {!isVerified ? (
        <>
          <h2>Sign up</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id="username"
              type="text" //
              className="border border-gray-300 m-4"
              placeholder="username"
              value={user.username}
              data-testid="username"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <br />
            <input
              id="email"
              type="email" //
              className="border border-gray-300 m-4"
              placeholder="Email address"
              value={user.email}
              data-testid="email"
              required
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br />
            <input
              id="password"
              type="password" //
              className="border border-gray-300 m-4"
              placeholder="password"
              value={user.password}
              data-testid="password"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <br />
            <button className="m-4"> Verify Email </button>
            <br />
            <h2>or</h2>
            <button
              type="button"
              className="m-4"
              onClick={(e) => signWithGoogle(e)}
            >
              Continue with Google
            </button>
          </form>
        </>
      ) : (
        <h1>Signing Up...</h1>
      )}
    </>
  );
};

export default SignUp;
