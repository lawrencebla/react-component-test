'use strict';

import React from 'react';

const HEADER_HEIGHT = 48;

const DEFAULT_OPTIONS = {
	left: {
		hasHeader: true
	},
	right: {
		hasHeader: true,
		sysAdditionalHeight: 60
	}
}

let ScrollPanel = React.createClass({

	propTypes: {
		type: React.PropTypes.string,
		hasSysAdditionalHeight: React.PropTypes.bool,
		extraHeight: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			type: "",
			hasSysAdditionalHeight: true,
			extraHeight: 0,
		};
	},

	render() {
		let that = this,
			typeObject = DEFAULT_OPTIONS[that.props.type] || {},
			style = {},
			mainmenu = document.getElementById("pop_mainmenu"),
			// header = document.getElementById("pop_content_header"),
			popScrollPanelHeight = window.innerHeight;

		if(typeObject.hasHeader) {
			if(mainmenu) {
				popScrollPanelHeight -= (mainmenu.clientHeight + HEADER_HEIGHT);
			}
		}

		if(that.props.hasSysAdditionalHeight && typeObject.sysAdditionalHeight) {
			popScrollPanelHeight -= typeObject.sysAdditionalHeight;
		}

		if(that.props.extraHeight) {
			popScrollPanelHeight -= that.props.extraHeight;
		}

		style.height = popScrollPanelHeight;
		return (
			<div className="pop-scroll-panel" style={style}>
				{that.props.children}
			</div>
		);
	}

});

module.exports = ScrollPanel;