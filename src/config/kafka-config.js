const kafka_topic = process.env.KAFKA_TOPIC;
const kafka_broker_1 = process.env.KAFKA_BROKER_1;
const kafka_broker_2 = process.env.KAFKA_BROKER_2;
const kafka_broker_3 = process.env.KAFKA_BROKER_3;
const kafka_broker_4 = process.env.KAFKA_BROKER_4;

const hosts = kafka_broker_4 != 0 ?
  `${kafka_broker_1},${kafka_broker_2},${kafka_broker_3},${kafka_broker_4}` :
  `${kafka_broker_1},${kafka_broker_2},${kafka_broker_3}`;

const consumerConfig = {
  kafkaHost: hosts,
  groupId: `group-1`,
  connectTimeout: 10000,
  requestTimeout: 30000,
  idleConnection: 300000,
  reconnectOnIdle: true,
  connectRetryOptions: {
    retries: 10000000,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 60000,
    randomize: true
  },
  autoConnect: true,
  autoCommit: true,
  autoCommitIntervalMs: 5000,
  sessionTimeout: 15000,
  fetchMaxBytes: 1024 * 1024 * 100, // 100 MB
  protocol: ['roundrobin'],
  fromOffset: 'latest',
  commitOffsetsOnFirstJoin: true,
  outOfRangeOffset: 'earliest', // default
  onRebalance: (isAlreadyMember, callback) => {
    callback();
  }
};

const producerConfig = {
  kafkaHost: hosts,
  clientId: `group-1`,
  connectTimeout: 10000,
  requestTimeout: 30000,
  idleConnection: 300000,
  reconnectOnIdle: true,
  connectRetryOptions: {
    retries: 10000000,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 60000,
    randomize: true
  },
  autoConnect: true,
  onRebalance: (isAlreadyMember, callback) => {
    callback();
  }
};

const producerOptions = {
  // Configuration for when to consider a message as acknowledged, default 1
  requireAcks: 1,
  // The amount of time in milliseconds to wait for all acks before considered, default 100ms
  ackTimeoutMs: 100,
  // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
  partitionerType: 2
}

export {
  kafka_topic,
  kafka_broker_1,
  kafka_broker_2,
  kafka_broker_3,
  kafka_broker_4,
  consumerConfig,
  producerConfig,
  producerOptions,
};