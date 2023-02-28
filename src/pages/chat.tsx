import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import cn from "classnames";
import Head from "next/head";

interface InputProps {
  value: string | null;
  setValue: (value: string | null) => void;
}

const Input = ({ value, setValue }: InputProps) => {
  return (
    <div className="bg-gray-300 p-4">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Type your message…"
        className="flex items-center h-10 w-full rounded px-3 text-sm"
      />
    </div>
  );
};

enum Side {
  LEFT,
  RIGHT,
}

interface MessageProps {
  message: string;
  time: string;
  side: Side;
}

const Message = ({ message, time, side }: MessageProps) => {
  const isLeft = side === Side.LEFT;

  const Avatar = (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
  );
  return (
    <div
      className={cn("flex w-full mt-2 space-x-3 max-w-xs", {
        ["ml-auto justify-end"]: !isLeft,
      })}
    >
      {isLeft && Avatar}
      <div>
        <div
          className={cn("p-3", {
            ["bg-gray-300 rounded-r-lg rounded-bl-lg"]: isLeft,
            ["bg-blue-600 text-white rounded-l-lg rounded-br-lg"]: !isLeft,
          })}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{time}</span>
      </div>
      {!isLeft && Avatar}
    </div>
  );
};

const MESSAGES = [
  {
    side: Side.LEFT,
    time: "2 min ago",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    side: Side.RIGHT,
    time: "2 min ago",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
  },
  {
    side: Side.RIGHT,
    time: "2 min ago",
    message: "Lorem ipsum dolor sit amet.",
  },
  {
    side: Side.LEFT,
    time: "2 min ago",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    side: Side.RIGHT,
    time: "2 min ago",
    message: "Lorem ipsum dolor sit.",
  },
];

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  return (
    <>
      <Head>
        <title>ReflexAI | Support Chat</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {MESSAGES.map((message) => (
              <Message {...message} />
            ))}
          </div>

          <Input value={inputValue} setValue={setInputValue} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
