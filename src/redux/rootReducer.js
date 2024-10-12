import { combineReducers } from '@reduxjs/toolkit';
import paperPatternReducer from './slices/paperPatternSlice';
import instituteReducer from './slices/instituteSlice';
import adminReducer from './slices/adminSlice';
import teacherReducer from './slices/teacherSlice';
import studentReducer from './slices/studentSlice';
import resultReducer from './slices/resultSlice';

const rootReducer = combineReducers({
    paperPattern: paperPatternReducer,
    institute: instituteReducer,
    admin: adminReducer,
    teacher: teacherReducer,
    student: studentReducer,
    result: resultReducer,
});

export default rootReducer;