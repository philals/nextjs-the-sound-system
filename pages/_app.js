import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const [selectedChannels, setSelectedChanngels] = useState(["global"]);
  const [ready, setReady] = useState(false);

  const channelsForRent = ["global", "TV1", "Trackside", "Sky 1", "Fox News"];

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
          <p>Select Channels:</p>

          {channelsForRent.map((channel, i) => {
            return (
              <div key={i}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (selectedChannels.includes(e.target.value)) {
                      setSelectedChanngels([]);
                    } else {
                      setSelectedChanngels([e.target.value]);
                    }
                  }}
                  checked={selectedChannels.includes(channel)}
                  id={channel}
                  name={channel}
                  value={channel}
                />
                <label htmlFor={channel}>{channel}</label>
              </div>
            );
          })}

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
    <QueryClientProvider client={queryClient}>
      <Component
        {...pageProps}
        username={username}
        channels={selectedChannels}
      />
    </QueryClientProvider>
  );
}

export default MyApp;
