// Initizlizes the logic for Ages.
const gameLogic = new AgesGameLogic();

// Images that are default when things change.
let defaultMapImages = {
    overworld: "overworld_present",
    dungeons: "d0_present",
    specialAreas: "d9_zeldaRescue"
}, defaultStageView = "overworld", currentMap = `default/${defaultMapImages[defaultStageView]}`, mapImageData = '', connected2archipelago = false;

/**
 * Appends items to the sidebar
 */
function drawItems() {
    const itemsElem = document.getElementById("gameItems");
    const allItemClassifications = [];
    itemsElem.innerHTML = '';
    for (const item in items) {
        const info = items[item];
        if (info.invisible) continue;
        if (!allItemClassifications.find(i => i == info.classification)) allItemClassifications.push(info.classification);
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
        a.addEventListener("click", e => {
            if (info.unclickable) return alert(`${item} cannot be checked.`);
            if (connected2archipelago) return alert(`A server is relying on ${item} to be checked, so you cannot check off this item manually right now.`);
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
    document.getElementById("goModeItemsNeeded-count").innerHTML = gameLogic.calculateItemsNeededForGameCompletion();
    const goModeElem = document.getElementById("go-mode");
    const canBeatGame = parseInt(document.getElementById("goModeItemsNeeded-count").innerHTML) == 0;
    goModeElem.style.color = canBeatGame ? 'green' : 'red';
    goModeElem.innerHTML = canBeatGame ? 'Yes' : 'No';
    document.getElementById("itemsView").innerHTML = allItemClassifications.map(d => {
        const word = d.split("_").map(g => {
            const end = g.substring(1);
            const beg = g.slice(0, -end.length);
            return beg.toUpperCase() + end;
        }).join(" ");
        return `<option value="${d}"${gameLogic.showItemsWithClassification == d ? " selected" : ''}>View ${word} Items</option>`
    }).join("");
}

/**
 * Changes the way a user views a item when they request it.
 * @param {HTMLSelectElement} info - Infomation from a select element.
 */
function changeItemViewPreference(info) {
    gameLogic.showItemsWithClassification = info.value;
    drawItems();
}

/**
 * Checks off an item when it is clicked
 * @param {object} itemInfo - Infomation about the item
 * @param {number} times - The amount of times an item should be checked off. Default is 1 
 * @param {boolean} dontCallItemsDrawFunction - The drawItems function won't be called if this parameter is set to true. 
 * @param {boolean} dontDrawMap - The goToMap function won't be called if this parameter is set to true. 
 */
function triggerItem(itemInfo, times = 1, dontCallItemsDrawFunction = false, dontDrawMap = false) {
    for (var i = 0; i < times; i++) {
        itemInfo.count ||= 0;
        if (((!itemInfo.limit && itemInfo.count == 1) || itemInfo.count > itemInfo.limit) && !itemInfo.unlimited) itemInfo.count = 0;
        else itemInfo.count++
    }
    if (!dontCallItemsDrawFunction) drawItems()
    if (!dontDrawMap) goToMap()
}

/**
 * Draw a map to the canvas
 */
function goToMap() {
    gameLogic.popovers = {};
    gameLogic.counts = {};
    const [layoutType, mapImage] = currentMap.split("/");
    const mapCanvas = document.getElementById("mapCanvas");
    mapCanvas.innerHTML = "";
    const image = document.createElement("img");
    image.src = mapImageData || `maps/${currentMap}.png`;
    image.alt = `Map: ${currentMap.split("/")[1].replaceAll("_", " ")}`;
    const reachableLocations = [];
    gameLogic.maps[mapImage].layouts ||= {
        default: []
    };
    document.getElementById('overWorldView').style.display = gameLogic.maps[mapImage].layouts.ingame ? 'block' : 'none';
    for (const position of gameLogic.maps[mapImage].layouts[layoutType]) {
        const info = position.array[0];
        if (info?.hidden) continue;
        const marker = document.createElement("button");
        marker.type = "button";
        marker.className = `btn btn-${position.array.filter(i => i.checked).length == position.array.length ? 'secondary' : (() => {
            return position.array.filter(i => i.reachable()).length == position.array.length ? (() => {
                position.array.forEach(f => reachableLocations.push(f));
                return 'success'
            })() : 'danger';
        })()}`;
        marker.setAttribute("data-bs-toggle", "popover");
        marker.setAttribute("title", info?.providedStartName || info?.providedRegion);
        marker.setAttribute("data-bs-placement", "top")
        marker.setAttribute("data-bs-content", (() => {
            const htmls = [];
            for (let i = 0; i < position.array.length; i++) {
                const v = position.array[i];
                htmls.push(`<img src="./items/chest_${currentMap.endsWith("past") ? 'past' : 'present'
                    }${v.checked ? '_open' : ''}.png" ${!connected2archipelago ? 'onclick="checkLocation(this)"' : ''
                    } style="cursor: pointer;" data-region="${v.region_id}" data-index="${v.providedStartName ? (() => {
                        if (gameLogic.counts[v.region_id] != undefined) gameLogic.counts[v.region_id]++;
                        gameLogic.counts[v.region_id] ||= 0;
                        return gameLogic.counts[v.region_id];
                    })() : i
                    }" data-popoverProperty="${marker.getAttribute('title')}"> <span style="color: ${v.checked ? 'gray' : v.reachable() ? 'green' : 'red'};">${v.checkLocation}</span>`);
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
    document.getElementById('reachable-count').innerText = reachableLocations.length;
    document.getElementById("itemsUserCanGet").innerHTML = reachableLocations.map(d => `<tr><td>${d.checkLocation}</td></tr><tr></tr><tr></tr>${connected2archipelago ? '<tr></tr>' : ''
        }<tr></tr>`).join("")
    mapCanvas.appendChild(image);
    mapSwitchButtonsHandler(button => {
        const appImageMatchesCurrentMap = button.getAttribute("data-mapImage") !== currentMap.split("/")[1]
        button.classList.remove(appImageMatchesCurrentMap ? "btn-secondary" : "btn-outline-secondary");
        button.classList.add(appImageMatchesCurrentMap ? "btn-outline-secondary" : "btn-secondary");
    });
}

/**
 * Handler for all of the map switching buttons.
 * @param {function} myFunction - Can be replaced with a custom function representing a button to avoid repeating code.
 */
function mapSwitchButtonsHandler(myFunction) {
    document.querySelectorAll(".mapSwitcher").forEach(button => {
        if (!myFunction) button.addEventListener("click", (e) => {
            const mapImage = button.getAttribute("data-mapImage");
            if (mapImage == "animal_companion_regions") askUserWhatCompanionTheyWant();
            else changeMapImage(mapImage)
        });
        else myFunction(button);
    });
}
window.addEventListener("DOMContentLoaded", initTracker)

/**
 * Changes the image of the map and then draws it to the canvas.
 * @param {string} mapImage - The type of map to draw from the maps folder.
 * @param {boolean} drawMapImage - calls the goToMap function when set to true.
 * @param {Base64URLString} imageData - Data URL of a map image if provided.
 */
function changeMapImage(mapImage, drawMapImage = true, imageData) {
    mapImageData = imageData;
    const array = currentMap.split("/");
    array[1] = mapImage;
    currentMap = array.join("/");
    if (drawMapImage) goToMap()
}

/**
 * Pops up a modal window asking a user what animal companion they want to use for their map.
 */
function askUserWhatCompanionTheyWant() {

}

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

/**
 * 
 * @param {string} view - The type of view to change to.
 * @param {boolean} goToMapAfterwards - calls the goToMap function when this parameter is set to true
 * @returns 
 */
function changeOverworldView(view, goToMapAfterwards = true) {
    const array = currentMap.split("/");
    array[0] = view;
    mapSwitchButtonsHandler(button => {
        if (!button.getAttribute("data-partOfIngameMaps")) button.style.display = view === "ingame" ? "none" : "inline-block";
    });
    if (goToMapAfterwards) {
        currentMap = array.join("/");
        goToMap();
    } else return array;
}

/**
 * Connects to an Archipelago Server.
 * @param {HTMLFormElement} obj - The form that handles connection for Archipelago.
 */
function archipelagoConnector(obj) {
    $(obj).find("p").text('')
    if (connected2archipelago) { // disconnects from the archipelago server when the user clicks on the Disconnect From Archipelago button.
        if ($(obj).find('button[type="submit"]').data("connected")) jQuery(obj).trigger("archipelagoDisconnect");
        else $(obj).find("p").css("color", "red").text('Please wait for the archipelago server to be fully connected before you disconnect.')
    } else { // Starts the connection to the Archipelago server.
        let connectionSuccessful = false;
        connected2archipelago = true;
        const originalText = $(obj).find('button[type="submit"]').text();
        const originalText2 = $("#statusKindof").text();
        $("#statusKindof").html('<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Connecting To Archipelago...</span>')
        $(obj).find('button[type="submit"]').attr("disabled", "");
        $(obj).find('button[type="submit"]').html('<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Connecting To Archipelago...</span>');
        function handleError(e) { /// handles an error of one occurs during connection.
            $("#statusKindof").text(originalText2);
            $(obj).find('button[type="submit"]').attr("disabled", false)
            $(obj).find('button[type="submit"]').text(originalText);
            connected2archipelago = false;
            console.error(e);
            $(obj).find("p").css("color", "red")
            $(obj).find("p").html(`Failed to connect to Archipelago's WebSockets.<br>${e.toString()}`);
        }
        try {
            const info = Object.fromEntries(new URLSearchParams($(obj).serialize()));
            const socket = new WebSocket(`${info.host.startsWith("localhost") || info.host.startsWith("127.0.0.1") ? 'ws' : 'wss'}://${info.host}`);
            setTimeout(() => { // added this in case archipelago tries to take forever to connect. You are better off having a fast internet connection.
                if (!connectionSuccessful) {
                    socket.close();
                    handleError("Timeout occured. Please try again later.")
                }
            }, 35042)
            let roomInfo;
            socket.addEventListener("message", async e => {
                const array = JSON.parse(e.data);
                for (const info2 of array) {
                    switch (info2.cmd) {
                        case "RoomInfo": {
                            if (info2.password == false || info.password) {
                                roomInfo = info2;
                                roomInfo.tags.push("Tracker");
                                if (info.password) roomInfo.password = info.password;
                                info2.cmd = "GetDataPackage";
                            } else {
                                handleError("Please enter in the password");
                                $(obj).append(`<label for="password">Password</label><input class="form-control" type="password" id="password" name="password" required/>`);
                            }
                            break;
                        } case "DataPackage": {
                            const games = info2.data.games;
                            function uuidGenV4() { // generates a v4 UUID for archipelago
                                const G = [];
                                for (let Q = 0; Q < 36; Q++) G.push(Math.floor(Math.random() * 16));
                                return G[14] = 4, G[19] = G[19] &= -5, G[19] = G[19] |= 8, G[8] = G[13] = G[18] = G[23] = "-", G.map((Q) => Q.toString(16)).join("")
                            }
                            for (const game in games) {
                                if (game == "Archipelago") continue;
                                Object.assign(info2, {
                                    cmd: "Connect",
                                    password: roomInfo.password || '',
                                    name: info.user,
                                    game,
                                    slot_data: true,
                                    items_handling: 7,
                                    uuid: uuidGenV4(),
                                    tags: roomInfo.tags,
                                    version: roomInfo.version,
                                });
                                for (const location in games[game].location_name_to_id) {
                                    locations[location].APID = games[game].location_name_to_id[location]
                                }
                                for (const item in games[game].item_name_to_id) {
                                    items[item].APID = games[game].item_name_to_id[item]
                                }
                            }
                            break;
                        } case "Connected": {
                            jQuery(obj).bind("archipelagoDisconnect", () => {
                                $(obj).find('button[type="submit"]').attr("data-connected", false);
                                socket.close();
                                $(obj).find('button[type="submit"]').text(originalText);
                                $("#statusKindof").html(originalText2);
                                document.getElementById("stageView").style.display = "block";
                                connected2archipelago = false;
                                initTracker()
                                for (const elem of document.getElementsByClassName("mapSwitcher")) elem.removeAttribute("disabled");
                                connectionSuccessful = false;
                                $(obj).find("p").text('Successfully disconnected from the Archipelago Server')
                            })
                            initTracker();
                            for (const elem of document.getElementsByClassName("mapSwitcher")) elem.setAttribute("disabled", "");
                            document.getElementById("stageView").style.display = "none";
                            connectionSuccessful = true;
                            $("#statusKindof").text("Connected To Archipelago")
                            $(obj).find("p").css("color", "lime");
                            $(obj).find('button[type="submit"]').attr("data-connected", true);
                            $(obj).find('button[type="submit"]').attr("disabled", false);
                            $(obj).find('button[type="submit"]').text("Disconnect From Archipelago");
                            $(obj).find("p").text(`Successfully connected to the Archipelago server!`);
                            break;
                        } case "ReceivedItems": {
                            for (const archipelagoItemInfo of info2.items) {
                                const item = Object.keys(items).find(i => items[i].APID == archipelagoItemInfo.item);
                                if (item) triggerItem(items[item], 1, true, true);
                                const location = Object.keys(locations).find(i => locations[i].APID == archipelagoItemInfo.location);
                                if (location) {
                                    locations[location].checked = true;
                                    (gameLogic.popovers[location] || gameLogic.popovers[locations[location].region_id])?.dispose();
                                }
                            }
                            break;
                        } case "Bounced": {
                            if (info2.data) {
                                if (info2.data['Current Room']) {
                                    for (const i in gameLogic.maps) {
                                        console.log("Current Room:", info2.data['Current Room'])
                                        const info = gameLogic.maps[i].roomCondtionals.find(i => (i.equals_to === info2.data['Current Room']) || (
                                            info2.data['Current Room'] >= i.min && info2.data['Current Room'] <= i.max
                                        ));
                                        if (info) {
                                            console.log("Current Room Info:", info);
                                            const image2draw = gameLogic.maps[i];
                                            console.log("Current Map Info:", image2draw);
                                            let element = jQuery(".stageViewOption").find(`button[data-mapImage="${i}"]`)[0];
                                            function goToElemWithViewData() {
                                                element = element.parentElement;
                                                const view = element.getAttribute("data-view");
                                                if (!view) goToElemWithViewData();
                                                else {
                                                    changeStageView(view);
                                                    changeMapImage(i);
                                                }
                                            }
                                            gameLogic.serverCurrentMap = i;
                                            if (currentMap.startsWith("ingame")) {
                                                if (image2draw.layouts?.ingame) goToElemWithViewData()
                                            } else goToElemWithViewData();
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (!connectionSuccessful) socket.send(JSON.stringify(array));
                else {
                    drawItems();
                    goToMap();
                }
            })
        } catch (e) {
            handleError(e);
        }
    }
}

function initTracker() {
    for (const i in items) {
        function resetItems() {
            items[i].count--
            if (items[i].count > 0) resetItems()
        }
        if (items[i].count) resetItems();
    }
    drawItems();
    goToMap();
    mapSwitchButtonsHandler();
}

/**
 * Changes the stage view along with a map change.
 * @param {string} value - The stage to change into
 * @param {HTMLElement} $this - an HTML element
 */
function changeStageView(value) {
    let array = currentMap.split("/");
    if (array[0] == "ingame" && value != "overworld") array = changeOverworldView("default", false);
    array[1] = defaultMapImages[value];
    for (const divElement of document.querySelectorAll(".stageViewOption")) {
        divElement.style.display = divElement.getAttribute("data-view") === value ? "block" : "none";
    }
    currentMap = array.join("/");
}

document.getElementById("overworld-view-select").addEventListener("change", e => {
    changeOverworldView(e.target.value);
    if (e.target.value == "default" && gameLogic.serverCurrentMap) changeMapImage(gameLogic.serverCurrentMap);
});

document.getElementById("stage-view-select").addEventListener("change", e => {
    changeStageView(e.target.value);
    goToMap();
});