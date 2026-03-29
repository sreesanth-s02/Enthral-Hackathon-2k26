// Initialize map
var map = L.map('map').setView([20.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
}).addTo(map);

let markers = [];
let heatLayer = null;

// Listen to Firestore in real time
db.collection("reports").onSnapshot(function(snapshot){

    // Remove previous markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Remove previous heatmap
    if(heatLayer){
        map.removeLayer(heatLayer);
    }

    let heatPoints = [];

    snapshot.forEach(function(doc){

        const data = doc.data();

        let color;

        if(data.severity === "High") color = "red";
        else if(data.severity === "Medium") color = "orange";
        else color = "green";

        // Create marker
        let marker = L.circleMarker([data.latitude, data.longitude], {
            radius: 10,
            color: color
        })
        .addTo(map)
        .bindPopup(
            `<b>${data.type}</b><br>
            Severity: ${data.severity}<br>
            ${data.description}`
        );

        markers.push(marker);

        // Add to heatmap points
        heatPoints.push([data.latitude, data.longitude, 0.8]);

    });

    // Create heatmap
    heatLayer = L.heatLayer(heatPoints, {
        radius: 25,
        blur: 20
    }).addTo(map);

});


// Logout function
function logout(){

    alert("Logged out successfully");

    window.location.href = "admin-login.html";

}