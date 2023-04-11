import {
  provideApolloClient,
  useMutation,
} from "@vue/apollo-composable";
import apolloClient from "src/apollo/apollo-client";
import { createQueue } from "src/api/main/mutations";
import Cookies from "js-cookie";
import Client from "src/rabbitmq/client";

provideApolloClient(apolloClient);

const { mutate: creatingQueue } = useMutation(createQueue);

const queueCreate = async () => {
  const { data: createdQueue } = await creatingQueue();

  Cookies.set("queue", createdQueue.notificationSubscribe.hash);

  return createdQueue;
};

const stompConnect = () => {
  const queue = Cookies.get("queue");

  const onConnect = async () => {
    console.log("connected");

    let onMessage = (message) => {
      const messageObj = JSON.parse(message.body);

      console.log("Receive message:", messageObj);

      message.ack();
    };

    Client.subscribe(`/amq/queue/${queue}`, onMessage, { ack: "client" });
  };

  const onError = (msg) => {
    console.log("Error", msg);
  };

  const onClose = (msg) => {
    console.log("Close", msg);
  };

  stompClient.connect(
    "readonly",
    "@3P^Lgdab)sv",
    onConnect,
    onError,
    "/",
    onClose
  );
};

const stompApi = { queueCreate, stompConnect };

export default stompApi;
