const gameLogic = new AgesGameLogic();
let defaultMapImages = {
    overworld: "overworld_present",
    dungeons: "d0_present",
    specialAreas: "d9_zeldaRescue"
}, defaultStageView = "overworld", currentMap = `default/${defaultMapImages[defaultStageView]}`;

function drawItems() {
    const itemsElem = document.getElementById("gameItems");
    gameLogic.allItemClassifications = [];
    itemsElem.innerHTML = '';
    for (const item in items) {
        const info = items[item];
        if (info.invisible) continue;
        if (!gameLogic.allItemClassifications.find(i => i == info.classification)) gameLogic.allItemClassifications.push(info.classification);
        if (info.onChange) info.onChange(info, triggerItem);
        const li = document.createElement("li");
        li.setAttribute("data-classification", info.classification);
        if (info.classification != gameLogic.showItemsWithClassification) li.style.display = 'none';
        li.className = "nav-item";
        if (info.position) {
            li.style.position = "absolute";
            for (const i in info.position) li.style[i] = info.position[i];
        }
        const a = document.createElement("a");
        a.className = `nav-link d-flex align-items-center ${info.count >= 1 ? ' active' : ''}`;
        a.style.cursor = "pointer";
        a.title = item + (info.displayCount ? ` (Count: ${info.count || 0})` : '')
        if (!info.unclickable) a.addEventListener("click", e => {
            triggerItem(info);
        })
        const img = document.createElement("img");
        img.height = info.scaleViaHeight || 32;
        img.style.width = "auto";
        const defaultCount = info.defaultCount == 0 ? "0" : info.defaultCount;
        img.src = `./items/${info.imageName}${info.limit && !info.dontChangeImage ? (info.count || defaultCount || 1) : ''}.png`;
        img.alt = item;
        if (!info.noDisable && !info.count) img.style.filter = "grayscale(100%)";
        else if (info.improveImageVisibility) img.style.filter = "contrast(1969%)";
        a.appendChild(img);
        li.appendChild(a);
        itemsElem.appendChild(li);
    }
    window.addEventListener("DOMContentLoaded", e => {
        document.getElementById("itemsView").innerHTML = gameLogic.allItemClassifications.map(d => {
            const word = d.split("_").map(g => {
                const end = g.substring(1);
                const beg = g.slice(0, -end.length);
                return beg.toUpperCase() + end;
            }).join(" ");
            return `<option value="${d}"${gameLogic.showItemsWithClassification == d ? " selected" : ''}>View ${word} Items</option>`
        }).join("");
    })
}
drawItems();

function changeItemViewPreference(info) {
    gameLogic.showItemsWithClassification = info.value;
    drawItems();
}

function triggerItem(itemInfo, times = 1, dontCallItemsDrawFunction = false) {
    for (var i = 0; i < times; i++) {
        itemInfo.count ||= 0;
        if (((!itemInfo.limit && itemInfo.count == 1) || itemInfo.count > itemInfo.limit) && !itemInfo.unlimited) itemInfo.count = 0;
        else itemInfo.count++
    }
    if (!dontCallItemsDrawFunction) drawItems()
    goToMap()
}

function goToMap() {
    gameLogic.popovers = {};
    gameLogic.counts = {};
    const mapCanvas = document.getElementById("mapCanvas");
    mapCanvas.innerHTML = "";
    const image = document.createElement("img");
    image.src = `maps/${currentMap}.png`;
    image.alt = `Map: ${currentMap.split("/")[1].replaceAll("_", " ")}`;
    for (const position of gameLogic.mapLayout[currentMap]) {
        const info = position.array[0];
        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = `btn btn-${position.array.filter(i => i.checked).length == position.array.length ? 'secondary' : (() => {
            return position.array.filter(i => i.reachable()).length == position.array.length ? 'success' : 'danger';
        })()}`;
        marker.setAttribute("data-bs-toggle", "popover");
        marker.setAttribute("title", info?.providedStartName || info?.providedRegion);
        marker.setAttribute("data-bs-placement", "top")
        marker.setAttribute("data-bs-content", (() => {
            const htmls = [];
            for (let i = 0; i < position.array.length; i++) {
                const v = position.array[i];
                htmls.push(`<img src="./items/chest_${currentMap.endsWith("past") ? 'past' : 'present'
                    }${v.checked ? '_open' : ''}.png" onclick="checkLocation(this)" style="cursor: pointer;" data-region="${v.region_id}" data-index="${v.providedStartName ? (() => {
                        if (gameLogic.counts[v.region_id] != undefined) gameLogic.counts[v.region_id]++;
                        gameLogic.counts[v.region_id] ||= 0;
                        return gameLogic.counts[v.region_id];
                    })() : i
                    }" data-popoverProperty="${marker.getAttribute('title')}"> <span style="color: ${v.checked ? 'gray' : v.reachable() ? 'green' : 'red'};">${v.checkLocation
                    }</span>`);
            }
            return htmls.join('<br>');
        })());
        const markerStyle = {
            position: "absolute",
            left: position.x + "px",
            top: position.y + "px",
            padding: "4px",
            border: '2px solid black',
            'border-radius': '0px'
        }
        for (const i in markerStyle) marker.style[i] = markerStyle[i];
        mapCanvas.appendChild(marker);
        gameLogic.popovers[marker.getAttribute('title')] = new bootstrap.Popover(marker, {
            html: true,
            sanitize: false
        });
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
mapSwitchButtonsHandler()

/**
 * Checks off a location when an image of a treasure chest is clicked inside a popover.
 * @param {HTMLImageElement} e The treasure chest a user clicked on.
 */
function checkLocation(e) {
    const info = gameLogic.findLocationInfoByRegionName(e.getAttribute("data-region"))[e.getAttribute("data-index")];
    info.checked = !info.checked;
    gameLogic.popovers[e.getAttribute('data-popoverProperty')].dispose();
    goToMap();
}

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