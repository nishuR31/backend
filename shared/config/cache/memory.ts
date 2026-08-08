type MemoryClient = Map<string, any>;
type MemoryTimeClient = Map<string, any>;

const memoryClient = (): MemoryClient => new Map<string, any>();
const memoryTimeClient = (): MemoryTimeClient => new Map<string, any>();

export { memoryClient, memoryTimeClient };
