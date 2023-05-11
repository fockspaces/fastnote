import cache from "../utils/cache.js";

// rate limiting
export const createRateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `ratelimiter:${ip}`;
  const existing = await cache.get(key, true);
  const maximun_requests = 3;
  const time_window = 60;

  if (existing) {
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
