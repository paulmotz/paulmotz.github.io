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
		
const width = 960;
const height = 500;

const projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down to see entire US
        
// Define path generator
const path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

const colors = ["rgb(35,32,102)", "rgb(239,29,14)", "Purple", "DarkOrange"];
		
const color = d3.scaleLinear()
			  .range(colors);

const legendTextElection = ["Democrat", "Republican"];
const legendTextObese = ["Less Obese", "More Obese"];
const legendTextCompare = ["Democrat and Less Obese", "Republican and More Obese", "Democrat and More Obese", "Republican and Less Obese"];

const elections = {"2008" : "Obama vs. McCain", "2012" : "Obama vs. Romney", "2016" : "Trump vs. Clinton"};

const diabetesRates = {"Alabama":13.5,"Alaska":7.6,"Arkansas":12.6,"Arizona":10.1,"California":10.0,"Colorado":6.8,"Connecticut":9.3,"District of Columbia":8.5,"Delaware":11.5,"Florida":11.3,"Georgia":11.3,"Hawaii":8.5,"Iowa":8.8,"Idaho":8.1,"Illinois":9.9,"Indiana":11.4,"Kansas":9.7,"Kentucky":13.4,"Louisiana":12.7,"Maine":9.9,"Maryland":10.3,"Massachusetts":8.9,"Michigan":10.7,"Minnesota":7.6,"Missouri":11.5,"Mississippi":14.7,"Montana":7.9,"North Carolina":10.7,"North Dakota":8.7,"Nebraska":8.8,"New Hampshire":8.1,"New Jersey":9.0,"New Mexico":11.5,"Nevada":9.7,"New York":9.8,"Ohio":11.0,"Oklahoma":11.7,"Oregon":10.7,"Pennsylvania":10.4,"Rhode Island":9.0,"South Carolina":11.8,"South Dakota":9.3,"Tennessee":12.7,"Texas":11.4,"Utah":7.0,"Virginia":10.3,"Vermont":8.2,"Washington":8.4,"Wisconsin":8.4,"West Virginia":14.5,"Wyoming":8.4}

