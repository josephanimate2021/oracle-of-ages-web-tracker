/**
 * This is the code behind the logic for The Legend of Zelda: Oracle of Ages (built in JavaScript).
 * It defines the map layout and the requirements to access certain locations.
 */
class AgesGameLogic {

    /**
     * Creates a map layout and anything else relating to logic.
     */
    constructor() {

        // Show progression items by default.
        this.showItemsWithClassification = "progression";

        // All dungeons in Ages.
        this.dungeonsReachable = {
            "Maku Path": () => this.canAccessLynnaCity() && (
                this.hasShovel() || this.canBeatVernanFirstStage()
            ),
            "Spirit's Grave": () => this.canUseEmberSeeds(false) && this.hasItem("Graveyard Key"),
            "Wing Dungeon": () => (
                this.canEnterDekuForest() && this.hasBombs()
            ) || ( // For Present D2 (Randomizer Usage Only)
                (!connected2archipelago && this.isRandomizer()) && this.canEnterFairiesWoods() && this.canGoBackToPresent()
            ),
            "Moonlit Grotto": () => this.canAccessCresentIsland(),
            "Skull Dungeon": () => this.canGoToSymmetryPresent() && (
                this.hasItem("Tuni Nut", 2) && this.canOpenPortal()
            ),
            "Crown Dungeon": () => false,
            "Mermaid's Cave": (isPresent) => false,
            "Jabu-Jabu's Belly": () => this.canHealZoraKing() && this.hasItem("Fairy Powder"),
            "Ancient Tomb": () => (
                this.hasItem("Tokay Eyeball")
                && this.canBreakPot()
                && this.hasSirenSuit()
                && this.hasBombs()
                && this.hasFeather()
                && this.canKillNormalEnemy()
                && (
                    // Finding the road in the dark room
                    this.hasCane()
                    || (
                        this.hasMediumLogic()
                        && (
                            this.canKillNormalEnemy()
                            || this.canPushEnemy()
                            || this.hasBoomerang()
                            || this.hasSwitchHook()
                            || this.canUsePegasusSeedsForStun()
                        )
                    )
                )
            )
        }
        this.dungeons = Object.keys(this.dungeonsReachable);

        // Logic Settings and other stuff.
        this.gameSettingOptions = {
            logic_difficulty: {
                options: ["basic", "medium", "hard"],
                default: "basic"
            },
            required_essences_for_maku_seed: {
                default: 8,
                lowestValue: 0,
                highestValue: 8
            },
            required_slates_for_ancient_tomb_second_basement: {
                default: 4,
                lowestValue: 0,
                highestValue: 4
            },
            randomizer_mode: {
                default: true // true by default since most people usually proitize a tracker for a randomizer. This can still be changed anytime.
            },
            goal: {
                default: "beat_vernan",
                options: ['beat_vernan', 'beat_ganon']
            },
            animal_companion: {
                default: "ricky",
                options: ["ricky", "dimitri", "moosh"]
            },
            open_advance_shop: {
                default: false
            }
        }
        this.vanilaDungeonEntrances = {
            "d0 entrance": "enter d0",
            "d1 entrance": "enter d1",
            "d2 past entrance": "enter d2",
            "d3 entrance": "enter d3",
            "d4 entrance": "enter d4",
            "d5 entrance": "enter d5",
            "d6 past entrance": "enter d6 past",
            "d6 present entrance": "enter d6 present",
            "d7 entrance": "enter d7",
            "d8 entrance": "enter d8"
        }

    };

