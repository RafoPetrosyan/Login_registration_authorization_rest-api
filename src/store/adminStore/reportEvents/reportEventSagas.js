import { call, put, takeEvery } from 'redux-saga/effects';
import { APPROVE_REPORT_EVENT, GET_REPORT_EVENTS, setReportEvents } from './reportEventActions';
import { approveReportEvent, getReportsEvents } from './reportEventApi';


function* workerGetReportEvents(action){
    try {
      const { dataCount, reportEvents } = yield call(getReportsEvents, action.payload);
      yield put(setReportEvents({dataCount, reportEvents}))
    } catch (error) {
        console.log(error);
    }
}

function* worketApproveReportEvent(action){
   
    try {
        // yield call(approveReportEvent, action.payload)
    } catch (error) {
        console.log(error);
    }
}

export function* watcherAdminReportEvents() {
    yield takeEvery(GET_REPORT_EVENTS, workerGetReportEvents)
    yield takeEvery(APPROVE_REPORT_EVENT, worketApproveReportEvent)
}