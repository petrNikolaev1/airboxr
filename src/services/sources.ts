import request, { requestMiddleware } from 'utils/request';

export const SourcesService = {
  getSources: requestMiddleware(() => request.get('data/dataStores')),
};
