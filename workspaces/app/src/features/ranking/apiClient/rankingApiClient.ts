import type { GetRankingListRequestQuery } from '@wsh-2024/schema/src/api/rankings/GetRankingListRequestQuery';
import type { GetRankingListResponse } from '@wsh-2024/schema/src/api/rankings/GetRankingListResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type RankingApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetRankingListRequestQuery }, GetRankingListResponse];
}>;

export const rankingApiClient: RankingApiClient = {
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    query.limit !== undefined && params.append('limit', query.limit.toString());
    query.offset !== undefined && params.append('offset', query.offset.toString());

    const url = Object.keys(params).length > 0 ? `/api/v1/rankings?${params.toString()}` : '/api/v1/rankings';

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetRankingListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error())));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/rankings`,
    ...options,
  }),
};
