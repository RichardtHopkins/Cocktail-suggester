const pos = {};
let googleMap

document.getElementById("map-display").addEventListener("click", function(e){
    document.getElementById("map-container").style.display = "block";
})

function initMap() {
    // Create the map.
    const sydney = { lat: -33, lng: 151 };
    const infowindow = new google.maps.InfoWindow();
    googleMap = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 11,
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(googleMap);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                nearbySearch(pos, service);
                infowindow.setPosition(pos);
                infowindow.setContent("Location found.");
                infowindow.open(googleMap);
                googleMap.setCenter(pos);
            },
            (error) => {
                // handleLocationError(true, infoWindow, map.getCenter());
                console.log(error)
            }
        );
    } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
        console.log("no geolocation")
    }
}
// Perform a nearby search. 
function nearbySearch(pos, service) {
    let getNextPage;
    const moreButton = document.getElementById("more");

    moreButton.onclick = function () {
        moreButton.disabled = true;

        if (getNextPage) {
            getNextPage();
        }
    };
    service.nearbySearch(
        { location: pos, radius: 5000, type: "liquor_store" },

        (results, status, pagination) => {
            console.log("nearbySearchcallback");
            console.log(results);
            console.log(status);
            if (status !== "OK" || !results) return;

            addPlaces(results);
            moreButton.disabled = !pagination || !pagination.hasNextPage;

            if (pagination && pagination.hasNextPage) {
                getNextPage = () => {
                    // Note: nextPage will call the same handler function as the initial call
                    pagination.nextPage();
                };
            }
        }
    );
}

function addPlaces(places) {
    console.log("addPlaces");
    const placesList = document.getElementById("places");

    for (const place of places) {
        console.log(place);
        console.log(googleMap);
        if (place.geometry && place.geometry.location) {
            const image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            new google.maps.Marker({
                map: googleMap,
                icon: image,
                title: place.name,
                position: place.geometry.location,
            });
            const li = document.createElement("li");
            li.textContent = place.name;
            placesList.appendChild(li);
            li.addEventListener("click", () => {
                googleMap.setCenter(place.geometry.location);
            });
        }
    }
}