    /**
     * Loads the maps for the game
     */
    initMaps() {

        // The maps in Ages.
        this.maps = {
            "symmetry_city_present": {
                layouts: {
                    default: [
                        { x: 395, y: !this.hasItem("Tuni Nut", 2) ? 185 : 473, array: this.findLocationInfoByRegionName("symmetry city tree") },
                        { x: 394, y: 340, dungeonEntrance: "d4" }
                    ]
                },
                roomCondtionals: [
                    {
                        min: 0x012,
                        max: 0x014
                    },
                    {
                        min: 0x002,
                        max: 0x004
                    }
                ]
            },
            "symmetry_city_past": {
                layouts: {
                    default: [
                        { x: 78, y: 86, array: this.findLocationInfoByRegionName("symmetry city brother") },
                        { x: 940, y: 86, array: this.findLocationInfoByRegionName("symmetry city brother") },
                        { x: 509, y: 465, array: this.findLocationInfoByRegionName("symmetry middle man trade") },
                    ]
                },
                roomCondtionals: [
                    {
                        min: 0x112,
                        max: 0x114
                    },
                    {
                        min: 0x102,
                        max: 0x104
                    }
                ]
            },
            "animal_companion_regions": {
                layouts: {
                    dimitri: [
                        { x: 345.5, y: 272, array: this.findLocationInfoByRegionName("nuun highlands cave") }
                    ],
                    ricky: [
                        { x: 402, y: 209, array: this.findLocationInfoByRegionName("nuun highlands cave") }
                    ],
                    moosh: [
                        { x: 370, y: 305, array: this.findLocationInfoByRegionName("nuun highlands cave") }
                    ]
                },
                roomCondtionals: [
                    {
                        equals_to: 0x035
                    },
                    {
                        min: 0x036,
                        max: 0x037
                    },
                    {
                        min: 0x026,
                        max: 0x027
                    },
                    {
                        min: 0x016,
                        max: 0x017
                    },
                    {
                        min: 0x006,
                        max: 0x007
                    }
                ]
            },
            "overworld_present": {
                layouts: {
                    default: [

                        /** ALL OVEROWRLD PRESENT LOCATIONS **/

                        // Forest of Time Locations
                        { x: 0, y: 0, array: this.findLocationInfoByRegionName("maple trade") },
                        { x: 462, y: 125, array: this.findLocationInfoByRegionName("starting item") },
                        { x: 495, y: 120, array: this.findLocationInfoByRegionName("nayru's house") },
                        { x: 446, y: 281, array: [
                            ...this.findLocationInfoByRegionName("balloon guy's gift"), 
                            ...this.findLocationInfoByRegionName("balloon guy's upgrade") 
                        ] },

                        // Yoll: Graveyard Locations
                        { x: 632, y: 335, array: this.findLocationInfoByRegionName("grave under tree") },
                        { x: 541.5, y: 325, array: this.findLocationInfoByRegionName("yoll graveyard heartpiece") },
                        { x: 541.5, y: 200, array: this.findLocationInfoWithStartName("Yoll Graveyard: Cheval") },
                        { x: 607, y: 285, array: this.findLocationInfoByRegionName("graveyard poe trade") },
                        { x: 663, y: 200, array: this.findLocationInfoByRegionName("syrup shop") },

                        // South Shore Locations
                        { x: 404, y: 359, array: this.findLocationInfoByRegionName("south shore dirt") },

                        // Lynna City Locations
                        { x: 320, y: 210, array: this.findLocationInfoByRegionName("lynna city comedian trade") },
                        { x: 420, y: 240, array: this.findLocationInfoByRegionName("lynna shop") },
                        { x: 308.5, y: 252, array: this.findLocationInfoByRegionName("mamamu yan trade") },
                        { x: 438, y: 177, array: this.findLocationInfoByRegionName("lynna city chest") },
                        { x: 410, y: 140, array: this.findLocationInfoByRegionName("maku tree") },
                        { x: 410, y: 210, array: this.findLocationInfoByRegionName("vasu's gift") },
                        { x: 410, y: 240, array: this.findLocationInfoByRegionName("hidden shop") },
                        { x: 360, y: 200, array: this.findLocationInfoByRegionName("mayor plen's house") },

                        // Fairies Woods Locations
                        { x: 223, y: 325, array: this.findLocationInfoByRegionName("fairies' woods chest") },
                        { x: 70, y: 364, array: this.findLocationInfoByRegionName("fairies' coast chest") },
                        { x: 150, y: 212.5, array: this.findLocationInfoByRegionName("happy mask salesman trade") },

                        // Nuun Highlands Locations (Ricky only)
                        { x: 359, y: 100, array: this.settings.animal_companion == "ricky" ? this.findLocationInfoByRegionName("nuun highlands cave") : [{hidden: true}]},

                        // Talus Peeks Locations
                        { x: 63, y: 62.5, array: this.findLocationInfoByRegionName("symmetry city heartpiece") },
                        { x: 27, y: 212.5, array: this.findLocationInfoByRegionName("bomb fairy") },
                        { x: 152, y: 237, array: this.findLocationInfoByRegionName("talus peaks chest") },

                        // Crescent Island Locations
                        { x: 597, y: 373, array: this.findLocationInfoByRegionName("under crescent island") },
                        { x: 652, y: 510, array: this.findLocationInfoByRegionName("tokay chef trade") },

                        // Zora Village Locations
                        { x: 15, y: 471, array: this.findLocationInfoByRegionName("zora village present") },
                        { x: 15, y: 386, array: this.findLocationInfoByRegionName("zora NW cave") },
                        { x: 73, y: 410, array: [
                            ...this.findLocationInfoByRegionName("zora king gift"),
                            ...this.findLocationInfoByRegionName("zora palace chest")
                        ] },
                        { x: 15, y: 416, array: this.findLocationInfoByRegionName("zora's reward") },

                        // Eyeglass Isle Library Locations
                        { x: 396, y: 252, array: this.findLocationInfoByRegionName("library present") },

                        // Zora Seas Locations
                        { x: 264, y: 513, array: this.findLocationInfoByRegionName("zora seas chest") },

                        /** ALL ENTRANCES **/

                        // Dungeon Entrances
                        { x: 658, y: 316, dungeonEntrance: 'd1' },
                        { x: 507, y: 446, dungeonEntrance: "d3" },
                        { x: 165, y: 10, dungeonEntrance: "d4" },
                        { x: 599.2, y: 125, dungeonEntrance: 'd6 present' },
                        { x: 15, y: 406, dungeonEntrance: 'd7' },

                        /** ALL TREES **/

                        // Seed Trees
                        { x: 165, y: 53, array: this.hasItem("Tuni Nut", 2) ? this.findLocationInfoByRegionName("symmetry city tree") : [{hidden: true}]},
                        { x: 407, y: 286, array: this.findLocationInfoByRegionName("south lynna tree") },
                        { x: 597, y: 403, array: this.findLocationInfoByRegionName("crescent island tree") },
                        /*{ x: 413, y: 85, array: [
                            ...this.findLocationInfoByRegionName("ridge west cave"),
                            ...this.findLocationInfoByRegionName("goron's hiding place"),
                            ...this.findLocationInfoByRegionName("ridge west heartpiece")
                        ] },*/
                        { x: 72, y: 476, array: this.findLocationInfoByRegionName("zora village tree") },

                        // Planned Locations for the future with the tracker/randomizer (hopefully)
                        // { x: 540, y: 490, array: this.findLocationInfoByRegionName("tokay gacha nut west") },
                        // { x: 656, y: 400, array: this.findLocationInfoByRegionName("tokay gacha nut east") },
                        { x: 385, y: 442, array: this.findLocationInfoByRegionName("sea of storms present") },

                    ],
                    ingame: [

                        // Forest of Time Locations
                        { x: 195, y: 83, array: this.findLocationInfoByRegionName("starting item") },
                        { x: 211, y: 83, array: this.findLocationInfoByRegionName("nayru's house") },

                        // Lynna City Locations
                        { x: 163, y: 115, array: this.findLocationInfoByRegionName("mayor plen's house") },
                        { x: 147, y: 115, array: this.findLocationInfoByRegionName("lynna city comedian trade") },
                        { x: 179, y: 115, array: this.findLocationInfoByRegionName("vasu's gift") },
                        { x: 195, y: 99, array: this.findLocationInfoByRegionName("lynna city chest") },
                        
                        // Planned Locations for the future with the tracker/randomizer (hopefully)
                        // { x: 179, y: 99, array: this.findLocationInfoWithStartName("Hero's Cave") },

                    ]
                },
                roomCondtionals: [
                    {
                        equals_to: 0x10E
                    },
                    {
                        min: 0x000,
                        max: 0x0FF
                    }
                ]
            },
            "overworld_past": {
                layouts: {
                    default: [

                        /** ALL OVEROWRLD PAST LOCATIONS **/

                        // Lynna Village Locations
                        { x: 366, y: 205, array: this.findLocationInfoByRegionName("postman trade") },
                        { x: 395, y: 205, array: this.findLocationInfoByRegionName("lynna shooting gallery") },
                        { x: 410, y: 205, array: this.findLocationInfoByRegionName("advance shop") },
                        { x: 322.5, y: 200, array: this.findLocationInfoByRegionName("sad boi trade") },
                        { x: 247.5, y: 209, array: this.findLocationInfoByRegionName("toilet hand trade") },
                        { x: 249, y: 177, array: this.findLocationInfoByRegionName("gasha farmer") },
                        { x: 355, y: 393, array: this.findLocationInfoByRegionName("rafton trade") },

                        // Black Tower Locations
                        { x: 310, y: 288, array: this.findLocationInfoByRegionName("black tower worker") },
                        { x: 325, y: 316, array: this.findLocationInfoByRegionName("black tower heartpiece") },

                        // Deku Forest Locations
                        { x: 182, y: 172, array: this.findLocationInfoByRegionName("restoration wall heartpiece") },
                        { x: 100, y: 290, array: this.findLocationInfoByRegionName("deku forest soldier") },
                        /* The soldier would move to another spot at some point in the game, but I am not precicely sure when that will happen, 
                        so I'll have to figure that out. */
                        // { x: 150, y: 276, array: this.findLocationInfoByRegionName("deku forest soldier") },
                        { x: 115, y: 276, array: this.findLocationInfoByRegionName("deku forest cave east") },
                        { x: 55, y: 281.5, array: this.findLocationInfoByRegionName("deku forest cave west") },
                        { x: 54, y: 355, array: this.findLocationInfoByRegionName("deku forest heartpiece") },

                        // Crescent Island Locations
                        { x: 473.5, y: 522, array: this.findLocationInfoByRegionName("hidden tokay cave") },
                        { x: 648, y: 477, array: this.findLocationInfoByRegionName("tokay chicken house") },
                        { x: 633, y: 517, array: this.findLocationInfoByRegionName("tokay pot cave") },
                        { x: 633, y: 427, array: this.findLocationInfoByRegionName("wild tokay game") },
                        { x: 533, y: 425, array: this.findLocationInfoByRegionName("tokay crystal cave") },
                        { x: 633, y: 470, array: this.findLocationInfoByRegionName("tokay bomb cave") },
                        { x: 653, y: 390, array: this.findLocationInfoWithStartName("Crescent Island (Past): Market") },

                        // Symmetry City Locations
                        { x: 103.5, y: 5, array: this.findLocationInfoByRegionName("symmetry city brother") },
                        { x: 225, y: 5, array: this.findLocationInfoByRegionName("symmetry city brother") },
                        { x: 164.5, y: 60, array: this.findLocationInfoByRegionName("symmetry middle man trade") },
                        
                        // Restoration Wall Locations
                        { x: 82, y: 4, array: this.findLocationInfoByRegionName("tokkey's composition") },
                        { x: 164.5, y: 75, array: [
                            ...this.findLocationInfoByRegionName("patch tuni nut ceremony"),
                            ...this.findLocationInfoByRegionName("patch broken sword ceremony")
                        ] },

                        // Sea of Storms locations
                        { x: 366, y: 490, array: this.findLocationInfoByRegionName("sea of storms past") },
                        { x: 310, y: 490, array: this.findLocationInfoByRegionName("piratian captain") },
                        { x: 266, y: 490, array: this.findLocationInfoByRegionName("fisher's island cave") },

                        // Ambi's Palace Locations
                        { x: 311, y: 4, array: (this.findLocationInfoWithStartName("Ambi's Palace")).filter(i => !i.checkLocation.endsWith("Seed Tree")) },

                        // Eyeglass Isle Library Locations
                        { x: 396, y: 252, array: this.findLocationInfoByRegionName("library past") },

                        // Outside D8 Entrance Locations
                        { x: 640, y: 248, array: this.findLocationInfoByRegionName("sea of no return") },

                        /** ALL ENTRANCES **/

                        // Dungeon Entrances
                        { x: 393, y: 162, dungeonEntrance: "d0" },
                        { x: 167.5, y: 316, dungeonEntrance: 'd2' },
                        { x: 602, y: 195, dungeonEntrance: "d8" },

                        /** ALL TREES **/

                        // Seed Trees
                        { x: 407, y: 286, array: this.findLocationInfoByRegionName("south lynna tree") },
                        { x: 267, y: 92, array: this.findLocationInfoByRegionName("ambi's palace tree") },
                        { x: 19, y: 321, array: this.findLocationInfoByRegionName("deku forest tree") },
                        { x: 72, y: 476, array: this.findLocationInfoByRegionName("zora village tree") },

                        // Planned Locations for the future with the tracker/randomizer (hopefully)
                        // { x: 247.5, y: 199, array: this.findLocationInfoByRegionName("lynna village gacha nut") },

                    ],
                    ingame: [
                        { x: 179, y: 99, dungeonEntrance: "d0" },
                    ]
                },
                roomCondtionals: [
                    {
                        min: 0x110,
                        max: 0x1FF
                    },
                    {
                        min: 0x100,
                        max: 0x10D
                    }
                ]
            },
            "underwater_present": {
                layouts: {
                    default: [
                        { x: 780, y: 320, array: this.findLocationInfoByRegionName("sea of storms present") },
                        { x: 1089, y: 298, array: this.findLocationInfoByRegionName("under crescent island") },
                        { x: 154.5, y: 224, array: [
                            ...this.findLocationInfoByRegionName("zora king gift"),
                            ...this.findLocationInfoByRegionName("zora palace chest")
                        ] },
                        { x: 42, y: 384, array: this.findLocationInfoByRegionName("zora village present") },
                        { x: 47, y: 222, array: this.findLocationInfoByRegionName("zora's reward") },
                        { x: 47, y: 155, dungeonEntrance: 'd7' },
                    ]
                },
                roomCondtionals: [
                    {
                        min: 0x2D0,
                        max: 0x2DD
                    },
                    {
                        min: 0x2C0,
                        max: 0x2CD
                    },
                    {
                        min: 0x2B0,
                        max: 0x2BD
                    },
                    {
                        min: 0x2A0,
                        max: 0x2AD
                    },
                    {
                        min: 0x290,
                        max: 0x29D
                    }
                ]
            },
            "underwater_past": {
                layouts: {
                    default: [
                        { x: 515, y: 460, array: this.findLocationInfoByRegionName("sea of storms past") },
                        { x: 372, y: 466, array: this.findLocationInfoByRegionName("fisher's island cave") },
                    ]
                },
                roomCondtionals: [
                    {
                        equals_to: 0x37A
                    },
                    {
                        equals_to: 0x36A
                    },
                    {
                        equals_to: 0x35A
                    },
                    {
                        min: 0x3D0,
                        max: 0x3DD
                    },
                    {
                        min: 0x3C0,
                        max: 0x3CD
                    },
                    {
                        min: 0x3B0,
                        max: 0x3BD
                    },
                    {
                        min: 0x3A0,
                        max: 0x3AD
                    },
                    {
                        min: 0x390,
                        max: 0x39D
                    },
                    {
                        min: 0x388,
                        max: 0x38D
                    },
                    {
                        min: 0x34A,
                        max: 0x34D
                    }
                ]
            },
            "d0_past": {
                layouts: {
                    default: [
                        { x: 67, y: 50, array: this.findLocationInfoByRegionName("maku path heartpiece") },
                        { x: 594.4, y: 84, array: this.findLocationInfoByRegionName("d0 key chest") },
                        { x: 163, y: 194, array: this.findLocationInfoByRegionName("d0 basement") },
                    ]
                },
                roomCondtionals: [
                    {
                        equals_to: 0x605
                    },
                    {
                        min: 0x406,
                        max: 0x40D
                    }
                ]
            },
            "d0_present": {
                roomCondtionals: [
                    {
                        min: 0x401,
                        max: 0x404
                    }
                ]
            },
            "d0_hero": {
                roomCondtionals: [
                    {
                        equal_to: 0x6C0
                    },
                    {
                        min: 0x4C1,
                        max: 0x4CF
                    }
                ]
            },
            "d1": {
                layouts: {
                    default: [ 
                        { x: 310.5, y: 210, array: this.findLocationInfoByRegionName("d1 one-button chest") },
                        { x: 405, y: 178, array: this.findLocationInfoByRegionName("d1 two-button chest") },
                        { x: 303, y: 380, array: this.findLocationInfoByRegionName("d1 crystal room") },
                        { x: 39, y: 653, array: this.findLocationInfoByRegionName("d1 basement") },
                        { x: 23, y: 483, array: this.findLocationInfoByRegionName("d1 west terrace") },
                        { x: 163, y: 524, array: this.findLocationInfoByRegionName("d1 pot chest") },
                        { x: 365, y: 524, array: this.findLocationInfoByRegionName("d1 east terrace") },
                        { x: 373, y: 382, array: this.findLocationInfoByRegionName("d1 crossroad") },
                        { x: 490, y: 382, array: this.findLocationInfoByRegionName("d1 ghini drop") },
                        { x: 444, y: 272, array: this.findLocationInfoByRegionName("d1 wide room") },
                        { x: 287, y: 120, array: this.findLocationInfoByRegionName("d1 boss").filter(i => !i.checkLocation.endsWith("Essence")) },
                        { x: 287, y: 20, array: this.findLocationInfoByRegionName("d1 boss").filter(i => i.checkLocation.endsWith("Essence")) }
                    ]
                },
                roomCondtionals: [
                    {
                        equals_to: 0x610
                    },
                    {
                        min: 0x411,
                        max: 0x425
                    }
                ]
            },
            "d2": {
                locatedInPast: true,
                roomCondtionals: [
                    {
                        min: 0x627,
                        max: 0x62B
                    },
                    {
                        min: 0x42C,
                        max: 0x448
                    }
                ]
            },
            "d3": {
                roomCondtionals: [
                    {
                        min: 0x449,
                        max: 0x466
                    }
                ]
            },
            "d4": {
                roomCondtionals: [
                    {
                        equals_to: 0x668
                    },
                    {
                        min: 0x469,
                        max: 0x492
                    }
                ]
            },
            "d5": {
                roomCondtionals: [
                    {
                        min: 0x693,
                        max: 0x698
                    },
                    {
                        min: 0x499,
                        max: 0x4BF
                    }
                ]
            },
            "d9_turret": {
                roomCondtionals: [
                    {
                        min: 0x4D0,
                        max: 0x4FF
                    }
                ]
            },
            "d6_present": {
                roomCondtionals: [
                    {
                        min: 0x710,
                        max: 0x711
                    },
                    {
                        min: 0x512,
                        max: 0x528
                    }
                ]
            },
            "d6_past": {
                roomCondtionals: [
                    {
                        min: 0x729,
                        max: 0x72A
                    },
                    {
                        min: 0x52B,
                        max: 0x546
                    },
                ]
            },
            "d7": {
                roomCondtionals: [
                    {
                        min: 0x747,
                        max: 0x74A
                    },
                    {
                        min: 0x54B,
                        max: 0x572
                    }
                ]
            },
            "d8": {
                roomCondtionals: [
                    {
                        min: 0x773,
                        max: 0x776
                    },
                    {
                        min: 0x577,
                        max: 0x5AA
                    }
                ]
            },
            "roomOfRites": {
                roomCondtionals: [
                    {
                        min: 0x5F0,
                        max: 0x5F5
                    }
                ]
            }
        }

    }

