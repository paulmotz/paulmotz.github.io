/*  This visualization was made possible by modifying code provided by:

Scott Murray, Choropleth example from "Interactive Data Visualization for the Web" 
https://github.com/alignedleft/d3-book/blob/master/chapter_12/05_choropleth.html   
		
Malcolm Maclean, tooltips example tutorial
http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html

Mike Bostock, Pie Chart Legend
http://bl.ocks.org/mbostock/3888852  */

		
//Width and height of map
var width = 960;
var height = 500;

// D3 Projection
var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US
        
// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

		
// Define linear scale for output
var color = d3.scaleLinear()
			  .range(["rgb(35,32,102)", "rgb(239,29,14)", "Purple", "Orange"]);

var legendText = ["Democrat and Not Diabetic", "Republican and Diabetic", "Democrat and Diabetic", "Republican and Not Diabetic"];

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

	color.domain([0,1,2,3]); // setting the range of the input data

	// Load GeoJSON data and merge with states data
	d3.json("states.json", function(json) {

		// Loop through each state data value in the .csv file
		for (var i = 0; i < data.length; i++) {

			// Grab State Name
			var dataState = data[i].state;

			// Grab data value 
			var dataValue = data[i].republican;

			// Find the corresponding state inside the GeoJSON
			for (var j = 0; j < json.features.length; j++)  {

				var jsonState = json.features[j].properties.name;

				if (dataState == jsonState) {
					json.features[j].properties.republican = dataValue;		
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
	           .style("top", (d3.event.pageY - 28) + "px");
	    	tooltipElection.transition()        
	      	   .duration(200)      
	           .style("opacity", .9);         
		})
	    .on("mouseout", function(d) {       
	        tooltipElection.transition()        
	           .duration(500)      
	           .style("opacity", 0);   
	    });

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
	           .style("top", (d3.event.pageY - 28) + "px");
	    	tooltipFat.transition()        
	      	   .duration(200)      
	           .style("opacity", .9);      
		})
	    .on("mouseout", function(d) {       
	        tooltipFat.transition()        
	           .duration(500)      
	           .style("opacity", 0);   
	    });

    svgCompare.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		// .attr("class", function(d) {
		// 	return "diabetes " + d.properties.name;
		// })
		.style("stroke", "#fff")
		.style("stroke-width", "1")
		.style("fill", function(d) {
			var party = Number (d.properties.republican);
			var obesity = d.properties.name;
			var isFat = fattestStatesObj.hasOwnProperty(obesity);

			// skinny dems
			if (!party && !isFat) {
				return color(0);
			}

			// fat GOP
			else if (party && isFat) {
				return color(1);
			}

			// fat dems
			else if (!party && isFat) {
				return color(2);
			}

			// skinny GOP
			else {
				return color(3);
			}
		})
		.on("mousemove", function(d) {   
			var party = d.properties.republican == 1 ? "Republican" : "Democrat";
			tooltipCompare.html(d.properties.name + "<br>" + party + "<br>Diabetes Rate: " + obesityRates[d.properties.name] + "%");
			tooltipCompare.style("left", (d3.event.pageX) + "px")     
	           .style("top", (d3.event.pageY - 28) + "px");
	    	tooltipCompare.transition()        
	      	   .duration(200)      
	           .style("opacity", .9);      
		})
	    .on("mouseout", function(d) {       
	        tooltipCompare.transition()        
	           .duration(500)      
	           .style("opacity", 0);   
	    });
        
		var legend = d3.select("body").append("svg")
		      			.attr("class", "legend")
		   				.selectAll("g")
		   				.data(color.domain().slice())
		   				.enter()
		   				.append("g")
		     			.attr("transform", function(d, i) { return "translate(50," + i * 20 + ")"; });

		  	legend.append("rect")
		   		  .attr("width", 18)
		   		  .attr("height", 18)
		   		  .style("fill", color);

		  	legend.append("text")
		  		  .data(legendText)
		      	  .attr("x", 24)
		      	  .attr("y", 9)
		      	  .attr("dy", ".35em")
		      	  .text(function(d) { return d; });
	});
});