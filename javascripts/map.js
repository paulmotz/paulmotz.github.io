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

var colors = ["rgb(35,32,102)", "rgb(239,29,14)", "Purple", "Orange"];
		
var color = d3.scaleLinear()
			  .range(colors);

var legendTextElection = ["Democrat", "Republican"];
var legendTextFat = ["Not Diabetic", "Diabetic"];
var legendTextCompare = ["Democrat and Not Diabetic", "Republican and Diabetic", "Democrat and Diabetic", "Republican and Not Diabetic"];

var caseValues = new Array(4);
caseValues.fill(0);

var obesityRates = {"Alabama":13.5,"Alaska":7.6,"Arkansas":12.6,"Arizona":10.1,"California":10.0,"Colorado":6.8,"Connecticut":9.3,"District of Columbia":8.5,"Delaware":11.5,"Florida":11.3,"Georgia":11.3,"Hawaii":8.5,"Iowa":8.8,"Idaho":8.1,"Illinois":9.9,"Indiana":11.4,"Kansas":9.7,"Kentucky":13.4,"Louisiana":12.7,"Maine":9.9,"Maryland":10.3,"Massachusetts":8.9,"Michigan":10.7,"Minnesota":7.6,"Missouri":11.5,"Mississippi":14.7,"Montana":7.9,"North Carolina":10.7,"North Dakota":8.7,"Nebraska":8.8,"New Hampshire":8.1,"New Jersey":9.0,"New Mexico":11.5,"Nevada":9.7,"New York":9.8,"Ohio":11.0,"Oklahoma":11.7,"Oregon":10.7,"Pennsylvania":10.4,"Rhode Island":9.0,"South Carolina":11.8,"South Dakota":9.3,"Tennessee":12.7,"Texas":11.4,"Utah":7.0,"Virginia":10.3,"Vermont":8.2,"Washington":8.4,"Wisconsin":8.4,"West Virginia":14.5,"Wyoming":8.4}

var redStates = 30;

var fattestStates = [];

for (var state in obesityRates) {
	fattestStates.push([state, obesityRates[state]]);
}

fattestStates.sort(function(a, b) {
	return b[1] - a[1];
});

fattestStates = fattestStates.slice(0, redStates);

fattestStatesObj = {};

for (var i = 0; i < redStates; i++) {
	fattestStatesObj[fattestStates[i][0]] = fattestStates[i][1];
}

// TODO: should change this once I find election data
// Load in my states data!
d3.csv("stateslived.csv", function(data) {

	var tooltipElection = d3.select("body").append("div")   
	    .attr("class", "tooltip-election")
	    .style("opacity", 0);

    var tooltipFat = d3.select("body").append("div")   
	    .attr("class", "tooltip-fat")
	    .style("opacity", 0);

	var tooltipCompare = d3.select("body").append("div")   
	    .attr("class", "tooltip-fat")
	    .style("opacity", 0);

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
	d3.json("states.json", function(json) {

		console.log(data);
		console.log(json);

		for (var i = 0; i < data.length; i++) {

			var dataState = data[i].state;

			for (var j = 0; j < json.features.length; j++)  {

				var jsonState = json.features[j].properties.name;

				if (dataState == jsonState) {
					json.features[j].properties.republican = data[i].republican;		
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
		var legendElection = document.querySelector('.legend-election');

		// inspired taken from http://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e
		for (var l in legendTextElection) {
			legendElection.innerHTML += "<p class='legend-item'><span class='square " + legendTextElection[l].toLowerCase() + "'></span><span>" + legendTextElection[l] + "</p></span>";
		}

		svgFat.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("class", function(d) {
				return "diabetes " + d.properties.name;
			})
			.style("stroke", "#fff")
			.style("stroke-width", "1")
			.style("fill", function(d) {
				var obesity = d.properties.name;
				return fattestStatesObj.hasOwnProperty(obesity) ? color(1) : color(0);
			})
			.on("mousemove", function(d) {   
				tooltipFat.html(d.properties.name + "<br>" + "Diabetes Rate: " + obesityRates[d.properties.name] + "%");
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

		for (var l in legendTextFat) {
			legendFat.innerHTML += "<p class='legend-item'><span class='square " + legendTextFat[l].toLowerCase().split(' ').join('-')+ "'></span><span>" + legendTextFat[l] + "</p></span>";
		}

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
				tooltipCompare.html(d.properties.name + "<br>" + party + "<br>Diabetes Rate: " + obesityRates[d.properties.name] + "%");
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

		for (var l in legendTextCompare) {
			legendCompare.innerHTML += "<p class='legend-item'><span class='square " + legendTextCompare[l].toLowerCase().split(' ').join('-')+ "'></span><span>" + legendTextCompare[l] + "</p></span>";
		}
	});
});