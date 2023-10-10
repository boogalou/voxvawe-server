import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";
import "dotenv/config";

@Injectable()
export class RedisService {
  private readonly redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` });
    this.connectToRedis();
  }

  async connectToRedis() {
    try {
      await this.redisClient.connect();
      console.log("Connected to Redis");
    } catch (error) {
      console.error("Error connecting to Redis:", error);
    }
  }

  getClient() {
    return this.redisClient;
  }

}
