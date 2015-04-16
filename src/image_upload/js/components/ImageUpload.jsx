'use strict';

import React from 'react';

import PopAppDispatcher from '../dispatcher/PopAppDispatcher.jsx';

import ImageUploadActionCreator from '../actions/ImageUploadActionCreator.jsx';
import ImageUploadStore from '../stores/ImageUploadStore.jsx';

const FILE_TYPE_IMAGE_REG = /image\/\w+/;
const DEFAULT_IMAGE_SIZE_MAX = 1024 * 1000 * 2;
const DEFAULT_WRAPPER_WIDTH = 420;
const DEFAULT_WRAPPER_HEIGHT = 280;

let ImageUpload = React.createClass({

	statics: {		
		getImageClipSource(source, clipRatioWidth, clipRatioHeight, wrapperWidth, wrapperHeight) {
			let canvas = document.createElement('canvas'),
				img = new Image(),
				ctx = canvas.getContext('2d'),
				newLeft, newTop, newWidth, newHeight;

			img.src = source;

			if(img.naturalHeight * clipRatioWidth < img.naturalWidth * clipRatioHeight) {
				newHeight = img.naturalHeight;
				newWidth = newHeight/clipRatioHeight * clipRatioWidth;
			} else {
				newWidth = img.naturalWidth;
				newHeight = newWidth/clipRatioWidth * clipRatioHeight;
			}
			newLeft = (img.naturalWidth - newWidth) / 2;
			newTop = (img.naturalHeight - newHeight) / 2;


			canvas.width = wrapperWidth;
			canvas.height = wrapperHeight;

			ctx.drawImage(img, newLeft, newTop, newWidth, newHeight, 0, 0, wrapperWidth, wrapperHeight);
			
			return canvas.toDataURL();
		}
	},

	mixins: [],

	propTypes: {
		tip: React.PropTypes.string,
		isViewState: React.PropTypes.bool,
		clip: React.PropTypes.bool,
		clipRatioWidth: React.PropTypes.number,
		clipRatioHeight: React.PropTypes.number,
		defaultImageSource: React.PropTypes.string,
		imageSizeMax: React.PropTypes.number,
		wrapperWidth: React.PropTypes.number,
		wrapperHeight: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			tip: "",
			isViewState: true,
			defaultImageSource: "",
			imageSizeMax: DEFAULT_IMAGE_SIZE_MAX,
			wrapperWidth: DEFAULT_WRAPPER_WIDTH,
			wrapperHeight: DEFAULT_WRAPPER_HEIGHT,
			clip: false,
			clipRatioWidth: 3, // clip width
			clipRatioHeight: 2 // clip height
		};
	},

	getInitialState() {
		let that = this;
		return {
			source: that.props.defaultImageSource
		};
	},

    componentWillMount () {

	    var that = this,
		    	promise = new Promise(function(resolve) {
		    	resolve();
		    });
	    promise.then(function() {
	    	that._initImageUploadSource();
	    });

    	ImageUploadStore.addChangeListener(this._onChange);
    },

    shouldComponentUpdate (nextProps, nextState) {
    	let that = this;
    	if(!that.props.isViewState && nextProps.isViewState) {
    		if(!ImageUploadStore.hasImageSource()) {
    			that._initImageUploadSource();
    		}

    	}
    	return true;
    },

    componentWillUnmount() {
		ImageUploadStore.removeChangeListener(this._onChange);
    },

	render() {
		let that = this,
			containerStyle = {
				width: that.props.wrapperWidth,
				height: that.props.wrapperHeight,
				backgroundImage: ImageUploadStore.getImageUploadBackgroundStr(),
				"background-repeat": "no-repeat"
			},
			buttonStyle = {
				opacity: 0
			},
			popImageUploadTipStyle = {};
		if(!that.props.clip) {
			containerStyle["background-origin"] = "border-box";
			containerStyle["background-position"] = "100% 0";
			containerStyle["background-size"] = "contain";
		}
		if(ImageUploadStore.getImageUploadSource() && ImageUploadStore.getImageUploadSource().length < 1) {
			popImageUploadTipStyle.display = "block";
		}
		return (
			<label for="pop_image_upload_button">
				<div className="pop-image-upload" style={containerStyle}>
					<div style={popImageUploadTipStyle}>
						<div>{that.props.tip}</div>
						<div>请上传文件不大于2M的图片</div>
					</div>
					<input id="pop_image_upload_button" ref="pop_image_upload_button" type="file" disabled={that.props.isViewState} style={buttonStyle} onChange={this._handlerChangeImageUpload} accept="images/*"/>
				</div>
			</label>
		);
	},

	_onChange(data) {
		this.setState({
			source: ImageUploadStore.getImageUploadSource()
		});
	},

	_handlerChangeImageUpload(event) {
		let that = this,
			files = event.target.files;
		if(files.length > 0) {
			let file = files[0];

			if(!FILE_TYPE_IMAGE_REG.test(file.type)) {
				alert("请选择一张图片");
			} else if(file.size > that.props.imageSizeMax) {
				alert("文件过大");
			} else {
				let render = new FileReader();
				render.readAsDataURL(file);
				render.onload = function () {
					let result = this.result;
					if(that.props.clip) {
						result = ImageUpload.getImageClipSource(result,
																that.props.clipRatioWidth,
																that.props.clipRatioHeight,
																that.props.wrapperWidth,
																that.props.wrapperHeight);
					}
					ImageUploadActionCreator.setImageUploadSource(result);
				}
			}
		}
	},

	_initImageUploadSource() {
		let that = this;
    	ImageUploadActionCreator.setImageUploadSource(that.props.defaultImageSource);
    	if(that.props.clip) {	    		
			let clipSource = ImageUpload.getImageClipSource(ImageUploadStore.getImageUploadUrl(),
															that.props.clipRatioWidth,
															that.props.clipRatioHeight,
															that.props.wrapperWidth,
															that.props.wrapperHeight);
    		ImageUploadActionCreator.setImageUploadSource(clipSource);
    	}
	}

});

module.exports = ImageUpload;