    canAccessD1East() {
        return this.dungeonReachable("Spirit's Grave") && this.canKillNormalEnemy(true)
    }

    dungeonReachable(dungeon) {
        for (let i = 0; i < 9; i++) {
            const dungeonData = this.getDungeonDataFromEntrance(`d${i}`);
            if (dungeonData.randomized == dungeon) {
                const dungeon = dungeonData.vanilla;
                const d = dungeon.startsWith("Mermaid's Cave") ? "Mermaid's Cave" : dungeon;
                return this.dungeonsReachable[d](d.includes("Present"))
            }
        }
    }

    canAccessD1WideRoom() {
        return this.canAccessD1East() && this.hasSmallKeys(1, 2);
    }

    canAccessD1URoom() {
        return this.canAccessD1WideRoom() && (
            this.canBreakBush()
            && this.genericBossAndMinibossKill()
            && this.hasSmallKeys(1, 3)
        )
    }

    /**
     * Finds info of a location using a given region name
     * @param {string} region - The region name from the locations variable.
     * @returns {object} The array full of any info that was found during the locations variable loop.
     */
    findLocationInfoByRegionName(region) {
        const array = []
        for (const i in locations) {
            if (region == locations[i].region_id) {
                locations[i].checkLocation = i
                locations[i].providedRegion = region;
                array.unshift(locations[i]);
            }
        }
        return array;
    }

