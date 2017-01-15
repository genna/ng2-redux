import { Component } from '@angular/core';
import { NgRedux, select } from 'wfw-ng2-redux';
import { Observable } from 'rxjs/Rx';
import { SearchActions } from './search.actions';
import { IAppState } from '../store';

/**
 * Component that demonstrates merging input and selector streams
 * to react to user input.
 */
@Component({
	selector: 'search',
	templateUrl: './search.component.html',
})
export class SearchComponent {
	// Members to test subscribe model.
	numChars: number;
	keyword: string;

	constructor(
		public actions: SearchActions,
		private ngRedux: NgRedux<IAppState>
	) {
	}

	ngOnInit() {
		// Exercise the flow where a state change results in a new action.
		this.ngRedux.select(x => x.search.keyword).subscribe(keyword => {
			this.keyword = keyword;
		});

		// Exercise the flow where you set a member on change manually instead of
		// using async pipe.
	}

	handleKeyUp(value) {
		this.actions.searchDispatch(value);
	}

	suspend() {
		this.actions.suspend();
	}

	unsuspend() {
		this.actions.unsuspend();
	}
}
