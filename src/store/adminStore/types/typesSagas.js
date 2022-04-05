import { call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_TYPE, DELETE_SELECTED_TYPE, DELETE_TYPE, GET_TYPES, GET_TYPE_BY_ID, setEditeType, setTypes, UPDATE_TYPE } from './typesActions';
import { createType, deleteSelectedType, deleteType, getTypeById, getTypes, updateType } from './typesApi';


function* workerGetTypes(action){
    try {
        const { dataCount, types } = yield call(getTypes, action.payload);
        yield put(setTypes({dataCount, types}))
    } catch (error) {
        console.log(error);
    }
}

function* workerGetTypeById(action){
    try {
        const { type } = yield call(getTypeById, action.payload)
        yield put(setEditeType(type))
    } catch (error) {
        console.log(error);
    }
}

function* workerUpdateType(action){
    try {
        // yield call(updateType, action.payload)
    } catch (error) {
        console.log(error);
    }
}

function* workerCreateType(action){
    try {
        yield call(createType, action.payload)
    } catch (error) {
        console.log(error);
    }
}


function* workerDeleteType(action){
    // yield call(deleteType, action.payload)
}

function* workerDeleteSelected(action){
    // yield call(deleteSelectedType, action.payload)
}

export function* watcherAdminTypes(){
    yield takeEvery(GET_TYPES, workerGetTypes)
    yield takeEvery(GET_TYPE_BY_ID, workerGetTypeById)
    yield takeEvery(UPDATE_TYPE, workerUpdateType)
    yield takeEvery(CREATE_TYPE, workerCreateType)
    yield takeEvery(DELETE_TYPE, workerDeleteType)
    yield takeEvery(DELETE_SELECTED_TYPE, workerDeleteSelected)
}