import { withFilter } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'redis';

const options = {
  retryStrategy: (times) => Math.min(times * 50, 2000)
};

const pubsub = new RedisPubSub({
  publisher: Redis.createClient(options),
  subscriber: Redis.createClient(options)
});

export { pubsub, withFilter };
