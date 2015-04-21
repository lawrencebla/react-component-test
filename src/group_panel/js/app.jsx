'use strict';

import React from 'react';

import GroupPanel from './components/GroupPanel.jsx';

function render() {
	let props = {
			titleLabel: "测试Title",
			hasTitle: true
		},
		divStyle = {
			float: "left",
			display: "inline-block",
			width: 300,
			height: 130
		},
		mainWrapperStyle = {
			float: "left",
			display: "inline-block",
			height: 130
		};
	React.render(
		<div>
			<div style={divStyle}>Left Panel</div>
			<div style={mainWrapperStyle}>
			<GroupPanel {...props}>			
				<div style={divStyle}>test1</div>
				<div style={divStyle}>test2</div>
				<div style={divStyle}>test3</div>
				<div style={divStyle}>test4</div>
				<div style={divStyle}>test5</div>
				<div style={divStyle}>test6</div>
				<div style={divStyle}>test7</div>
				<div style={divStyle}>test8</div>
				<div style={divStyle}>test9</div>
				<div style={divStyle}>test10</div>
			</GroupPanel>
			</div>
		</div>,
		document.getElementById('test')
	);
}

render();