const obesityRates = {"2008" : {"Alabama" : 31.2,	"Alaska" : 27.2,	"Arizona" : 24.8,	"Arkansas" : 28.6,	"California" : 23.6,	"Colorado" : 18.9,	"Connecticut" : 21.3,	"Delaware" : 27.3,	"District of Columbia" : 22.3,	"Florida" : 24.1,	"Georgia" : 27.9,	"Hawaii" : 21.8,	"Idaho" : 24.8,	"Illinois" : 25.9,	"Indiana" : 27.4,	"Iowa" : 26.7,	"Kansas" : 27.2,	"Kentucky" : 29,	"Louisiana" : 28.9,	"Maine" : 24.7,	"Maryland" : 26,	"Massachusetts" : 21.2,	"Michigan" : 28.8,	"Minnesota" : 25.3,	"Mississippi" : 32.5,	"Missouri" : 28.1,	"Montana" : 22.7,	"Nebraska" : 26.9,	"Nevada" : 25.1,	"New Hampshire" : 24.1,	"New Jersey" : 23.4,	"New Mexico" : 24.6,	"New York" : 24.5,	"North Carolina" : 28.3,	"North Dakota" : 26.7,	"Ohio" : 28.6,	"Oklahoma" : 29.5,	"Oregon" : 25.4,	"Pennsylvania" : 26.7,	"Rhode Island" : 21.7,	"South Carolina" : 29.7,	"South Dakota" : 26.9,	"Tennessee" : 30.2,	"Texas" : 27.9,	"Utah" : 22.5,	"Vermont" : 22.1,	"Virginia" : 25.4,	"Washington" : 25.4,	"West Virginia" : 31.1,	"Wisconsin" : 26,	"Wyoming" : 24.3},"2012" : 	{"Alabama" : 33,	"Alaska" : 25.7,	"Arizona" : 26,	"Arkansas" : 34.5,	"California" : 25,	"Colorado" : 20.5,	"Connecticut" : 25.6,	"Delaware" : 26.9,	"District of Columbia" : 21.9,	"Florida" : 25.2,	"Georgia" : 29.1,	"Hawaii" : 23.6,	"Idaho" : 26.8,	"Illinois" : 28.1,	"Indiana" : 31.4,	"Iowa" : 30.4,	"Kansas" : 29.9,	"Kentucky" : 31.3,	"Louisiana" : 34.7,	"Maine" : 28.4,	"Maryland" : 27.6,	"Massachusetts" : 22.9,	"Michigan" : 31.1,	"Minnesota" : 25.7,	"Mississippi" : 34.6,	"Missouri" : 29.6,	"Montana" : 24.3,	"Nebraska" : 28.6,	"Nevada" : 26.2,	"New Hampshire" : 27.3,	"New Jersey" : 24.6,	"New Mexico" : 27.1,	"New York" : 23.6,	"North Carolina" : 29.6,	"North Dakota" : 29.7,	"Ohio" : 30.1,	"Oklahoma" : 32.2,	"Oregon" : 27.3,	"Pennsylvania" : 29.1,	"Rhode Island" : 25.7,	"South Carolina" : 31.6,	"South Dakota" : 28.1,	"Tennessee" : 31.1,	"Texas" : 29.2,	"Utah" : 24.3,	"Vermont" : 23.7,	"Virginia" : 27.4,	"Washington" : 26.8,	"West Virginia" : 33.8,	"Wisconsin" : 29.7,	"Wyoming" : 24.6},"2016" : 	{"Alabama" : 35.7,	"Alaska" : 31.4,	"Arizona" : 29.0,	"Arkansas" : 35.7,	"California" : 25.0,	"Colorado" : 22.3,	"Connecticut" : 26.0,	"Delaware" : 30.7,	"District of Columbia" : 22.6,	"Florida" : 27.4,	"Georgia" : 31.4,	"Hawaii" : 23.8,	"Idaho" : 27.4,	"Illinois" : 31.6,	"Indiana" : 32.5,	"Iowa" : 32.0,	"Kansas" : 31.2,	"Kentucky" : 34.2,	"Louisiana" : 35.5,	"Maine" : 29.9,	"Maryland" : 29.9,	"Massachusetts" : 23.6,	"Michigan" : 32.5,	"Minnesota" : 27.8,	"Mississippi" : 37.3,	"Missouri" : 31.7,	"Montana" : 25.5,	"Nebraska" : 32.0,	"Nevada" : 25.8,	"New Hampshire" : 26.6,	"New Jersey" : 27.4,	"New Mexico" : 28.3,	"New York" : 25.5,	"North Carolina" : 31.8,	"North Dakota" : 31.9,	"Ohio" : 31.5,	"Oklahoma" : 32.8,	"Oregon" : 28.7,	"Pennsylvania" : 30.3,	"Rhode Island" : 26.6,	"South Carolina" : 32.3,	"South Dakota" : 29.6,	"Tennessee" : 34.8,	"Texas" : 33.7,	"Utah" : 25.4,	"Vermont" : 27.1,	"Virginia" : 29.0,	"Washington" : 28.6,	"West Virginia" : 37.7,	"Wisconsin" : 30.7,	"Wyoming" : 27.7}}

