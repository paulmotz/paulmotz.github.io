'use strict'

const API_KEY = 'AIzaSyAt7-wsqBEer1WzVeBiLS9MGDmGH7vMvec';
// const API_KEY = 'AIzaSyD61O3-u1OiCc1hRZnAS8COMZh7_KfQtGI'

let americanTeams = {
	'Anaheim Ducks' : {
		city : 'Anaheim, CA',
	},
	'Arizona Coyotes' : {
		city : 'Phoenix, AZ',
	},
	'Boston Bruins' : {
		city : 'Boston, MA',
	},
	'Buffalo Sabres' : {
		city : 'Buffalo, NY',
	},
	'Calgary Flames' : {
		city : 'Calgary, AB',
	},
	'Carolina Hurricanes' : {
		city : 'Carolina, NC',
	},
	'Chicago Blackhawks' : {
		city : 'Chicago, IL',
	},
	'Colorado Avalanche' : {
		city : 'Denver, CO',
	},
	'Columbus Blue Jackets' : {
		city : 'Columbus, OH',
	},
	'Dallas Stars' : {
		city : 'Dallas, TX',
	},
	'Detroit Red Wings' : {
		city : 'Detroit, MI',
	},
	'Edmonton Oilers' : {
		city : 'Edmonton, AB',
	},
	'Florida Panthers' : {
		city : 'Sunrise, FL',
	},
	'Las Vegas Golden Knights' : {
		city : 'Las Vegas, NV',
	},
	'Los Angeles Kings' : {
		city : 'Los Angeles, CA',
	},
	'Minnesota Wild' : {
		city : 'St Paul, MN',
	},
	'Montreal Canadiens' : {
		city : 'Montreal, QC',
	},
	'Nashville Predators' : {
		city : 'Nashville, TN',
	},
	'New Jersey Devils' : {
		city : 'Newark, NJ',
	},
	'New York Islanders' : {
		city : 'Brooklyn, NY',
	},
	'New York Rangers' : {
		city : 'Manhattan, NY',
	},
	'Ottawa Senators' : {
		city : 'Ottawa, ON',
	},
	'Philadelphia Flyers' : {
		city : 'Philadelphia, PA',
	},
	'Pittsburgh Penguins' : {
		city : 'Pittsburgh, PA',
	},
	'St. Louis Blues' : {
		city : 'St Louis, MO',
	},
	'San Jose Sharks' : {
		city : 'San Jose, CA',
	},
	'Tampa Bay Lightning' : {
		city : 'Tampa Bay, FL',
	},
	'Toronto Maple Leafs' : {
		city : 'Toronto, ON',
	},
	'Vancouver Canucks' : {
		city : 'Vancouver, BC',
	},
	'Washington Capitals' : {
		city : 'Washington DC',
	},
	'Winnipeg Jets' : {
		city : 'Winnipeg, MB'
	}
}

let teamInfo = {
	'Anaheim Ducks': {
		canadian: false,
		city: 'Anaheim, CA', 
		location: {lat: 33.8365932, lng: -117.9143012}
	},
	'Arizona Coyotes': {
		canadian: false,
		city: 'Phoenix, AZ', 
		location: {lat: 33.4483771, lng: -112.0740373}
	},
	'Boston Bruins': {
		canadian: false,
		city: 'Boston, MA', 
		location: {lat: 42.3600825, lng: -71.0588801}
	},
	'Buffalo Sabres': {
		canadian: false,
		city: 'Buffalo, NY', 
		location: {lat: 42.88644679999999, lng: -78.8783689}
	},
	'Calgary Flames': {
		canadian: true,
		city: 'Calgary, AB', 
		location: {lat: 51.0486151, lng: -114.0708459}
	},
	'Carolina Hurricanes': {
		canadian: false,
		city: 'Carolina, NC', 
		location: {lat: 35.7354457, lng: -77.2635038}
	},
	'Chicago Blackhawks': {
		canadian: false,
		city: 'Chicago, IL', 
		location: {lat: 41.8781136, lng: -87.6297982}
	},
	'Colorado Avalanche': {
		canadian: false,
		city: 'Denver, CO', 
		location: {lat: 39.7392358, lng: -104.990251}
	},
	'Columbus Blue Jackets': {
		canadian: false,
		city: 'Columbus, OH', 
		location: {lat: 39.9611755, lng: -82.99879419999999}
	},
	'Dallas Stars': {
		canadian: false,
		city: 'Dallas, TX', 
		location: {lat: 32.7766642, lng: -96.79698789999999}
	},
	'Detroit Red Wings': {
		canadian: false,
		city: 'Detroit, MI', 
		location: {lat: 42.331427, lng: -83.0457538}
	},
	'Edmonton Oilers': {
		canadian: true,
		city: 'Edmonton, AB', 
		location: {lat: 53.544389, lng: -113.4909267}
	},
	'Florida Panthers': {
		canadian: false,
		city: 'Sunrise, FL', 
		location: {lat: 26.1669711, lng: -80.25659499999999}
	},
	'Las Vegas Golden Knights': {
		canadian: false,
		city: 'Las Vegas, NV', 
		location: {lat: 36.1699412, lng: -115.1398296}
	},
	'Los Angeles Kings': {
		canadian: false,
		city: 'Los Angeles, CA', 
		location: {lat: 34.0522342, lng: -118.2436849}
	},
	'Minnesota Wild': {
		canadian: false,
		city: 'St Paul, MN', 
		location: {lat: 44.9537029, lng: -93.0899578}
	},
	'Montreal Canadiens': {
		canadian: true,
		city: 'Montreal, QC', 
		location: {lat: 45.5016889, lng: -73.567256}
	},
	'Nashville Predators': {
		canadian: false,
		city: 'Nashville, TN', 
		location: {lat: 36.1626638, lng: -86.7816016}
	},
	'New Jersey Devils': {
		canadian: false,
		city: 'Newark, NJ', 
		location: {lat: 40.735657, lng: -74.1723667}
	},
	'New York Islanders': {
		canadian: false,
		city: 'Brooklyn, NY', 
		location: {lat: 40.6781784, lng: -73.9441579}
	},
	'New York Rangers': {
		canadian: false,
		city: 'Manhattan, NY', 
		location: {lat: 40.7830603, lng: -73.9712488}
	},
	'Ottawa Senators': {
		canadian: true,
		city: 'Ottawa, ON', 
		location: {lat: 45.4215296, lng: -75.69719309999999}
	},
	'Philadelphia Flyers': {
		canadian: false,
		city: 'Philadelphia, PA', 
		location: {lat: 39.9525839, lng: -75.1652215}
	},
	'Pittsburgh Penguins': {
		canadian: false,
		city: 'Pittsburgh, PA', 
		location: {lat: 40.44062479999999, lng: -79.9958864}
	},
	'San Jose Sharks': {
		canadian: false,
		city: 'San Jose, CA', 
		location: {lat: 37.3382082, lng: -121.8863286}
	},
	'St. Louis Blues': {
		canadian: false,
		city: 'St Louis, MO', 
		location: {lat: 38.6270025, lng: -90.19940419999999}
	},
	'Tampa Bay Lightning': {
		canadian: false,
		city: 'Tampa Bay, FL', 
		location: {lat: 27.950575, lng: -82.4571776}
	},
	'Toronto Maple Leafs': {
		canadian: true,
		city: 'Toronto, ON', 
		location: {lat: 43.653226, lng: -79.3831843}
	},
	'Vancouver Canucks': {
		canadian: true,
		city: 'Vancouver, BC', 
		location: {lat: 49.2827291, lng: -123.1207375}
	},
	'Washington Capitals': {
		canadian: false,
		city: 'Washington DC', 
		location: {lat: 38.9071923, lng: -77.0368707}
	},
	'Winnipeg Jets': {
		canadian: true,
		city: 'Winnipeg, MB', 
		location: {lat: 49.895136, lng: -97.13837439999999}
	}
}

let teams = {} 
for (const team of Object.keys(teamInfo)) {
	teams[team] = [];
}

$('.info')

