import React from "react";
import { AppProps } from "next/app";
import "../styles/index.css";
import UserProvider from "../components/UserProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <UserProvider>
        <Component {...pageProps} />;
      </UserProvider>
    </>
  );
}

export default MyApp;
