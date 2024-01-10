import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const produceMessage = async ({ message, roomId, from, time }) => {
    await producer.connect();
    await producer.send({
        topic: 'kafka-chat',
        messages: [{ value: JSON.stringify({ message, roomId, from, time }) }],
    });
    console.log('Message sent successfully', { message, roomId, from, time });
    await producer.disconnect(); // 메시지 전송 후 연결 해제
};

export default produceMessage;
