const { redis } = Bun;

class Cache {
  async get<T>(key: string): Promise<T | null> {
    //@ts-expect-error
    return await redis.get(key);
  }

  async setex(key: string, seconds: number, data: unknown) {
    return await redis.setex(key, seconds, JSON.stringify(data));
  }

  async getdel(key: string) {
    return await redis.getdel(key);
  }
}

export const cache = new Cache();