    /**
     * Gets dungeon data from the randomized entrances.
     * @param {string} dungeonNumber - Starting with d, you would put in a number right after it. For example, d0 (which is Maku Path) is a dungeon that I am trying to get data for.
     * @returns {object} The dungeon data from the randomized entrance.
     */
    getDungeonDataFromEntrance(dungeonNumber) {
        for (const i in this.settings.dungeon_entrances) {
            if (i.startsWith(dungeonNumber)) {
                let entranceLeadsTo = this.settings.dungeon_entrances[i].substring(7);
                const vanilaDungeonNumber = (i.slice(0, i.includes("past") ? -14 : i.includes("present") ? -17 : -9)).substring(1);
                const info = {
                    vanilla: vanilaDungeonNumber != 6 ? this.dungeons[vanilaDungeonNumber] : `Mermaid's Cave (${
                        i.includes("past") ? 'Past' : 'Present'
                    })`,
                    randomized: entranceLeadsTo.includes("6") ? `Mermaid's Cave (${
                        upperCaseFirstLetterInWord(entranceLeadsTo.substring(2))
                    })` : this.dungeons[entranceLeadsTo]
                };
                info.reachable = () => this.dungeonReachable(info.randomized);
                return info;
            }
        }
    }

    /**
     * Finds info of a location using a starting location name.
     * @param {string} locationStartName - The name of a location to start with.
     * @returns {object} The array full of any info that was found during the locations variable loop.
     */
    findLocationInfoWithStartName(locationStartName) {
        const array = []
        for (const i in locations) {
            if (i.startsWith(locationStartName)) {
                locations[i].checkLocation = i
                locations[i].providedStartName = locationStartName;
                array.unshift(locations[i]);
            }
        }
        return array;
    }

    /**
     * Checks if the player is playing in randomizer mode. For now, this is a placeholder that always returns true.
     * @returns {boolean} True if the player is playing in randomizer mode, false otherwise.
     */
    isRandomizer() {
        return this.settings.randomizer_mode;
    }

    /**
     * Checks if the player has a sword.
     * @param {boolean} [acceptBiggoron=true] - Whether to accept Biggoron's Sword.
     * @returns {boolean} True if the player has a sword, false otherwise.
     */
    hasSword(acceptBiggoron = true) {
        return [
            this.hasItem("Progressive Sword"),
            acceptBiggoron && this.hasItem("Biggoron's Sword")
        ].some(Boolean);
    }

    /**
     * Checks if the player can beat Veran in Ambi's Palace.
     * @returns {boolean} True if the player cab beat the first stage of Vernan in Ambi's Palace. if not, then it's false.
     */
    canBeatVernanFirstStage() {
        return this.canAccessAmbisPalace() && this.canUseMysterySeeds() && this.hasSwitchHook() && (
            this.hasSword() || this.canPunch()
        )
    }

    calculateItemsNeededForGameCompletion() {
        let neededItems = 0;
        for (let i = 1; i <= this.settings.required_essences_for_maku_seed; i++) {
            const essence = Object.keys(items).find(k => items[k].imageName == `essences/d${i}`);
            if (essence && !this.hasItem(essence)) neededItems++
        }
        if (!this.hasSword(!this.hasMediumLogic()) && !this.canPunch()) neededItems++;
        if (!this.hasBombs()) neededItems++;
        if (!this.hasSwitchHook()) neededItems++;
        if (!this.hasMysterySeeds()) neededItems++;
        if (this.settings.goal == "beat_ganon") {
            if (!this.hasSeedShooter()) neededItems++;  
            if (!this.hasMediumLogic()) {
                if (!this.hasNobleSword()) neededItems++
                if (!this.hasEmberSeeds(false)) neededItems++;
            } else {
                if (this.hasHardLogic() && (
                    this.hasEmberSeeds()
                    || this.hasScentSeeds()
                    || this.hasGaleSeeds()
                )) neededItems++
            }
        }
        return neededItems;
    }

    /**
     * Checks if the player has access to the present shore.
     * @returns {boolean} True if the player can access the shore in the present.
     */
    hasAccessToPresentShore() {
        return this.hasItem("Ricky's Gloves") || (
            this.canAccessLynnaCity() && (
                this.can_swim_deepwater()
                || this.hasBracelet()
                || this.canGoBackToPresent()
                || (
                    this.canBreakBush()
                    && this.canJump1Wide()
                )
            )
        )
    }

    /**
     * Checks if the player has a noble sword.
     * @returns {boolean} True if the player has a noble sword, false otherwise.
     */
    hasNobleSword() {
        return this.hasItem("Progressive Sword", 2);
    }

    /**
     * Checks if the player has a shield.
     * @returns {boolean} True if the player has a shield, false otherwise.
     */
    hasShield() {
        return this.hasItem("Progressive Shield");
    }

    /**
     * Checks if the player has a feather.
     * @returns {boolean} True if the player has a feather, false otherwise.
     */
    hasFeather() {
        return this.hasItem("Feather");
    }

    /**
     * Checks if the player has a satchel.
     * @param {number} [level=1] - The level of the satchel.
     * @returns {boolean} True if the player has a satchel, false otherwise.
     */
    hasSatchel(level = 1) {
        return this.hasItem("Seed Satchel", level);
    }

    /**
     * Checks if the player has a seed shooter. 
     * @returns {boolean} True if the player has a seed shooter, false otherwise.
     */
    hasSeedShooter() {
        return this.hasItem("Seed Shooter");
    }

    /**
     * Checks if the player has a boomerang.
     * @returns {boolean} True if the player has a boomerang, false otherwise.
     */
    hasBoomerang() {
        return this.hasItem("Boomerang");
    }

    /**
     * Checks if the player has a cane.
     * @returns {boolean} True if the player has a cane, false otherwise.
     */
    hasCane() {
        return this.hasItem("Cane of Somaria");
    }

    /**
     * Checks if the player has a bracelet.
     * @returns {boolean} True if the player has a bracelet, false otherwise.
     */
    hasBracelet() {
        return this.hasItem("Progressive Bracelet");
    }

    /**
     * Checks if the player has a glove.
     * @returns {boolean} True if the player has a glove, false otherwise.
     */
    hasGlove() {
        return this.hasItem("Progressive Bracelet", 2);
    }

    /**
     * Checks if the player has a shovel.
     * @returns {boolean} True if the player has a shovel, false otherwise.
     */
    hasShovel() {
        return this.hasItem("Shovel");
    }

    /**
     * Checks if the player has flippers.
     * @returns {boolean} True if the player has flippers, false otherwise.
     */
    hasFlippers() {
        return this.hasItem("Progressive Flippers");
    }

    /**
     * Checks if the player has a siren suit.
     * @returns {boolean} True if the player has a siren suit, false otherwise.
     */
    hasSirenSuit() {
        return this.hasItem("Progressive Flippers", 2);
    }

    /**
     * Checks if the player has a switch hook.
     * @returns {boolean} True if the player has a switch hook, false otherwise.
     */
    hasSwitchHook() {
        return this.hasItem("Progressive Hook");
    }

    /**
     * Checks if the player has a long hook.
     * @returns {boolean} True if the player has a long hook, false otherwise.
     */
    hasLongHook() {
        return this.hasItem("Progressive Hook", 2);
    }

    /**
     * Checks if the player has ember seeds.
     * @returns {boolean} True if the player has ember seeds, false otherwise.
     */
    hasEmberSeeds(allowsMysterySeeds = true) {
        return [
            this.hasItem("Ember Seeds"),
            (allowsMysterySeeds && this.hasMediumLogic() && this.hasMysterySeeds())
        ].some(Boolean);
    }

