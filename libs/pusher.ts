import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.app_id as string,
  key: process.env.key as string,
  secret: process.env.secret as string,
  cluster: process.env.cluster as string,
  useTLS: true,
});

export const pusherClient = new PusherClient(process.env.key as string, {
  cluster: process.env.cluster as any,
});
