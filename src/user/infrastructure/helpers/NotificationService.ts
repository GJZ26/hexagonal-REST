import amqplib from "amqplib";
import NotificationInterface from "../../application/services/NotificationInterface";
import dotenv from 'dotenv'

export default class NotificationService implements NotificationInterface {
  currentConnection: amqplib.Connection | undefined;

  provideChannel: amqplib.Channel | undefined;
  provideChannelName: string = "Notify";

  async init(): Promise<boolean> {
    try {
      this.currentConnection = await amqplib.connect(process.env["BROKER_URI"] ?? "");
      this.provideChannel = await this.currentConnection.createChannel();
      await this.provideChannel.assertQueue(this.provideChannelName);
      return true;
    } catch (e) {
      return false;
    }
  }

  sendNotification(message: string): string {
    if (this.provideChannel === undefined) {
      return "Canal no disponible.";
    }

    this.provideChannel.sendToQueue(
      this.provideChannelName,
      Buffer.from(message)
    );

    return "¡Notificación enviada!";
  }
}
