import React, { useEffect } from "react";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8080"; // Update with your server URL

const App = () => {
  useEffect(() => {
    const connectToDefaultNamespace = () => {
      const socket = io(SOCKET_SERVER_URL);

      socket.on("connect", () => {
        console.log("Connected to default namespace");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from default namespace");
      });

      // Handle other events or logic specific to the default namespace
    };

    const createAndJoinNamespace = async () => {
      try {
        // Make a POST request to create a new namespace
        const response = await fetch(
          `${SOCKET_SERVER_URL}/api/v1/manager/create-community`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "nunuJS",
            },
            body: JSON.stringify({ communityName: "newNamespace" }),
          }
        );
        const data = await response.json();

        const { communityName } = data;
        console.log("Created namespace:", communityName);


        // Connect to the dynamically created namespace

        const socket2 = io(`${SOCKET_SERVER_URL}/${communityName}`);
        console.log("ccc", `${SOCKET_SERVER_URL}/${communityName}`)
        socket2.on("connected", (data) => {
          console.log(
            'Connected to namespace ', data);
        });



        socket2.on("disconnect", () => {
          console.log(`Disconnected from namespace ${communityName}`);
        });

        // Handle other events or logic specific to this namespace
      } catch (error) {
        console.error("Error creating/joining namespace:", error);
      }
    };

    // Connect to the default namespace
    // connectToDefaultNamespace();

    // Create and join the new namespace
    createAndJoinNamespace();

    // Clean up on unmount
    return () => {
      // You can disconnect the sockets here if needed
    };
  }, []); // Run effect only once on component mount

  return (
    <div>
      <h1>Socket.IO Client Example</h1>
      {/* Your component JSX */}
    </div>
  );
};

export default App;
