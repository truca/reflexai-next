import React from "react";

interface MessagesBoxProps {
  children: any;
}

export default function MessagesBox({ children }: MessagesBoxProps) {
  return (
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      {children}
      <div id="anchor" />
    </div>
  );
}
