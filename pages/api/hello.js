// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as PusherPush from "pusher";

export default async function handler(req, res) {
  const pusherPush = new PusherPush({
    appId: "1285786",
    key: "e8fb826764d9c03dee0b",
    secret: "d1ec5c46955d6dabcf38",
    cluster: "ap4"
  });
  const ressult = await pusherPush.trigger("my-channel", "my-event", {
    message: "hello world"
  });
  console.log("ressult: ", ressult);
  res.status(200).json(ressult);
}
