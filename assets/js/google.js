const pos = {};

function initMap() {
    // Create the map.
    const sydney = { lat: -33, lng: 151 };
    const infowindow = new google.maps.InfoWindow();
    const map = new google.maps.Map(document.getElementById("map"), {
      center: sydney,
      zoom: 8,
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    // let getNextPage;
    // const moreButton = document.getElementById("more");
  
    // moreButton.onclick = function () {
    //   moreButton.disabled = true;
  
    //   if (getNextPage) {
    //     getNextPage();
    //   }
    // };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            infowindow.setPosition(pos);
            infowindow.setContent("Location found.");
            infowindow.open(map);
            map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }

    // Perform a nearby search.
    service.nearbySearch(
      { location: pos , radius: 500, type: "liquor_store" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
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
  
function addPlaces(places, map) {
    const placesList = document.getElementById("places");
  
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
}
initMap();