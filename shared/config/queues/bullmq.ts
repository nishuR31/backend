import { Queue, Worker, QueueEvents, Processor, QueueOptions, WorkerOptions } from "bullmq";
import Redis from "ioredis";

interface CreateQueueOptions {
    name?: string;
    redis: Redis;
    opts?: Omit<QueueOptions, "connection">;
}

interface CreateWorkerOptions {
    queueName?: string;
    redis: Redis;
    processor: Processor;
    opts?: Omit<WorkerOptions, "connection">;
}

export const createQueue = ({ name = "default", redis, opts }: CreateQueueOptions) => {
    return new Queue(name, {
        connection: redis,
        ...opts,
    });
};

export const createWorker = ({
    queueName = "default",
    redis,
    processor,
    opts,
}: CreateWorkerOptions) => {
    return new Worker(queueName, processor, {
        connection: redis,
        ...opts,
    });
};

export const createQueueEvents = ({
    queueName = "default",
    redis,
}: {
    queueName?: string;
    redis: Redis;
}) => {
    return new QueueEvents(queueName, {
        connection: redis,
    });
};

export { Queue, Worker, QueueEvents };
