import React, { useState } from "react";
import { VscSend } from "react-icons/vsc";

const ChatInput = ({ sendMessage }) => {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    sendMessage(question);
    setQuestion("");
  };

  return (
    <div className="md:w-1/2 flex  mx-auto rounded-lg gap-2">
      <input
        className="w-full bg-gray-400-300 rounded-lg hover:border"  
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="hover:border box-content rounded-lg text-white p-2" onClick={handleSend}><VscSend /></button>
      {/* <button onClick={handleSend}><VscSend /></button> */}
    </div>
  );
};

export default ChatInput;
