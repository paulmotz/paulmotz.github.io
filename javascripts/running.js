/**
 * TODOs:
 * - fix bug where if a user quickly moves out of tooltip, tooltips for bubbles under the tooltip don't show their tooltips, also makes links not links
 *
 *
 */

// http://stackoverflow.com/questions/7124778/how-to-match-anything-up-until-this-sequence-of-characters-in-a-regular-expres
// data.pace = +/.+?(?=:)/.exec(row.Pace)[0];
// data.pace = row.Pace.match(/.+:/);

var runs = [];

var margins = {'top' : 20, 'right' : 20, 'bottom' : 50, 'left' : 70};
var height = 500;
var width = 960;
var plotHeight = height - margins.top - margins.bottom;
var plotWidth = width - margins.right - margins.left;

var x = d3.scaleLinear()
	.domain([0,365])
	.range([margins.left, plotWidth]);

var y = d3.scaleLinear()
	.domain([3,7])
	.range([plotHeight,margins.top]);

var r = d3.scaleSqrt()
	.domain([0,10])
	.range([1,10]);

var monthDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var monthAbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var months = [];

for (var i = 0; i < monthDays.length; i++) {
	months.push({"val" : monthDays[i].toString(), "key" : monthNames[i]})
}


// var m = d3.scaleOrdinal()
// 	.domain(months.map(function(d) { return d.value}))
// 	.range(months.map(function(d) { return d.key}))

months.map(function(d) { return d})

/**
 * Draws the chart using svg.
 * @param {Object[]} data - running data
 */

function draw(data) {

	runs = getRuns(data);

	var tooltip = d3.select("body").append("div")   
	    .attr("class", "tooltip")
	    .style("opacity", 0);

	var svg = d3.select('.svg').attr('width',width).attr('height',height);

	// x-axis
	svg.append('g').attr('transform', 'translate(0,' + plotHeight + ')').call(d3.axisBottom(x).tickValues(monthDays).tickFormat(function(d,i){ return monthAbr[i]}));

	// y-axis
	svg.append('g').attr('transform', 'translate(' + margins.left + ',0)').call(d3.axisLeft(y).tickFormat(function(d) { 
		var min = Math.floor(d / 1);
		var sec = d % 1 * 60;
		var filler = sec < 10 ? ':0' : ':';
		return min + filler + sec;
	}));

	svg.append('text')
		.attr('transform', 'translate(' + (plotWidth/2 + margins.left) + ' ,' + (height - margins.top) + ')')
		.style('text-anchor', 'middle')
		.text('Date');

	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", margins.left / 3)
		.attr("x",0 - (plotHeight / 2))
		.style("text-anchor", "middle")
		.text("Pace (min/km)"); 



	// plot the data (an array) with the longest runs first (so that smaller circles (short runs) are drawn on top of larger ones) if it only contains the running data 
	// plot the data (an object) in chronological order if there is aggregate yearly data
	if(Array.isArray(runs)) {
		var years = [];
		for (var run in runs) {
			var thisYear = runs[run].date.getFullYear();
			if (years.indexOf(thisYear) === -1) {
				years.push(thisYear);
			}
		}
		years.sort();
		plotAll(svg, runs, years);
	}
	else {
		runs.years.forEach(function(year) {
			plotYear(svg, runs, year);
		});
	}

	// TODO: if the user mouseouts in the direction of the tooltip quickly enough the tooltip will not appear at the next mouseover
	// this is made slightly more difficult by positioning the tooltip 12px to the left and 12px down from the circle
	// custon tooltips inspired by: 
	// http://stackoverflow.com/questions/16256454/d3-js-position-tooltips-using-element-position-not-mouse-position
	$("svg circle, svg polygon").on('mouseover', function(e) {
		var xPos = e.pageX;
		var yPos = e.pageY;
		// var xPos = Number(this.getAttribute('cx'));
		// var yPos = Number(this.getAttribute('cx'));
		tooltip.style("opacity", 1); 
		$(tooltip._groups[0][0]).css("z-index", 999);
		var color = this.getAttribute('fill');
		tooltip.html(this.getAttribute('title'));
		var tooltipHeight = tooltip._groups[0][0].offsetHeight;
		var tooltipWidth = tooltip._groups[0][0].offsetWidth;	

		var co = getRunCentre();

		var x = co[0];
		var y = co[1];

		// run is below the average on the graph
		if (yPos > y) {
			tooltip.style("border", '1px solid ' + color) // for colored borders
				.style("left", (xPos - tooltipWidth/2) + "px")     
      			.style("top", (yPos + 28) + "px");
		}

		// run is above the average on the graph
		else {
			var left = xPos - tooltipWidth/2
			var top = yPos - 28 - tooltipHeight;
			var sTop = $('.svg').offset().top; // TODO: this should not be calculated every time
			
			// tooltip would hit the title, put it on the side instead
			// TODO: it could still hit the title if the run is slow enough
			if (top < sTop) {
				top = yPos - tooltipHeight/2;
				
				// if run is left of center, put tooltip to the right
				if (xPos < x) {
					left = xPos - 30 - tooltipWidth;
				} 
				else {
					left = xPos + 30;
				}
			}
			tooltip.style("border", '1px solid ' + color) // for colored borders
				.style("left", left + "px")     
      			.style("top", top + "px");
		}

		
    });
    $("svg circle, svg polygon").on("mouseout", function(e) {    
    	tooltip.style("opacity", 0);
    	// $(tooltip._groups[0][0]).css("z-index", -1);  
	});
}

