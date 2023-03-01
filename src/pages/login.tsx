import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../components/UserProvider";

interface LoginProps {}

export default function Login({}: LoginProps): any {
  const [username, setUsername] = useState("");
  const { setUserContextValues } = useContext(UserContext);
  const { push } = useRouter();

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const result = await axios.get(
        `http://localhost:3000/api/users/${username}`
      );
      if (result) {
        setUserContextValues(result.data._id, username);
        push("/chat");
      }
    },
    [username]
  );

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                value={username}
                onChange={onChangeUsername}
                type="text"
                name=""
                id="username"
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <button
              onClick={onSubmit}
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <p className="mt-8">
            Need an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
