// utils/consumer.js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'kafka' });

const consumeMessages = async (callback) => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'kafka-chat', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const obj = JSON.parse(message.value);
            callback(obj);
        },
    });
};

module.exports = consumeMessages;
