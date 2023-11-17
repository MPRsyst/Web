// const address = document.querySelector('#storeAddress')

// function initMap(position) {
//   const lat = position.coords.latitude;
//   const lng = position.coords.longitude;
//   const uluru = { lat: lat, lng: lng };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: uluru
//   });
//   let marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });

//   const geocoder = new google.maps.Geocoder;
//   map.addListener('click', function (event) {
//     const clickedLocation = event.latLng;
//     marker.setPosition(clickedLocation);
//     geocoder.geocode({ 'location': clickedLocation }, function (results, status) {
//       if (status === 'OK') {
//         if (results[0]) {
//           address.value = results[0].formatted_address;
//         } else {
//           console.log('No results found');
//         }
//       } else {
//         console.log('Geocoder failed due to: ' + status);
//       }
//     });
//   });
// }

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(initMap, function () {
//     handleLocationError(true, infoWindow, map.getCenter());
//   });
// } else {
//   // Browser doesn't support Geolocation
//   handleLocationError(false, infoWindow, map.getCenter());
// }

function firstFunction() {
  console.log("hii");

  let map;
  const address = document.querySelector("#storeAddress");
  const lat_html = document.querySelector("#lat");
  const lng_html = document.querySelector("#lng");
  const infoWindow = new google.maps.InfoWindow();
  console.log(infoWindow);

  function initMap(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const uluru = { lat: lat, lng: lng };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: uluru,
    });
    let marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    const geocoder = new google.maps.Geocoder();
    map.addListener("click", function (event) {
      const clickedLocation = event.latLng;
      marker.setPosition(clickedLocation);
      geocoder.geocode(
        { location: clickedLocation },
        function (results, status) {
          if (status === "OK") {
            if (results[0]) {
              address.value = results[0].formatted_address;
              lat_html.value = clickedLocation.lat();
              lng_html.value = clickedLocation.lng();
            } else {
              console.log("No results found");
            }
          } else {
            console.log("Geocoder failed due to: " + status);
          }
        }
      );
    });
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    console.log("err");
  }

  if (navigator.geolocation) {
    console.log("gi");
    navigator.geolocation.getCurrentPosition(initMap, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
