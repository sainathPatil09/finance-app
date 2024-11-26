import React from "react";

const MessageBubble = ({ sender, text }) => {
  const isBot = sender === "bot";
  return (
    // <div className={`message-bubble ${isBot ? "bot" : "user"}`}>
    //   {text}
    // </div>

    <div className={`chat  ${isBot ? "chat-start w-1/2" : "chat-end"}`}>
      <div className={`chat-bubble text-white shadow-lg shadow-gray-700 border bg-transparent  ${isBot ? "chat-bubble-primary" : "chat-bubble-success"}`}>
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
