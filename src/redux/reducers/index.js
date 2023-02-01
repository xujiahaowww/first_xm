import { combineReducers } from 'redux';
import {Int} from './reducer';

const allReducers = {
  shoppingCart: Int
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;