    /**
     * Checks to see if a player has access to Lynna City.
     * @returns {boolean} True if a player has access to Lynna City. If not, then it's false.
     */
    canAccessLynnaCity() {
        return this.canBreakBush() || this.canOpenPortal()
    }

    /**
     * Checks to see if a player can use Rafton's Raft.
     * @returns {boolean} True if a player can use Rafton's Raft. If not, then it's false.
     */
    hasAccessToRaftonsRaft() {
        return this.canAccessLynnaCity() && this.hasItem("Cheval Rope") && this.hasItem("Island Chart");
    }
    
    /**
     * Checks to see if a player has access to Ambi's Palace.
     * @returns {boolean} True if a player has access to Ambi's Palace. If not, then it's false.
     */
    canAccessAmbisPalace() {
        return this.canAccessLynnaCity() && ((
            (
                this.hasHardLogic()
                && this.canUseScentSeedsForSmell()
                && this.canUsePegasusSeeds()
            )
            || (
                this.hasSirenSuit()
                && this.canBreakBush()
            ) || this.canSwitchPastAndPresent()
        ));
    }

    /**
     * Checks if the player has scent seeds.
     * @returns {boolean} True if the player has scent seeds, false otherwise.
     */
    hasScentSeeds() {
        return this.hasItem("Scent Seeds")
    }

    /**
     * Checks if the player has pegasus seeds.
     * @returns {boolean} True if the player has pegasus seeds, false otherwise.
     */
    hasPegasusSeeds() {
        return this.hasItem("Pegasus Seeds");
    }

    /**
     * Checks if the player has mystery seeds.
     * @returns {boolean} True if the player has mystery seeds, false otherwise.
     */
    hasMysterySeeds() {
        return this.hasItem("Mystery Seeds");
    }

    /**
     * Checks if the player has gale seeds.
     * @returns {boolean} True if the player has gale seeds, false otherwise.
     */
    hasGaleSeeds() {
        return this.hasItem("Gale Seeds")
    }

    /**
     * Checks if the player has small keys.
     * @param {number} dungeonId - The ID of the dungeon.
     * @param {number} [amount=1] - The amount of small keys.
     * @returns {boolean} True if the player has small keys, false otherwise.
     */
    hasSmallKeys(dungeonId, amount = 1) {
        return (this.hasItem(`Small Key (${this.dungeons[dungeonId]})`, amount)
            || this.hasItem(`Master Key (${this.dungeons[dungeonId]})`));
    }

    /**
     * Checks if the player has a boss key.
     * @param {number} dungeonId - The ID of the dungeon.
     * @returns {boolean} True if the player has a boss key, false otherwise.
     */
    hasBossKey(dungeonId) {
        // Specific case for D6 Past, because of course D6 is mess.
        if (dungeonId === 6) {
            return [
                this.hasItem("Boss Key (Mermaid's Cave)"),
                this.hasItem(`Master Key (${this.dungeons[dungeonId]})`)
            ].some(Boolean);
        }

        return [
            this.hasItem(`Boss Key (${this.dungeons[dungeonId]})`),
            this.hasItem(`Master Key (${this.dungeons[dungeonId]})`)
        ].some(Boolean);
    }

    /**
     * Checks if the option is set to medium logic.
     * @returns {boolean} True if the option is set to medium logic, false otherwise.
     */
    hasMediumLogic() {
        return this.settings.logic_difficulty === "medium" || this.settings.logic_difficulty === "hard";
    }

    /**
     * Checks if the option is set to hard logic.
     * @returns {boolean} True if the option is set to hard logic, false otherwise.
     */
    hasHardLogic() {
        return this.settings.logic_difficulty === "hard";
    }

    /**
     * Checks if the player has essences.
     * @param {number} target - The target number of essences.
     * @returns {boolean} True if the player has essences, false otherwise.
     */
    hasEssences(target) {
        let essences = 0;
        for (let i = 1; i <= target; i++) {
            const essence = Object.keys(items).find(k => items[k].imageName == `essences/d${i}` && items[k].count > 0);
            if (essence && this.hasItem(essence)) essences++
        }
        return essences >= target;
    }

    /**
     * Checks if the player has enough essences for the Maku Seed.
     * @returns {boolean} True if the player has enough essences for the Maku Seed, false otherwise.
     */
    hasEssencesForMakuSeed() {
        return this.hasEssences(this.settings.required_essences_for_maku_seed);
    }

    /**
     * Checks if the player has enough slates to open the d8 basement.
     * @param {number} targetCount - The amount of slates to check for.
     * @returns {boolean} True if the player has enough slates. If not, then it's false.
     */
    hasSlates(targetCount) {
        return this.hasItem("Slate", targetCount);
    }

    /**
     * Checks if the player has enough slates for a certain check.
     * @returns {boolean} True if the player has enough states for a certain check.
     */
    hasEnoughSlates() {
        return this.hasSlates(this.settings.required_slates);
    }

    /**
     * Checks if the player has a certain number of rupees for a certain check.
     * @param {number} amount - The amount of rupees to check for.
     * @returns {boolean} True if the player has more than enough rupees for the check. If not, then it's false.
     */
    hasRupees(amount) {
        // Rupee checks being quite approximative, being able to farm is a
        // must-have to prevent any stupid lock
        if (!this.canFarmRupees()) return false;

        return items.Rupees.count >= amount;
    }

    /**
     * Checks if the player can farm rupees.
     * @returns {boolean} True if the player can farm rupees. If not, then it's false.
     */
    canFarmRupees() {
        // Having Ember Seeds and a weapon or a shovel is enough to guarantee that we can reach
        // a significant amount of rupees
        return this.hasSword() || this.hasShovel();
    }

    /**
     * Checks if the player can trigger a switch
     * @returns {boolean} True if the player can trigger a switch. If not, then it's false.
     */
    canTriggerSwitch() {
        return [
            this.hasBoomerang(),
            this.hasBombs(),
            this.hasSeedShooter(),
            this.hasSatchel() && (
                this.hasEmberSeeds() ||
                this.hasScentSeeds() ||
                this.hasMysterySeeds()
            ),
            this.hasSword(),
            this.hasSwitchHook(),
            this.canPunch()
        ].some(Boolean);
    }

    /**
     * Checks if the player can trigger a switch from far away.
     * @returns {boolean} True if the player can trigger a switch from far away. If not, then it's false.
     */
    canTriggerFarSwitch() {
        return [
            this.hasBoomerang(),
            this.hasBombs(),
            this.hasSeedShooter(),
            this.hasSwitchHook(),
            this.hasMediumLogic() && this.hasSword(false) && this.hasItem("Energy Ring")
            // TODO: Regular beams?
        ].some(Boolean);
    }

    /**
     * Checks if the player has a certain amount of bombs.
     * @param {number} amount - The amount of bombs to check for.
     * @returns {boolean} True if the player has enough bombs. If not, then it's false.
     */
    hasBombs(amount = 1) {
        return this.hasItem("Bombs (10)", amount);
    }

    /**
     * Checks if the player has a flute for one of the 3 animal companions.
     * @returns {boolean} True if the player does have a flute. If not, then it's false.
     */
    hasFlute() {
        return [
            this.canSummonRicky(),
            this.canSummonMoosh(),
            this.canSummonDimitri()
        ].some(Boolean);
    }

    /**
     * Checks if the player can summon ricky.
     * @returns {boolean} True if the player can summon ricky. If not, then it's false.
     */
    canSummonRicky() {
        return this.hasItem("Ricky's Flute");
    }

    /**
     * Checks if the player can summon Moosh.
     * @returns {boolean} True if the player can summon moosh. If not, then it's false.
     */
    canSummonMoosh() {
        return this.hasItem("Moosh's Flute");
    }

    /**
     * Checks if the player can summon dimitri.
     * @returns {boolean} True if the player can summon dimitri. If not, then it's false.
     */
    canSummonDimitri() {
        return this.hasItem("Dimitri's Flute");
    }


    /**
     * Checks if the player can open a time portal.
     * @returns {boolean} True if the player can open a portal. If not, then it's false.
     */
    canOpenPortal() {
        return this.hasItem("Progressive Harp");
    }

