import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface JoinRoomProps {
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ setRoomId, setJoined }) => {
  const [inputRoomId, setInputRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (inputRoomId.trim()) {
      setRoomId(inputRoomId);  // Set the room ID to the state in the parent component
      setJoined(true);  // Update the isJoined state to true
    }
    navigate("/chatapp")
    
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">Join a Room</h1>
        <input
          type="text"
          value={inputRoomId}
          onChange={(e) => setInputRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleJoin}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
