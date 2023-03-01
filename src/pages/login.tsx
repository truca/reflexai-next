import React, { useCallback, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext } from "../components/UserProvider";
import ImageSection from "../components/authentication/ImageSection";
import LinkParagraph from "../components/authentication/LinkParagraph";
import SubmitButton from "../components/authentication/SubmitButton";
import FormField from "../components/authentication/FormField";
import Title from "../components/authentication/Title";

interface LoginProps {
  restServerUri: string;
}

export default function Login({ restServerUri }: LoginProps): any {
  const [username, setUsername] = useState("");
  const { setUserData } = useContext(UserContext);
  const { push } = useRouter();

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const result = await axios.get(`${restServerUri}api/users/${username}`);
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
          <Title title="Log in to your account" />

          <form className="mt-6" action="#" method="POST">
            <FormField
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={onChangeUsername}
            />

            <SubmitButton buttonText="Log In" onSubmit={onSubmit} />
          </form>

          <LinkParagraph
            paragraphText="Need an account?"
            linkHref="/register"
            linkText="Create an account"
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
