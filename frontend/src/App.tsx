import { useState } from "react";
import ChatApp from "./ChatApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinRoom from "./JoinRoom";

const App = () => {
  const [roomId, setRoomId] = useState("");
  const [isJoined, setJoined] = useState(false);
  console.log(isJoined);
  
  return (
    <div>
      <Router>
        <Routes>
          {/* Route for the chat app */}
          <Route path="/chatapp" element={<ChatApp roomId={roomId} isJoined={isJoined} />} />

          {/* Default route, either show JoinRoom or ChatApp */}
          <Route
            path="/"
            element={ <JoinRoom setRoomId={setRoomId} setJoined={setJoined} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
