import { useEffect, useState, useRef } from "react";

const ChatApp = ({ roomId }: any) => {
  const [messages, setMessages] = useState<{ text: string; isSent: boolean }[]>([]);
  const [message, setMessage] = useState<string>("");
  const ws: any = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Set up WebSocket connection on component mount
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.current.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );
    };

    ws.current.onmessage = (event: { data: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: event.data, isSent: false },
      ]);
    };

    ws.current.onerror = (error: any) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.current.close();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      ws.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isSent: true },
      ]);
      setMessage("");
    }
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl flex flex-col h-full">
        {/* Messages display */}
        <div className="flex-1 overflow-y-auto space-y-2 p-4 border-b border-gray-300">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-5 w-60 rounded-lg shadow-sm flex ${
                msg.isSent
                  ? "bg-blue-500 text-white self-end ml-auto "
                  : "bg-gray-200 text-black self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Scroll to this div */}
        </div>

        {/* Message input section */}
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-4 p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;