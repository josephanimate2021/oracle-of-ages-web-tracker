const gameLogic = new AgesGameLogic();
let defaultMapImages = {
  overworld: "overworld_present",
  dungeons: "d0_present",
  specialAreas: "d9_zeldaRescue"
}, defaultStageView = "overworld", currentMap = `default/${defaultMapImages[defaultStageView]}`;

function goToMap() {
  const mapCanvas = document.getElementById("mapCanvas");
  mapCanvas.innerHTML = "";
  const image = document.createElement("img");
  image.src = `maps/${currentMap}.png`;
  image.alt = `Map: ${currentMap.split("/")[1].replaceAll("_", " ")}`;
  for (const position of gameLogic.mapLayout[currentMap]) {
    const marker = document.createElement("div");
    marker.style.position = "absolute";
    marker.classList.add("mapMarker");
    marker.style.left = position.x + "px";
    marker.style.top = position.y + "px";
    marker.style['background-color'] = position.metReachableRequirements() ? "green" : "red";
    marker.style.cursor = "pointer";
    marker.style.padding = "5px";
    marker.style.border = "2px solid black";
    marker.title = position.location;
    marker.addEventListener("click", () => {
      console.log(`Clicked marker at (${position.x}, ${position.y}) on map ${currentMap}`);
    });
    mapCanvas.appendChild(marker);
  }
  mapCanvas.appendChild(image);
  mapSwitchButtonsHandler(button => {
    const appImageMatchesCurrentMap = button.getAttribute("data-mapImage") !== currentMap.split("/")[1]
    button.classList.remove(appImageMatchesCurrentMap ? "btn-secondary" : "btn-outline-secondary");
    button.classList.add(appImageMatchesCurrentMap ? "btn-outline-secondary" : "btn-secondary");
  });
}

goToMap();

function mapSwitchButtonsHandler(myFunction) {
  document.querySelectorAll(".mapSwitcher").forEach(button => {
    if (!myFunction) button.addEventListener("click", (e) => {
      const mapImage = button.getAttribute("data-mapImage");
      const array = currentMap.split("/");
      array[1] = mapImage;
      currentMap = array.join("/");
      goToMap()
    });
    else myFunction(button);
  });
}
mapSwitchButtonsHandler();

document.getElementById("overworld-view-select").addEventListener("change", e => {
  const array = currentMap.split("/");
  array[0] = e.target.value;
  mapSwitchButtonsHandler(button => {
    if (!button.getAttribute("data-partOfIngameMaps")) button.style.display = e.target.value === "ingame" ? "none" : "inline-block";
  });
  currentMap = array.join("/");
  goToMap();
});

document.getElementById("stage-view-select").addEventListener("change", e => {
  const array = currentMap.split("/");
  array[1] = defaultMapImages[e.target.value];
  for (const button of document.querySelectorAll(".stageViewOption")) {
    button.style.display = button.getAttribute("data-view") === e.target.value ? "block" : "none";
  }
  currentMap = array.join("/");
  goToMap();
});