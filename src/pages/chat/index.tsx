import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Head from "next/head";
import { UserContext } from "../../components/UserProvider";
import dayjs from "dayjs";
import io from "socket.io-client";
import "react-toastify/dist/ReactToastify.css";
import Input from "./Input";
import MessagesBox from "./MessagesBox";
import Message, { IUIMessage, Side } from "./Message";
import { mapBackendMessageToMessage } from "../../helpers/mapBackendMessageToMessage";

const scrollToBottom = () => {
  document.getElementById("anchor")?.scrollIntoView({ behavior: "smooth" });
};

interface ChatPageProps {
  socketServerUri: string;
  restServerUri: string;
}

const ChatPage = ({ socketServerUri, restServerUri }: ChatPageProps) => {
  const [inputValue, setInputValue] = useState<string | null>("");
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const [messages, setMessages] = useState<IUIMessage[]>([]);
  const { userId, userName } = useContext(UserContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!hasInitialized && userId && userName) {
      // initialize messages
      axios
        .get(`${restServerUri}api/users/${userId}/messages`)
        .then((result) => {
          setMessages(result.data.map(mapBackendMessageToMessage));
          setTimeout(scrollToBottom, 300);
        });

      // initialize socket
      const newSocket = io(socketServerUri, {
        transports: ["websocket", "polling"],
      });
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
          _id: msg._id,
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
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <MessagesBox>
            {messages.map((message) => (
              <Message key={message._id} {...message} />
            ))}
          </MessagesBox>

          <Input
            value={inputValue}
            setValue={onInputChange}
            sendMessage={sendMessage}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      socketServerUri: process.env.SOCKETS_SERVER_URI,
      restServerUri: process.env.REST_SERVER_URI,
    },
  };
}

export default ChatPage;
