import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);

  const [text] = useTypewriter({
    words: ["Financial Insights","AI-Powered Finance","Smart Budgeting",],
    loop: {},
    typeSpeed: 120,
  });

  const sendMessage = async (question) => {
    if (question.trim()) {
      setMessages([...messages, { sender: "user", text: question }]);

      try {
        const { data } = await axios.get("/api/users/", {
          params: { question },
        });
        // setAns(data.result);
        console.log(data.result);
        setTimeout(() => {
          if (!data.result) {
            setMessages((prev) => [
              ...prev,
              { sender: "bot", text: "server is busy! try later " },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              { sender: "bot", text: data.result },
            ]);
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="md:w-3/4 flex justify-center flex-col items-center h-full ">
        <div className=" h-[80%] rounded-lg border p-2 fixed bottom-10 border-slate-500 md:w-3/4 w-[90%]">
          
          <h2 className="md:text-4xl text-3xl text-center md:p-3 p-2 rounded-lg font-bold mb-2 bg-fuchsia-500  text-white">
            {text}
            <span className="text-red-600">
              <Cursor cursorStyle="$" />
            </span>
          </h2>
          <div className=" md:h-3/4 h-[85%] overflow-y-auto">
            {messages.map((msg, index) => (
              <MessageBubble key={index} sender={msg.sender} text={msg.text} />
            ))}
          </div>
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