$(document).ready(function(){
	// for (const team in americanTeams) {
	// 	$.ajax({
	//     type: "GET",
	//     url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + teams[team].city + "&sensor=false&key=" + API_KEY,
	//     dataType: "json"
 //  	}).success(data => {
 //  		americanTeams[team].location = data.results[0].geometry.location;
 //  	});
	// }
	for (const player in players) {
		if (players[player].country === 'CAN' || players[player].country === 'USA') {
			findClosest(player, players[player].country === 'CAN');
		}
	}
});

function findClosest(player, isCanadian) {
	let city = players[player].city;
	let closestTeam;
	$.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&sensor=false&key=" + API_KEY,
    dataType: "json"
	}).success(data => {
		if (data.results.length) {
			const cityCoords = data.results[0].geometry.location;
			let minDistance = Number.MAX_SAFE_INTEGER;
			for (const team in teamInfo) {
				let distance = Math.abs(cityCoords.lat - teamInfo[team].location.lat) + Math.abs(cityCoords.lng - teamInfo[team].location.lng);
				if (isCanadian !== teamInfo[team].canadian) distance *= 2;
				if (distance < minDistance) {
					minDistance = distance;
					closestTeam = team
				}
			}
			if (teams[closestTeam]) {
				teams[closestTeam].push(player);
			}
			return closestTeam;
		}
	});	
}

function findClosestInCountry(city, isCanadian) {
	$.ajax({
    type: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&sensor=false&key=" + API_KEY,
    dataType: "json"
	}).success(data => {
		const cityCoords = data.results[0].geometry.location;
		let minDistance = Number.MAX_SAFE_INTEGER;
		let closestTeam;
		for (const team in teamInfo) {
			let distance = Math.abs(cityCoords.lat - teamInfo[team].location.lat) + Math.abs(cityCoords.lng - teamInfo[team].location.lng);
			if (distance < minDistance && isCanadian === teamInfo[team].canadian) {
				minDistance = distance;
				closestTeam = team
			}
		}
		// console.log(closestTeam)
	});
}

