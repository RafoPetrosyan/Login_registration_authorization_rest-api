import { times } from 'lodash';
import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    ADD_EVENT, 
    getCurrent, 
    GET_CURRENT_ADMIN, 
    GET_EVENTS,
    GET_EDITE_EVENT,
    logauth,
    LOGAUTH_ADMIN, 
    LOGIN_ADMIN,
    setCurrent, 
    setEvents,
    setEditeEvent
} from './actions';
import { currentAdmin, events, getEditeEvent, loginAdmin } from './api';



function* workerLogin(action) {
    try {
        const { token } = yield call(loginAdmin, action.payload)
        localStorage.setItem('accessToken', token)

        yield put(getCurrent())

    } catch (error) {
        console.log(error);
    }
}

function* workerLogauth() {
    localStorage.removeItem('accessToken');
    yield put(setCurrent(null))
}

function* workerGetCurrent(){
    try {
        const { user } = yield call(currentAdmin)
        yield put(setCurrent(user));

    } catch (error) {
        yield put(logauth())
    }
}

function* workerGetEvents(action) {
    try {
        const { eventList, dataCount } = yield call(events, action.payload);
        yield put(setEvents({eventList, dataCount}))

    } catch (error) {
        console.log(error);
    }
}

function* workerAddEvent(action) {
    console.log(action.payload, 'dffd');
   
}

function* workerEditeEvents(action){
    try {
        const { eventData } = yield call(getEditeEvent, action.payload);
        yield put(setEditeEvent(eventData));
        
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdmin() {
    yield takeEvery(LOGIN_ADMIN, workerLogin)
    yield takeEvery(LOGAUTH_ADMIN, workerLogauth)
    yield takeEvery(GET_CURRENT_ADMIN, workerGetCurrent)
    yield takeEvery(GET_EVENTS, workerGetEvents)
    yield takeEvery(ADD_EVENT, workerAddEvent)
    yield takeEvery(GET_EDITE_EVENT, workerEditeEvents)
}