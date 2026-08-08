import amqp, { Channel, Connection, ConsumeMessage, Options } from "amqplib";

interface RabbitMQConfig {
    url: string;
}

interface QueueConfig {
    channel: Channel;
    name?: string;
    options?: Options.AssertQueue;
}

interface ProducerConfig<T = unknown> {
    channel: Channel;
    queueName?: string;
    message: T;
    options?: Options.Publish;
}

interface ConsumerConfig {
    channel: Channel;
    queueName?: string;
    processor: (message: ConsumeMessage, channel: Channel) => Promise<void> | void;
    options?: Options.Consume;
}

export const createConnection = async ({ url }: RabbitMQConfig): Promise<Connection> => {
    return amqp.connect(url);
};

export const createChannel = async (connection: Connection): Promise<Channel> => {
    return connection.createChannel();
};

export const createQueue = async ({ channel, name = "default", options }: QueueConfig) => {
    return channel.assertQueue(name, options);
};

export const publish = <T>({
    channel,
    queueName = "default",
    message,
    options,
}: ProducerConfig<T>) => {
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), options);
};

export const consume = async ({
    channel,
    queueName = "default",
    processor,
    options,
}: ConsumerConfig) => {
    return channel.consume(
        queueName,
        async (msg: string) => {
            if (!msg) return;

            try {
                await processor(msg, channel);
                channel.ack(msg);
            } catch (err) {
                channel.nack(msg);
            }
        },
        options,
    );
};

export { Channel, Connection, ConsumeMessage };
