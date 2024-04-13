const { createClient } = require("redis");
const hash = require("object-hash");

let redisClient = undefined;

const initializeRedisClient = async () => {
  redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_SOCKET_HOST,
      port: process.env.REDIS_SOCKET_PORT,
    },
  }).on("error", (e) => {
    console.error(`Failed to create the Redis client with error:`);
    console.error(e);
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
    query: req.query,
    body: req.body,
  };

  return `${req.path}@${hash.sha1(reqDataToHash)}`;
};

const isRedisWorking = () => {
  return !!redisClient?.isOpen;
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

module.exports = { initializeRedisClient, redisCachingMiddleware };
