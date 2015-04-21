'use strict';

import React from 'react';

import PopAppDispatcher from '../dispatcher/PopAppDispatcher.jsx';

import GroupPanelActionCreator from '../actions/GroupPanelActionCreator.jsx';
import GroupPanelStore from '../stores/GroupPanelStore.jsx';

let TRANSFORM = function (css) {
    for (var arr = [ 'webkitTransform', 'MozTransform', 'transform'], i = 0; i < arr.length; i++)
        if (typeof css[[arr[i]]] !== 'undefined')
            return arr[i];
}(document.documentElement.style);

let GroupPanel = React.createClass({

	statics: {
	},

	mixins: [],

	propTypes: {
		hasTitle: React.PropTypes.bool,
		titleLabel: React.PropTypes.string,
		itemWidth: React.PropTypes.number,
		itemNumOnePage: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			hasTitle: false,
			titleLabel: "",
			itemWidth: 300,
			itemNumOnePage: 5
		};
	},

	getInitialState() {
		return {
			transX: 0
		};
	},

    componentWillMount () {

    	// GroupPanelStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
		// GroupPanelStore.removeChangeListener(this._onChange);
    },

	render() {
		let that = this,
			titleStyle = {
				display: that.props.hasTitle ? "block" : "none"
			},
			leftArrowStyle = {
				display: "none"
			},
			rightArrowStyle = {
				display: "none"
			},
			groupContentStyle = {
				width: that.props.itemWidth * that.props.itemNumOnePage
			},
			contentListStyle = {
				width: that.props.itemWidth * that.props.children.length
			};

		contentListStyle[TRANSFORM] = that._spliceTransformStyle(that.state.transX);
		contentListStyle.width = that.props.itemWidth * that.props.children.length;

		if(that.state.transX < 0) {
			leftArrowStyle.display = "inline-block";
		}
		if(that.state.transX * -1 + that.props.itemWidth * that.props.itemNumOnePage < that.props.itemWidth * that.props.children.length) {
			rightArrowStyle.display = "inline-block";
		}

		return (
			<div className="pop-group-panel">
				<div className="pop-group-panel-title" style={titleStyle}>{that.props.titleLabel}</div>
				<div className="pop-group-panel-content" style={groupContentStyle}>
					<div className="pop-group-panel-content-arrow left-arrow" style={leftArrowStyle} onClick={that._handleClickLeft}>《</div>
						<div ref="pop_group_panel_content_list" style={contentListStyle} className="pop-group-panel-content-list">
							{this.props.children}
						</div>
					<div className="pop-group-panel-content-arrow right-arrow" style={rightArrowStyle} onClick={that._handleClickRight}>》</div>
				</div>
			</div>
		);
	},

	_onChange(data) {
	},

	_handleClickLeft() {
		let that = this;

		that._setContentListTranxX(that.props.itemWidth * 1);
	},

	_handleClickRight() {
		let that = this;

		that._setContentListTranxX(that.props.itemWidth * -1);
	},

	_spliceTransformStyle(transX = 0) {
		return "translate(" + transX + "px)";
	},

	_setContentListTranxX(transX = 0) {
		let that = this;
		that.setState({
			transX: that._getContentListTransX() * 1 + transX
		});
	},

	_getContentListTransX() {
		let that = this,
			transXReg = /(translate\(([\-\+]?\d+)px(,([\-\+]?\d+)px)?\))/i,
			contentList = that.refs.pop_group_panel_content_list;
		if(!contentList) {
			return 0;
		}
		contentList.getDOMNode().style[TRANSFORM].match (transXReg);
		return RegExp.$2;
	}

});

module.exports = GroupPanel;