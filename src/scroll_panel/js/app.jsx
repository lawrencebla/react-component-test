'use strict';

import React from 'react';

import ScrollPanel from './components/ScrollPanel.jsx';

function render() {
	let props = {
			extraHeight: 400
		},
		divStyle = {
			height: 40
		};
	React.render(
		<ScrollPanel {...props}>
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
			<div style={divStyle}>test11</div>
			<div style={divStyle}>test12</div>
			<div style={divStyle}>test13</div>
			<div style={divStyle}>test14</div>
			<div style={divStyle}>test15</div>
			<div style={divStyle}>test16</div>
			<div style={divStyle}>test17</div>
			<div style={divStyle}>test18</div>
			<div style={divStyle}>test19</div>
			<div style={divStyle}>test20</div>
		</ScrollPanel>,
		document.getElementById('test')
	);
}

render();