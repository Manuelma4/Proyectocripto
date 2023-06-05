
var amqp = require('amqplib/callback_api');
import { cuenta_url } from './tiendaun/server';

export class RabbitSender {
  constructor(queue, message) {
    this.msg = message;
    this.queue = queue;
    this.connection;
    this.process;
  }

  async send() {
    amqp.connect('amqp://' + cuenta_url, (error0, connection) => {
      if (error0) {
        throw error0;
      }
      this.connection = connection;
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        let queue = this.queue;
        let msg = this.msg;

        channel.assertQueue(queue, {
          durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
    });
  }

  close() {
    if (this.connection) {
      this.connection.close();
    }
    //process.exit(0);
  }
}