import { createClient } from "redis";

const isProduction = process.env.NODE_ENV === "production";
const redisHost = isProduction ? process.env.AWS_ELASTIC_CACHE : "localhost";
const expireTime = 86400;

let client = null;

const createRedisClient = async () => {
  if (client) return client;

  client = createClient({
    url: `redis://${redisHost}:6379`,
  });

  client.on("error", (err) => {
    console.error("Redis Client Error", err.message);
    client.disconnect(); // Close the connection to avoid reconnecting
    client = null;
  });

  try {
    await client.connect();
    return client;
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
    return null;
  }
};

const set = async (key, value, options = {}) => {
  try {
    const client = await createRedisClient();
    if (!client) return null;

    const result = await client.set(key, JSON.stringify(value), options);
    return result;
  } catch (error) {
    console.error("Error in set function:", error.message);
    return null;
  }
};

const get = async (key) => {
  try {
    const client = await createRedisClient();
    if (!client) return null;

    const value = await client.get(key);
    if (value) {
      await client.expire(key, expireTime);
    }
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error in get function:", error.message);
    return null;
  }
};

const del = async (key) => {
  try {
    const client = await createRedisClient();
    if (!client) return null;

    const result = await client.del(key);
    return result;
  } catch (error) {
    console.error("Error in del function:", error.message);
    return null;
  }
};

export default {
  set,
  get,
  del,
};
