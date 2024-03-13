import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:8080/'; // Change this to your Socket.IO server URL

const App = () => {
  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io(SOCKET_SERVER_URL);

    try{
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
  }
  catch(err){
    console.log(err);
  }
    // Listen for custom events and log them to the console
    socket.on('some-event', (data) => {
      console.log('Received some-event:', data);
    });

    // Listen for 'disconnect' event
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Run effect only once on component mount

  return (
    <div>
      <h1>Socket.IO Console Logger</h1>
      {/* Your component JSX */}
    </div>
  );
};

export default App;