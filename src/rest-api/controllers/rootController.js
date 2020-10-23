import * as config from '../../config/kafka-config';

const rootList = async (req, res) => {
  let data = {
    name: `Message-${Math.round((new Date()).getTime() / 1000)}`,
  }
  console.log('\ndata', data);
  await req.kafkaProducer.send(data, config.kafka_topic);
  res.sendStatus(200);
}

export {
  rootList
}