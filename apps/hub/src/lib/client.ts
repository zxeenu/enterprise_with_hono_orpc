import { router } from '@enterprise/api/src/main';
import { createORPCClient, onError } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import { RouterClient } from '@orpc/server';
import { createTanstackQueryUtils } from '@orpc/tanstack-query';

const link = new RPCLink({
  url: 'http://localhost:3000/rpc',
  headers: () => ({
    authorization: 'Bearer token',
  }),
  // fetch: <-- provide fetch polyfill fetch if needed
  interceptors: [
    onError((error) => {
      if (error instanceof DOMException) {
        // console.error('Network or fetch error:', error.message);
        return;
      }

      console.error(error);
    }),
  ],
});

export const client: RouterClient<typeof router> = createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
