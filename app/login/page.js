"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://tmbackend.vercel.app/api/users/login",
        userData
      );
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      setLoading(false);
      router.push("/");
    } catch (error) {
      if (error.response.data.msg == "Invalid User") {
        alert("This username does not exist, Please register first");
      } else {
        alert("Your Password Is Incorrect");
      }
      setLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131938] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card backdrop-blur-md bg-gradient-to-br from-[#131938]/80 to-[#252d6d]/80 border border-white/20 p-8 rounded-2xl shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-6">
              Log in to your account
            </h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
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
                  className="input-field bg-white/5 border-2 border-white/20 rounded-xl px-5 py-3 focus:border-white/40 transition-all duration-300"
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
                  autoComplete="current-password"
                  required
                  ref={{ ...register("password") }}
                  className="input-field bg-white/5 border-2 border-white/20 rounded-xl px-5 py-3 focus:border-white/40 transition-all duration-300"
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
                disabled={loading}
                type="submit"
                className="btn-primary bg-gradient-to-r from-[#252d6d] to-[#1f2758] hover:from-[#1f2758] hover:to-[#252d6d] transition-all duration-300 w-full flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Please Wait
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
            </div>

            <div className="text-center text-white/80">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-white hover:underline">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
