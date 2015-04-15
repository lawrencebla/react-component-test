import PopAppDispatcher from '../dispatcher/PopAppDispatcher.jsx';

let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');

import {Action} from '../constants/actionType/ImageUploadType.jsx';

const CHANGE_EVENT = 'change';
const DEFAULT_FILE_SIZE_MAX = 1024 * 1000 * 2;

// Image Source
let _source;
// Image Max Size
let _imageSizeMax;

let ImageUploadStore = assign({}, EventEmitter.prototype, {

	init(props = {}) {
		_imageSizeMax = props.imageSizeMax || DEFAULT_FILE_SIZE_MAX;
		this.setImageUploadSource(props.defaultImageSource || "");
	},

	setImageUploadSource(source) {
		_source = source.replace(/^url\("?/,"") 						// Remove header
						.replace(/"?\)$/,"")							// Remove footer
						.replace(/^data:image\/(\w+|\*);base64,/, "")	// Remove first/second header
	},

	getImageUploadSource() {
		return _source;
	},

	getImageUploadUrl() {
		return "data:image/*;base64," + _source;
	},

	getImageUploadBackgroundStr() {
		return "url(" + this.getImageUploadUrl() + ")";
	},

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

			case Action.INIT_IMAGE_UPLOAD:
				ImageUploadStore.init(action.data);
				ImageUploadStore.emitChange();
				break;

			case Action.SET_IMAGE_UPLOAD_SOURCE:
				ImageUploadStore.setImageUploadSource(action.data);
				ImageUploadStore.emitChange();
				break;

			default:
		}
	})

});

module.exports = ImageUploadStore;