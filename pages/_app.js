import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <>
        <p>Enter a username</p>
        <form>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
    <QueryClientProvider client={queryClient} username={username}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
