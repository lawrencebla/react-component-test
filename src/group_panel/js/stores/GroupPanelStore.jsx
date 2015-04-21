import PopAppDispatcher from '../dispatcher/PopAppDispatcher.jsx';

let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

import {Action} from '../constants/actionType/GroupPanelType.jsx';

const CHANGE_EVENT = "change_event";

let GroupPanelStore = assign({}, EventEmitter.prototype, {

	// Listener Start
	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange() {
		this.emit(CHANGE_EVENT);
	},
	// Listener End

	// Register Dispatcher
	dispatcherIndex: PopAppDispatcher.register(function(action) {
		switch(action.type) {
/*
			case Action.INIT_IMAGE_UPLOAD:
				GroupPanelStore.init(action.data);
				GroupPanelStore.emitChange();
				break;
*/
			default:
		}
	})

});

module.exports = GroupPanelStore;