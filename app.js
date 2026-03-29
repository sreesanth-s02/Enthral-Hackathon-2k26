// Initialize Map
var map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'OpenStreetMap'
}).addTo(map);

// Get user location
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

navigator.geolocation.getCurrentPosition(function(position){

const lat = position.coords.latitude;
const lng = position.coords.longitude;

db.collection("reports").add({
type:type,
description:description,
severity:severity,
latitude:lat,
longitude:lng,
timestamp:Date.now()
});

alert("Report submitted!");

});

});

// Load reports on map
db.collection("reports").onSnapshot((snapshot)=>{

snapshot.forEach(doc=>{

const data = doc.data();

L.marker([data.latitude, data.longitude])
.addTo(map)
.bindPopup(
`<b>${data.type}</b><br>
 Severity: ${data.severity}<br>
 ${data.description}`
);

});

});
