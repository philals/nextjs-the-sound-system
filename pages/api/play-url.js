// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as PusherPush from "pusher";

export default async function handler(req, res) {
  const pusherPush = new PusherPush({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret:  process.env.PUSHER_SECRET,
    cluster: "ap4"
  });


  const playUrlResult = await pusherPush.trigger("my-channel", "play-url", {
    url: JSON.parse(req.body).url,
    username: JSON.parse(req.body).username,
  });

  res.status(200).json(playUrlResult);
}
