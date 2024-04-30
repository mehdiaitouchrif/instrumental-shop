const { createClient } = require("redis");
const hash = require("object-hash");

let redisClient;

const initializeRedisClient = async () => {
  redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_SOCKET_HOST,
      port: process.env.REDIS_SOCKET_PORT,
    },
  });

  try {
    await redisClient.connect();
    console.log(`Connected to Redis successfully!`);
  } catch (e) {
    console.error(`Connection to Redis failed with error:`);
    console.error(e);
  }
};

const requestToKey = (req) => {
  const reqDataToHash = {
    originalUrl: req.originalUrl,
    query: req.query,
    body: req.body,
  };

  return `${reqDataToHash.originalUrl}@${hash.sha1(reqDataToHash)}`;
};

const isRedisWorking = () => {
  return !!redisClient.isOpen;
};

const writeData = async (key, data, options) => {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, data, options);
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
};

const readData = async (key) => {
  let cachedValue = undefined;

  if (isRedisWorking()) {
    cachedValue = await redisClient.get(key);
    if (cachedValue) {
      return cachedValue;
    }
  }
};

const redisCachingMiddleware =
  (
    options = {
      EX: 3600, // 1h
    }
  ) =>
  async (req, res, next) => {
    if (isRedisWorking()) {
      const key = requestToKey(req);
      console.log("cache key", key);

      const cachedValue = await readData(key);
      if (cachedValue) {
        try {
          return res.json(JSON.parse(cachedValue));
        } catch {
          return res.send(cachedValue);
        }
      } else {
        // override res.send
        const oldSend = res.send;
        res.send = function (data) {
          res.send = oldSend;

          // cache the response only if it is successful
          if (res.statusCode.toString().startsWith("2")) {
            writeData(key, data, options).then();
          }

          return res.send(data);
        };

        next();
      }
    } else {
      // proceed with no caching
      next();
    }
  };

const removeResourceCache = async (resource) => {
  if (!isRedisWorking()) {
    console.warn("Redis is not connected, cannot remove cache.");
    return;
  }

  const keys = await redisClient.keys(`*${resource}*`);
  console.log("before deleting keys", keys);

  for (const key of keys) {
    redisClient.del(key, (delErr, reply) => {
      if (delErr) {
        console.error("Error deleting key:", delErr);
      } else {
        console.log("Key deleted:", key);
      }
    });
  }

  const keysAfter = await redisClient.keys(`*${resource}*`);
  console.log("after deleting keys", keysAfter);
};

module.exports = {
  initializeRedisClient,
  redisCachingMiddleware,
  removeResourceCache,
};
