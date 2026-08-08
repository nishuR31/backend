import { Kafka, Producer, Consumer, Admin, ConsumerRunConfig } from "kafkajs";

interface KafkaConfig {
    clientId: string;
    brokers: string[];
}

interface ProducerConfig {
    kafka: Kafka;
}

interface ConsumerConfig {
    kafka: Kafka;
    groupId: string;
}

interface TopicConfig {
    admin: Admin;
    topic: string;
    partitions?: number;
}

interface PublishConfig<T = unknown> {
    producer: Producer;
    topic: string;
    message: T;
}

interface SubscribeConfig {
    consumer: Consumer;
    topic: string;
    fromBeginning?: boolean;
    config?: ConsumerRunConfig;
}

export const createKafka = ({ clientId, brokers }: KafkaConfig) => {
    return new Kafka({
        clientId,
        brokers,
    });
};

export const createProducer = async ({ kafka }: ProducerConfig): Promise<Producer> => {
    const producer = kafka.producer();

    await producer.connect();

    return producer;
};

export const createConsumer = async ({ kafka, groupId }: ConsumerConfig): Promise<Consumer> => {
    const consumer = kafka.consumer({
        groupId,
    });

    await consumer.connect();

    return consumer;
};

export const createAdmin = async (kafka: Kafka): Promise<Admin> => {
    const admin = kafka.admin();

    await admin.connect();

    return admin;
};

export const createTopic = async ({ admin, topic, partitions = 1 }: TopicConfig) => {
    return admin.createTopics({
        topics: [
            {
                topic,
                numPartitions: partitions,
            },
        ],
    });
};

export const publish = async <T>({ producer, topic, message }: PublishConfig<T>) => {
    return producer.send({
        topic,
        messages: [
            {
                value: JSON.stringify(message),
            },
        ],
    });
};

export const subscribe = async ({
    consumer,
    topic,
    fromBeginning = false,
    config,
}: SubscribeConfig) => {
    await consumer.subscribe({
        topic,
        fromBeginning,
    });

    return consumer.run(
        config ?? {
            eachMessage: async ({ message }: { message: any }) => {
                console.log(message.value?.toString());
            },
        },
    );
};

export { Kafka, Producer, Consumer, Admin };
