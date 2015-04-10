'use strict';

import React from 'react';
// var React = require('react');

let Test = React.createClass({

	render() {
		return (
			<div>Test1</div>
		);
	}

});


function render() {
	React.render(
		<Test />,
		document.getElementById('test')
	);
}

render();