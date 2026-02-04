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
            "Maku Path": () => (
                locations['lynna village']() 
                && LogicPredicates.can_remove_dirt(false)
            ) || locations["Ambi's Palace: Rescue Nayru"].reachable(),
            "Spirit's Grave": () => locations['graveyard door'](),
            "Wing Dungeon": () => locations["deku forest"]() && (
                LogicPredicates.has_bombs()
            ) || ( // For Present D2 (Randomizer Usage Only)
                (!connected2archipelago && this.isRandomizer()) && LogicPredicates.can_go_back_to_present()
            ),
            "Moonlit Grotto": () => locations['crescent present west'](),
            "Skull Dungeon": () => locations['symmetry present']() && (
                this.hasItem("Tuni Nut", 2) && LogicPredicates.can_open_portal()
            ),
            "Crown Dungeon": () => this.hasItem("Crown Key") && locations['ridge upper present'](),
            "Mermaid's Cave": (isPresent) => isPresent ? (
                this.hasItem("Old Mermaid Key") && locations['ridge base present']()
            ) : ([
                LogicPredicates.can_swim(false),
                this.hasItem("Mermaid Key"),
                locations['ridge base past west']()
            ]).every(Boolean),
            "Jabu-Jabu's Belly": () => locations[
                "Zora Village (Present): Zora's Reward"
            ].reachable() && this.hasItem("Fairy Powder"),
            "Ancient Tomb": () => locations['crescent past west']() && (
                this.hasItem("Tokay Eyeball")
                && LogicPredicates.can_break_pot()
                && LogicPredicates.can_dive()
                && LogicPredicates.has_bombs()
                && LogicPredicates.has_feather()
                && LogicPredicates.can_kill_normal_enemy()
                && (
                    // Finding the road in the dark room
                    LogicPredicates.has_cane()
                    || (
                        LogicPredicates.option_medium_logic()
                        && (
                            LogicPredicates.can_kill_normal_enemy()
                            || LogicPredicates.can_push_enemy()
                            || LogicPredicates.has_boomerang()
                            || LogicPredicates.has_switch_hook()
                            || LogicPredicates.can_use_pegasus_seeds_for_stun()
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

    calculateItemsNeededForGameCompletion() {
        let neededItems = 0;
        for (let i = 1; i <= this.settings.required_essences_for_maku_seed; i++) {
            const essence = Object.keys(items).find(k => items[k].imageName == `essences/d${i}`);
            if (essence && !this.hasItem(essence)) neededItems++
        }
        if (!LogicPredicates.has_sword(!LogicPredicates.option_medium_logic()) && !LogicPredicates.can_punch()) neededItems++;
        if (!LogicPredicates.has_bombs()) neededItems++;
        if (!LogicPredicates.has_switch_hook()) neededItems++;
        if (!LogicPredicates.has_mystery_seeds()) neededItems++;
        if (this.settings.goal == "beat_ganon") {
            if (!LogicPredicates.has_seed_shooter()) neededItems++;  
            if (!LogicPredicates.option_medium_logic()) {
                if (!LogicPredicates.has_noble_sword()) neededItems++
                if (!LogicPredicates.has_ember_seeds(false)) neededItems++;
            } else {
                if (LogicPredicates.option_hard_logic() && (
                    LogicPredicates.has_ember_seeds()
                    || LogicPredicates.has_scent_seeds()
                    || LogicPredicates.has_gale_seeds()
                )) neededItems++
            }
        }
        return neededItems;
    }

}