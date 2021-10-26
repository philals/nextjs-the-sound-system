import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Pusher from "pusher-js";
import { fetchFilesFromGitHub } from "../functions/fileList";
import { useQuery } from "react-query";

export default function Home() {
  const [volume, setVolume] = useState(0.5);

  const { isLoading, isError, data, error } = useQuery(
    "filesFromGitHub",
    fetchFilesFromGitHub
  );

  useEffect(() => {
    var pusher = new Pusher("e8fb826764d9c03dee0b", {
      cluster: "ap4",
    });
    var channel = pusher.subscribe("my-channel");

    channel.bind("play-url", (data) => {
      const audio = new Audio(data.url);
      audio.volume = parseFloat(volume);
      audio.play();
    });
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>The Sound System</title>
        <meta name="description" content="play sounds to anyone listening" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
      <div className="soundboard">
      {data.map((file, i) => {
        return (
          <PlayButton
            key={i}
            name={file.replace("/mp3/", "").replace(".mp3", "").replace("-", " ")}
            path={file}
          />
        );
      })}
      </div>
    </div>
  );
}

const PlayButton = ({ name, path }) => {
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/play-url", {
          method: "POST",
          body: JSON.stringify({ url: path }),
        });
      }}
    >
      {name}
    </button>
  );
};
