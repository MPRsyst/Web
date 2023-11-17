function firstFunc() {
  console.log("hihi");

  function initMap(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const uluru = { lat: lat, lng: lng };
    const map = new google.maps.Map(document.querySelector("#map"), {
      zoom: 12,
      center: uluru,
    });
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    map.addListener("click", (event) => {
      console.log(event.latLng.lat(), event.latLng.lng());
      const newPosition = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      const newMap = new google.maps.Map(document.querySelector("#map"), {
        zoom: 13,
        center: newPosition,
      });
      const newMarker = new google.maps.Marker({
        position: newPosition,
        map: newMap,
      });
      map.panTo(event.latLng);
    });

    //places
    const center = uluru;

    // 검색할 장소의 종류
    const type = "restaurant";

    // 반경(m) 설정
    const radius = 1000;

    // PlacesService 객체 생성
    const service = new google.maps.places.PlacesService(map);

    // 장소 검색 요청
    service.nearbySearch(
      {
        location: center,
        radius: radius,
        type: [type],
      },
      function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
        }
        for (let i = 0; i < results.length; i++) {
          const place = results[i];

          // 마커 생성
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            placeId: place.place_id,
          });

          marker.addListener("click", function () {
            handleMarkerClick(marker);
          });
        }
      }
    );

    // InfoWindow 생성
    const infowindow = new google.maps.InfoWindow();

    // 마커 클릭 이벤트 핸들러 함수
    function handleMarkerClick(marker) {
      // 장소 상세 정보 요청
      service.getDetails({ placeId: marker.placeId }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // InfoWindow에 표시할 내용 작성
          const content = `<div>
              <h3>${place.name}</h3>
              <h3>${place.types[0]}</h3>
              <p>주소: ${place.formatted_address}</p>
              <p>전화번호: ${place.formatted_phone_number}</p>
            </div>`;

          // InfoWindow 열기
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    }
  }

  function geoerror() {
    alert("Can't find you");
  }
  navigator.geolocation.getCurrentPosition(initMap, geoerror);
}
