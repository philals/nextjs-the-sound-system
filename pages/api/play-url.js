// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as PusherPush from "pusher";

export default async function handler(req, res) {
  const pusherPush = new PusherPush({
    appId: "1285786",
    key: "e8fb826764d9c03dee0b",
    secret: "d1ec5c46955d6dabcf38",
    cluster: "ap4"
  });

console.log("req.body:",JSON.parse(req.body).url)

  const playUrlResult = await pusherPush.trigger("my-channel", "play-url", {
    url: JSON.parse(req.body).url
  });

  console.log("playUrlResult: ", playUrlResult);
  console.log("ressult: ", result);
  res.status(200).json(result);
}
