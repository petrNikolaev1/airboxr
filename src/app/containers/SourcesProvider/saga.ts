import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SourcesService } from 'services/sources';

export function* getSources() {
  const { err, res } = yield call(SourcesService.getSources);

  if (err) {
    yield put(actions.sourcesError(err));
  } else {
    yield put(actions.sourcesLoaded(res));
  }
}

export function* sourcesProviderSaga() {
  yield takeLatest(actions.sources.type, getSources);
}
