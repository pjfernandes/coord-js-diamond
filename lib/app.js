mapboxgl.accessToken = 'pk.eyJ1IjoicGpmZXJuYW5kZXMiLCJhIjoiY2t1c291Z3lzNWg2bzJvbW5kNWNhbnZhaCJ9.eYxvagOUGuS5qDo-zOfRCA';
var marker = new mapboxgl.Marker();

const coords = ((place) => {
  const token = 'pk.eyJ1IjoicGpmZXJuYW5kZXMiLCJhIjoiY2t1c291Z3lzNWg2bzJvbW5kNWNhbnZhaCJ9.eYxvagOUGuS5qDo-zOfRCA';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const results = document.querySelector("p");
      if (data.features.length > 0) {
        const coordsArray = data.features[0].geometry.coordinates;
        results.innerHTML = `<p><i class="fas fa-map-marker-alt text-primary"></i> <strong>Lat:</strong> ${coordsArray[1]}</p> <p><i class="fas fa-map-marker-alt text-primary"></i> <strong>Long:</strong> ${coordsArray[0]}</p>`;
        // const map = new mapboxgl.Map({
        //   container: 'map',
        //   style: 'mapbox://styles/pdunleav/cjofefl7u3j3e2sp0ylex3cyb',
        //   center: [coordsArray[0], coordsArray[1]],
        //   zoom: 12
        // });

        const mapDiv = document.getElementById("map");
        mapDiv.insertAdjacentHTML('beforeend', map);
        marker
          .remove()
          .setLngLat([coordsArray[0], coordsArray[1]])
          .addTo(map);
        map.flyTo({ center: [coordsArray[0], coordsArray[1]], essential: true});
      } else {
        results.innerHTML = `<p><h3><i class="far fa-frown text-primary"></h3></i> Local não encontrado</p>`;
      };
    });
});

const btn = document.querySelector(".btn");
btn.addEventListener('click', (event) => {
  event.preventDefault();
  const placeText = document.querySelector("#address-input").value;
  coords(placeText);
});

///////////////////////////
function add_marker(event) {
  marker.remove()
  var coordinates = event.lngLat;
  //console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
  const results = document.querySelector("p");
  results.innerHTML = `<p><i class="fas fa-map-marker-alt text-primary"></i> <strong>Lat:</strong> ${coordinates.lat}</p> <p><i class="fas fa-map-marker-alt text-primary"></i> <strong>Long:</strong> ${coordinates.lng}</p>`;

  marker.setLngLat(coordinates).addTo(map);
}

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  center: [-43, -22],
  zoom: 4
});

const mapDiv = document.getElementById("map");

map.on('click', add_marker);
