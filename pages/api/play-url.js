// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as PusherPush from "pusher";

export default async function handler(req, res) {
  const pusherPush = new PusherPush({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap4",
  });

  const body = JSON.parse(req.body);

  // if global we only want to push to global
  if (body.channels.includes("global")) {
    await pusherPush.trigger("my-channel", "play-url-global", {
      url: body.url,
      username: body.username,
      channels: body.channels,
    });
  } else {
    await Promise.all(
      body.channels.map((c) => {
        return pusherPush.trigger("my-channel", "play-url-" + c, {
          url: body.url,
          username: body.username,
          channels: body.channels,
        });
      })
    );
  }

  res.status(200).json();
}
