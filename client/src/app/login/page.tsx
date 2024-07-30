"use client";
import Image from "next/image";
import Link from "next/link";
import passwordImage from "../../../public/assets/Frame.png";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Login() {
  const router = useRouter();
  const [isPasswordVisible, togglePasswordVisibility] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = getCookie("token");
    const user = getCookie("user");
    if (token && user) {
      router.push("/");
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify(state);

    let reqOptions = {
      url: `${API_URL}/auth/login`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await axios.request(reqOptions);

    if (response.status == 200) {
      setCookie("token", response.data.token, { maxAge: 60 * 60 * 24 });
      setCookie("user", response.data.name, { maxAge: 60 * 60 * 24 });
      router.push("/");
    }
  };

  return (
    <main className=" bg-gradient-to-b flex items-center justify-center from-[#FFFFFF] to-[#AFA3FF] h-screen">
      <div className="flex flex-col gap-[32px] text-center m-auto w-[648px] h-[476px] p-[60px] border-[1px] border-[#CECECE] bg-gradient-to-b from-[#F7F7F7] to-[#F0F0F0] rounded-[16px]">
        <p className="text-[48px] text-[#2D2D2D] h-[58px] w-[528px]">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>{" "}
        </p>
        <form action=" " onSubmit={handleSubmit} className="flex flex-col gap-[22px] w-[528px]">
          <div className="h-[56px] bg-[#EBEBEB]">
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="Your Email"
              id="email"
              className="h-full w-full border border-gray-300 rounded outline-none "
              style={{ padding: "16px 12px 16px 12px" }}
              required
            />
          </div>
          <div className="h-[56px] bg-[#EBEBEB] relative">
            <input
              name="password"
              placeholder="Password"
              id="password"
              required
              onChange={handleChange}
              type={isPasswordVisible ? "text" : "password"}
              className="h-full w-full border border-gray-300 rounded outline-none "
              style={{ padding: "16px 12px 16px 12px" }}
            />
            <button
              className="absolute inset-y-3 right-0 flex items-center px-4"
              type="button"
              onClick={() => {
                togglePasswordVisibility((prev) => !prev);
              }}
            >
              {!isPasswordVisible ? (
                <Image alt="password" src={passwordImage} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="gray"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          <button className="w-[528px] h-[56px] bg-[#796DC2] text-white">Login</button>
        </form>

        <p className="text-[20px]">
          Don’t have an account? Create a{" "}
          <Link href="/register" className="text-blue-700 cursor-pointer">
            new account.
          </Link>
        </p>
      </div>
    </main>
  );
}
