import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import GitHubForkRibbon from "react-github-fork-ribbon";

const queryClient = new QueryClient();
export const channelsForRent = [
  "global",
  "TV1",
  "Trackside",
  "Sky-1",
  "Fox-News",
]; // some conventions: https://pusher.com/docs/channels/using_channels/channels/#channel-naming-conventions

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const [selectedChannels, setSelectedChanngels] = useState(["global"]);
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
          <p>Select Channels:</p>

          {channelsForRent.map((channel, i) => {
            return (
              <div key={i}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    console.log("selectedChannels", selectedChannels);
                    if (selectedChannels.includes(e.target.value)) {
                      const newArray = selectedChannels.filter(
                        (c) => c !== e.target.value
                      );
                      setSelectedChanngels(newArray);
                    } else {
                      const newArray = [...selectedChannels];
                      newArray.push(e.target.value);
                      setSelectedChanngels(newArray);
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
                alert("enter a name plz");
                return;
              }
              if (selectedChannels.length === 0) {
                alert("enter choose a channel");
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
      <GitHubForkRibbon
        href="https://github.com/philals/nextjs-the-sound-system/tree/main/public/mp3"
        target="_blank"
        position="right"
      >
        Github</GitHubForkRibbon>
      <Component
        {...pageProps}
        username={username}
        channels={selectedChannels}
      />
    </QueryClientProvider>
  );
}

export default MyApp;
