"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    await axios
      .post("https://tmbackend.vercel.app/api/users/register", userData)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setLoading(false);
        router.push("/");
      })
      .catch((error) => {
        if (error.response.data.msg == "User already exists") {
          alert("This username is already exist, please use another one");
        } else {
          alert("Password should at least 6 character");
        }
        setLoading(false);
        console.error("Registration error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                ref={{ ...register("username") }}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                ref={{ ...register("password") }}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Please Wait" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
