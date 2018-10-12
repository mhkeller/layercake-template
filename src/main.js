import LayerCake from 'layercake';
import points from './data/points.js';
import Line from './components/Line.html';
import Area from './components/Area.html';
import AxisX from './components/AxisX.html';
import AxisY from './components/AxisY.html';

const myCake = new LayerCake({
	padding: { right: 10, bottom: 20, left: 25 },
	x: 'myX',
	y: 'myY',
	yDomain: [0, null],
	data: points,
	target: document.getElementById('my-chart')
})
	.svgLayers([
		{ component: AxisX, opts: {} },
		{ component: AxisY, opts: {} },
		{ component: Line, opts: {} },
		{ component: Area, opts: {} }
	]);

myCake.render();
