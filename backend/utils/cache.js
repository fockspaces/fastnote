import { createClient } from "redis";

const isProduction = process.env.NODE_ENV === "production";
const redisHost = isProduction ? process.env.AWS_ELASTIC_CACHE : "localhost";
const expirteTime = 60;

const createRedisClient = async () => {
  const client = createClient({
    url: `redis://${redisHost}:6379`,
  });

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();

  return client;
};

const set = async (key, value, options) => {
  try {
    const client = await createRedisClient();
    const result = await client.set(key, JSON.stringify(value), options);
    await client.disconnect();
    return result;
  } catch (error) {
    console.error("Error in set function:", error);
    return null;
  }
};

const get = async (key) => {
  try {
    const client = await createRedisClient();
    const value = await client.get(key);
    if (value) {
      await client.expire(key, expirteTime);
    }
    await client.disconnect();
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error in get function:", error);
    return null;
  }
};

export default {
  set,
  get,
};
