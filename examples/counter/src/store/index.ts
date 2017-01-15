import { combineReducers } from 'redux';
import { counterReducer } from './counter.reducer';
import { IPathDemoData, pathDemoReducer } from './path-demo.reducer';
import { ISearchState, searchReducer } from './search.reducer';
import { ISuspendableState } from 'wfw-ng2-redux';
const persistState = require('redux-localstorage');

const suspendableReducer = (state = false, action) => {
	if (action.type === 'SUSPEND') {
		return true;
	} else if (action.type === 'UNSUSPEND') {
		return false;
	}
	return state;
};

export class IAppState implements ISuspendableState {
	counter?: number;
	pathDemo?: IPathDemoData;
	search?: ISearchState;
	$suspended: boolean;
}
;

export const rootReducer = combineReducers<IAppState>({
	counter: counterReducer,
	pathDemo: pathDemoReducer,
	search: searchReducer,
	$suspended: suspendableReducer
});

export const enhancers = [
	persistState('counter', { key: 'ng2-redux/examples/counter' })
];