d3.json("data/maps/election_results.json", function(data) {

	const s = document.querySelector('.select');

	let year = s.value;
	drawMaps(year);

	s.addEventListener("change", function() {
		year = s.value;
		drawMaps(year);
	});


	function drawMaps(year) {
		const yearlyData = data[year];
		const yearlyObesityRates = obesityRates[year];

		let numRedStates = 0;

		const caseValues = new Array(4);
		caseValues.fill(0);

		const states = [];

		for (const state in yearlyData) {
			numRedStates += yearlyData[state];
		}

		for (const state in yearlyObesityRates) {
			states.push([state, yearlyObesityRates[state]]);
		}

		states.sort(function(a, b) {
			return b[1] - a[1];
		});

		mostObeseStates = states.slice(0, numRedStates);

		mostObeseStatesObj = {};

		for (const obeseState of mostObeseStates) {
			mostObeseStatesObj[obeseState[0]] = obeseState[1];
		}

		const tooltipElection = d3.select("body").append("div")   
		    .attr("class", "tooltip-election")
		    .style("opacity", 0);

	    const tooltipObese = d3.select("body").append("div")   
		    .attr("class", "tooltip-obese")
		    .style("opacity", 0);

		const tooltipCompare = d3.select("body").append("div")   
		    .attr("class", "tooltip-compare")
		    .style("opacity", 0);

		// http://stackoverflow.com/questions/22452112/nvd3-clear-svg-before-loading-new-chart
		d3.selectAll("svg > *").remove();

		const svgElection = d3.select('.svg-election')
				.attr("width", width)
				.attr("height", height);

		const svgObese = d3.select('.svg-obese')
				.attr("width", width)
				.attr("height", height);

		const svgCompare = d3.select('.svg-compare')
				.attr("width", width)
				.attr("height", height);

		color.domain([0,1,2,3]);

		// Load GeoJSON data and merge with states data
		d3.json("data/maps/states_geo.json", function(json) {

			for (const state in yearlyData) {
				for (const feature of json.features)  {
					const name = feature.properties.name;

					if (state === name) {
						feature.properties.republican = yearlyData[state];		
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
					const party = Number (d.properties.republican);
					return color(party);
				})
				.on("mousemove", function(d) {   
					const republican = d.properties.republican == 1 ? "Republican" : "Democrat";
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
		    const election = document.querySelector('.election-heading');

			election.innerHTML = elections[year] + " - " + year;

			const legendElection = document.querySelector('.legend-election');

			legendElection.innerHTML = "Election results of the 50 states (ME and NE treated as one state each) + DC<br>";


			// inspired by http://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e
			for (const index in legendTextElection) {
				legendElection.innerHTML += "<p class='legend-item'><span class='square " + 
					legendTextElection[index].toLowerCase() + "'></span><span>" + 
					legendTextElection[index] + " (" + 
					(index == 1 ? numRedStates : 51 - numRedStates) + ")</p></span>";
			}

			svgObese.selectAll("path")
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
					const obesity = d.properties.name;
					return mostObeseStatesObj.hasOwnProperty(obesity) ? color(1) : color(0);
				})
				.on("mousemove", function(d) {   
					tooltipObese.html(d.properties.name + "<br>" + "Obesity Rate: " + yearlyObesityRates[d.properties.name] + "%");
					tooltipObese.style("left", (d3.event.pageX) + "px")     
			        	.style("left", (d3.event.pageX + 9) + "px")  
			        	.style("top", (d3.event.pageY + 9) + "px");
			    	tooltipObese.transition()        
			      	   .duration(200)      
			           .style("opacity", .9);      
				})
			    .on("mouseout", function(d) {       
			        tooltipObese.transition()        
			           .duration(500)      
			           .style("opacity", 0);   
			    });

		    const legendObese = document.querySelector('.legend-obese');

		    legendObese.innerHTML = "";

			legendObese.innerHTML += "The " + numRedStates + " most obese states (" + numRedStates	+ " is the number of states that voted Republican in " + year +").<br>";    

			for (const index in legendTextObese) {
				legendObese.innerHTML += "<p class='legend-item'><span class='square " + 
					legendTextObese[index].toLowerCase().split(' ').join('-')+ "'></span><span>" + 
					legendTextObese[index] + " (" + (index == 1 ? numRedStates : 51 - numRedStates) + 
					")</p></span>";
			}

			// console.log(mostObeseStatesObj);

		    svgCompare.selectAll("path")
				.data(json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("stroke", "#fff")
				.style("stroke-width", "1")
				.style("fill", function(d) {
					const party = Number (d.properties.republican);
					const obesity = d.properties.name;
					const isObese = mostObeseStatesObj.hasOwnProperty(obesity);

					// skinny dems
					if (!party && !isObese) {
						caseValues[0]++;
						return color(0);
					}

					// obese GOP
					else if (party && isObese) {
						caseValues[1]++;
						return color(1);
					}

					// obese dems
					else if (!party && isObese) {
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
					const party = d.properties.republican == 1 ? "Republican" : "Democrat";
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

		    const legendCompare = document.querySelector('.legend-compare');

		    legendCompare.innerHTML = 'A comparison to see the relation between voting and obesity rates.<br>This uses the same divsions as the previous two maps.<br>'

			for (const index in legendTextCompare) {
				legendCompare.innerHTML += "<p class='legend-item'><span class='square " + 
					legendTextCompare[index].toLowerCase().split(' ').join('-')+ "'></span><span>" + 
					legendTextCompare[index] + " (" + caseValues[index] + ")</p></span>";
				// if (l == 1) legendCompare.innerHTML += "<br>";
			}

			const prediction = document.getElementById('prediction');
			const correctlyPredicted = caseValues[0] + caseValues[1];
			prediction.innerHTML = 'If you had sorted the 50 states + DC by the obesity rate in ' +
									year + ', ' + 
								   'knew how many states both parties would win in ' +
								   year +
								   ' and predicted states by predicting the most obese as Republican and least obese as Democrat, ' +
								   'you would have predicted ' +
								   correctlyPredicted + '/51 states ' +
								   'or ' + Math.round(correctlyPredicted/0.51) + '% correctly.';
		});
	}
});