    /**
     * Checks if the player can go to the present (not the past)
     * @returns {boolean} True if the player can go to the present from the past. If not, then it's false.
     */
    canGoBackToPresent() {
        return this.hasItem("Progressive Harp", 2);
    }

    /**
     * Checks if the player can go to the present (and the past)
     * @returns {boolean} True if the player can go to the present from the past and etc. If not, then it's false.
     */
    canSwitchPastAndPresent() {
        return this.hasItem("Progressive Harp", 3);
    }

    /**
     * Checks if the player can jump one pixel wide.
     * @param {boolean} liquid - Whatever or not the player is jumping over liquid.
     * @returns {boolean} the player can jump one pixel wide. If not, then it's false.
     */
    canJump1Wide(liquid = false, canUseAnimalCompanion = true) {
        if (liquid) return [
            this.hasFeather(),
            this.hasMediumLogic() && canUseAnimalCompanion && this.canSummonRicky()
        ].some(Boolean);
        return this.hasFeather() || (
            canUseAnimalCompanion && (this.canSummonMoosh() || this.canSummonRicky())
        );
    }

    /**
     * Checks if the player can jump two pixels wide.
     * @param {boolean} liquid - Whatever or not the player is jumping over liquid.
     * @returns {boolean} True if the player can jump two pixels wide. If not, then it's false.
     */
    canJump2Wide(liquid = false, canUseAnimalCompanion = true) {
        if (liquid) return [
            this.hasFeather() && this.canUsePegasusSeeds(),
            this.hasHardLogic() && this.hasFeather() && this.hasBombs()
        ].some(Boolean);
        return (
            this.hasFeather() && (
                this.hasMediumLogic() || this.canUsePegasusSeeds()
            )
        ) || (canUseAnimalCompanion && this.canSummonMoosh());
    }

    /**
     * Checks if the player can jump three pixels wide.
     * @param {boolean} liquid - Whatever or not the player is jumping over liquid.
     * @returns {boolean} True if the player can jump three pixels wide. If not, then it's false.
     */
    canJump3Wide(liquid = false, canUseAnimalCompanion = false) {
        if (liquid) return [
            this.hasHardLogic(),
            this.hasFeather(),
            this.canUsePegasusSeeds(),
            this.hasBombs(),
        ].every(Boolean);
        return (
            this.hasMediumLogic() &&
            this.hasFeather() &&
            this.canUsePegasusSeeds()
        ) || (canUseAnimalCompanion && this.canSummonMoosh());
    }

    canGoToSymmetryPresent() {
        return this.canEnterNuun() && (
            this.canGoBackToPresent()
            || this.hasFlute()
            || (
                this.canSummonMoosh()
                && this.canBreakBush()
                && this.canJump3Wide(false, true)
                && this.hasHardLogic()
            )
        )
    }

    canAccessSymmetryPast() {
        return this.canGoToSymmetryPresent() && (
            this.canSwitchPastAndPresent()
            || (
                this.canOpenPortal()
                || this.canBreakBush(false)
            )
        )
    }

    canAccessTalusPeeks() {
        return this.canAccessSymmetryPast() && (
            this.canGoBackToPresent()
            && this.hasBracelet()
        )
    }

    canAccessRestorationWall() {
        return this.canAccessTalusPeeks() && (
            (
                this.hasFlippers()
                || this.canJump3Wide(true)
            ) || this.canSwitchPastAndPresent()
        )
    }

    canGoToPatch() {
        return this.canAccessRestorationWall() && (
            this.hasSword()
            || (
                this.hasMediumLogic()
                && (
                    this.hasShield()
                    || this.hasBoomerang()
                    || this.hasSwitchHook()
                )
            ) || (
                this.hasHardLogic()
                && (
                    this.hasScentSeeds()
                    || this.hasShovel()
                )
            )
        )
    }

    canAccessZoraVillage() {
        return this.canAccessLynnaCity && (
            this.hasSirenSuit()
            && this.hasSwitchHook()
            && this.canSwitchPastAndPresent()
        )
    }

    canHealZoraKing() {
        return this.canAccessZoraVillage() && (
            (
                this.isRandomizer() 
                && this.hasItem("King Zora's Potion")
            ) || this.hasItem("Potion")
        )
    }

    canAccessEyeglassLibrary() {
        return this.canAccessZoraVillage() && this.hasItem("Library Key");
    }

    canGoToPiratianCaptian() {
        return this.canAccessLynnaCity() && (
            this.hasSirenSuit()
            && this.hasItem("Zora Scale")
        )
    }

    hasAccessToSyrupsShop() {
        return this.dungeonsReachable["Spirit's Grave"]() && (
            this.hasFlippers() 
            || this.canJump2Wide(true) 
            || this.hasLongHook()
        )
    }

    /**
     * Checks if the player can use the seeds.
     * @returns {boolean} True if the player can use the seeds. If not, then it's false.
     */
    canUseSeeds() {
        return this.hasSeedShooter() || this.hasSatchel();
    }

    /**
     * Checks to see if a user has enough seeds for certain checks in the game (The Tingle Upgrade is a great example of this).
     * @param {number} count - The amount of seeds a user has.
     * @returns {boolean} True if a user has enough seeds. If not, then it's false.
     */
    hasSeedKindCount(count) {
        let seedCount = 0;
        seedCount += this.hasEmberSeeds(false) ? 1 : 0;
        seedCount += this.hasMysterySeeds() ? 1 : 0;
        seedCount += this.hasScentSeeds() ? 1 : 0;
        seedCount += this.hasPegasusSeeds() ? 1 : 0;
        seedCount += this.hasGaleSeeds() ? 1 : 0;
        return seedCount >= count;
    }

    /**
     * Checks if the player can use ember seeds.
     * @param {boolean} acceptMysterySeeds - True if logic requires usage of mystery seeds (i'd say that mostly for torches)
     * @returns {boolean} True if the player can use mystery seeds. If not, then it's false.
     */
    canUseEmberSeeds(acceptMysterySeeds = false) {
        return this.canUseSeeds() &&
            (this.hasEmberSeeds(acceptMysterySeeds) ||
                (acceptMysterySeeds &&
                    this.hasMediumLogic() &&
                    this.hasMysterySeeds()));
    }

    /**
     * Checks if the player can offensively use scent seeds.
     * @returns {boolean} True if the player can use scent seeds offensively. If not, then it's false.
     */
    canUseScentSeedsOffensively() {
        return (this.hasSeedShooter() ||
            (this.hasHardLogic() && this.hasSatchel())) &&
            this.hasScentSeeds();
    }

    /**
     * Checks if the player can use scent seeds for smell.
     * @returns {boolean} True if the player can use scent seeds for smell. If not, then it's false.
     */
    canUseScentSeedsForSmell() {
        return this.hasSatchel() && this.hasScentSeeds();
    }

    /**
     * Checks if the player can use pegasus seeds.
     * @returns {boolean} True if the player can use pegasus seeds. If not, then it's false.
     */
    canUsePegasusSeeds() {
        return this.hasSatchel() && this.hasPegasusSeeds();
    }

    /**
     * Checks if the player can use pegasus seeds for stunning enemies.
     * @returns {boolean} True if the player can use pegasus seeds for stunning enemies. If not, then it's false.
     */
    canUsePegasusSeedsForStun() {
        return this.hasSeedShooter() && this.hasPegasusSeeds();
    }

    /**
     * Checks if the player can use gale seeds.
     * @returns {boolean} True if the player can use gale seeds. If not, then it's false.
     */
    canWarpUsingGaleSeeds() {
        return this.hasSatchel() && this.hasGaleSeeds();
    }

    /**
     * Checks if the player can offensively use gale seeds.
     * @param {boolean} [ranged=false] - Here if logic can't have the player with hard settings use a seed satchel or feather.
     * @returns {boolean} True if the player can use gale seeds offensively. If not, then it's false.
     */
    canUseGaleSeedsOffensively(ranged = false) {
        // If we don't have gale seeds or aren't at least in medium logic, don't even try
        if (!this.hasGaleSeeds() || !this.hasMediumLogic()) {
            return false;
        }

        return this.hasSeedShooter() ||
            (!ranged &&
                this.hasSatchel() &&
                (this.hasHardLogic() || this.hasFeather()));
    }

