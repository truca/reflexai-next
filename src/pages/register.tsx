import React, { useCallback, useContext, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../components/UserProvider";

interface RegisterProps {}

export default function Register({}: RegisterProps): any {
  const [username, setUsername] = useState("");
  const { setUserContextValues } = useContext(UserContext);

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const result = await axios.post("http://localhost:3000/api/users", {
        name: username,
      });
      if (result) {
        setUserContextValues(result.data._id, username);
        window.location = "/chat";
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
            Create an account
          </h1>

          <form className="mt-6">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                value={username}
                onChange={onChangeUsername}
                type="text"
                name=""
                id=""
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
              />
            </div>

            <button
              onClick={onSubmit}
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Create account
            </button>
          </form>

          <p className="mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
