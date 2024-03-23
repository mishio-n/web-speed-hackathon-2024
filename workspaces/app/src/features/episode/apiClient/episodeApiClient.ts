import { inject } from 'regexparam';

import type { GetEpisodeListRequestQuery } from '@wsh-2024/schema/src/api/episodes/GetEpisodeListRequestQuery';
import type { GetEpisodeListResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeListResponse';
import type { GetEpisodeRequestParams } from '@wsh-2024/schema/src/api/episodes/GetEpisodeRequestParams';
import type { GetEpisodeResponse } from '@wsh-2024/schema/src/api/episodes/GetEpisodeResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type EpisodeApiClient = DomainSpecificApiClientInterface<{
  fetch: [{ params: GetEpisodeRequestParams }, GetEpisodeResponse];
  fetchList: [{ query: GetEpisodeListRequestQuery }, GetEpisodeListResponse];
}>;

export const episodeApiClient: EpisodeApiClient = {
  fetch: async ({ params }) => {
    const response = await fetch(inject('/api/v1/episodes/:episodeId', params), {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetEpisodeResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error())));
    return response;
  },
  fetch$$key: (options) => ({
    requestUrl: `/api/v1/episodes/:episodeId`,
    ...options,
  }),
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    query.limit !== undefined && params.append('limit', query.limit.toString());
    query.offset !== undefined && params.append('offset', query.offset.toString());
    query.bookId !== undefined && params.append('bookId', query.bookId);

    const url = Object.keys(params).length > 0 ? `/api/v1/episodes?${params.toString()}` : '/api/v1/episodes';

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetEpisodeListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error())));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/episodes`,
    ...options,
  }),
};
