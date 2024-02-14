import amqplib from "amqplib";

export default interface NotificationInterface {
  currentConnection: amqplib.Connection | undefined;

  provideChannel: amqplib.Channel | undefined;
  provideChannelName: string;

  init(): Promise<boolean>;
  sendNotification(message: string): string;
}
