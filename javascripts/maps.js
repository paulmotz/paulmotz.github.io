/*  This visualization was made possible by modifying code provided by:

I used Michelle Chandra's US State Map as a reference
http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

...which in turn references:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */
		
var width = 960;
var height = 500;

var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down to see entire US
        
// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

var colors = ["rgb(35,32,102)", "rgb(239,29,14)", "Purple", "DarkOrange"];
		
var color = d3.scaleLinear()
			  .range(colors);

var legendTextElection = ["Democrat", "Republican"];
var legendTextFat = ["Not Obese", "Obese"];
var legendTextCompare = ["Democrat and Not Obese", "Republican and Obese", "Democrat and Obese", "Republican and Not Obese"];

var elections = {"2008" : "Obama vs. McCain", "2012" : "Obama vs. Romney", "2016" : "Trump vs. Clinton"};

var diabetesRates = {"Alabama":13.5,"Alaska":7.6,"Arkansas":12.6,"Arizona":10.1,"California":10.0,"Colorado":6.8,"Connecticut":9.3,"District of Columbia":8.5,"Delaware":11.5,"Florida":11.3,"Georgia":11.3,"Hawaii":8.5,"Iowa":8.8,"Idaho":8.1,"Illinois":9.9,"Indiana":11.4,"Kansas":9.7,"Kentucky":13.4,"Louisiana":12.7,"Maine":9.9,"Maryland":10.3,"Massachusetts":8.9,"Michigan":10.7,"Minnesota":7.6,"Missouri":11.5,"Mississippi":14.7,"Montana":7.9,"North Carolina":10.7,"North Dakota":8.7,"Nebraska":8.8,"New Hampshire":8.1,"New Jersey":9.0,"New Mexico":11.5,"Nevada":9.7,"New York":9.8,"Ohio":11.0,"Oklahoma":11.7,"Oregon":10.7,"Pennsylvania":10.4,"Rhode Island":9.0,"South Carolina":11.8,"South Dakota":9.3,"Tennessee":12.7,"Texas":11.4,"Utah":7.0,"Virginia":10.3,"Vermont":8.2,"Washington":8.4,"Wisconsin":8.4,"West Virginia":14.5,"Wyoming":8.4}

var obesityRates = {"2008" : {"Alabama" : 31.2,	"Alaska" : 27.2,	"Arizona" : 24.8,	"Arkansas" : 28.6,	"California" : 23.6,	"Colorado" : 18.9,	"Connecticut" : 21.3,	"Delaware" : 27.3,	"District of Columbia" : 22.3,	"Florida" : 24.1,	"Georgia" : 27.9,	"Hawaii" : 21.8,	"Idaho" : 24.8,	"Illinois" : 25.9,	"Indiana" : 27.4,	"Iowa" : 26.7,	"Kansas" : 27.2,	"Kentucky" : 29,	"Louisiana" : 28.9,	"Maine" : 24.7,	"Maryland" : 26,	"Massachusetts" : 21.2,	"Michigan" : 28.8,	"Minnesota" : 25.3,	"Mississippi" : 32.5,	"Missouri" : 28.1,	"Montana" : 22.7,	"Nebraska" : 26.9,	"Nevada" : 25.1,	"New Hampshire" : 24.1,	"New Jersey" : 23.4,	"New Mexico" : 24.6,	"New York" : 24.5,	"North Carolina" : 28.3,	"North Dakota" : 26.7,	"Ohio" : 28.6,	"Oklahoma" : 29.5,	"Oregon" : 25.4,	"Pennsylvania" : 26.7,	"Rhode Island" : 21.7,	"South Carolina" : 29.7,	"South Dakota" : 26.9,	"Tennessee" : 30.2,	"Texas" : 27.9,	"Utah" : 22.5,	"Vermont" : 22.1,	"Virginia" : 25.4,	"Washington" : 25.4,	"West Virginia" : 31.1,	"Wisconsin" : 26,	"Wyoming" : 24.3},"2012" : 	{"Alabama" : 33,	"Alaska" : 25.7,	"Arizona" : 26,	"Arkansas" : 34.5,	"California" : 25,	"Colorado" : 20.5,	"Connecticut" : 25.6,	"Delaware" : 26.9,	"District of Columbia" : 21.9,	"Florida" : 25.2,	"Georgia" : 29.1,	"Hawaii" : 23.6,	"Idaho" : 26.8,	"Illinois" : 28.1,	"Indiana" : 31.4,	"Iowa" : 30.4,	"Kansas" : 29.9,	"Kentucky" : 31.3,	"Louisiana" : 34.7,	"Maine" : 28.4,	"Maryland" : 27.6,	"Massachusetts" : 22.9,	"Michigan" : 31.1,	"Minnesota" : 25.7,	"Mississippi" : 34.6,	"Missouri" : 29.6,	"Montana" : 24.3,	"Nebraska" : 28.6,	"Nevada" : 26.2,	"New Hampshire" : 27.3,	"New Jersey" : 24.6,	"New Mexico" : 27.1,	"New York" : 23.6,	"North Carolina" : 29.6,	"North Dakota" : 29.7,	"Ohio" : 30.1,	"Oklahoma" : 32.2,	"Oregon" : 27.3,	"Pennsylvania" : 29.1,	"Rhode Island" : 25.7,	"South Carolina" : 31.6,	"South Dakota" : 28.1,	"Tennessee" : 31.1,	"Texas" : 29.2,	"Utah" : 24.3,	"Vermont" : 23.7,	"Virginia" : 27.4,	"Washington" : 26.8,	"West Virginia" : 33.8,	"Wisconsin" : 29.7,	"Wyoming" : 24.6},"2016" : 	{"Alabama" : 35.6,	"Alaska" : 29.8,	"Arizona" : 28.4,	"Arkansas" : 34.5,	"California" : 24.2,	"Colorado" : 20.2,	"Connecticut" : 25.3,	"Delaware" : 29.7,	"District of Columbia" : 22.1,	"Florida" : 26.8,	"Georgia" : 30.7,	"Hawaii" : 22.7,	"Idaho" : 28.6,	"Illinois" : 30.8,	"Indiana" : 31.3,	"Iowa" : 32.1,	"Kansas" : 34.2,	"Kentucky" : 34.6,	"Louisiana" : 36.2,	"Maine" : 30,	"Maryland" : 28.9,	"Massachusetts" : 24.3,	"Michigan" : 31.2,	"Minnesota" : 26.1,	"Mississippi" : 35.6,	"Missouri" : 32.4,	"Montana" : 23.6,	"Nebraska" : 31.4,	"Nevada" : 26.7,	"New Hampshire" : 26.3,	"New Jersey" : 25.6,	"New Mexico" : 28.8,	"New York" : 25,	"North Carolina" : 30.1,	"North Dakota" : 31,	"Ohio" : 29.8,	"Oklahoma" : 33.9,	"Oregon" : 30.1,	"Pennsylvania" : 30,	"Rhode Island" : 26,	"South Carolina" : 31.7,	"South Dakota" : 30.4,	"Tennessee" : 33.8,	"Texas" : 32.4,	"Utah" : 24.5,	"Vermont" : 25.1,	"Virginia" : 29.2,	"Washington" : 26.4,	"West Virginia" : 35.6,	"Wisconsin" : 30.7,	"Wyoming" : 29}}

