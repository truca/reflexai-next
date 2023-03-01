import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import cn from "classnames";
import Head from "next/head";
import { UserContext } from "../components/UserProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";

dayjs.extend(relativeTime);
interface InputProps {
  value: string | null;
  setValue: (e) => void;
  sendMessage: () => void;
}

const Input = ({ value, setValue, sendMessage }: InputProps) => {
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") sendMessage();
    },
    [sendMessage]
  );

  return (
    <div className="bg-gray-300 p-4">
      <input
        value={value}
        onChange={setValue}
        onKeyDown={onKeyDown}
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
    time: dayjs(backendMessage.createdAt).fromNow(),
    side: backendMessage.from === "user" ? Side.RIGHT : Side.LEFT,
    message: backendMessage.message,
    createdAt: backendMessage.createdAt,
  };
};

const scrollToBottom = () => {
  document.getElementById("anchor")?.scrollIntoView({ behavior: "smooth" });
};

const ChatPage = () => {
  const [inputValue, setInputValue] = useState<string | null>("");
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [messages, setMessages] = useState<IUIMessage[]>([]);
  const { userId, userName } = useContext(UserContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!hasInitialized && userId && userName) {
      // initialize messages
      axios
        .get(`http://localhost:3000/api/users/${userId}/messages`)
        .then((result) => {
          setMessages(result.data.map(mapBackendMessageToMessage));
          setTimeout(scrollToBottom, 300);
        });

      // initialize socket
      const ENDPOINT = "http://localhost:5000/";
      const newSocket = io(ENDPOINT, { transports: ["websocket", "polling"] });
      setSocket(newSocket);

      // join the user's chatroom
      const joinParams = { name: userName, userId, room: `room:${userId}` };
      newSocket.emit("join", joinParams, (error) => {
        if (error) {
          return toast(`Error: ${error}`, {
            type: "error",
          });
        }
        return toast(`Welcome to your chatroom`, {
          type: "success",
        });
      });

      // listen for messages
      newSocket.on("message", (msg) => {
        const newMessage: IUIMessage = {
          message: msg.text,
          side: msg.userId === userId ? Side.RIGHT : Side.LEFT,
          time: dayjs(msg.createdAt).fromNow(),
          createdAt: msg.createdAt,
        };
        setMessages((messages) => [...messages, newMessage]);
        setTimeout(scrollToBottom, 300);
        setTimeout(scrollToBottom, 1500);
      });

      // listen for notifications
      newSocket.on("notification", (notif) => {
        toast(`${notif?.title}: ${notif?.description}`, {
          type: "success",
        });
      });

      setHasInitialized(true);
      return () => {
        if (newSocket.connected) {
          newSocket.disconnect();
        }
      };
    }
  }, [userId, userName, hasInitialized]);

  const onInputChange = useCallback((e) => {
    const newInputValue = e.target.value;

    setInputValue(
      newInputValue.charAt(0).toUpperCase() + newInputValue.slice(1)
    );
  }, []);

  const sendMessage = useCallback(() => {
    socket.emit("sendMessage", inputValue);
    setInputValue("");
  }, [inputValue, socket]);

  return (
    <>
      <Head>
        <title>ReflexAI | Support Chat</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="relative flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message) => (
              <Message key={message.createdAt} {...message} />
            ))}
            <div id="anchor" />
          </div>

          <Input
            value={inputValue}
            setValue={onInputChange}
            sendMessage={sendMessage}
          />
          <button
            type="button"
            className="absolute rounded-full w-8 h-8 bg-blue-800 bottom-5 right-5 text-white flex justify-center items-center"
            onClick={sendMessage}
          >
            <span className="hidden">Send</span>
            <i className="fa fa-send-o mr-0.5"></i>
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ChatPage;
