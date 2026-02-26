
export class RedisClient {
    private client;

    constructor() {
        if (!RedisClient.instance) {
            RedisClient.instance = this;
            this.client = createClient({ url: "redis://localhost:6379" });
        }
        return RedisClient.instance;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("Connected to Redis");
        } catch (error) {
            console.error("Error connecting to Redis:", error);
        }
    }

    async set(key, value) {
        await this.client.set(key, value);
    }

    async get(key) {
        return await this.client.get(key);
    }

    async del(key) {
        await this.client.del(key);
    }

    async exists(key) {
        return await this.client.exists(key);
    }   
}