let players = 
	{
   "Spencer Abbott": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Justin Abdelkader": {
      "city": "Muskegon, MI",
      "country": "USA"
   },
   "Noel Acciari": {
      "city": "Johnston, RI",
      "country": "USA"
   },
   "Kenny Agostino": {
      "city": "Morristown, NJ",
      "country": "USA"
   },
   "Karl Alzner": {
      "city": "Burnaby, BC",
      "country": "CAN"
   },
   "Josh Anderson": {
      "city": "Burlington, ON",
      "country": "CAN"
   },
   "Andy Andreoff": {
      "city": "Pickering, ON",
      "country": "CAN"
   },
   "Josh Archibald": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Andreas Athanasiou": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Cam Atkinson": {
      "city": "Riverside, CT",
      "country": "USA"
   },
   "Brady Austin": {
      "city": "Bobcaygeon, ON",
      "country": "CAN"
   },
   "David Backes": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "Casey Bailey": {
      "city": "Anchorage, AK",
      "country": "USA"
   },
   "Josh Bailey": {
      "city": "Bowmanville, ON",
      "country": "CAN"
   },
   "Justin Bailey": {
      "city": "Buffalo, NY",
      "country": "USA"
   },
   "Nicholas Baptiste": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Riley Barber": {
      "city": "Pittsburgh, PA",
      "country": "USA"
   },
   "Mark Barberio": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Tyson Barrie": {
      "city": "Victoria, BC",
      "country": "CAN"
   },
   "Matt Bartkowski": {
      "city": "Pittsburgh, PA",
      "country": "USA"
   },
   "Mathew Barzal": {
      "city": "Coquitlam, BC",
      "country": "CAN"
   },
   "Cody Bass": {
      "city": "Owen sound, ON",
      "country": "CAN"
   },
   "Jay Beagle": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Francois Beauchemin": {
      "city": "Sorel, QC",
      "country": "CAN"
   },
   "Nathan Beaulieu": {
      "city": "Strathroy, ON",
      "country": "CAN"
   },
   "Anthony Beauvillier": {
      "city": "Sorel-Tracy, QC",
      "country": "CAN"
   },
   "Taylor Beck": {
      "city": "St. Catharines, ON",
      "country": "CAN"
   },
   "Matt Beleskey": {
      "city": "Windsor, ON",
      "country": "CAN"
   },
   "Jamie Benn": {
      "city": "Victoria, BC",
      "country": "CAN"
   },
   "Jordie Benn": {
      "city": "Victoria, BC",
      "country": "CAN"
   },
   "Beau Bennett": {
      "city": "Gardena, CA",
      "country": "USA"
   },
   "Sam Bennett": {
      "city": "Holland Landing, ON",
      "country": "CAN"
   },
   "Matthew Benning": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Patrice Bergeron": {
      "city": "Ancienne-Lorette, QC",
      "country": "CAN"
   },
   "Tyler Bertuzzi": {
      "city": "Sudbury, ON",
      "country": "CAN"
   },
   "Bryan Bickell": {
      "city": "Bowmanville, ON",
      "country": "CAN"
   },
   "Alex Biega": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Kevin Bieksa": {
      "city": "Grimsby, ON",
      "country": "CAN"
   },
   "Anthony Bitetto": {
      "city": "Island Park, NY",
      "country": "USA"
   },
   "Nick Bjugstad": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "Joseph Blandisi": {
      "city": "Markham, ON",
      "country": "CAN"
   },
   "Mike Blunden": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Brock Boeser": {
      "city": "Burnsville, MN",
      "country": "USA"
   },
   "Zach Bogosian": {
      "city": "Massena, NY",
      "country": "USA"
   },
   "Jared Boll": {
      "city": "Charlotte, NC",
      "country": "USA"
   },
   "Nick Bonino": {
      "city": "Hartford, CT",
      "country": "USA"
   },
   "Mark Borowiecki": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Robert Bortuzzo": {
      "city": "Thunder Bay, ON",
      "country": "CAN"
   },
   "Reid Boucher": {
      "city": "Lansing, MI",
      "country": "USA"
   },
   "Lance Bouma": {
      "city": "Provost, AB",
      "country": "CAN"
   },
   "Michael Bournival": {
      "city": "Shawinigan, QC",
      "country": "CAN"
   },
   "Gabriel Bourque": {
      "city": "Rimouski, QC",
      "country": "CAN"
   },
   "Rene Bourque": {
      "city": "Lac La Biche, AB",
      "country": "CAN"
   },
   "Jay Bouwmeester": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Johnny Boychuk": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Brian Boyle": {
      "city": "Hingham, MA",
      "country": "USA"
   },
   "Tyler Bozak": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Derick Brassard": {
      "city": "Hull, QC",
      "country": "CAN"
   },
   "Justin Braun": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "T.J. Brodie": {
      "city": "Chatham, ON",
      "country": "CAN"
   },
   "Kyle Brodziak": {
      "city": "St. Paul, AB",
      "country": "CAN"
   },
   "Jonny Brodzinski": {
      "city": "Ham Lake, MN",
      "country": "USA"
   },
   "Troy Brouwer": {
      "city": "Vancouver, BC",
      "country": "CAN"
   },
   "Connor Brown": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Dustin Brown": {
      "city": "Ithaca, NY",
      "country": "USA"
   },
   "J.T. Brown": {
      "city": "Burnsville, MN",
      "country": "USA"
   },
   "Patrick Brown": {
      "city": "Bloomfield Hills, MI",
      "country": "USA"
   },
   "Erik Burgdoerfer": {
      "city": "Abington, PA",
      "country": "USA"
   },
   "Brent Burns": {
      "city": "Barrie, ON",
      "country": "CAN"
   },
   "Alex Burrows": {
      "city": "Pincourt, QC",
      "country": "CAN"
   },
   "Chris Butler": {
      "city": "St. Louis, MO",
      "country": "USA"
   },
   "Dustin Byfuglien": {
      "city": "Roseau, MN",
      "country": "USA"
   },
   "Paul Byron": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Drake Caggiula": {
      "city": "Pickering, ON",
      "country": "CAN"
   },
   "Mitch Callahan": {
      "city": "Whittier, CA",
      "country": "USA"
   },
   "Ryan Callahan": {
      "city": "Rochester, NY",
      "country": "USA"
   },
   "Matt Calvert": {
      "city": "Brandon, MB",
      "country": "CAN"
   },
   "Mike Cammalleri": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Brian Campbell": {
      "city": "Strathroy, ON",
      "country": "CAN"
   },
   "Patrick Cannone": {
      "city": "Bayport, NY",
      "country": "USA"
   },
   "Paul Carey": {
      "city": "Boston, MA",
      "country": "USA"
   },
   "Matt Carle": {
      "city": "Anchorage, AK",
      "country": "USA"
   },
   "Brandon Carlo": {
      "city": "Colorado Springs, CO",
      "country": "USA"
   },
   "John Carlson": {
      "city": "Natick, MA",
      "country": "USA"
   },
   "Ryan Carpenter": {
      "city": "Oviedo, FL",
      "country": "USA"
   },
   "Daniel Carr": {
      "city": "Sherwood Park, AB",
      "country": "CAN"
   },
   "Connor Carrick": {
      "city": "Orland Park, IL",
      "country": "USA"
   },
   "Alex Carrier": {
      "city": "Quebec City, QC",
      "country": "CAN"
   },
   "William Carrier": {
      "city": "LaSalle, QC",
      "country": "CAN"
   },
   "Jeff Carter": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Cody Ceci": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Thomas Chabot": {
      "city": "Sainte-Marie, QC",
      "country": "CAN"
   },
   "Michael Chaput": {
      "city": "Ile Bizard, QC",
      "country": "CAN"
   },
   "Ben Chiarot": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Alex Chiasson": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Jason Chimera": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Taylor Chorney": {
      "city": "Thunder Bay, ON",
      "country": "CAN"
   },
   "Jakob Chychrun": {
      "city": "Boca Raton, FL",
      "country": "USA"
   },
   "Casey Cizikas": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Adam Clendening": {
      "city": "Niagara Falls, NY",
      "country": "USA"
   },
   "Kyle Clifford": {
      "city": "Ayr, ON",
      "country": "CAN"
   },
   "Cal Clutterbuck": {
      "city": "Welland, ON",
      "country": "CAN"
   },
   "Braydon Coburn": {
      "city": "Shaunavon, SK",
      "country": "CAN"
   },
   "Andrew Cogliano": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Joe Colborne": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Ian Cole": {
      "city": "Ann Arbor, MI",
      "country": "USA"
   },
   "Blake Coleman": {
      "city": "Plano, TX",
      "country": "USA"
   },
   "Blake Comeau": {
      "city": "Meadow Lake, SK",
      "country": "CAN"
   },
   "J.T. Compher": {
      "city": "Northbrook, IL",
      "country": "USA"
   },
   "Cory Conacher": {
      "city": "Burlington, ON",
      "country": "CAN"
   },
   "Erik Condra": {
      "city": "Trenton, MI",
      "country": "USA"
   },
   "Kevin Connauton": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Brett Connolly": {
      "city": "Campbell River, BC",
      "country": "CAN"
   },
   "Kyle Connor": {
      "city": "Shelby Twp., MI",
      "country": "USA"
   },
   "Andrew Copp": {
      "city": "Ann Arbor, MI",
      "country": "USA"
   },
   "Frank Corrado": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Nick Cousins": {
      "city": "Belleville, ON",
      "country": "CAN"
   },
   "Logan Couture": {
      "city": "Guelph, ON",
      "country": "CAN"
   },
   "Sean Couturier": {
      "city": "Phoenix, AZ",
      "country": "USA"
   },
   "Charlie Coyle": {
      "city": "E. Weymouth, MA",
      "country": "USA"
   },
   "Adam Cracknell": {
      "city": "Prince Albert, SK",
      "country": "CAN"
   },
   "Joseph Cramarossa": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Sidney Crosby": {
      "city": "Cole Harbour, NS",
      "country": "CAN"
   },
   "Lawson Crouse": {
      "city": "Mt. Brydges, ON",
      "country": "CAN"
   },
   "Matt Cullen": {
      "city": "Virginia, MN",
      "country": "USA"
   },
   "Austin Czarnik": {
      "city": "Detroit, MI",
      "country": "USA"
   },
   "Trevor Daley": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Zac Dalpe": {
      "city": "Paris, ON",
      "country": "CAN"
   },
   "Phillip Danault": {
      "city": "Victoriaville, QC",
      "country": "CAN"
   },
   "Laurent Dauphin": {
      "city": "Repentigny, QC",
      "country": "CAN"
   },
   "Brandon Davidson": {
      "city": "Lethbridge, AB",
      "country": "CAN"
   },
   "Calvin de Haan": {
      "city": "Carp, ON",
      "country": "CAN"
   },
   "Jean-Sebastien Dea": {
      "city": "Laval, QC",
      "country": "CAN"
   },
   "Anthony Deangelo": {
      "city": "Sewell, NJ",
      "country": "USA"
   },
   "Danny DeKeyser": {
      "city": "Detroit, MI",
      "country": "USA"
   },
   "Michael Del Zotto": {
      "city": "Stouffville, ON",
      "country": "CAN"
   },
   "Dylan Demelo": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Jason Demers": {
      "city": "Dorval, QC",
      "country": "CAN"
   },
   "David Desharnais": {
      "city": "Laurier-Station, QC",
      "country": "CAN"
   },
   "Andrew Desjardins": {
      "city": "Lively, ON",
      "country": "CAN"
   },
   "Nicolas Deslauriers": {
      "city": "LaSalle, QC",
      "country": "CAN"
   },
   "Simon Despres": {
      "city": "Laval, QC",
      "country": "CAN"
   },
   "Phillip Di Giuseppe": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Jason Dickinson": {
      "city": "Georgetown, ON",
      "country": "CAN"
   },
   "Chris Didomenico": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Brenden Dillon": {
      "city": "New Westminster, BC",
      "country": "CAN"
   },
   "Shane Doan": {
      "city": "Halkirk, AB",
      "country": "CAN"
   },
   "Max Domi": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Derek Dorsett": {
      "city": "Kindersley, SK",
      "country": "CAN"
   },
   "Jake Dotchin": {
      "city": "Cambridge, ON",
      "country": "CAN"
   },
   "Drew Doughty": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Nic Dowd": {
      "city": "Huntsville, AL",
      "country": "USA"
   },
   "Justin Dowling": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Jonathan Drouin": {
      "city": "Ste-Agathe, QC",
      "country": "CAN"
   },
   "Brandon Dubinsky": {
      "city": "Anchorage, AK",
      "country": "USA"
   },
   "Matt Duchene": {
      "city": "Haliburton, ON",
      "country": "CAN"
   },
   "Anthony Duclair": {
      "city": "Pointe-Claire, QC",
      "country": "CAN"
   },
   "Matt Dumba": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Gabriel Dumont": {
      "city": "Ville Degelis, QC",
      "country": "CAN"
   },
   "Brian Dumoulin": {
      "city": "Biddeford, ME",
      "country": "USA"
   },
   "Christian Dvorak": {
      "city": "Palos, IL",
      "country": "USA"
   },
   "Ryan Dzingel": {
      "city": "Wheaton, IL",
      "country": "USA"
   },
   "Cody Eakin": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Patrick Eaves": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Jordan Eberle": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Joel Edmundson": {
      "city": "Brandon, MB",
      "country": "CAN"
   },
   "Jack Eichel": {
      "city": "North Chelmsford, MA",
      "country": "USA"
   },
   "Aaron Ekblad": {
      "city": "Windsor, ON",
      "country": "CAN"
   },
   "Remi Elie": {
      "city": "Cornwall, ON",
      "country": "CAN"
   },
   "Ryan Ellis": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Deryk Engelland": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Tyler Ennis": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Adam Erne": {
      "city": "New Haven, CT",
      "country": "USA"
   },
   "Emerson Etem": {
      "city": "Long Beach, CA",
      "country": "USA"
   },
   "Robby Fabbri": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Justin Falk": {
      "city": "Snowflake, MB",
      "country": "CAN"
   },
   "Bobby Farnham": {
      "city": "North Andover, MA",
      "country": "USA"
   },
   "Hudson Fasching": {
      "city": "Milwaukee, WI",
      "country": "USA"
   },
   "Justin Faulk": {
      "city": "South St.Paul, MN",
      "country": "USA"
   },
   "Mark Fayne": {
      "city": "Nashua, NH",
      "country": "USA"
   },
   "Taylor Fedun": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Eric Fehr": {
      "city": "Winkler, MB",
      "country": "CAN"
   },
   "Micheal Ferland": {
      "city": "Swan River, MB",
      "country": "CAN"
   },
   "Vernon Fiddler": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Christian Fischer": {
      "city": "Chicago, IL",
      "country": "USA"
   },
   "Mike Fisher": {
      "city": "Peterborough, ON",
      "country": "CAN"
   },
   "Brian Flynn": {
      "city": "Lynnfield, MA",
      "country": "USA"
   },
   "Marcus Foligno": {
      "city": "Buffalo, NY",
      "country": "USA"
   },
   "Nick Foligno": {
      "city": "Buffalo, NY",
      "country": "USA"
   },
   "Derek Forbort": {
      "city": "Duluth, MN",
      "country": "USA"
   },
   "Cam Fowler": {
      "city": "Windsor, ON",
      "country": "CAN"
   },
   "Cody Franson": {
      "city": "Sicamous, BC",
      "country": "CAN"
   },
   "Byron Froese": {
      "city": "Winkler, MB",
      "country": "CAN"
   },
   "Kurtis Gabriel": {
      "city": "Newmarket, ON",
      "country": "CAN"
   },
   "Sam Gagner": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Alex Galchenyuk": {
      "city": "Milwaukee, WI",
      "country": "USA"
   },
   "Brendan Gallagher": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Ryan Garbutt": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Jake Gardiner": {
      "city": "Minnetonka, MN",
      "country": "USA"
   },
   "Jason Garrison": {
      "city": "White Rock, BC",
      "country": "CAN"
   },
   "Tyler Gaudet": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Frederick Gaudreau": {
      "city": "Bromont, QC",
      "country": "CAN"
   },
   "Johnny Gaudreau": {
      "city": "Salem, NJ",
      "country": "USA"
   },
   "Brendan Gaunce": {
      "city": "Sudbury, ON",
      "country": "CAN"
   },
   "Cameron Gaunce": {
      "city": "Sudbury, ON",
      "country": "CAN"
   },
   "Frederik Gauthier": {
      "city": "St-Lin, QC",
      "country": "CAN"
   },
   "Luke Gazdic": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Eric Gelinas": {
      "city": "Vanier, ON",
      "country": "CAN"
   },
   "Ryan Getzlaf": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Tom Gilbert": {
      "city": "Bloomington, MN",
      "country": "USA"
   },
   "Brian Gionta": {
      "city": "Rochester, NY",
      "country": "USA"
   },
   "Stephen Gionta": {
      "city": "Rochester, NY",
      "country": "USA"
   },
   "Mark Giordano": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Dan Girardi": {
      "city": "Welland, ON",
      "country": "CAN"
   },
   "Claude Giroux": {
      "city": "Hearst, ON",
      "country": "CAN"
   },
   "Tanner Glass": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Luke Glendening": {
      "city": "Grand Rapids, MI",
      "country": "USA"
   },
   "Alex Goligoski": {
      "city": "Grand Rapids, MN",
      "country": "USA"
   },
   "Cody Goloubef": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Barclay Goodrow": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Boyd Gordon": {
      "city": "Unity, SK",
      "country": "CAN"
   },
   "Josh Gorges": {
      "city": "Kelowna, BC",
      "country": "CAN"
   },
   "Shayne Gostisbehere": {
      "city": "Pembroke Pines, FL",
      "country": "USA"
   },
   "Yanni Gourde": {
      "city": "Saint-Narcisse, QC",
      "country": "CAN"
   },
   "Derek Grant": {
      "city": "Abbotsford, BC",
      "country": "CAN"
   },
   "Tyler Graovac": {
      "city": "Brampton, ON",
      "country": "CAN"
   },
   "Kevin Gravel": {
      "city": "Kingsford, MI",
      "country": "USA"
   },
   "Mike Green": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Andy Greene": {
      "city": "Trenton, MI",
      "country": "USA"
   },
   "Matt Greene": {
      "city": "Grand Ledge, MI",
      "country": "USA"
   },
   "A.J. Greer": {
      "city": "Joliette, QC",
      "country": "CAN"
   },
   "Alex Grenier": {
      "city": "Laval, QC",
      "country": "CAN"
   },
   "Seth Griffith": {
      "city": "Wallaceburg, ON",
      "country": "CAN"
   },
   "Rocco Grimaldi": {
      "city": "Anaheim, CA",
      "country": "USA"
   },
   "Eric Gryba": {
      "city": "Saskatoon, SK",
      "country": "CAN"
   },
   "Matt Grzelcyk": {
      "city": "Charlestown, MA",
      "country": "USA"
   },
   "Erik Gudbranson": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Jake Guentzel": {
      "city": "Omaha, NE",
      "country": "USA"
   },
   "Brendan Guhle": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Ron Hainsey": {
      "city": "Bolton, CT",
      "country": "USA"
   },
   "Micheal Haley": {
      "city": "Guelph, ON",
      "country": "CAN"
   },
   "Taylor Hall": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Dan Hamhuis": {
      "city": "Smithers, BC",
      "country": "CAN"
   },
   "Dougie Hamilton": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Freddie Hamilton": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Travis Hamonic": {
      "city": "St. Malo, MB",
      "country": "CAN"
   },
   "Noah Hanifin": {
      "city": "Boston, MA",
      "country": "USA"
   },
   "Joel Hanley": {
      "city": "Keswick, ON",
      "country": "CAN"
   },
   "Shane Harper": {
      "city": "Valencia, CA",
      "country": "USA"
   },
   "Ben Harpur": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Scott Harrington": {
      "city": "Kingston, ON",
      "country": "CAN"
   },
   "Ryan Hartman": {
      "city": "Hilton Head Isl., SC",
      "country": "USA"
   },
   "Scott Hartnell": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Garnet Hathaway": {
      "city": "Kennebunkport, ME",
      "country": "USA"
   },
   "John Hayden": {
      "city": "Chicago, IL",
      "country": "USA"
   },
   "Jimmy Hayes": {
      "city": "Boston, MA",
      "country": "USA"
   },
   "Kevin Hayes": {
      "city": "Dorchester, MA",
      "country": "USA"
   },
   "Danton Heinen": {
      "city": "Langley, BC",
      "country": "CAN"
   },
   "Seth Helgeson": {
      "city": "Faribault, MN",
      "country": "USA"
   },
   "Darren Helm": {
      "city": "St. Andrews, MB",
      "country": "CAN"
   },
   "Matt Hendricks": {
      "city": "Blaine, MN",
      "country": "USA"
   },
   "Samuel Henley": {
      "city": "Val-d'Or, QC",
      "country": "CAN"
   },
   "Adam Henrique": {
      "city": "Brantford, ON",
      "country": "CAN"
   },
   "Thomas Hickey": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Vinnie Hinostroza": {
      "city": "Chicago, IL",
      "country": "USA"
   },
   "Joshua Ho-Sang": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Mike Hoffman": {
      "city": "Kitchener, ON",
      "country": "CAN"
   },
   "Nick Holden": {
      "city": "St. Albert, AB",
      "country": "CAN"
   },
   "Peter Holland": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Bo Horvat": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Quinton Howden": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Jonathan Huberdeau": {
      "city": "Saint-Jerome, QC",
      "country": "CAN"
   },
   "Charles Hudon": {
      "city": "Alma, QC",
      "country": "CAN"
   },
   "Brad Hunt": {
      "city": "Maple Ridge, BC",
      "country": "CAN"
   },
   "Matt Hunwick": {
      "city": "Warren, MI",
      "country": "USA"
   },
   "Ben Hutton": {
      "city": "Brockville, ON",
      "country": "CAN"
   },
   "Zach Hyman": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Jarome Iginla": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Matt Irwin": {
      "city": "Victoria, BC",
      "country": "CAN"
   },
   "Mark Jankowski": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Boone Jenner": {
      "city": "Dorchester, ON",
      "country": "CAN"
   },
   "Nick Jensen": {
      "city": "St. Paul, MN",
      "country": "USA"
   },
   "Ryan Johansen": {
      "city": "Vancouver, BC",
      "country": "CAN"
   },
   "Stephen Johns": {
      "city": "Ellwood City, PA",
      "country": "USA"
   },
   "Erik Johnson": {
      "city": "Bloomington, MN",
      "country": "USA"
   },
   "Jack Johnson": {
      "city": "Indianapolis, IN",
      "country": "USA"
   },
   "Tyler Johnson": {
      "city": "Spokane, WA",
      "country": "USA"
   },
   "Ryan Johnston": {
      "city": "Sudbury, ON",
      "country": "CAN"
   },
   "Connor Jones": {
      "city": "Montrose, BC",
      "country": "CAN"
   },
   "Seth Jones": {
      "city": "Arlington, TX",
      "country": "USA"
   },
   "Josh Jooris": {
      "city": "Burlington, ON",
      "country": "CAN"
   },
   "Tyson Jost": {
      "city": "St. Albert, AB",
      "country": "CAN"
   },
   "Nazem Kadri": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Steven Kampfer": {
      "city": "Ann Arbor, MI",
      "country": "USA"
   },
   "Evander Kane": {
      "city": "Vancouver, BC",
      "country": "CAN"
   },
   "Patrick Kane": {
      "city": "Buffalo, NY",
      "country": "USA"
   },
   "Michael Kapla": {
      "city": "Eau Claire, WI",
      "country": "USA"
   },
   "Zack Kassian": {
      "city": "Windsor, ON",
      "country": "CAN"
   },
   "Bracken Kearns": {
      "city": "North Vancouver, BC",
      "country": "CAN"
   },
   "Duncan Keith": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Clayton Keller": {
      "city": "Chesterfield, MO",
      "country": "USA"
   },
   "Chris Kelly": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Nicolas Kerdiles": {
      "city": "Lewisville, TX",
      "country": "USA"
   },
   "Tanner Kero": {
      "city": "Hancock, MI",
      "country": "USA"
   },
   "Ryan Kesler": {
      "city": "Livonia, MI",
      "country": "USA"
   },
   "Phil Kessel": {
      "city": "Madison, WI",
      "country": "USA"
   },
   "Jujhar Khaira": {
      "city": "Surrey, BC",
      "country": "CAN"
   },
   "Alex Killorn": {
      "city": "Halifax, NS",
      "country": "CAN"
   },
   "Dwight King": {
      "city": "Meadow Lake, SK",
      "country": "CAN"
   },
   "Kevin Klein": {
      "city": "Kitchener, ON",
      "country": "CAN"
   },
   "Slater Koekkoek": {
      "city": "Winchester, ON",
      "country": "CAN"
   },
   "Travis Konecny": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Chris Kreider": {
      "city": "Boxford, MA",
      "country": "USA"
   },
   "Torey Krug": {
      "city": "Livonia, MI",
      "country": "USA"
   },
   "Brett Kulak": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Chris Kunitz": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Sean Kuraly": {
      "city": "Dublin, OH",
      "country": "USA"
   },
   "Kevin Labanc": {
      "city": "Brooklyn, NY",
      "country": "USA"
   },
   "Joseph Labate": {
      "city": "Burnsville, MN",
      "country": "USA"
   },
   "Andrew Ladd": {
      "city": "Maple Ridge, BC",
      "country": "CAN"
   },
   "Paul Ladue": {
      "city": "Grand Forks, ND",
      "country": "USA"
   },
   "Nick Lappin": {
      "city": "Geneva, IL",
      "country": "USA"
   },
   "Dylan Larkin": {
      "city": "Waterford, MI",
      "country": "USA"
   },
   "Brian Lashoff": {
      "city": "Albany, NY",
      "country": "USA"
   },
   "Scott Laughton": {
      "city": "Oakville, ON",
      "country": "CAN"
   },
   "Curtis Lazar": {
      "city": "Salmon Arm, BC",
      "country": "CAN"
   },
   "Nick Leddy": {
      "city": "Eden Prairie, MN",
      "country": "USA"
   },
   "Anders Lee": {
      "city": "Edina, MN",
      "country": "USA"
   },
   "Taylor Leier": {
      "city": "Saskatoon, SK",
      "country": "CAN"
   },
   "Josh Leivo": {
      "city": "Innisfil, ON",
      "country": "CAN"
   },
   "Brett Lernout": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Kris Letang": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Mark Letestu": {
      "city": "Elk Point, AB",
      "country": "CAN"
   },
   "Trevor Lewis": {
      "city": "Salt Lake City, UT",
      "country": "USA"
   },
   "Mike Liambas": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "John-Michael Liles": {
      "city": "Indianapolis, IN",
      "country": "USA"
   },
   "Bryan Little": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Matt Lorito": {
      "city": "Oakville, ON",
      "country": "CAN"
   },
   "Ben Lovejoy": {
      "city": "Concord, NH",
      "country": "USA"
   },
   "Adam Lowry": {
      "city": "St. Louis, MO",
      "country": "USA"
   },
   "Milan Lucic": {
      "city": "Vancouver, BC",
      "country": "CAN"
   },
   "Clarke MacArthur": {
      "city": "Lloydminster, AB",
      "country": "CAN"
   },
   "Andrew MacDonald": {
      "city": "Judique, NS",
      "country": "CAN"
   },
   "Derek MacKenzie": {
      "city": "Sudbury, ON",
      "country": "CAN"
   },
   "Nathan MacKinnon": {
      "city": "Halifax, NS",
      "country": "CAN"
   },
   "Sean Malone": {
      "city": "Buffalo, NY",
      "country": "USA"
   },
   "Brandon Manning": {
      "city": "Prince George, BC",
      "country": "CAN"
   },
   "Josh Manson": {
      "city": "Hinsdale, IL",
      "country": "USA"
   },
   "Anthony Mantha": {
      "city": "Longueuil, QC",
      "country": "CAN"
   },
   "Brad Marchand": {
      "city": "Halifax, NS",
      "country": "CAN"
   },
   "Jonathan Marchessault": {
      "city": "Cap-Rouge, QC",
      "country": "CAN"
   },
   "Patrick Marleau": {
      "city": "Aneroid, SK",
      "country": "CAN"
   },
   "Mitchell Marner": {
      "city": "Markham, ON",
      "country": "CAN"
   },
   "Patrick Maroon": {
      "city": "St. Louis, MO",
      "country": "USA"
   },
   "Matt Martin": {
      "city": "Windsor, ON",
      "country": "CAN"
   },
   "Paul Martin": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "Alec Martinez": {
      "city": "Rochester Hills, MI",
      "country": "USA"
   },
   "Jordan Martinook": {
      "city": "Brandon, MB",
      "country": "CAN"
   },
   "Michael Matheson": {
      "city": "Pointe-Claire, QC",
      "country": "CAN"
   },
   "Auston Matthews": {
      "city": "Scottsdale, AZ",
      "country": "USA"
   },
   "Shawn Matthias": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Scott Mayfield": {
      "city": "St. Louis, MO",
      "country": "USA"
   },
   "Jamie McBain": {
      "city": "Edina, MN",
      "country": "USA"
   },
   "Jake McCabe": {
      "city": "Eau Claire, WI",
      "country": "USA"
   },
   "Jared McCann": {
      "city": "Stratford, ON",
      "country": "CAN"
   },
   "Michael McCarron": {
      "city": "Grosse Pointe, MI",
      "country": "USA"
   },
   "Jay McClement": {
      "city": "Kingston, ON",
      "country": "CAN"
   },
   "Max McCormick": {
      "city": "De Pere, WI",
      "country": "USA"
   },
   "Ian McCoshen": {
      "city": "Anaheim, CA",
      "country": "USA"
   },
   "Connor McDavid": {
      "city": "Richmond Hill, ON",
      "country": "CAN"
   },
   "Ryan McDonagh": {
      "city": "St. Paul, MN",
      "country": "USA"
   },
   "Colin McDonald": {
      "city": "Wethersfield, CT",
      "country": "USA"
   },
   "Evan McEneny": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Brock McGinn": {
      "city": "Fergus, ON",
      "country": "CAN"
   },
   "Jamie McGinn": {
      "city": "Fergus, ON",
      "country": "CAN"
   },
   "Dylan McIlrath": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Greg McKegg": {
      "city": "St. Thomas, ON",
      "country": "CAN"
   },
   "Curtis McKenzie": {
      "city": "Golden, BC",
      "country": "CAN"
   },
   "Cody McLeod": {
      "city": "Binscarth, MB",
      "country": "CAN"
   },
   "Brayden McNabb": {
      "city": "Davidson, SK",
      "country": "CAN"
   },
   "Mark McNeill": {
      "city": "Langley, BC",
      "country": "CAN"
   },
   "Adam Mcquaid": {
      "city": "Charlottetown, PE",
      "country": "CAN"
   },
   "Wade Megan": {
      "city": "Canton, NY",
      "country": "USA"
   },
   "Jaycob Megna": {
      "city": "Plantation, FL",
      "country": "USA"
   },
   "Jayson Megna": {
      "city": "Fort Lauderdale, FL",
      "country": "USA"
   },
   "Julian Melchiori": {
      "city": "Richmond Hill, ON",
      "country": "CAN"
   },
   "Jon Merrill": {
      "city": "Oklahoma City, OK",
      "country": "USA"
   },
   "Marc Methot": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Sonny Milano": {
      "city": "Massapequa, NY",
      "country": "USA"
   },
   "Colin Miller": {
      "city": "Sault Ste. Marie, ON",
      "country": "CAN"
   },
   "Drew Miller": {
      "city": "Dover, NJ",
      "country": "USA"
   },
   "J.T. Miller": {
      "city": "East Palestine, OH",
      "country": "USA"
   },
   "Kevan Miller": {
      "city": "Los Angeles, CA",
      "country": "USA"
   },
   "Garrett Mitchell": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "John Mitchell": {
      "city": "Oakville, ON",
      "country": "CAN"
   },
   "Torrey Mitchell": {
      "city": "Greenfield Park, QC",
      "country": "CAN"
   },
   "Zack Mitchell": {
      "city": "Orangeville, ON",
      "country": "CAN"
   },
   "Griffen Molino": {
      "city": "TRENTON, MI",
      "country": "USA"
   },
   "Sean Monahan": {
      "city": "Brampton, ON",
      "country": "CAN"
   },
   "Brandon Montour": {
      "city": "Brantford, ON",
      "country": "CAN"
   },
   "Dominic Moore": {
      "city": "Thornhill, ON",
      "country": "CAN"
   },
   "John Moore": {
      "city": "Winnetka, IL",
      "country": "USA"
   },
   "Samuel Morin": {
      "city": "Lac-Beauport, QC",
      "country": "CAN"
   },
   "Josh Morrissey": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Joe Morrow": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Tyler Motte": {
      "city": "St. Clair, MI",
      "country": "USA"
   },
   "Matt Moulson": {
      "city": "North York, ON",
      "country": "CAN"
   },
   "Connor Murphy": {
      "city": "Dublin, OH",
      "country": "USA"
   },
   "Ryan Murphy": {
      "city": "Aurora, ON",
      "country": "CAN"
   },
   "Ryan Murray": {
      "city": "Regina, SK",
      "country": "CAN"
   },
   "Jake Muzzin": {
      "city": "Woodstock, ON",
      "country": "CAN"
   },
   "Tyler Myers": {
      "city": "Houston, TX",
      "country": "USA"
   },
   "Rick Nash": {
      "city": "Brampton, ON",
      "country": "CAN"
   },
   "Riley Nash": {
      "city": "Consort, AB",
      "country": "CAN"
   },
   "James Neal": {
      "city": "Whitby, ON",
      "country": "CAN"
   },
   "Chris Neil": {
      "city": "Flesherton, ON",
      "country": "CAN"
   },
   "Brock Nelson": {
      "city": "Warroad, MN",
      "country": "USA"
   },
   "Casey Nelson": {
      "city": "Wisconsin Rapids, WI",
      "country": "USA"
   },
   "Aaron Ness": {
      "city": "Roseau, MN",
      "country": "USA"
   },
   "Matt Nieto": {
      "city": "Long Beach, CA",
      "country": "USA"
   },
   "Cristoval Nieves": {
      "city": "Syracuse, NY",
      "country": "USA"
   },
   "Matt Niskanen": {
      "city": "Virginia, MN",
      "country": "USA"
   },
   "Stefan Noesen": {
      "city": "Plano, TX",
      "country": "USA"
   },
   "Nelson Nogier": {
      "city": "Saskatoon, SK",
      "country": "CAN"
   },
   "Jordan Nolan": {
      "city": "Garden River, First Nations, ON",
      "country": "CAN"
   },
   "Ryan Nugent-Hopkins": {
      "city": "Burnaby, BC",
      "country": "CAN"
   },
   "Darnell Nurse": {
      "city": "Hamilton, ON",
      "country": "CAN"
   },
   "Alex Nylander": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "William Nylander": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Liam O'Brien": {
      "city": "Halifax, NS",
      "country": "CAN"
   },
   "Rob O'Gara": {
      "city": "Massapequa, NY",
      "country": "USA"
   },
   "Cal O'Reilly": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Ryan O'Reilly": {
      "city": "Clinton, ON",
      "country": "CAN"
   },
   "Jordan Oesterle": {
      "city": "Dearborn Heights, MI",
      "country": "USA"
   },
   "Kyle Okposo": {
      "city": "St. Paul, MN",
      "country": "USA"
   },
   "Jamie Oleksiak": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Steve Oleksy": {
      "city": "Chesterfield, MI",
      "country": "USA"
   },
   "Brooks Orpik": {
      "city": "San Francisco, CA",
      "country": "USA"
   },
   "T.J. Oshie": {
      "city": "Everett, WA",
      "country": "USA"
   },
   "Steve Ott": {
      "city": "Summerside, PE",
      "country": "CAN"
   },
   "Max Pacioretty": {
      "city": "New Canaan, CT",
      "country": "USA"
   },
   "Jean-Gabriel Pageau": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Kyle Palmieri": {
      "city": "Smithtown, NY",
      "country": "USA"
   },
   "Cedric Paquette": {
      "city": "Gaspe, QC",
      "country": "CAN"
   },
   "Colton Parayko": {
      "city": "St. Albert, AB",
      "country": "CAN"
   },
   "Adam Pardy": {
      "city": "Bonavista, NL",
      "country": "CAN"
   },
   "PA Parenteau": {
      "city": "Hull, QC",
      "country": "CAN"
   },
   "Zach Parise": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "Greg Pateryn": {
      "city": "Sterling Heights, MI",
      "country": "USA"
   },
   "Nick Paul": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Joe Pavelski": {
      "city": "Plover, WI",
      "country": "USA"
   },
   "Tanner Pearson": {
      "city": "Kitchener, ON",
      "country": "CAN"
   },
   "Matthew Peca": {
      "city": "Petawawa, ON",
      "country": "CAN"
   },
   "Adam Pelech": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Mathieu Perreault": {
      "city": "Drummondville, QC",
      "country": "CAN"
   },
   "David Perron": {
      "city": "Sherbrooke, QC",
      "country": "CAN"
   },
   "Corey Perry": {
      "city": "Peterborough, ON",
      "country": "CAN"
   },
   "Brett Pesce": {
      "city": "Tarrytown, NY",
      "country": "USA"
   },
   "Nic Petan": {
      "city": "Delta, BC",
      "country": "CAN"
   },
   "Alex Petrovic": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Jeff Petry": {
      "city": "Ann Arbor, MI",
      "country": "USA"
   },
   "Dion Phaneuf": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Blake Pietila": {
      "city": "Milford, MI",
      "country": "USA"
   },
   "Alex Pietrangelo": {
      "city": "King City, ON",
      "country": "CAN"
   },
   "Brandon Pirri": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Tyler Pitlick": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "Brayden Point": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Jason Pominville": {
      "city": "Repentigny, QC",
      "country": "CAN"
   },
   "Kevin Porter": {
      "city": "Detroit, MI",
      "country": "USA"
   },
   "Paul Postma": {
      "city": "Red Deer, AB",
      "country": "CAN"
   },
   "Andrew Poturalski": {
      "city": "Williamsville, NY",
      "country": "USA"
   },
   "Benoit Pouliot": {
      "city": "Alfred, ON",
      "country": "CAN"
   },
   "Derrick Pouliot": {
      "city": "Estevan, SK",
      "country": "CAN"
   },
   "Shane Prince": {
      "city": "Rochester, NY",
      "country": "USA"
   },
   "Nate Prosser": {
      "city": "Elk River, MN",
      "country": "USA"
   },
   "Dalton Prout": {
      "city": "Kingsville, ON",
      "country": "CAN"
   },
   "Matt Puempel": {
      "city": "Windsor, ON",
      "country": "CAN"
   },
   "Ryan Pulock": {
      "city": "Dauphin, MB",
      "country": "CAN"
   },
   "Teddy Purcell": {
      "city": "St. John's, NL",
      "country": "CAN"
   },
   "Tom Pyatt": {
      "city": "Thunder Bay, ON",
      "country": "CAN"
   },
   "Mark Pysyk": {
      "city": "Sherwood Park, AB",
      "country": "CAN"
   },
   "John Quenneville": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Kyle Quincey": {
      "city": "Kitchener, ON",
      "country": "CAN"
   },
   "Alan Quine": {
      "city": "Belleville, ON",
      "country": "CAN"
   },
   "Ty Rattie": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Kyle Rau": {
      "city": "Eden Prairie, MN",
      "country": "USA"
   },
   "Mason Raymond": {
      "city": "Cochrane, AB",
      "country": "CAN"
   },
   "Matt Read": {
      "city": "Ilderton, ON",
      "country": "CAN"
   },
   "Ryan Reaves": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Zach Redmond": {
      "city": "Traverse City, MI",
      "country": "USA"
   },
   "Mike Reilly": {
      "city": "Chicago, IL",
      "country": "USA"
   },
   "Sam Reinhart": {
      "city": "West Vancouver, BC",
      "country": "CAN"
   },
   "Dan Renouf": {
      "city": "Pickering, ON",
      "country": "CAN"
   },
   "Mike Ribeiro": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Tanner Richard": {
      "city": "Markham, ON",
      "country": "CAN"
   },
   "Brad Richardson": {
      "city": "Belleville, ON",
      "country": "CAN"
   },
   "Morgan Rielly": {
      "city": "Vancouver, BC",
      "country": "CAN"
   },
   "Brett Ritchie": {
      "city": "Orangeville, ON",
      "country": "CAN"
   },
   "Nick Ritchie": {
      "city": "Orangeville, ON",
      "country": "CAN"
   },
   "Buddy Robinson": {
      "city": "Bellmawr, NJ",
      "country": "USA"
   },
   "Evan Rodrigues": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Kevin Rooney": {
      "city": "Canton, MA",
      "country": "USA"
   },
   "Jack Roslovic": {
      "city": "Columbus, OH",
      "country": "USA"
   },
   "Carter Rowney": {
      "city": "Grand Prairie, AB",
      "country": "CAN"
   },
   "Chad Ruhwedel": {
      "city": "San Diego, CA",
      "country": "USA"
   },
   "Kris Russell": {
      "city": "Caroline, AB",
      "country": "CAN"
   },
   "Robbie Russo": {
      "city": "Westmont, IL",
      "country": "USA"
   },
   "Bryan Rust": {
      "city": "Pontiac, MI",
      "country": "USA"
   },
   "Bobby Ryan": {
      "city": "Cherry Hill, NJ",
      "country": "USA"
   },
   "Derek Ryan": {
      "city": "Spokane, WA",
      "country": "USA"
   },
   "Brandon Saad": {
      "city": "Pittsburgh, PA",
      "country": "USA"
   },
   "Zach Sanford": {
      "city": "Salem, MA",
      "country": "USA"
   },
   "Steven Santini": {
      "city": "Bronxville, NY",
      "country": "USA"
   },
   "David Savard": {
      "city": "St. Hyacinthe, QC",
      "country": "CAN"
   },
   "Marco Scandella": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Colton Sceviour": {
      "city": "Red Deer, AB",
      "country": "CAN"
   },
   "Tim Schaller": {
      "city": "Merrimack, NH",
      "country": "USA"
   },
   "Mark Scheifele": {
      "city": "Kitchener, ON",
      "country": "CAN"
   },
   "Brayden Schenn": {
      "city": "Saskatoon, SK",
      "country": "CAN"
   },
   "Luke Schenn": {
      "city": "Saskatoon, SK",
      "country": "CAN"
   },
   "David Schlemko": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Jordan Schmaltz": {
      "city": "Madison, WI",
      "country": "USA"
   },
   "Nick Schmaltz": {
      "city": "Madison, WI",
      "country": "USA"
   },
   "Nate Schmidt": {
      "city": "St. Cloud, MN",
      "country": "USA"
   },
   "Cole Schneider": {
      "city": "Williamsville, NY",
      "country": "USA"
   },
   "Jordan Schroeder": {
      "city": "Lakeville, MN",
      "country": "USA"
   },
   "Justin Schultz": {
      "city": "Kelowna, BC",
      "country": "CAN"
   },
   "Nick Schultz": {
      "city": "Strasbourg, SK",
      "country": "CAN"
   },
   "Jaden Schwartz": {
      "city": "Wilcox, SK",
      "country": "CAN"
   },
   "Brent Seabrook": {
      "city": "Richmond, BC",
      "country": "CAN"
   },
   "Tyler Seguin": {
      "city": "Brampton, ON",
      "country": "CAN"
   },
   "Tom Sestito": {
      "city": "Rome, NY",
      "country": "USA"
   },
   "Devin Setoguchi": {
      "city": "Taber, AB",
      "country": "CAN"
   },
   "Damon Severson": {
      "city": "Melville, SK",
      "country": "CAN"
   },
   "Michael Sgarbossa": {
      "city": "Campbellville, ON",
      "country": "CAN"
   },
   "Patrick Sharp": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Kevin Shattenkirk": {
      "city": "New Rochelle, NY",
      "country": "USA"
   },
   "Andrew Shaw": {
      "city": "Belleville, ON",
      "country": "CAN"
   },
   "Logan Shaw": {
      "city": "Glace Bay, NS",
      "country": "CAN"
   },
   "Riley Sheahan": {
      "city": "St. Catharines, ON",
      "country": "CAN"
   },
   "Conor Sheary": {
      "city": "Winchester, MA",
      "country": "USA"
   },
   "Hunter Shinkaruk": {
      "city": "Calgary, AB",
      "country": "CAN"
   },
   "Devin Shore": {
      "city": "Ajax, ON",
      "country": "CAN"
   },
   "Drew Shore": {
      "city": "Denver, CO",
      "country": "USA"
   },
   "Nick Shore": {
      "city": "Denver, CO",
      "country": "USA"
   },
   "Duncan Siemens": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Wayne Simmonds": {
      "city": "Scarborough, ON",
      "country": "CAN"
   },
   "Dillon Simpson": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Colton Sissons": {
      "city": "North Vancouver, BC",
      "country": "CAN"
   },
   "Jack Skille": {
      "city": "Madison, WI",
      "country": "USA"
   },
   "Jeff Skinner": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Brady Skjei": {
      "city": "Lakeville, MN",
      "country": "USA"
   },
   "Jaccob Slavin": {
      "city": "Denver, CO",
      "country": "USA"
   },
   "Ben Smith": {
      "city": "Winston-Salem, NC",
      "country": "USA"
   },
   "Brendan Smith": {
      "city": "Mimico, ON",
      "country": "CAN"
   },
   "C.J. Smith": {
      "city": "Des Moines, IA",
      "country": "USA"
   },
   "Craig Smith": {
      "city": "Madison, WI",
      "country": "USA"
   },
   "Gemel Smith": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Reilly Smith": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Trevor Smith": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Zack Smith": {
      "city": "Maple Creek, SK",
      "country": "CAN"
   },
   "Devante Smith-Pelly": {
      "city": "Scarborough, ON",
      "country": "CAN"
   },
   "Blake Speers": {
      "city": "Sault Ste. Marie, ON",
      "country": "CAN"
   },
   "Jason Spezza": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Ryan Spooner": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Ryan Sproul": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Jared Spurgeon": {
      "city": "Edmonton, AB",
      "country": "CAN"
   },
   "Eric Staal": {
      "city": "Thunder Bay, ON",
      "country": "CAN"
   },
   "Jordan Staal": {
      "city": "Thunder Bay, ON",
      "country": "CAN"
   },
   "Marc Staal": {
      "city": "Thunder Bay, ON",
      "country": "CAN"
   },
   "Drew Stafford": {
      "city": "Milwaukee, WI",
      "country": "USA"
   },
   "Matt Stajan": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Steven Stamkos": {
      "city": "Markham, ON",
      "country": "CAN"
   },
   "Paul Stastny": {
      "city": "Quebec City, QC",
      "country": "CAN"
   },
   "Troy Stecher": {
      "city": "Richmond, BC",
      "country": "CAN"
   },
   "Alex Steen": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Lee Stempniak": {
      "city": "West Seneca, NY",
      "country": "USA"
   },
   "Derek Stepan": {
      "city": "Hastings, MN",
      "country": "USA"
   },
   "Chandler Stephenson": {
      "city": "Saskatoon, SK",
      "country": "CAN"
   },
   "Chris Stewart": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Karl Stollery": {
      "city": "Camrose, AB",
      "country": "CAN"
   },
   "Mark Stone": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Michael Stone": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Clayton Stoner": {
      "city": "Port McNeill, BC",
      "country": "CAN"
   },
   "Brian Strait": {
      "city": "Waltham, MA",
      "country": "USA"
   },
   "Ben Street": {
      "city": "Coquitlam, BC",
      "country": "CAN"
   },
   "Dylan Strome": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Ryan Strome": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Mark Stuart": {
      "city": "Rochester, MN",
      "country": "USA"
   },
   "P.K. Subban": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Ryan Suter": {
      "city": "Madison, WI",
      "country": "USA"
   },
   "Brandon Sutter": {
      "city": "Huntington, NY",
      "country": "USA"
   },
   "Brandon Tanev": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Chris Tanev": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "John Tavares": {
      "city": "Mississauga, ON",
      "country": "CAN"
   },
   "Matt Tennyson": {
      "city": "Minneapolis, MN",
      "country": "USA"
   },
   "Chris Terry": {
      "city": "Brampton, ON",
      "country": "CAN"
   },
   "Shea Theodore": {
      "city": "Langley, BC",
      "country": "CAN"
   },
   "Nate Thompson": {
      "city": "Anchorage, AK",
      "country": "USA"
   },
   "Paul Thompson": {
      "city": "Methuen, MA",
      "country": "USA"
   },
   "Ben Thomson": {
      "city": "Brampton, ON",
      "country": "CAN"
   },
   "Chris Thorburn": {
      "city": "Sault Ste. Marie, ON",
      "country": "CAN"
   },
   "Joe Thornton": {
      "city": "London, ON",
      "country": "CAN"
   },
   "Shawn Thornton": {
      "city": "Oshawa, ON",
      "country": "CAN"
   },
   "Chris Tierney": {
      "city": "Keswick, ON",
      "country": "CAN"
   },
   "Matthew Tkachuk": {
      "city": "Scottsdale, AZ",
      "country": "USA"
   },
   "Jonathan Toews": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Tyler Toffoli": {
      "city": "Scarborough, ON",
      "country": "CAN"
   },
   "Jordin Tootoo": {
      "city": "Churchill, MB",
      "country": "CAN"
   },
   "Vincent Trocheck": {
      "city": "Pittsburgh, PA",
      "country": "USA"
   },
   "Corey Tropp": {
      "city": "Grosse Pointe Woods, MI",
      "country": "USA"
   },
   "Jacob Trouba": {
      "city": "Rochester, MI",
      "country": "USA"
   },
   "Alex Tuch": {
      "city": "Syracuse, NY",
      "country": "USA"
   },
   "Kyle Turris": {
      "city": "New Westminster, BC",
      "country": "CAN"
   },
   "T.J. Tynan": {
      "city": "Orland Park, IL",
      "country": "USA"
   },
   "Scottie Upshall": {
      "city": "Fort McMurray, AB",
      "country": "CAN"
   },
   "James van Riemsdyk": {
      "city": "Middletown, NJ",
      "country": "USA"
   },
   "Trevor van Riemsdyk": {
      "city": "Middletown, NJ",
      "country": "USA"
   },
   "Chris VandeVelde": {
      "city": "Moorhead, MN",
      "country": "USA"
   },
   "Phil Varone": {
      "city": "Vaughan, ON",
      "country": "CAN"
   },
   "Frank Vatrano": {
      "city": "East Longmeadow, MA",
      "country": "USA"
   },
   "Mike Vecchione": {
      "city": "SAUGUS, MA",
      "country": "USA"
   },
   "Antoine Vermette": {
      "city": "St. Agapit, QC",
      "country": "CAN"
   },
   "Kris Versteeg": {
      "city": "Lethbridge, AB",
      "country": "CAN"
   },
   "Jimmy Vesey": {
      "city": "Boston, MA",
      "country": "USA"
   },
   "Linden Vey": {
      "city": "Wakaw, SK",
      "country": "CAN"
   },
   "Jake Virtanen": {
      "city": "New Westminster, BC",
      "country": "CAN"
   },
   "Marc-Edouard Vlasic": {
      "city": "Montreal, QC",
      "country": "CAN"
   },
   "Chris Wagner": {
      "city": "Walpole, MA",
      "country": "USA"
   },
   "Joel Ward": {
      "city": "North York, ON",
      "country": "CAN"
   },
   "David Warsofsky": {
      "city": "Marshfield, MA",
      "country": "USA"
   },
   "Austin Watson": {
      "city": "Ann Arbor, MI",
      "country": "USA"
   },
   "Jordan Weal": {
      "city": "North Vancouver, BC",
      "country": "CAN"
   },
   "Shea Weber": {
      "city": "Sicamous, BC",
      "country": "CAN"
   },
   "Mackenzie Weegar": {
      "city": "Ottawa, ON",
      "country": "CAN"
   },
   "Dale Weise": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Zach Werenski": {
      "city": "Grosse Pointe, MI",
      "country": "USA"
   },
   "Blake Wheeler": {
      "city": "Plymouth, MN",
      "country": "USA"
   },
   "Colin White": {
      "city": "Boston, MA",
      "country": "USA"
   },
   "Ryan White": {
      "city": "Brandon, MB",
      "country": "CAN"
   },
   "Chris Wideman": {
      "city": "St. Louis, MO",
      "country": "USA"
   },
   "Dennis Wideman": {
      "city": "Kitchener, ON",
      "country": "CAN"
   },
   "Patrick Wiercioch": {
      "city": "Burnaby, BC",
      "country": "CAN"
   },
   "Justin Williams": {
      "city": "Cobourg, ON",
      "country": "CAN"
   },
   "Colin Wilson": {
      "city": "Greenwich, CT",
      "country": "USA"
   },
   "Scott Wilson": {
      "city": "Oakville, ON",
      "country": "CAN"
   },
   "Tom Wilson": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Tommy Wingels": {
      "city": "Evanston, IL",
      "country": "USA"
   },
   "Daniel Winnik": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Luke Witkowski": {
      "city": "Holland, MI",
      "country": "USA"
   },
   "Miles Wood": {
      "city": "Buffalo, NY",
      "country": "USA"
   },
   "Tyler Wotherspoon": {
      "city": "Burnaby, BC",
      "country": "CAN"
   },
   "Keith Yandle": {
      "city": "Boston, MA",
      "country": "USA"
   },
   "Travis Zajac": {
      "city": "Winnipeg, MB",
      "country": "CAN"
   },
   "Michael Zalewski": {
      "city": "New Hartford, NY",
      "country": "USA"
   },
   "Harry Zolnierczyk": {
      "city": "Toronto, ON",
      "country": "CAN"
   },
   "Jason Zucker": {
      "city": "Newport Beach, CA",
      "country": "USA"
   }
}
