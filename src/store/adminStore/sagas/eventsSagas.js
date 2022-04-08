import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    CREATE_EVENT, 
    GET_EVENTS,
    GET_EDITE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    DELETE_SELECTED_EVENT,
    SET_TABLE_COUNT,
    SET_TABLE_LIST,
    SET_EDITE_ITEM
} from '../actions/actionType';

import { 
    createEvent,
    dedleteSelectedEvents, 
    deleteEvent, 
    events, 
    getEditeEvent, 
    updateEvent

} from '../api/eventsApi';

import { createAction } from '../actions/createAction';


function* workerGetEvents(action) {
    try {
        const { eventList, dataCount } = yield call(events, action.payload);
        yield put(createAction(SET_TABLE_COUNT, dataCount));
        yield put(createAction(SET_TABLE_LIST, eventList));

    } catch (error) {
        console.log(error);
    }
}

function* workerCreateEvent(action) {
    try {
        const data = yield call(createEvent, action.payload);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
   
}

function* workerGetEditeEvents(action){
    try {
        const { eventData } = yield call(getEditeEvent, action.payload);
        yield put(createAction(SET_EDITE_ITEM, eventData));
        
    } catch (error) {
        console.log(error);
    }
}

function* workerUpdateEvent(action){
    try {
        const data = yield call(updateEvent, action.payload)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

function* workerDeleteEvent(action){
    try {
        yield call(deleteEvent, action.payload)
    } catch (error) {
        console.log(error);
    }
}

function* workerDeleteSelectedEvent(action){
    try {
        yield call(dedleteSelectedEvents(action.payload))
    } catch (error) {
        console.log(error);
    }
}


export function* watcherAdminEvents() {
    yield takeEvery(GET_EVENTS, workerGetEvents)
    yield takeEvery(CREATE_EVENT, workerCreateEvent)
    yield takeEvery(GET_EDITE_EVENT, workerGetEditeEvents)
    yield takeEvery(UPDATE_EVENT, workerUpdateEvent)
    yield takeEvery(DELETE_EVENT, workerDeleteEvent)
    yield takeEvery(DELETE_SELECTED_EVENT, workerDeleteSelectedEvent)
}