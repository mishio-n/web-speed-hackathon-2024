import { inject } from 'regexparam';

import type { GetBookListRequestQuery } from '@wsh-2024/schema/src/api/books/GetBookListRequestQuery';
import type { GetBookListResponse } from '@wsh-2024/schema/src/api/books/GetBookListResponse';
import type { GetBookRequestParams } from '@wsh-2024/schema/src/api/books/GetBookRequestParams';
import type { GetBookResponse } from '@wsh-2024/schema/src/api/books/GetBookResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type BookApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetBookRequestParams }, GetBookResponse];
  fetchList: [{ query: GetBookListRequestQuery }, GetBookListResponse];
}>;

export const bookApiClient: BookApiClient = {
  fetch: async ({ params }) => {
    const response = await fetch(inject('/api/v1/books/:bookId', params), {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetBookResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error())));
    return response;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/books/:bookId`,
    ...options,
  }),
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    query.limit !== undefined && params.append('limit', query.limit.toString());
    query.offset !== undefined && params.append('offset', query.offset.toString());
    query.name !== undefined && params.append('name', query.name);
    query.authorId !== undefined && params.append('authorId', query.authorId);
    query.authorName !== undefined && params.append('authorName', query.authorName);

    const url = Object.keys(params).length > 0 ? `/api/v1/books?${params.toString()}` : '/api/v1/books';
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetBookListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error())));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/books`,
    ...options,
  }),
};
