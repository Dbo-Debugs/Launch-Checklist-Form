// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
      }
      else if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Please enter valid information for each field!");
      } else {

         document.getElementById("faultyItems").style.visibility = "visible";
         document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         document.getElementById("copilotStatus").innerHTML = `Co-Pilot ${copilotNameInput.value} is ready for launch`;
         if (fuelLevelInput.value > 10000) {
            document.getElementById("fuelStatus").innerHTML = `Fuel level good, ready for launch`;
         } else if (fuelLevelInput.value < 10000) {
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
         }
         if (cargoMassInput.value < 10000) {
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
         } else if (cargoMassInput.value > 10000) {
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
         }

         if (fuelLevelInput.value > 10000 && cargoMassInput.value < 10000) {
            document.getElementById("launchStatus").innerHTML = `Shuttle ready for launch`;
            document.getElementById("launchStatus").style.color = "green";
         } else {
            document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch`;
            document.getElementById("launchStatus").style.color = "red";
         }
      }

      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            const missionTarget = document.getElementById("missionTarget");
            form.addEventListener("submit", function(event) {
               randomJson = json[Math.floor(Math.random() * json.length)];
               missionTarget.innerHTML = `

         <h2>Mission Destination</h2>
   <ol>
      <li>Name: ${randomJson.name}</li>
      <li>Diameter: ${randomJson.diameter}</li>
      <li>Star: ${randomJson.star}</li>
      <li>Distance from Earth: ${randomJson.distance}</li>
      <li>Number of Moons: ${randomJson.moons}</li>
   </ol>
   <img src="${randomJson.image}"></img>

         `;
            });
         });
      });
   });
});

