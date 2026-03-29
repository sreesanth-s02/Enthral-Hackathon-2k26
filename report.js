// Initialize Map
var map = L.map('map').setView([20.5937, 78.9629], 5);

// Add map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fix map rendering issue
setTimeout(function () {
 map.invalidateSize();
}, 200);


// Variables for selected location
let selectedLat = null;
let selectedLng = null;
let marker;


// User clicks map to choose disaster location
map.on("click", function(e){

 selectedLat = e.latlng.lat;
 selectedLng = e.latlng.lng;

 // Remove previous marker
 if(marker){
  map.removeLayer(marker);
 }

 // Add new marker
 marker = L.marker([selectedLat, selectedLng])
 .addTo(map)
 .bindPopup("Disaster Location Selected")
 .openPopup();

});


// Get user current location (for convenience)
navigator.geolocation.getCurrentPosition(function(position){

 const lat = position.coords.latitude;
 const lng = position.coords.longitude;

 map.setView([lat, lng], 12);

});


// Submit disaster report
document.getElementById("reportForm").addEventListener("submit", function(e){

 e.preventDefault();

 const type = document.getElementById("type").value;
 const description = document.getElementById("description").value;
 const severity = document.getElementById("severity").value;

 const lat = selectedLat;
 const lng = selectedLng;

 if(!lat || !lng){
  alert("Please click on the map to select disaster location");
  return;
 }

 db.collection("reports").add({

  type: type,
  description: description,
  severity: severity,
  latitude: lat,
  longitude: lng,
  timestamp: Date.now()

 }).then(()=>{

  alert("Report Submitted!");

  // Reset form
  document.getElementById("reportForm").reset();

  // Remove marker
  if(marker){
   map.removeLayer(marker);
  }

  selectedLat = null;
  selectedLng = null;

 });

});