    /**
     * Checks if the player can use mystery seeds.
     * @returns {boolean} True if the player can use mystery seeds. If not, then it's false.
     */
    canUseMysterySeeds() {
        return this.canUseSeeds() && this.hasMysterySeeds();
    }

    /**
     * Checks if the player has a specified item
     * @param {string} itemName - The name of the item.
     * @param {number} count - The amount of item a user has.
     * @returns {boolean} True if a user has that item. If not, then it's false.
     */
    hasItem(itemName, count = 1) {
        return items[itemName].count >= count;
    }

    /**
     * Checks if the player has a specified item at a specified value
     * @param {string} itemName - The name of the item.
     * @param {number} count - The amount of item a user has.
     * @returns {boolean} True if a user has that item. If not, then it's false.
     */
    hasItemExact(itemName, count = 1) {
        return items[itemName].count === count;
    }

    /**
     * Checks if the player can break a bush.
     * @returns {boolean} True if the player can break a bush. If not, then it's false.
     */
    canBreakBush(canUseAnimalCompanion = true) {
        return this.canBreakFlowers(
            canUseAnimalCompanion
        ) || this.hasBracelet() || this.hasSwitchHook();
    }

    /**
     * Checks if the player can break tingle's balloon.
     * @returns {boolean} True if the player can break a bush. If not, then it's false.
     */
    canBreakTingleBalloon() {
        return [
            this.hasSword(),
            this.hasBoomerang(),
            // this.canPunch(), ?
        ].some(Boolean) && this.hasFeather();
    }

    canAccessChevalsGrave() {
        return this.canUseEmberSeeds(false) && (
            this.canKillNormalEnemy(true) || this.canJump3Wide(false, true)
        )
    }

    canEnterFairiesWoods() {
        return this.canAccessLynnaCity() && (
            this.hasFlippers()
            || this.hasBracelet()
            || this.canSwitchPastAndPresent()
            || ( // it's possible to switch hook the octorok through the boulder to enter fairies' woods. 
                this.hasHardLogic()
                && this.hasSwitchHook()
            )
        )
    }

    canEnterNuun() {
        return this.canEnterFairiesWoods() && (
            (
                this.canUseEmberSeeds(false)
                && this.hasSeedShooter()
            ) || this.canGoBackToPresent()
        )
    }

    canAccessDekuForestCaveWest() {
        return this.canEnterDekuForest() && (
            this.hasFeather()
            || this.hasSwitchHook()
            || this.canUseEmberSeeds()       
            || this.canWarpUsingGaleSeeds()   
            || this.canSwitchPastAndPresent()          
        )
    }

    canEnterDekuForest() {
        return this.canAccessLynnaCity() && (
            this.hasBracelet()
            || this.canSwitchPastAndPresent()
        )
    }

    /**
     * Checks to see if a player can get to tingle.
     * @returns {boolean} True if a player can get to Tingle. If not, then it's false.
     */
    canGetToTingle() {
        return this.hasAccessToPresentShore() && (
            (
                this.hasSeedShooter()
                || this.canSummonRicky()
                || this.hasItem("Ricky's Gloves")
                || this.canGoBackToPresent() // lynna city and lynna village are connected, so no need to create a different logic                    
            ) && this.canBreakTingleBalloon()
        )
    }

    /**
     * Checks if the player can harvest a regrowing bush.
     * @returns {boolean} True if the player can harvest a regrowing bush. If not, then it's false.
     */
    canHarvestRegrowingBush() {
        return [
            this.hasSword(),
            this.hasBombs()
        ].some(Boolean);
    }

    /**
     * Checks if the player can break pots.
     * @returns {boolean} True if the player can break pots. If not, then it's false.
     */
    canBreakPot() {
        return [
            this.hasBracelet(),
            this.hasNobleSword(),
            this.hasSwitchHook(),
            this.hasItem("Biggoron's Sword")
        ].some(Boolean);
    }

    /**
     * Checks if the player can break flowers.
     * @returns {boolean} True if the player can break flowers. If not, then it's false.
     */
    canBreakFlowers(canUseAnimalCompanion = true) {
        return [
            this.hasSword(),
            canUseAnimalCompanion && this.hasFlute(),
            (
                // Consumables need at least medium logic, since they need a good knowledge of the game
                // not to be frustrating
                this.hasMediumLogic() &&
                [
                    this.hasBombs(),
                    this.canUseEmberSeeds(false),
                    (this.hasSeedShooter() && this.hasGaleSeeds()),
                ].some(Boolean)
            ),
        ].some(Boolean);
    }

    /**
     * Checks if the player can break crystals.
     * @returns {boolean} True if the player can break crystals. If not, then it's false.
     */
    canBreakCrystal() {
        return [
            this.hasSword(),
            this.hasBombs(),
            this.hasBracelet(),
            (
                this.hasMediumLogic() &&
                this.hasItem("Expert's Ring")
            )
        ].some(Boolean);
    }

    /**
     * Checks if the player can break signs.
     * @returns {boolean} True if the player can break signs. If not, then it's false.
     */
    canBreakSign() {
        return [
            this.hasNobleSword(),
            this.hasItem("Biggoron's Sword"),
            this.hasBracelet(),
            this.canUseEmberSeeds(false),
        ].some(Boolean);
    }

    /**
     * Checks if the player can harvest a tree.
     * @param {boolean} - True if the player can use dimitri for tree harvesting.
     * @returns {boolean} True if the player can harvest a tree. If not, then it's false.
     */
    canHarvestTree(canUseDimitri = true) {
        return (
            this.canUseSeeds() &&
            [
                this.hasSword(),
                this.canPunch(),
                (
                    canUseDimitri &&
                    this.hasMediumLogic() &&
                    this.canSummonDimitri()
                )
            ].some(Boolean)
        );
    }

    /**
     * Checks if the player can push an enemy.
     * @returns {boolean} True if the player can push an enemy. If not, then it's false.
     */
    canPushEnemy() {
        return [
            // hasRod(),
            this.hasShield(),
            this.hasItem("Rod Of Seasons")
        ].some(Boolean);
    }

    canAccessCresentIsland(needsPresentIsland = true) {
        return this.canAccessLynnaCity() && (
            this.can_swim_deepwater(needsPresentIsland) || (
                needsPresentIsland ? (
                    this.hasAccessToRaftonsRaft() 
                    && this.canGoBackToPresent()
                ) : this.hasAccessToRaftonsRaft()
            )
        )
    }

    canAccessCresentIslandEast(needsPresentIsland = true) {
        return this.canAccessCresentIsland(needsPresentIsland) && (
            this.canBreakBush() || this.canGoBackToPresent()
        )
    }

    /**
     * Checks if the player can kill a normal enemy.
     * @param {boolean} canKillWithHook - If true, then the player should be able to kill an enemy with a switch hook.
     * @param {boolean} pitAvailable - If true, then the player should be able to knock enemies into a pit.
     * @returns {boolean} True if a user can kill a normal enemy. If not, then it's false.
     */
    canKillNormalEnemy(canKillWithHook = false, pitAvailable = false) {
        // If a pit is available nearby, it can be used to put the enemies inside using
        // items that are usually non-lethal
        if (pitAvailable && this.canPushEnemy()) return true;

        return [
            this.hasSword(),
            this.canKillNormalUsingSatchel(),
            this.canKillNormalUsingSeedshooter(),
            (this.hasMediumLogic() && this.hasBombs(4)),
            (this.hasMediumLogic() && this.hasCane()),
            this.canPunch(),
            (canKillWithHook && this.hasSwitchHook()),
        ].some(Boolean);
    }

    /**
     * Checks if the player can kill a moldorm.
     * @param {boolean} pitAvailable - If true, then the player should be able to knock enemies into a pit.
     * @returns {boolean} True if a user can kill a moldorm. If not, then it's false.
     */
    canKillMoldorm(pitAvailable = false) {
        if (pitAvailable && this.canPushEnemy()) {
            return true;
        }

        return [
            this.hasSword(),
            this.canUseScentSeedsOffensively(),
            // Not including mystery seed, because even in hard logic this is just pure torture
            (this.hasMediumLogic() && this.hasBombs(4)),
            (this.hasMediumLogic() && this.hasCane()),
            this.canPunch(),
            this.hasSwitchHook(),
        ].some(Boolean);
    }