d3.csv("./data/all.csv", draw);


// TODO: 
// -make this work for ploygons as well
// -only include checked years
/**
 * Calculates the centre of all the coordinates of runs (circles and stars) on the page
 * @return {number[]} - the co-ordinates of the centre of the runs in the form {x, y}
 */

function getRunCentre() {
	var x = 0;
	var y = 0;
	var count = 0;
	// var l = $('circle').length;
	$('circle').each(function(item) {
		// console.log(this.getBoundingClientRect());
		if($('input[name=' + this.getAttribute('class') + ']')[0].checked) {
			// x += Number(this.getAttribute('cx'));
			// y += Number(this.getAttribute('cy'));
			x += (this.getBoundingClientRect().left + this.getBoundingClientRect().width/2);
			y += (this.getBoundingClientRect().top + this.getBoundingClientRect().height/2);
			// console.log(this.getBoundingClientRect.left);
			count++;
		}
	});
	return [ x/count, y/count];
}

/**
 * Transforms the running data into an object that will be used to plot the data
 * @param {Object[]} data - running data
 * @return {Object} sortedRuns - contains runs sorted by year and info for each year
 */

function getRuns(data) {

	var runs = [];
	var colonIndex = 0;

	data.forEach(function(row) {

		// if I ran that day, grab the relevant info
		if (row.Dist && row.Date) {
			var data = {};
			var timeString = !row["Start Time"] ? '' : ' ' + row["Start Time"];
			data.date = new Date(row.Date + timeString);
			data.dist = +row.Dist;
			data.duration = +row.Duration;
			colonIndex = row.Pace.indexOf(':');
			data.pace = +row.Pace.slice(0, colonIndex) + +row.Pace.slice(colonIndex + 1) / 60;		
			data.speed = +row.Speed;
			data.race = row.Race
			data.temp = +row.Temp
			runs.push(data);
		}
	});

	var sortedRuns = runs.sort(
		function(a, b) {
			return b.dist - a.dist;
		}
	);

	// var sortedRuns = sortRuns(runs);

	return sortedRuns;
}

/**
 * Separates the runs into groups for each year
 * @param {Object[]} runs - running data with only certain fields
 * @return {Object} sortedRuns - contains runs sorted by year and info for each year
 */

function sortRuns(runs) {

	var numRuns = runs.length;
	var sortedRuns = {'years' : [], 'avgTemp' : {} };
	var thisYear = '0';
	var year;
	var temp = 0
	var tempCount = 0;

	for (var i = 0; i < numRuns; i++) {
		year = runs[i].date.getFullYear();
		if (year !== thisYear) {
			if (runs[i].temp) {
				temp += runs[i].temp;
				tempCount++;
				sortedRuns.avgTemp[thisYear] = temp/tempCount;
			}
			temp = 0;
			tempCount = 0;
			thisYear = year;
			sortedRuns.years.push(thisYear);
			sortedRuns[thisYear] = [];
		}

		sortedRuns[thisYear].push(runs[i]);
		
		if (runs[i].temp) {
			temp += runs[i].temp;
			tempCount++;
		}
	}

	// add last year's temperature
	sortedRuns.avgTemp[thisYear] = temp/tempCount;

	return sortedRuns;
}

/**
 * Plots runs from all years starting with the smallest run
 * @param {???} svg - the svg element to which data is appended
 * @param {Object} runs - running data for all years
 * @param {number[]} years - the years for which there is running data
 */

