'use strict';

import React from 'react';
import Infinite from 'react-infinite';
// import InfiniteScroll from 'react-infinite-scroll';
let InfiniteScroll = require('react-infinite-scroll')(React);

function render() {
	let props = {
			pageStart: 0,
			elementHeight: 40,
			containerHeight: 200,
			infiniteLoadingBeginBottomOffset: 250
		},
		style = {
			display: "inline-block",
			width: 300
		};
	React.render(
		<div>
		<Infinite containerHeight={200} elementHeight={40}>
    <div className="one">1</div>
    <div className="two">1</div>
    <div className="three">1</div>
</Infinite>
			<div style={style}>
				<Infinite {...props}>
				    <div className="one">123</div>
				    <div className="two">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				</Infinite>
			</div>
			<div style={style}>
				<Infinite {...props}>
				    <div className="one">123</div>
				    <div className="two">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				    <div className="three">123</div>
				</Infinite>
			</div>
		</div>,
		document.getElementById('test')
	);
}

render();