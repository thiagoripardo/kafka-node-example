import {
  KafkaClient,
  Producer,
} from 'kafka-node';
import * as config from '../config/kafka-config';

const client = new KafkaClient(config.producerConfig);
const producer = new Producer(client, config.producerOptions);

const init = async () => {
  try {
    producer.on('ready', async () => {
      console.log('Kafka Producer is ready');
    });
    producer.on('error', (err) => {
      console.error('Kafka Producer connection errored');
    });
  } catch (err) {
    console.error(err);
  }
}

const send = async (data, topic) => {
  try {
    let payload = [{
      topic: topic,
      messages: [
        JSON.stringify(data)
      ]
    }];

    producer.send(payload, (err, data) => {
      if (err) {
        console.error('[kafka-producer -> ' + topic + ']: broker failed');
      } else {
        console.log('[kafka-producer -> ' + topic + ']: broker success');
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export {
  init,
  send,
}