d3.json("data/maps/election_results.json", function(data) {

	var s = document.querySelector('.select');

	var year = s.value;
	drawMaps(year);

	s.addEventListener("change", function() {
		year = s.value;
		var obesityHeading = document.querySelector('.obesity-heading');
		console.log(obesityHeading);
		if (year == 2016) {
			obesityHeading.innerHTML = 'Obesity <br><span class="small-text">(using data from 2015 since data from 2016 is not yet available)</span>';
		}
		else {
			obesityHeading.innerHTML = 'Obesity';
		}
		drawMaps(year);
	});


	function drawMaps(year) {

		var yearlyData = data[year];
		var yearlyObesityRates = obesityRates[year];

		var numRedStates = 0;

		var caseValues = new Array(4);
		caseValues.fill(0);

		var fattestStates = [];

		for (var state in yearlyData) {
			numRedStates += yearlyData[state];
		}

		for (var state in yearlyObesityRates) {
			fattestStates.push([state, yearlyObesityRates[state]]);
		}

		fattestStates.sort(function(a, b) {
			return b[1] - a[1];
		});

		fattestStates = fattestStates.slice(0, numRedStates);

		fattestStatesObj = {};

		for (var i = 0; i < numRedStates; i++) {
			fattestStatesObj[fattestStates[i][0]] = fattestStates[i][1];
		}

		var tooltipElection = d3.select("body").append("div")   
		    .attr("class", "tooltip-election")
		    .style("opacity", 0);

	    var tooltipFat = d3.select("body").append("div")   
		    .attr("class", "tooltip-fat")
		    .style("opacity", 0);

		var tooltipCompare = d3.select("body").append("div")   
		    .attr("class", "tooltip-fat")
		    .style("opacity", 0);

		// http://stackoverflow.com/questions/22452112/nvd3-clear-svg-before-loading-new-chart
		d3.selectAll("svg > *").remove();

		var svgElection = d3.select('.svg-election')
				.attr("width", width)
				.attr("height", height);

		var svgFat = d3.select('.svg-fat')
				.attr("width", width)
				.attr("height", height);

		var svgCompare = d3.select('.svg-compare')
				.attr("width", width)
				.attr("height", height);

		color.domain([0,1,2,3]);

		// Load GeoJSON data and merge with states data
		d3.json("data/maps/states_geo.json", function(json) {

			for (var state in yearlyData) {
				for (var i = 0; i < json.features.length; i++)  {

					var jsonState = json.features[i].properties.name;

					if (state === jsonState) {
						json.features[i].properties.republican = yearlyData[state];		
						break;
					}
				}
			}

			svgElection.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("class", function(d) {
					return "election " + d.properties.name;
				})
				.style("stroke", "#fff")
				.style("stroke-width", "1")
				.style("fill", function(d) {
					var party = Number (d.properties.republican);
					return color(party);
				})
				.on("mousemove", function(d) {   
					var republican = d.properties.republican == 1 ? "Republican" : "Democrat";
					tooltipElection.html(d.properties.name + "<br>" + republican);
					tooltipElection.style("left", (d3.event.pageX) + "px")     
			        	.style("left", (d3.event.pageX + 9) + "px")  
			        	.style("top", (d3.event.pageY + 9) + "px");
			    	tooltipElection.transition()        
			      	   .duration(200)      
			           .style("opacity", .9);         
				})
			    .on("mouseout", function(d) {       
			        tooltipElection.transition()        
			           .duration(500)      
			           .style("opacity", 0);   
			    });

			// vanilla JS is great! http://vanilla-js.com
		    var election = document.querySelector('.election-heading');

			election.innerHTML = elections[year] + " - " + year;

			var legendElection = document.querySelector('.legend-election');

			legendElection.innerHTML = "Election results of the 50 states (ME and NE treated as one state each) + DC<br>";

			// inspired by http://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e
			for (var l in legendTextElection) {
				legendElection.innerHTML += "<p class='legend-item'><span class='square " + legendTextElection[l].toLowerCase() + "'></span><span>" + legendTextElection[l] + " (" + (l == 1 ? numRedStates : 51 - numRedStates) + ")</p></span>";
			}

			svgFat.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.attr("class", function(d) {
					return "obese " + d.properties.name;
				})
				.style("stroke", "#fff")
				.style("stroke-width", "1")
				.style("fill", function(d) {
					var obesity = d.properties.name;
					return fattestStatesObj.hasOwnProperty(obesity) ? color(1) : color(0);
				})
				.on("mousemove", function(d) {   
					tooltipFat.html(d.properties.name + "<br>" + "Obesity Rate: " + yearlyObesityRates[d.properties.name] + "%");
					tooltipFat.style("left", (d3.event.pageX) + "px")     
			        	.style("left", (d3.event.pageX + 9) + "px")  
			        	.style("top", (d3.event.pageY + 9) + "px");
			    	tooltipFat.transition()        
			      	   .duration(200)      
			           .style("opacity", .9);      
				})
			    .on("mouseout", function(d) {       
			        tooltipFat.transition()        
			           .duration(500)      
			           .style("opacity", 0);   
			    });

		    var legendFat = document.querySelector('.legend-fat');

		    legendFat.innerHTML = "";

			legendFat.innerHTML += "The " + numRedStates + " most obese states (" + numRedStates	+ " is the number of states that voted Republican that year).<br>";    

			for (var l in legendTextFat) {
				legendFat.innerHTML += "<p class='legend-item'><span class='square " + legendTextFat[l].toLowerCase().split(' ').join('-')+ "'></span><span>" + legendTextFat[l] + " (" + (l == 1 ? numRedStates : 51 - numRedStates) + ")</p></span>";
			}

			// console.log(fattestStatesObj);

		    svgCompare.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "#fff")
				.style("stroke-width", "1")
				.style("fill", function(d) {
					var party = Number (d.properties.republican);
					var obesity = d.properties.name;
					var isFat = fattestStatesObj.hasOwnProperty(obesity);

					// skinny dems
					if (!party && !isFat) {
						caseValues[0]++;
						return color(0);
					}

					// fat GOP
					else if (party && isFat) {
						caseValues[1]++;
						return color(1);
					}

					// fat dems
					else if (!party && isFat) {
						caseValues[2]++;
						return color(2);
					}

					// skinny GOP
					else {
						caseValues[3]++;
						return color(3);
					}
				})

				.on("mousemove", function(d) {   
					var party = d.properties.republican == 1 ? "Republican" : "Democrat";
					tooltipCompare.html(d.properties.name + "<br>" + party + "<br>Obesity Rate: " + yearlyObesityRates[d.properties.name] + "%");
					tooltipCompare.style("left", (d3.event.pageX) + "px")   
						.style("left", (d3.event.pageX + 9) + "px")  
			        	.style("top", (d3.event.pageY + 9) + "px");
			    	tooltipCompare.transition()        
			      	   .duration(200)      
			           .style("opacity", .9);      
				})
			    .on("mouseout", function(d) {       
			        tooltipCompare.transition()        
			           .duration(500)      
			           .style("opacity", 0);   
			    });

		    var legendCompare = document.querySelector('.legend-compare');

		    legendCompare.innerHTML = 'A comparison to see the relation between voting and Obesity rates.<br>An "Obese" state is one that was coloured red in the previous map.<br>'

			for (var l in legendTextCompare) {
				legendCompare.innerHTML += "<p class='legend-item'><span class='square " + legendTextCompare[l].toLowerCase().split(' ').join('-')+ "'></span><span>" + legendTextCompare[l] + " (" + caseValues[l] + ")</p></span>";
				// if (l == 1) legendCompare.innerHTML += "<br>";
			}
		});
	}
});