    /**
     * Checks if the player can kill a wizzrobes.
     * @param {boolean} pitAvailable - If true, then the player should be able to knock enemies into a pit.
     * @returns {boolean} True if a user can kill a wizzrobes. If not, then it's false.
     */
    canKillWizzrobes(pitAvailable = false) {
        if (pitAvailable && this.canPushEnemy()) {
            return true;
        }

        return [
            this.hasSword(),
            this.canUseScentSeedsOffensively(),
            // Not including mystery seed, because even in hard logic this is just pure torture
            (this.hasMediumLogic() && this.hasBombs(4)),
            (this.hasMediumLogic() && this.hasCane()),
            this.canPunch(),
            this.hasSwitchHook(),
        ].some(Boolean);
    }

    /**
     * Checks if the player can kill generic bosses and minibosses
     * @returns {boolean} - True if the player can kill bosses/minibosses
     */
    genericBossAndMinibossKill() {
        return [
            this.hasSword(),
            this.canUseScentSeedsOffensively(),
            // TODO: Check bombs damage on bosses
            // (this.hasMediumLogic() && this.hasBombs(4)),
            this.canPunch(),
            this.hasSwitchHook()
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill underwater enemies
     * @param {boolean} [canKillWithHook=false] - Whether switch hook can be used
     * @returns {boolean} - True if the player can kill underwater enemies
     */
    canKillUnderwater(canKillWithHook = false) {
        return [
            this.hasSword(),
            this.canKillNormalUsingSeedshooter(),
            this.canPunch(),
            canKillWithHook && this.hasSwitchHook()
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill normal enemies using satchel
     * @returns {boolean} - True if the player can kill normal enemies with satchel
     */
    canKillNormalUsingSatchel() {
        // Expect a 50+ seed satchel to ensure we can chain dungeon rooms
        if (!this.hasSatchel(2)) {
            return false;
        }

        return [
            // Casual logic => only ember
            this.hasEmberSeeds(),
            // Medium logic => allow scent or gale+feather
            this.hasMediumLogic() && [
                this.hasScentSeeds(),
                this.hasMysterySeeds(),
                this.hasGaleSeeds() && this.hasFeather()
            ].some(condition => condition),
            // Hard logic => allow gale without feather
            this.hasHardLogic() && this.hasGaleSeeds()
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill normal enemies using seedshooter
     * @returns {boolean} - True if the player can kill normal enemies with seedshooter
     */
    canKillNormalUsingSeedshooter() {
        // Expect a 50+ seed satchel to ensure we can chain dungeon rooms
        if (!this.hasSatchel(2)) {
            return false;
        }

        return this.hasSeedShooter() && [
            this.hasEmberSeeds(),
            this.hasScentSeeds(),
            this.hasMediumLogic() && [
                this.hasMysterySeeds(),
                this.hasGaleSeeds()
            ].some(condition => condition)
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill armored enemies
     * @returns {boolean} - True if the player can kill armored enemies
     */
    canKillArmoredEnemy() {
        return [
            this.hasSword(),
            this.hasSatchel(2) && // Expect 50+ seeds satchel for dungeon chaining
            this.hasScentSeeds() &&
            (this.hasSeedShooter() || this.hasMediumLogic()),
            (this.hasMediumLogic() && this.hasCane()),
            this.canPunch()
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill Pols Voice enemies
     * @param {boolean} [ranged=false] - Whether ranged attacks are considered
     * @returns {boolean} - True if the player can kill Pols Voice
     */
    canKillPolsVoice(ranged = false) {
        return [
            this.canOpenPortal(),
            this.hasFlute(),
            this.hasBombs(),
            this.canUseGaleSeedsOffensively(ranged)
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill Armos enemies
     * @returns {boolean} - True if the player can kill Armos
     */
    canKillArmos() {
        return [
            this.hasBombs(),
            this.canUseScentSeedsOffensively()
            // magic boomerang
        ].some(condition => condition);
    }

    /**
     * Checks if the player can punch enemies
     * @returns {boolean} - True if the player can punch
     */
    canPunch() {
        return this.hasMediumLogic() && [
            this.hasItem("Fist Ring"),
            this.hasItem("Expert's Ring")
        ].some(condition => condition);
    }

    /**
     * Checks if the player can trigger levers
     * @returns {boolean} - True if the player can trigger levers
     */
    canTriggerLever() {
        return [
            this.canTriggerLeverFromMinecart(),
            this.hasMediumLogic() && this.hasShovel()
        ].some(condition => condition);
    }

    canAccessD2StatuePuzzle() {
        return this.canAccessD2MoblinPlatform() && (
            this.hasBracelet()
            || this.hasCane()
            || (
                // push moblin into doorway, stand on button, use switch hook
                this.hasHardLogic()
                && this.canPushEnemy()
                && this.hasSwitchHook()
            )
        )
    }

    canAccessD2ColorRoom() {
        return this.canAccessD2StatuePuzzle() && this.hasSmallKeys(2, 5);
    }

    canAccessD2MoblinPlatform() {
        return this.canAccessD2Basement() && (
            this.hasFeather()
            && this.hasSmallKeys(2, 3)
        )
    }

    /**
     * Checks if the player can trigger levers from minecart
     * @returns {boolean} - True if the player can trigger levers from minecart
     */
    canTriggerLeverFromMinecart() {
        return [
            this.hasSword(),
            this.hasBoomerang(),
            // TODO: Test that to ensure our understanding is right
            this.canUseScentSeedsOffensively(),
            this.canUseMysterySeeds(),
            this.hasSeedShooter()  // any seed works using slingshot
        ].some(condition => condition);
    }

    /**
     * Checks if the player can flip spiked beetles
     * @returns {boolean} - True if the player can flip spiked beetles
     */
    canFlipSpikedBeetle() {
        return [
            this.hasShield(),
            this.hasMediumLogic() && this.hasShovel()
        ].some(condition => condition);
    }

    /**
     * Checks if the player can kill spiked beetles
     * @returns {boolean} - True if the player can kill spiked beetles
     */
    can_kill_spiked_beetle() {
        return (
            // Regular flip + kill
            (this.canFlipSpikedBeetle() &&
                (this.hasSword() ||
                    this.canKillNormalUsingSatchel() ||
                    this.canKillNormalUsingSeedshooter())) ||
            // Instant kill using Gale Seeds
            this.canUseGaleSeedsOffensively()
        );
    }

    canAccessD2MinibossArena() {
        return (
            (
                this.hasSmallKeys(2, 2)
                && this.canKillNormalEnemy(true, true)
            ) || (
                this.canJump2Wide(),
                this.can_kill_spiked_beetle()
            )
        )
    }

    canAccessD2Basement() {
        return this.dungeonReachable("Wing Dungeon") && this.canAccessD2MinibossArena() && this.genericBossAndMinibossKill()
    }

    /**
     * Checks if the player can swim.
     * @returns {boolean} True if a player can swim. If not, then it's false.
     */
    can_swim() {
        return this.hasFlippers() || this.canSummonDimitri();
    }

    /**
     * Checks if the player can swim in deepwater.
     * @returns {boolean} True if a player can swim in deepwater. If not, then it's false.
     */
    can_swim_deepwater(needsDimitri = true) {
        return needsDimitri ? (
            this.hasSirenSuit() || this.canSummonDimitri()
        ) : this.hasSirenSuit();
    }

    /**
     * Checks if the player can remove rocks blocking caves or other things.
     * @returns {boolean} True if a player can remove rocks. If not, then it's false.
     */
    can_remove_rockslide() {
        return this.hasBombs() || this.canSummonRicky();
    }

    /**
     * Checks if the player can remove dirt.
     * @param {boolean} - True if a user can use an animal companionn to remove dirt.
     * @returns {boolean} True if a player can remove dirt. If not, then it's false.
     */
    can_remove_dirt(canUseAnimalCompanion = true) {
        return this.hasShovel() || (canUseAnimalCompanion && this.hasFlute());
    }

    /**
     * Checks if the player can toss a ring.
     * @returns {boolean} True if a player can toss a ring. If not, then it's false.
     */
    can_toss_ring() {
        return (
            this.hasMediumLogic() &&
            this.hasBracelet() &&
            this.hasItem('Toss Ring')
        );
    }

}