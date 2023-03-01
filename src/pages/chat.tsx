import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "../components/Layout";
import cn from "classnames";
import Head from "next/head";
import { UserContext } from "../components/UserProvider";
import { IMessages } from "../database/models/Messages";
import dayjs from "dayjs";

interface InputProps {
  value: string | null;
  setValue: (e) => void;
}

const Input = ({ value, setValue }: InputProps) => {
  return (
    <div className="bg-gray-300 p-4">
      <input
        value={value}
        onChange={setValue}
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

interface IUIMessage {
  message: string;
  time: string;
  side: Side;
  createdAt: string;
}

const Message = ({ message, time, side }: IUIMessage) => {
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

const mapBackendMessageToMessage = (backendMessage: {
  userId: string;
  message: string;
  from: "user" | "bot";
  createdAt: string;
}): IUIMessage => {
  return {
    time: dayjs(backendMessage.createdAt).format(),
    side: backendMessage.from === "user" ? Side.RIGHT : Side.LEFT,
    message: backendMessage.message,
    createdAt: backendMessage.createdAt,
  };
};

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [messages, setMessages] = useState<IUIMessage[]>([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/api/users/${userId}/messages`)
        .then((result) => {
          console.log({ data: result.data });
          setMessages(result.data.map(mapBackendMessageToMessage));
        });
    }
  }, [userId]);

  const onInputChange = useCallback((e) => {
    const newInputValue = e.target.value;

    setInputValue(
      newInputValue.charAt(0).toUpperCase() + newInputValue.slice(1)
    );
  }, []);

  const sendMessage = useCallback(() => {
    axios
      .post(`http://localhost:3000/api/messages`, {
        userId,
        message: inputValue,
      })
      .then((result) => {
        setInputValue("");
        setMessages((currentMessages) => [
          ...currentMessages,
          mapBackendMessageToMessage(result.data),
        ]);
      });
  }, [inputValue]);

  return (
    <>
      <Head>
        <title>ReflexAI | Support Chat</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="relative flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message) => (
              <Message key={message.message} {...message} />
            ))}
          </div>

          <Input value={inputValue} setValue={onInputChange} />
          <button
            type="button"
            className="absolute rounded-full w-8 h-8 bg-blue-800 bottom-5 right-5 text-white flex justify-center items-center"
            onClick={sendMessage}
          >
            <span className="hidden">Send</span>
            <i className="fa fa-send-o mr-0.5"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
