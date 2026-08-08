import { createConnection, createChannel } from "./rabbitmq";
import { createKafka, createAdmin, createConsumer, createProducer, createTopic } from "./kafka";
import { createQueue, createWorker, createQueueEvents } from "./bullmq";

export default {
    createConnection,
    createChannel,
    createKafka,
    createAdmin,
    createConsumer,
    createProducer,
    createTopic,
    createQueue,
    createWorker,
    createQueueEvents,
};
export {
    createConnection,
    createChannel,
    createKafka,
    createAdmin,
    createConsumer,
    createProducer,
    createTopic,
    createQueue,
    createWorker,
    createQueueEvents,
};
