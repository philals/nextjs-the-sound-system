import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("global");
  const [ready, setReady] = useState(false);
  
  if (!ready) {
    return (
      <>
        <form>
        <p>Enter a username</p>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
          />
        <p>Enter a room</p>
          <input
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            type="text"
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (username.length === 0) {
                alert("enter something plz");
                return;
              }
              setReady(true);
            }}
          >
            Go
          </button>
        </form>
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient} >
      <Component {...pageProps} username={username} room={room}/>
    </QueryClientProvider>
  );
}

export default MyApp;
