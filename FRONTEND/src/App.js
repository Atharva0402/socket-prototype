import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001")
function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("sendMessage", { message });
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      // alert(data.message);
      setMessageReceived(data.message)
    })
  })


  return (
    <div className="App">
      <input placeholder='Message...'
        onChange={(event) => {
          setMessage(event.target.value)
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h3 style={{ color: 'white' }}>Message is:</h3>
      <p style={{ color: 'white' }}>{messageReceived}</p>

    </div>
  );
}

export default App;
