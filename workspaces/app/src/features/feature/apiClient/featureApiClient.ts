import type { GetFeatureListRequestQuery } from '@wsh-2024/schema/src/api/features/GetFeatureListRequestQuery';
import type { GetFeatureListResponse } from '@wsh-2024/schema/src/api/features/GetFeatureListResponse';

import type { DomainSpecificApiClientInterface } from '../../../lib/api/DomainSpecificApiClientInterface';

type FeatureApiClient = DomainSpecificApiClientInterface<{
  fetchList: [{ query: GetFeatureListRequestQuery }, GetFeatureListResponse];
}>;

export const featureApiClient: FeatureApiClient = {
  fetchList: async ({ query }) => {
    const params = new URLSearchParams();
    query.limit !== undefined && params.append('limit', query.limit.toString());
    query.offset !== undefined && params.append('offset', query.offset.toString());

    const url = Object.keys(params).length > 0 ? `/api/v1/features?${params.toString()}` : '/api/v1/features';

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    }).then<GetFeatureListResponse>((res) => (res.ok ? res.json() : Promise.reject(new Error())));
    return response;
  },
  fetchList$$key: (options) => ({
    requestUrl: `/api/v1/features`,
    ...options,
  }),
};