function plotAll(svg, runs, years) {

	runs.forEach(function(row) {
		var day = row.date.getDate();
		var month = row.date.getMonth();
		var year = row.date.getFullYear();
		var leap = year % 4 === 0 && month > 1 ? 1 : 0;
		var daysIntoYear = monthDays[month] + day + leap;

		// string representation of data for tooltips
		var dateString = monthNames[row.date.getMonth()] + ' ' + row.date.getDate() + ' ' + row.date.getFullYear();
		var minuteString = Math.floor(row.pace / 1).toString();
		var secondString = Math.round(row.pace % 1 * 60).toString();
		secondString = secondString.length === 1 ? '0' + secondString : secondString;
		var paceString = minuteString + ':' + secondString + ' min/km';

		if (!row.race) {
			svg.append('circle')
				.attr('class', year)
				.attr('r', r(row.dist))
				.attr('fill', getColor(year, years, 0.3))
				.attr('stroke','rgba(0,0,0,0.3)')
				.attr('cx', x(daysIntoYear))
				.attr('cy', y(row.pace))
				.attr('title', 'Date: ' + dateString + '<br>Pace: ' + paceString + '<br>Dist ' + row.dist + ' km');
		}
		if (row.race) {
			var cX = x(daysIntoYear);
			var cY = y(row.pace);
			var rS = r(row.dist);
			var side = rS * Math.cos(18/180*Math.PI); 
			var pentBisectRad = rS * Math.sin(18/180*Math.PI);
			var pentCornRad = pentBisectRad / Math.cos(36/180*Math.PI);
			var star = [{'x':cX, 'y':cY - rS},
						{'x':cX + pentCornRad * Math.sin(36/180*Math.PI), 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX + side, 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX + pentCornRad * Math.cos(18/180*Math.PI), 'y':cY + pentCornRad * Math.sin(18/180*Math.PI)},
						{'x':cX + rS * Math.sin(36/180*Math.PI), 'y':cY + rS * Math.cos(36/180*Math.PI)},
						{'x':cX, 'y':cY + pentCornRad},
						{'x':cX - rS * Math.sin(36/180*Math.PI), 'y':cY + rS * Math.cos(36/180*Math.PI)},
						{'x':cX - pentCornRad * Math.cos(18/180*Math.PI), 'y':cY + pentCornRad * Math.sin(18/180*Math.PI)},
						{'x':cX - side, 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX - pentCornRad * Math.sin(36/180*Math.PI), 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)}];

			var starString = star.map(function(p) {
				return [p.x,p.y].join(',');
			}).join(', ');

			svg.append('polygon')
				.attr('class', year)
				.attr('points', starString)
				.attr('fill', getColor(year, years, 0.3))
				.attr('stroke','rgba(0,0,0,0.9)')
				.attr('title', 'Date: ' + dateString + '<br>Pace: ' + paceString + '<br>Dist: ' + row.dist + ' km<br>' + row.race + ' ' + year);
		}		
	});	

	for (var index in years) {
		var year = years[index];
		$('.options').append('<div class="checkbox-inline ' + 'checkbox-' + year + '" style="color:' + getColor(year, years, 1.0) + '"><label><input type="checkbox" name="'+year+'" value="one" checked>'+year+'</label></div>');
		$('input[type=checkbox]').change(function() {
			var yearData = '.' + this.name;
			var checkbox = '.checkbox-' + this.name;
			if (this.checked) {
				($(yearData)).show();
				$(checkbox).css('color', getColor(this.name, years, 1.0));
			}
			else {
				($(yearData)).hide();
				$(checkbox).css('color', '#999');
			}
			var co = getRunCentre();
			console.log(co);
		});
	}
}

/**
 * Plots a given year
 * @param {???} svg - the svg element to which data is appended
 * @param {Object} runs - running data for all years

 * @param {number} year - the year that is being plotted
 */

