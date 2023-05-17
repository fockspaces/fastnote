import cache from "../utils/cache.js";

// rate limiting
export const createRateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `ratelimiter:${ip}`;
  const existing = await cache.get(key, true);
  const maximun_requests = 50;
  const time_window = 1;

  if (existing === false) {
    console.log("redis is not responding");
    return LocalRateLimiter(req, res, next);
  }

  if (existing !== null) {
    const count = JSON.parse(existing);
    console.log({ count, ip });

    if (count >= maximun_requests) {
      // exceed limit
      return res.status(429).send("Too many requests, please try again later.");
    }
    // not exceed limit yet, add count
    await cache.set(key, JSON.stringify(count + 1), {
      EX: time_window,
    });
    return next();
  }

  // create new limit window
  await cache.set(key, JSON.stringify(1), {
    EX: time_window,
  });

  next();
};

// Create an in-memory storage for rate limiting counts.
let rateLimitCounts = {};

const LocalRateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `ratelimiter:${ip}`;
  const maximun_requests = 60;
  const time_window = 60;
  if (rateLimitCounts[key]) {
    const count = rateLimitCounts[key];
    console.log({ count, ip });

    if (rateLimitCounts[key] >= maximun_requests) {
      return res.status(429).send("Too many requests, please try again later.");
    }
    rateLimitCounts[key]++;
    return next();
  }

  rateLimitCounts[key] = 1;
  // Optionally, you could add a timeout to delete the key after the time window.
  setTimeout(() => {
    delete rateLimitCounts[key];
  }, time_window * 1000);

  next();
};
