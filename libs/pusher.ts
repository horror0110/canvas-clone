import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1780972",
  key: "57fc55db70df3392bb38",
  secret: "933db9e12eba9337eeef",
  cluster: "us2",
  useTLS: true,
});

export const pusherClient = new PusherClient("1780972", {
  cluster: "us2" as any,
});
