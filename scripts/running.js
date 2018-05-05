/**
 * TODOs:
 * - use svg layers rather than css z-indices
 * - turn off tooltips when the portfolio is clicked displaying the dropdown
 *
 */

// http://stackoverflow.com/questions/7124778/how-to-match-anything-up-until-this-sequence-of-characters-in-a-regular-expres
// data.pace = +/.+?(?=:)/.exec(row.Pace)[0];
// data.pace = row.Pace.match(/.+:/);

let runs = [];

let margins = {'top' : 20, 'right' : 20, 'bottom' : 50, 'left' : 70};
let height = 500;
let width = 960;
let plotHeight = height - margins.top - margins.bottom;
let plotWidth = width - margins.right - margins.left;

let x = d3.scaleLinear()
	.domain([0,365])
	.range([margins.left, plotWidth]);

let y = d3.scaleLinear()
	.domain([3,7.5])
	.range([plotHeight,margins.top]);

let r = d3.scaleSqrt()
	.domain([0,10])
	.range([1,10]);

const MONTH_DAYS = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Draws the chart using svg.
 * @param {Object[]} data - running data
 */
function draw(data) {
	runs = getRuns(data);

	let tooltip = d3.select("body").append("div")   
	    .attr("class", "tooltip")
	    .style("opacity", 0);

	let tooltipOffset = 28;

  let tooltipTriangle = d3.select("body").append("div")
  	.attr("class", "tooltip-triangle")
  	.style("opacity", 0);

	let triangleSize = 8;

	let svg = d3.select('.svg').attr('width',width).attr('height',height);

	// x-axis
	svg.append('g').attr('transform', 'translate(0,' + plotHeight + ')').call(d3.axisBottom(x).tickValues(MONTH_DAYS).tickFormat((d, i) => {
		return MONTH_ABBREVIATIONS[i]
	}));

	// y-axis
	svg.append('g').attr('transform', 'translate(' + margins.left + ',0)').call(d3.axisLeft(y).tickFormat((pace) => { 
		return getPaceString(pace);
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
	const years = [];
	for (const run of runs) {
		const thisYear = run.date.getFullYear();
		if (!years.includes(thisYear)) {
			years.push(thisYear);
		}
	}
	years.sort();
	plotAll(svg, runs, years);

	// custon tooltips inspired by: 
	// http://stackoverflow.com/questions/16256454/d3-js-position-tooltips-using-element-position-not-mouse-position
	$("svg circle, svg polygon").on('mouseover', function (e) {
		if (!dropdownExpanded()) {
			const rect = this.getBoundingClientRect();
			const xScroll = $(window).scrollLeft();
			const yScroll = $(window).scrollTop();
			const xPos = rect.left + rect.width / 2 + xScroll;
			const yPos = rect.top + rect.height / 2 + yScroll;
			tooltip.style('opacity', 1); 
			tooltipTriangle.style('opacity', 1); 
			$(tooltip._groups[0][0]).css('z-index', 999);
			// make the tooltip darker than the corresponding circle
			const color = this.getAttribute('fill').replace("0.3", "0.7");
			tooltip.html(this.getAttribute('title'));
			const tooltipHeight = tooltip._groups[0][0].offsetHeight;
			const tooltipWidth = tooltip._groups[0][0].offsetWidth;	

			const t = $(".tooltip-triangle");

			let tooltipX;
			let tooltipY;

			const [avgX, avgY] = getRunCentre();

			// let tooltipOffset = rect.width; // could also have used this.getAttribute('r') * 2)
			tooltipOffset = 28;

			// run is below the average on the graph, position its tooltip below as well
			if (yPos > avgY) {
				tooltipX = xPos - tooltipWidth / 2;
				tooltipY = yPos + tooltipOffset;

				tooltip.style("border", '3px solid ' + color) // for colored borders
					.style('border-radius', '10px')
					.style("left", tooltipX + "px")
    			.style("top", tooltipY + "px");

    			// styling for the arrow      			
    			t.offset({left: tooltipX + tooltipWidth / 2 - triangleSize, top: tooltipY - triangleSize});
    			t.css({"border-left": "8px solid transparent"});
					t.css({"border-right": "8px solid transparent"});
    			t.css({"border-bottom": "8px solid " + color});
    			t.css({"border-top": "0px solid transparent"});
			}

			// run is above the average on the graph
			else {
				let tooltipX = xPos - tooltipWidth / 2
				let tooltipY = yPos - tooltipOffset - tooltipHeight;
				const sTop = $('.svg').offset().top; // TODO: this should not be calculated every time
				

				// tooltip would hit the title, put it on the side instead
				// TODO: it could still hit the title if the run is slow enough
				if (tooltipY < sTop) {
					tooltipY = yPos - tooltipHeight / 2;
					
					// if run is left of center, put tooltip to the left
					if (xPos < avgX) {
						tooltipX = xPos - tooltipOffset - tooltipWidth;
						
						// styling for the arrow
      			t.offset({left: tooltipX + tooltipWidth - 1, top: tooltipY + tooltipHeight / 2 - triangleSize});
      			t.css({"border-left": "8px solid " + color});
		 				t.css({"border-right": "0px solid transparent"});
      			t.css({"border-bottom": "8px solid transparent"});
      			t.css({"border-top": "8px solid transparent"});
					} 
					else {
						tooltipX = xPos + tooltipOffset;

						// styling for the arrow
      			t.offset({left: tooltipX - triangleSize, top: tooltipY + tooltipHeight / 2 - triangleSize});
      			t.css({"border-left": "0px solid transparent"});
		 				t.css({"border-right": "8px solid " + color});
      			t.css({"border-bottom": "8px solid transparent"});
      			t.css({"border-top": "8px solid transparent"});
					}
				}

				else {
					// styling for the arrow
    			t.offset({left: tooltipX + tooltipWidth / 2 - triangleSize, top: tooltipY + tooltipHeight});
    			t.css({"border-left": "8px solid transparent"});
	 				t.css({"border-right": "8px solid transparent"});
    			t.css({"border-bottom": "0px solid transparent"});
    			t.css({"border-top": "8px solid " + color});
				}

				tooltip.style("border", '1px solid ' + color) // for colored borders
					.style("left", tooltipX + "px")     
    			.style("top", tooltipY + "px");
			}
		}
    });
    $("svg circle, svg polygon").on("mouseout", (e) => {    
    	// tooltip.transition()
    	// .duration(100)
    	tooltip.style("opacity", 0);
    	$(tooltip._groups[0][0]).css("z-index", -1);  

		tooltipTriangle.style("opacity", 0);
    	tooltipTriangle.classed("bottom-tip", false);
    	tooltipTriangle.classed("top-tip", false);
    	tooltipTriangle.classed("left-tip", false);
    	tooltipTriangle.classed("right-tip", false);
	});
}

d3.csv("https://raw.githubusercontent.com/paulmotz/paulmotz.github.io/master/data/all.csv", draw);

// TODO: 
// -make this work for ploygons as well
// -only include checked years
/**
 * Calculates the centre of all the coordinates of runs (circles and stars) on the page
 * @return {number[]} - the co-ordinates of the centre of the runs in the form {x, y}
 */
function getRunCentre() {
	let x = 0;
	let y = 0;
	let count = 0;
	$('circle').each(function(item) {
		if($('input[name=' + this.getAttribute('class') + ']')[0].checked) {
			x += (this.getBoundingClientRect().left + this.getBoundingClientRect().width/2);
			y += (this.getBoundingClientRect().top + this.getBoundingClientRect().height/2);
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
	const runs = [];
	let colonIndex = 0;

	data.forEach((row) => {
		// if I ran that day, grab the relevant info
		if (row.Dist && row.Date) {
			const data = {};
			const timeString = !row["Start Time"] ? '' : ' ' + row["Start Time"];
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

	console.log(runs)

	const sortedRuns = runs.sort((a, b) => b.dist - a.dist);

	// let sortedRuns = sortRuns(runs);

	return sortedRuns;
}

/**
 * Separates the runs into groups for each year
 * @param {Object[]} runs - running data with only certain fields
 * @return {Object} sortedRuns - contains runs sorted by year and info for each year
 */
function sortRuns(runs) {
	const numRuns = runs.length;
	const sortedRuns = {'years' : [], 'avgTemp' : {} };
	let thisYear = '0';
	let year;
	let temp = 0
	let tempCount = 0;

	for (const run of runs) {
		year = runs.date.getFullYear();
		if (year !== thisYear) {
			if (run.temp) {
				temp += run.temp;
				tempCount++;
				sortedRuns.avgTemp[thisYear] = temp/tempCount;
			}
			temp = 0;
			tempCount = 0;
			thisYear = year;
			sortedRuns.years.push(thisYear);
			sortedRuns[thisYear] = [];
		}

		sortedRuns[thisYear].push(run);
		
		if (run.temp) {
			temp += run.temp;
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
	runs.forEach((row) => {
		const day = row.date.getDate();
		const month = row.date.getMonth();
		const year = row.date.getFullYear();
		const leap = year % 4 === 0 && month > 1 ? 1 : 0;
		const daysIntoYear = MONTH_DAYS[month] + day + leap;

		// string representation of data for tooltips
		const dateString = MONTH_NAMES[row.date.getMonth()] + ' ' + row.date.getDate() + ' ' + row.date.getFullYear();
		const paceString = `${getPaceString(row.pace)} min/km`

		if (!row.race) {
			svg.append('circle')
				.attr('class', year)
				.attr('r', r(row.dist))
				.attr('fill', getColor(year, years, 0.3))
				.attr('stroke','rgba(0, 0, 0, 0.3)')
				.attr('cx', x(daysIntoYear))
				.attr('cy', y(row.pace))
				.attr('title', 'Date: ' + dateString + '<br>Pace: ' + paceString + '<br>Dist ' + row.dist + ' km');
		}
		if (row.race) {
			const cX = x(daysIntoYear);
			const cY = y(row.pace);
			const rS = r(row.dist);
			const side = rS * Math.cos(18/180*Math.PI); 
			const pentBisectRad = rS * Math.sin(18/180*Math.PI);
			const pentCornRad = pentBisectRad / Math.cos(36/180*Math.PI);
			const star = [{'x':cX, 'y':cY - rS},
						{'x':cX + pentCornRad * Math.sin(36/180*Math.PI), 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX + side, 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX + pentCornRad * Math.cos(18/180*Math.PI), 'y':cY + pentCornRad * Math.sin(18/180*Math.PI)},
						{'x':cX + rS * Math.sin(36/180*Math.PI), 'y':cY + rS * Math.cos(36/180*Math.PI)},
						{'x':cX, 'y':cY + pentCornRad},
						{'x':cX - rS * Math.sin(36/180*Math.PI), 'y':cY + rS * Math.cos(36/180*Math.PI)},
						{'x':cX - pentCornRad * Math.cos(18/180*Math.PI), 'y':cY + pentCornRad * Math.sin(18/180*Math.PI)},
						{'x':cX - side, 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)},
						{'x':cX - pentCornRad * Math.sin(36/180*Math.PI), 'y':cY - pentCornRad * Math.cos(36/180*Math.PI)}];

			const starString = star.map((p) => {
				return [p.x,p.y].join(',');
			}).join(', ');

			svg.append('polygon')
				.attr('class', year)
				.attr('points', starString)
				.attr('fill', getColor(year, years, 0.3))
				.attr('stroke','rgba(0,0,0,0.9)')
				.attr('title', `Date: ${dateString}<br>Pace: ${paceString}<br>Dist: ${row.dist} km<br> ${row.race} ${year}`);
		}		
	});	

	$('#years-to-display').html('<h4 class="form-header">Show data from the following years:</h4>');

	for (const index in years) {
		const year = years[index];
		if (index > 0 && index % 3 === 0) {
			$('#years-to-display').append('<br>');
		}
		$('#years-to-display').append('<div class="checkbox-inline ' + 'checkbox-' + year + '" style="color:' + getColor(year, years, 1.0) + '"><label class="running-label"><input type="checkbox" name="'+year+'" value="one" checked="true">'+year+'</label></div>');
	}

	$('input[type=checkbox]').change(function() {
		displayRuns(years);
	});


	$('input[type=radio]').change(function() {
		displayRuns(years)
	});
}

/**
 * Displays the proper runs based on the checkboxes and radio button selected
 * @param {number[]} years - the years for which there is running data
 */
function displayRuns(years) {
	const checkboxes = $('input[type=checkbox]');
	const checkedYears = [];
	for (const checkbox of checkboxes) {
		if (checkbox.checked) {
			checkedYears.push(checkbox.name);
		}
	}
	const checkedRadio = $('input[name=radioruns]:checked', '#races-to-display').val();
	for (const year of years) {
		if (checkedYears.includes(String(year))) {
			if (checkedRadio === 'race') {
				$('circle.' + year).hide();
				$('polygon.' + year).show();
			}
			else if (checkedRadio === 'casual') {
				$('circle.' + year).show();
				$('polygon.' + year).hide();
			}
			else {
				$('circle.' + year).show();
				$('polygon.' + year).show();
			}
		}
		else {
			$('circle.' + year).hide();
			$('polygon.' + year).hide();
		}
	}
}

/**
 * Assigns a color based on the year of the run
 * @param {number} year - the year of the run
 * @param {number[]} years - the years for which there is running data
 * @param {number} opacity - the desired opacity of the color
 * @return {string} color
 */
function getColor(year, years, opacity) {
	const yearIndex = years.indexOf(Number(year)); // ensure year is a number and not a string
	const colorValues = [[139 ,69, 19], [256, 0, 0], [0, 256, 0], [0, 0, 256], [256, 256, 0], [256, 0, 256], [0, 256, 256], [256, 256, 256]];
	const colorString = `rgba(${colorValues[yearIndex].join()},${opacity})`;
	return colorString;
}

/**
 * Checks whether the portfolio dropdown is expanded, method returns a string rather than a boolean, so need to check whether string is 'true' or 'false'
 * @return {Boolean} whether the dropdown is expanded or not
 */
function dropdownExpanded() {
	if (document.getElementById('portfolio-dropdown').getAttribute('aria-expanded') === 'true') return true;
	return false;
}

/**
 * Converts a decimal number to a pace string in the format mm:ss
 * @param {number} pace - decimal representation of a run's pace 
 * @return {string} paceString
 */
function getPaceString(pace) {
	const min = Math.floor(pace / 1);
	const sec = Math.round(pace % 1 * 60);
	const filler = sec < 10 ? ':0' : ':';
	return min + filler + sec;
}

/**
 * applies a sttyle in the appropraite color to the tooltip trianlge
 * @param {String}
 */

// function stylize() {

// }

// console.log(document.getElementsByClassName('svg'));

// 