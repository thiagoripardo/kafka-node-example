import {
  ConsumerGroup
} from 'kafka-node';
import * as config from '../config/kafka-config';

export default async () => {
  try {
    let consumer = new ConsumerGroup(config.consumerConfig,
      [
        config.kafka_topic,
      ]
    );

    consumer.on('message', async function (response) {
      console.log('\nMessage received in consumer');
      try {
        console.log('response', response);
      } catch (err) {
        console.error(err);
      }

    });

    consumer.on('error', function (err) {
      console.error('error', err);
    });
  } catch (e) {
    console.error(e);
  }
}