function plotYear(svg, runs, year) {

	var yearRuns = runs[year];
	yearRuns.forEach(function(row) {
		var day = row.date.getDate();
		var month = row.date.getMonth();
		var leap = year % 4 === 0 && month > 1 ? 1 : 0;
		var daysIntoYear = monthDays[month] + day + leap;

		// string representation of data for tooltips
		var dateString = monthNames[row.date.getMonth()] + ' ' + row.date.getDate() + ' ' + row.date.getFullYear();
		var minuteString = Math.floor(row.pace / 1).toString();
		var secondString = Math.round(row.pace % 1 * 60).toString();
		secondString = secondString.length === 1 ? '0' + secondString : secondString;
		var paceString = minuteString + ':' + secondString + ' min/km';

		if (!row.race) {
			svg.append('circle')
				.attr('class', year)
				.attr('r', r(row.dist))
				.attr('fill', getColorRelative(runs.years.indexOf(year), runs.avgTemp[year], row.temp))
				.attr('stroke','rgba(0,0,0,0.3)')
				.attr('cx', x(daysIntoYear))
				.attr('cy', y(row.pace))
				.attr('title', 'Date: ' + dateString + '\nPace: ' + paceString + '\nDist ' + row.dist + ' km');
		}
		if (row.race) {
			var cX = x(daysIntoYear);
			var cY = y(row.pace);
			var rS = r(row.dist);
			var side = rS * Math.cos(18/180*Math.PI); 
			var pentBisectRad = rS * Math.sin(18/180*Math.PI);
			var pentCornRad = pentBisectRad / Math.cos(36/180*Math.PI);
			var star = [{'x':cX, 'y':cY - rS},
						{'x':cX + pentCornRad * Math.sin(36/180*Math.PI), 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX + side, 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX + pentCornRad * Math.cos(18/180*Math.PI), 'y':cY + pentCornRad * Math.sin(18/180*Math.PI)},
						{'x':cX + rS * Math.sin(36/180*Math.PI), 'y':cY + rS * Math.cos(36/180*Math.PI)},
						{'x':cX, 'y':cY + pentCornRad},
						{'x':cX - rS * Math.sin(36/180*Math.PI), 'y':cY + rS * Math.cos(36/180*Math.PI)},
						{'x':cX - pentCornRad * Math.cos(18/180*Math.PI), 'y':cY + pentCornRad * Math.sin(18/180*Math.PI)},
						{'x':cX - side, 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX - pentCornRad * Math.sin(36/180*Math.PI), 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)}];

			var starString = star.map(function(p) {
				return [p.x,p.y].join(',');
			}).join(', ');

			svg.append('polygon')
				.attr('class', year)
				.attr('points', starString)
				.attr('fill', getColorRelative(runs.years.indexOf(year), runs.avgTemp[year], 0))
				.attr('stroke','rgba(0,0,0,0.9)')
				.attr('title', 'Date: ' + dateString + '\nPace: ' + paceString + '\nDist: ' + row.dist + ' km' + '\n' + row.race + ' ' + year);
		}		
	});	

	$('.options').append('<div class="checkbox-inline ' + 'checkbox-' + year + '" style="color:' + getColor(year, years, 1.0) + '"><label><input type="checkbox" name="'+year+'" value="one" checked>'+year+'</label></div>');
	$('input[type=checkbox]').change(function() {
		var year = '.' + this.name;
		var checkbox = '.checkbox-' + this.name;
		if (this.checked) {
			($(year)).show();
			$(checkbox).css('color', getColor(year, years, 1.0));
		}
		else {
			($(year)).hide();
			$(checkbox).css('color', '#999');
		}
	});
}

/**
 * not yet implemented
 * Assigns a color based on the year of the run
 * @param {number} year - the year of the run
 * @param {number[]} year - the years for which there is running data
 * @param {number} opacity - the desired opacity of the color
 * @return {string} color
 */

function getColor(year, years, opacity) {
	var firstYear = years[0]; // since years are sorted in ascending order
	var yearIndex = year - firstYear;
	var colorValues = [[256, 0, 0], [0, 256, 0], [0, 0, 256], [256, 256, 0], [256, 0, 256], [0, 256, 256], [256, 256, 256]];
	// var yearColor = colorValues[yearIndex];
	// for (var hue in yearColor) {
	// 	if (yearColor[hue]) {
	// 		// yearColor[hue] += increment;
	// 	}
	// }
	var colorString = 'rgba(' + colorValues[yearIndex].join() + ',' + opacity + ')';
	return colorString;
}

/**
 * not yet implemented
 * Modifies the color based on how much the run's temperature deviated from the yearly average 
 * @param {number} yearIndex - a number corresponding to the current year with 0 representing the earliest year
 * @param {number} avgTemp - the average temperature for all runs that year (in degrees Celsius)
 * @param {number} temp - the temperature during the given run (in degrees Celsius)
 * @return {string} color
 */

function getColorRelative(yearIndex, avgTemp, temp) {
	var increment = Math.round(temp);
	var colorValues = [[256, 0, 0], [0, 256, 0], [0, 0, 256], [256, 256, 0], [256, 0, 256], [0, 256, 256], [256, 256, 256]];
	// var yearColor = colorValues[yearIndex];
	// for (var hue in yearColor) {
	// 	if (yearColor[hue]) {
	// 		// yearColor[hue] += increment;
	// 	}
	// }
	var colorString = 'rgba(' + colorValues[yearIndex].join() + ',0.3)';
	return colorString;
}

// $('html').on('mousemove', function(e) {
// 	var xPos = e.pageX;
// 	var yPos = e.pageY;
// 	console.log(e.pageX);
// });
