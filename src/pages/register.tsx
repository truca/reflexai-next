import React, { useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../components/UserProvider";
import ImageSection from "../components/authentication/ImageSection";
import Title from "../components/authentication/Title";
import FormField from "../components/authentication/FormField";
import SubmitButton from "../components/authentication/SubmitButton";
import LinkParagraph from "../components/authentication/LinkParagraph";

interface RegisterProps {
  restServerUri: string;
}

export default function Register({ restServerUri }: RegisterProps): any {
  const [username, setUsername] = useState("");
  const { setUserData } = useContext(UserContext);
  const { push } = useRouter();

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const result = await axios.post(`${restServerUri}api/users`, {
        name: username,
      });
      if (result?.data) {
        setUserData(result.data._id, username);
        push("/chat");
      }
    },
    [username]
  );

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <ImageSection />

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Create an account
          </h1>
          <Title title="Create an account" />

          <form className="mt-6">
            <FormField
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={onChangeUsername}
            />

            <SubmitButton buttonText="Create account" onSubmit={onSubmit} />
          </form>

          <LinkParagraph
            paragraphText="Already have an account?"
            linkHref="/login"
            linkText="Log in to your account"
          />
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  return {
    props: {
      restServerUri: process.env.REST_SERVER_URI,
    },
  };
}
