//Have the center of circles coincide with the center of the svg element.
var svg = document.getElementsByTagName('svg')[0];
var height = svg.getAttribute('height');
var width = svg.getAttribute('width');
var midY = height / 2;
var midX = width / 2;

//Set the width of div#discuss equal to the width of the svg element.
var discuss = document.getElementById('discuss');
//It is critical that the RHS be a string. If it is a number the width is not set.
discuss.style.width = width + 'px';
console.log(discuss);

//----- Guideline -----
var guideline = document.getElementById('guideline');
guideline.setAttribute('x1', midX);
guideline.setAttribute('x2', midX);
guideline.setAttribute('y1', 0);
guideline.setAttribute('y2', height);

// ----- Guide circle -----
var guidecircle = document.getElementById('guidecircle');
guidecircle.setAttribute('cx', midX);
guidecircle.setAttribute('cy', midY);
//Set the radius.
var shrink = 0.666;
var r = Math.min(midX, midY) * shrink;
guidecircle.setAttribute('r', r);

/*
The arc (A) command below takes 7 parameters:
the x and y radius of the ellipse (in the present case a circle, hence both are the same);
the x axis rotation (in the case of a circle, has no effect);
the large arc flag: 0 if the arc is less than 180 degrees, 1 if greater than 180 degrees. In the present case set to 1;
the sweep flag: 0 if the arc is drawn counterclockwise, 1 if clockwise;
the x and y coordinates where the arc terminates.
*/

//Let circ_inner begin at the bottom of the circle.
var x0 = midX;
var y0 = midY + r;
var d = 'M ' + x0 + ' ' + y0 + ' A ' + r + ' ' + r + ', 0 1 0, ';
//Testing indicates that there must be a small gap between the beginning and end of the arc.
var x1 = x0 - 1;
var y1 = y0;
d = d + x1 + ' ' + y1;
var circ_inner = document.getElementById('circ_inner');
circ_inner.setAttribute('d', d);

//Let circ_outer begin at the top of the circle.
y0 = midY - r;
d = 'M ' + x0 + ' ' + y0 + ' A ' + r + ' ' + r + ', 0 1 1, ';
x1 = x0 + 1;
y1 = y0;
d = d + x1 + ' ' + y1;
var circ_outer = document.getElementById('circ_outer');
circ_outer.setAttribute('d', d);
circ_outer.setAttribute('transform', 'rotate(180, ' + x0 + ', ' + y0 + ')');

//Set the length of the textPath(s).
//Support for textLength is implemented in Chrome but, as of 2017-07-07, not in Firefox.
var textLength = Math.PI * r * 2;
var inner = document.getElementById('inner');
//In the case of 'inner', to reduce overlap of beginning and ending characters, reduce textLength slightly.
inner.setAttribute('textLength', textLength - 7);
inner.style.fill = 'none';
inner.style.stroke = 'black';
inner.style.strokeWidth = '2';
var outer = document.getElementById('outer');
outer.setAttribute('textLength', textLength);
