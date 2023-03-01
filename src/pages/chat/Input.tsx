import { useCallback } from "react";

interface InputProps {
  value: string | null;
  setValue: (e) => void;
  sendMessage: () => void;
}

const ChatInput = ({ value, setValue, sendMessage }: InputProps) => {
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") sendMessage();
    },
    [sendMessage]
  );

  return (
    <div className="relative bg-gray-300 p-4">
      <input
        value={value}
        onChange={setValue}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Type your message…"
        className="flex items-center h-10 w-full rounded px-3 text-sm"
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
  );
};

export default ChatInput;
