import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import Pusher from "pusher-js";
import { fetchFilesFromGitHub } from "../functions/fileList";
import { useQuery } from "react-query";
import { channelsForRent } from "./_app";

export default function Home(props) {
  console.log("file: index.js ~ line 9 ~ Home ~ props", props);
  const [volume, setVolume] = useState(0.5);
  const playLogRef = useRef(null);

  const { isLoading, isError, data, error, isFetching } = useQuery(
    "filesFromGitHub",
    fetchFilesFromGitHub
  );

  function appendLog(e) {
    const updatedLog = `user: ${e.username} played: ${e.url} \n channels: ${e.channels}`;
    const newElement = document.createElement("p");
    newElement.innerHTML = updatedLog;
    playLogRef.current.prepend(newElement);
  }

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "ap4",
    });
    var channel = pusher.subscribe("my-channel");

    if (props.channels.includes("global")) {
      channelsForRent.map((c) => {
        channel.bind("play-url" + "-" + c, (data) => {
          console.log("file: index.js ~ line 35 ~ channel.bind ~ data", data)
          const audio = new Audio(data.url);
          audio.volume = parseFloat(volume);
          audio.play();
          appendLog(data);
        });
      });
    } else {
      props.channels.map((c) => {
        channel.bind("play-url-" + c, (data) => {
          const audio = new Audio(data.url);
          audio.volume = parseFloat(volume);
          audio.play();
          appendLog(data);
        });
      });
    }

    return () => {
      pusher.disconnect();
    };
  }, [volume]);

  return (
    <div className={styles.container}>
      <Head>
        <title>The Sound System</title>
        <meta name="description" content="play sounds to anyone listening" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Current channels:
      <ul>
        {props.channels.map((c, i) => {
          return <li key={i}>{c}</li>;
        })}
      </ul>
      <label htmlFor="volume">Volume</label>
      <input
        step="0.1"
        type="range"
        value={volume}
        onChange={(e) => {
          console.log(e);
          setVolume(e.target.value);
        }}
        id="volume"
        name="volume"
        min="0"
        max="1"
      />
      {isError && <span>Error: {error.message}</span>}
      {!isLoading && (
        <div className="soundboard">
          {data.map((file, i) => {
            const name = file
              .replace("/mp3/", "")
              .replace(".mp3", "")
              .replace(/-/g, " ");
            return (
              <PlayButton
                key={i}
                name={name}
                path={file}
                username={props.username}
                channels={props.channels}
              />
            );
          })}
        </div>
      )}
      {isFetching ? <span>Refreshing...</span> : null}
      {isLoading && <span>Loading...</span>}
      <div className="playlog" ref={playLogRef}></div>
    </div>
  );
}

const PlayButton = ({ name, path, username, channels }) => {
  const onClick = async () => {
    await fetch("/api/play-url", {
      method: "POST",
      body: JSON.stringify({ url: path, username, channels }),
    });
  };
  return (
    <button className="soundboard--button" onClick={onClick}>
      {name}
    </button>
  );
};
