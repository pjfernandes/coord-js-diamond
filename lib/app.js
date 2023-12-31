mapboxgl.accessToken = 'pk.eyJ1IjoicGpmZXJuYW5kZXMiLCJhIjoiY2t1c291Z3lzNWg2bzJvbW5kNWNhbnZhaCJ9.eYxvagOUGuS5qDo-zOfRCA';

const el = document.createElement('div');
el.className = 'marker';
var marker = new mapboxgl.Marker(el);

function convert(D, type) {
  const degree = D;
  const coord = [0 | D, '° ', 0 | (D = (D < 0 ? -D : D) + 1e-4) % 1 * 60, "' ", 0 | D * 60 % 1 * 60, '"'].join('');
  var char="n";

  if (type === "lat") {
    if (degree < 0) {
      char = " S";
    } else {
      char = " N";
    }
  }

  if (type === "long") {
    if (degree < 0) {
      char = " W";
    } else {
      char = " E";
    }
  }

  return coord.replace(/-/i, '') + char;
}

const coords = ((place) => {
  const token = 'pk.eyJ1IjoicGpmZXJuYW5kZXMiLCJhIjoiY2t1c291Z3lzNWg2bzJvbW5kNWNhbnZhaCJ9.eYxvagOUGuS5qDo-zOfRCA';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const results = document.querySelector("p");
      if (data.features.length > 0) {
        const coordsArray = data.features[0].geometry.coordinates;
        results.innerHTML = `<p><i class="fas fa-map-marker-alt coordinates-color"></i> <strong>Lat:</strong> ${convert(coordsArray[1], "lat")} <strong class="coordinates-color">|</strong> <strong>Long:</strong> ${convert(coordsArray[0],"long")}</p>`;
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
        map.flyTo({ center: [coordsArray[0], coordsArray[1]], essential: true, zoom: 9});
      } else {
        results.innerHTML = `<p><h3><i class="far fa-frown coordinates-color"></h3></i> Local não encontrado</p>`;
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
  const inputField = document.getElementById("address-input");
  inputField.value = '';
  marker.remove()
  var coordinates = event.lngLat;
  //console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
  const results = document.querySelector("p");
  results.innerHTML = `<p><i class="fas fa-map-marker-alt coordinates-color"></i> <strong>Lat:</strong> ${convert(coordinates.lat,"lat")} <strong class="coordinates-color">|</strong> <strong>Long:</strong> ${convert(coordinates.lng,"long")}</p>`;

  marker.setLngLat(coordinates).addTo(map);
}

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-43, -22],
  zoom: 4
});

const mapDiv = document.getElementById("map");

map.on('click', add_marker);
///////////////////////////
const canvas = document.querySelector(".mapboxgl-canvas");

const circular = document.getElementById("inlineRadio1");

circular.addEventListener("click", (e) => {
  const map = document.getElementById('map');
  map.classList.remove('rounded');
  map.classList.add('rounded-circle');
  map.style.width = "280px";
  map.style.height = "280px";

  // canvas.style.width = "280px";
  // canvas.style.height = "280px";
});

const retangular = document.getElementById("inlineRadio2");

retangular.addEventListener("click", (e) => {
  const map = document.getElementById('map');
  map.classList.remove('rounded-circle');
  map.classList.add('rounded')
  map.style.height = "280px";
  map.style.width = "540px";



});
