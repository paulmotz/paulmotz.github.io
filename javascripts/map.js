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
			  .range(["rgb(239,29,14)","rgb(35,32,102)"]);

var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

var obesityRates = [{"Alabama":13.5},{"Alaska":7.6},{"Arkansas":12.6},{"Arizona":10.1},{"California":10.0},{"Colorado":6.8},{"Connecticut":9.3},{"District of Columbia":8.5},{"Delaware":11.5},{"Florida":11.3},{"Georgia":11.3},{"Hawaii":8.5},{"Iowa":8.8},{"Idaho":8.1},{"Illinois":9.9},{"Indiana":11.4},{"Kansas":9.7},{"Kentucky":13.4},{"Louisiana":12.7},{"Maine":9.9},{"Maryland":10.3},{"Massachusetts":8.9},{"Michigan":10.7},{"Minnesota":7.6},{"Missouri":11.5},{"Mississippi":14.7},{"Montana":7.9},{"North Carolina":10.7},{"North Dakota":8.7},{"Nebraska":8.8},{"New Hampshire":8.1},{"New Jersey":9.0},{"New Mexico":11.5},{"Nevada":9.7},{"New York":9.8},{"Ohio":11.0},{"Oklahoma":11.7},{"Oregon":10.7},{"Pennsylvania":10.4},{"Rhode Island":9.0},{"South Carolina":11.8},{"South Dakota":9.3},{"Tennessee":12.7},{"Texas":11.4},{"Utah":7.0},{"Virginia":10.3},{"Vermont":8.2},{"Washington":8.4},{"Wisconsin":8.4},{"West Virginia":14.5},{"Wyoming":8.4}];

var redStates = 30;

obesityRates = obesityRates.sort(function(a, b) {
	return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
})

var fattestStates = [];

for (var i = 0; i < 30; i++) {
	fattestStates.push(Object.keys(obesityRates[i])[0]);
}

//Create SVG element and append map to the SVG

// svg.append('circle').attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");

// Append Div for tooltip to SVG
// var div = d3.select("body")
// 		    .append("div")   
//     		.attr("class", "tooltip")               
//     		.style("opacity", 0);

// Load in my states data!
d3.csv("stateslived.csv", function(data) {

	var svgElection = d3.select('.svg-election')
			.attr("width", width)
			.attr("height", height);

	var svgFat = d3.select('.svg-fat')
			.attr("width", width)
			.attr("height", height);


	color.domain([0,1]); // setting the range of the input data

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

				// Copy the data value into the JSON
				json.features[j].properties.republican = dataValue; 

				// Stop looking through the JSON
				break;
				}
			}
		}

	console.log(obesityRates);

	// Bind the data to the SVG and create one path per GeoJSON feature
	svgElection.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("stroke", "#fff")
		.style("stroke-width", "1")
		.style("fill", function(d) {

			var value = Number (d.properties.republican);

			return color(value);
		});

	svgFat.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("stroke", "#fff")
		.style("stroke-width", "1")
		.style("fill", function(d) {

			var obesity = d.properties.name;

			return fattestStates.indexOf(obesity) === -1 ? color(1) : color(0);
		});
		 
		// Map the cities I have lived in!
		// d3.csv("cities-lived.csv", function(data) {

			// svg.selectAll("circle")
			// 	.data(data)
			// 	.enter()
			// 	.append("circle")
			// 	.attr("cx", function(d) {
			// 		return projection([d.lon, d.lat])[0];
			// 	})
			// 	.attr("cy", function(d) {
			// 		return projection([d.lon, d.lat])[1];
			// 	})
			// 	.attr("r", function(d) {
			// 		return Math.sqrt(d.years) * 4;
			// 	})
			// 		.style("fill", "rgb(217,91,67)")	
			// 		.style("opacity", 0.85)	

				// Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
				// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
				// .on("mouseover", function(d) {      
			 //    	div.transition()        
			 //      	   .duration(200)      
			 //           .style("opacity", .9);      
			 //           div.text(d.place)
			 //           .style("left", (d3.event.pageX) + "px")     
			 //           .style("top", (d3.event.pageY - 28) + "px");    
				// })   

			 //    // fade out tooltip on mouse out               
			 //    .on("mouseout", function(d) {       
			 //        div.transition()        
			 //           .duration(500)      
			 //           .style("opacity", 0);   
			 //    });
		// });  
        
		// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
		// var legend = d3.select("body").append("svg")
		//       			.attr("class", "legend")
		//      			.attr("width", 140)
		//     			.attr("height", 200)
		//    				.selectAll("g")
		//    				.data(color.domain().slice().reverse())
		//    				.enter()
		//    				.append("g")
		//      			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		//   	legend.append("rect")
		//    		  .attr("width", 18)
		//    		  .attr("height", 18)
		//    		  .style("fill", color);

		//   	legend.append("text")
		//   		  .data(legendText)
		//       	  .attr("x", 24)
		//       	  .attr("y", 9)
		//       	  .attr("dy", ".35em")
		//       	  .text(function(d) { return d; });
	});
});