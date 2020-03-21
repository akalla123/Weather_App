function d_c(){
var un = document.getElementById("unit").innerHTML;
if (un == "F"){
	var f = document.getElementById("temper").innerHTML;
	document.getElementById("unit").innerHTML = "C"
	var cel = (f-32) * (5/9);
	document.getElementById("temper").innerHTML = Math.round(cel);
	var j;
	for (j = 0; j < 7; j++){
	var min = (document.getElementsByClassName("week_temp")[j].innerHTML.split(" | ")[0].split(" F")[0])
	var max = (document.getElementsByClassName("week_temp")[j].innerHTML.split(" | ")[1].split(" F")[0])
	var cel_min = Math.round((min-32) * (5/9));
	var cel_max = Math.round((max-32) * (5/9));
	document.getElementsByClassName("week_temp")[j].innerHTML = cel_min + " C | " + cel_max + " C"

	}
	}
if (un == "C"){
	document.getElementById("unit").innerHTML = "F"
	var cel = document.getElementById("temper").innerHTML;
	var f = cel * (9/5) + 32
	document.getElementById("temper").innerHTML = Math.round(f);
	var j;
	for (j = 0; j < 7; j++){
	var min = (document.getElementsByClassName("week_temp")[j].innerHTML.split(" | ")[0].split(" C")[0])
	var max = (document.getElementsByClassName("week_temp")[j].innerHTML.split(" | ")[1].split(" C")[0])
	var cel_min = Math.round(min * (9/5) + 32);
	var cel_max = Math.round(max * (9/5) + 32);
	document.getElementsByClassName("week_temp")[j].innerHTML = cel_min + " F | " + cel_max + " F"

	}
	}
}

window.addEventListener("load", () => {
	let long; 
	let lat;

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/d11e7b39be2f3c5f9c5892ec6dbb4f73/${lat},${long}`;

			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data =>{
				console.log(data);
				const now_date = new Date(data.currently.time*1000)
				var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				document.getElementById("date").innerHTML = days[new Date(now_date).getDay()] + " " + new Date(now_date).toLocaleTimeString('en-US');
				document.getElementById("description").innerHTML = data.currently.summary;
				document.getElementById("temper").innerHTML = Math.round(data.currently.temperature);
				document.getElementById("location").innerHTML = data.timezone.replace("_", " ").split("/")[1];
				var skycons = new Skycons({"color": "white"});
				var ic = data.currently.icon.replace(/-/g, "_").toUpperCase()
				skycons.play()
				skycons.set(document.getElementById("icon"), Skycons[ic]);
				document.getElementById("unit").innerHTML = "F"
				var ini = document.getElementById("temper").innerHTML;
				var i;
				for (i = 0; i < data.daily.data.length - 1; i++) {
				const date_future = new Date(data.daily.data[i].time*1000)
				document.getElementsByClassName("week_day")[i].innerHTML = days[new Date(date_future).getDay()]
				document.getElementsByClassName("week_temp")[i].innerHTML = Math.round(data.daily.data[i].temperatureMin) + " F | " + Math.round(data.daily.data[i].temperatureMax) + " F"
				var ac = data.daily.data[i].icon.replace(/-/g, "_").toUpperCase()
				skycons.set(document.getElementsByClassName("week_des")[i], Skycons[ac]);
			}
			});
		});
	}
});