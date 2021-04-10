const googleAPIKey = "AIzaSyDPzzIv8PZxxApsLchYVEgY62-uMwMNmXs";

var getLocation = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser');
    }
}
  
function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    getPlaces(lat, lon);
}

var getPlaces = function (lat, lon) {
    let googleURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&rankby=distance&type=liquor_store&key=" + googleAPIKey;
  
    fetch(googleURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {  
                console.log(data)
                //displayPlaces()
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
    alert('Unable to retrieve information');
    });
};

// var displayPlaces = function (data) {
//     placesContainerEl.textContent = ""
      
//     for (var i = 0; i < placesReturned.length; i++) {
//         var placesEl=document.createElement("div");
//         placesEl.classList = "card bg-primary text-light m-2";
      
//         var storeNameEl = document.createElement("h3");
//         var storeIconEl = document.createElement("img");
//         var storeAddressEl = document.createElement("p");
//         var storeOpenEl = document.createElement("p");
          
//         storeNameEl.innerHTML = data.daily[i].dt.value;
//         let storeIcon = data.daily[i].weather[0].icon;
//         storeIconEl.setAttribute("src","https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");
//         storeIconEl.setAttribute("alt",data.daily[i].weather[0].description);
//         storeAddressEl.innerHTML = "Temperature: " + data.daily[i].temp.day;
//         storeOpenEl.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
      
//         placesEl.appendChild(storeNameEl);
//         placesEl.appendChild(storeIconEl);
//         placesEl.appendChild(storeAddressEl);
//         placesEl.appendChild(storeOpenEl);
      
//         placesContainerEl.appendChild(placesEl);
//     }
// }

getLocation();