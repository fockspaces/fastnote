import { createClient } from "redis";

const isProduction = process.env.NODE_ENV === "production";
const redisHost = isProduction
  ? process.env.AWS_ELASTIC_CACHE
  : "localhost:6379";
const expireTime = 86400;

let client = null;

const createRedisClient = async () => {
  if (client) return client;

  client = createClient({
    url: `redis://${redisHost}`,
  });

  client.on("error", (err) => {
    console.error("Redis Client Error: ", err.message);
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
    if (!client) return false;

    const result = await client.set(key, JSON.stringify(value), options);
    return result;
  } catch (error) {
    console.error("Error in set function:", error.message);
    return false;
  }
};

const get = async (key, notRefresh) => {
  try {
    const client = await createRedisClient();
    if (!client) return false;

    const value = await client.get(key);
    if (value && !notRefresh) {
      await client.expire(key, expireTime);
    }
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error in get function:", error.message);
    return false;
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

const flushPop = async (userId) => {
  // invalidate three cases for favorite, trash and default
  const baseCases = ["trash", "favorite", "default"];
  for (const caseSuffix of baseCases) {
    await del(`documents:${userId}:${caseSuffix}`);
  }
};

export default {
  set,
  get,
  del,
  flushPop,
};
