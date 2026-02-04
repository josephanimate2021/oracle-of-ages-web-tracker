const locations = {

    // Forest of Time Items
    "Forest of Time: Impa's Gift": {
        "region_id": "starting item",
        "vanilla_item": "Progressive Sword",
        "flag_byte": 0xc739,
        "room": 0x0039,
        "reachable": () => locations['forest of time'](),
        "symbolic_name": "impaGift",
    },
    "Forest of Time: Nayru's House": {
        "region_id": "nayru's house",
        "vanilla_item": "Progressive Harp",
        "flag_byte": 0xc8ae,
        "room": 0x03ae,
        "map_tile": 0x3a,
        "reachable": () => locations['forest of time']() && (
            gameLogic.isRandomizer() || gameLogic.hasItem("Eternal Spirit")
        ),
        "symbolic_name": "nayruHouse",
    },
    "Forest of Time: Tingle Present": {
        "region_id": "balloon guy's gift",
        "vanilla_item": "Island Chart",
        "flag_byte": 0xc6d0,
        "bit_mask": 0x08,
        "room": 0x0079,
        "reachable": () => locations['shore present']() && ([
            ([
                LogicPredicates.has_seedshooter(),
                LogicPredicates.can_summon_ricky(),
                gameLogic.hasItem("Ricky's Gloves"),
                LogicPredicates.can_go_back_to_present(), //lynna city and lynna village are connected, so no need to create a different logic                    
            ]).some(Boolean),
            LogicPredicates.can_break_tingle_balloon()
        ]).every(Boolean),
        "symbolic_name": "tingleGift",
    },
    "Forest of Time: Tingle Upgrade": {
        "region_id": "balloon guy's upgrade",
        "vanilla_item": "Seed Satchel",
        "flag_byte": 0xc6d8,
        "bit_mask": 0x40,
        "room": 0x0079,
        "reachable": () => locations[
            'Forest of Time: Tingle Present'
        ].reachable() && LogicPredicates.has_seed_kind_count(3),
        "symbolic_name": "tingleUpgrade",
    },

    // Lynna City (And Village) Items
    "Lynna City: Chest Past Burnt Tree": {
        "region_id": "lynna city chest",
        "vanilla_item": "Rupees (30)",
        "flag_byte": 0xc749,
        "room": 0x0049,
        "reachable": () => ([
            locations['lynna city']() && LogicPredicates.can_break_bush(),
            locations['lynna village']() && LogicPredicates.can_go_back_to_present()
        ]).some(Boolean)
    },
    "Lynna City: Shop Item #1": {
        "region_id": "lynna shop",
        "vanilla_item": "Progressive Shield",
        "flag_byte": 0xc643,
        "room": 0x025e,
        "map_tile": 0x68,
        "bit_mask": 0x20,
        "scouting_byte": 0xc75e,
        "scouting_mask": 0x10,
        "reachable": () => locations['lynna city'](),
        'vanilaPrice': 30,
        "symbolic_name": "lynnaShop1",
    },
    "Lynna City: Shop Item #2": {
        "region_id": "lynna shop",
        "vanilla_item": "Bombs (10)",
        "flag_byte": 0xc643,
        "room": 0x025e,
        "map_tile": 0x68,
        "bit_mask": 0x40,
        "scouting_byte": 0xc75e,
        "scouting_mask": 0x10,
        "reachable": () => locations['lynna city'](),
        'vanilaPrice': 20,
        "symbolic_name": "lynnaShop2",
    },
    "Lynna City: Shop Item #3": {
        "region_id": "lynna shop",
        "vanilla_item": "Flute",
        "flag_byte": 0xc643,
        "room": 0x025e,
        "map_tile": 0x68,
        "bit_mask": 0x80,
        "scouting_byte": 0xc75e,
        "scouting_mask": 0x10,
        "reachable": () => locations['lynna city'](),
        'vanilaPrice': 150,
        "symbolic_name": "lynnaShop3",
    },
    "Lynna City: Hidden Shop Item #1": {
        "region_id": "hidden shop",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc642,
        "room": 0x027e,
        "bit_mask": 0x01,
        "scouting_byte": 0xc77e,
        "scouting_mask": 0x10,
        'vanilaPrice': 300,
        "reachable": () => locations['lynna city']() && LogicPredicates.can_go_back_to_present(),
        "symbolic_name": "hiddenShop1",
    },
    "Lynna City: Hidden Shop Item #2": {
        "region_id": "hidden shop",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc642,
        "room": 0x027e,
        "bit_mask": 0x02,
        "scouting_byte": 0xc77e,
        "scouting_mask": 0x10,
        'vanilaPrice': 500,
        "reachable": () => locations['lynna city']() && LogicPredicates.can_go_back_to_present(),
        "symbolic_name": "hiddenShop2",
    },
    "Lynna City: Hidden Shop Item #3": {
        "region_id": "hidden shop",
        "vanilla_item": "Biggoron's Sword",
        "flag_byte": 0xc642,
        "room": 0x027e,
        "bit_mask": 0x08,
        "scouting_byte": 0xc77e,
        "scouting_mask": 0x10,
        "reachable": () => locations['lynna city']() && LogicPredicates.can_go_back_to_present(),
        "symbolic_name": "hiddenShop3",
    },
    "Lynna City: Mayor Plen's House": {
        "region_id": "mayor plen's house",
        "vanilla_item": "Green Luck Ring",
        "flag_byte": 0xc8f9,
        "room": 0x03f9,
        "map_tile": 0x57,
        "reachable": () => locations['lynna city']() && LogicPredicates.has_long_hook(),
    },
    "Lynna City: Vasu's Gift": {
        "region_id": "vasu's gift",
        "vanilla_item": "Friendship Ring",
        "flag_byte": 0xc615,
        "bit_mask": 0x01,
        "room": 0x02ee,
        "reachable": () => locations['lynna city'](),
        "symbolic_name": "vasuGift",
    },
    "Lynna City: Maku Tree gift": {
        "region_id": "maku tree",
        "vanilla_item": "Seed Satchel",
        "flag_byte": 0xc738,
        "room": 0x0038,
        "map_tile": 0x38,
        "reachable": () => (
            (
                gameLogic.dungeonReachable("Maku Path") && LogicPredicates.has_small_keys(0) && LogicPredicates.can_kill_normal_enemy()
            ) || locations["Ambi's Palace: Rescue Nayru"].reachable()
        ),
        "symbolic_name": "makuTreeGift",
    },
    "Lynna City: Mamamu Yan Trade": {
        "region_id": "mamamu yan trade",
        "vanilla_item": "Dumbbell",
        "flag_byte": 0xc7e7,
        "room": 0x02e7,
        "reachable": () => locations['lynna city']() && gameLogic.hasItem("Doggie Mask"),
        "symbolic_name": "mamamuYan",
    },
    "Lynna City: Comedian Trade": {
        "region_id": "lynna city comedian trade",
        "vanilla_item": "Funny Joke",
        "flag_byte": 0xc756,
        "room": 0x0056,
        "reachable": () => locations['lynna city']() && gameLogic.hasItem("Cheesy Mustache"),
        "symbolic_name": "comedian",
    },
    "Lynna Village: Gasha Farmer": {
        "region_id": "gasha farmer",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc8fc,
        "room": 0x03fc,
        "reachable": () => locations['lynna village'](),
        "symbolic_name": "gashaFarmer",
    },
    "Lynna Village: Advance Shop Item #1": {
        "region_id": "advance shop",
        "vanilla_item": "Rupees (100)",
        "flag_byte": 0xc643,
        "room": 0x03ed,
        "bit_mask": 0x01,
        "scouting_byte": 0xc8fe,
        "scouting_mask": 0x10,
        "vanilaPrice": 100,
        "reachable": () => locations['lynna village'](),
        "symbolic_name": "advanceShop1",
    },
    "Lynna Village: Advance Shop Item #2": {
        "region_id": "advance shop",
        "vanilla_item": "GBA Time Ring",
        "flag_byte": 0xc643,
        "bit_mask": 0x02,
        "room": 0x03ed,
        "scouting_byte": 0xc8fe,
        "scouting_mask": 0x10,
        "vanilaPrice": 100,
        "reachable": () => locations['lynna village'](),
        "symbolic_name": "advanceShop2",
    },
    "Lynna Village: Advance Shop Item #3": {
        "region_id": "advance shop",
        "vanilla_item": "Rupees (100)",
        "flag_byte": 0xc643,
        "bit_mask": 0x04,
        "room": 0x03ed,
        "scouting_byte": 0xc8fe,
        "scouting_mask": 0x10,
        "vanilaPrice": 100,
        "reachable": () => locations['lynna village'](),
        "symbolic_name": "advanceShop3",
    },
    "Lynna Village: Baseball": {
        "region_id": "lynna shooting gallery",
        "vanilla_item": "Red Ring",
        "flag_byte": 0xc6d9,
        "bit_mask": 0x02,
        "room": 0x02e9,
        "reachable": () => LogicPredicates.has_sword() && locations['lynna village'](),
        "symbolic_name": "lynnaShootingGallery",
    },
    "Lynna Village: Postman Trade": {
        "region_id": "postman trade",
        "vanilla_item": "Stationery",
        "flag_byte": 0xc72f,
        "room": 0x022f,
        "reachable": () => gameLogic.hasItem("Poe Clock") && locations['lynna village'](),
        "symbolic_name": "postman",
    },
    "Lynna Village: Toilet Hand Trade": {
        "region_id": "toilet hand trade",
        "vanilla_item": "Stink Bag",
        "flag_byte": 0xc73e,
        "room": 0x023e,
        "reachable": () => gameLogic.hasItem("Stationery") && locations['lynna village'](),
        "symbolic_name": "toiletHand",
    },
    "Lynna Village: Depressed Child Trade": {
        "region_id": "sad boi trade",
        "vanilla_item": "Touching Book",
        "flag_byte": 0xc7f3,
        "room": 0x02f3,
        "reachable": () => gameLogic.hasItem("Funny Joke") && locations['lynna village'](),
        "symbolic_name": "sadBoi",
    },

    // Black Tower (Past) Items
    "Black Tower (Past): Supervisor": {
        "region_id": "black tower worker",
        "vanilla_item": "Shovel",
        "flag_byte": 0xc9e1,
        "room": 0x04e1,
        "map_tile": 0x176,
        "reachable": () => locations['lynna village'](),
        "symbolic_name": "towerWorker",
    },
    "Black Tower (Past): Heart Piece": {
        "region_id": "black tower heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc886,
        "room": 0x0186,
        "reachable": () => LogicPredicates.has_shovel() && locations['lynna village'](),
        "symbolic_name": "blackTowerHP",
    },

    // Ambi's Palace Items
    "Ambi's Palace: East Wing Chest": {
        "region_id": "ambi's palace chest",
        "vanilla_item": "Gold Luck Ring",
        "flag_byte": 0xcacb,
        "room": 0x05cb,
        "map_tile": 0x107,
        "reachable": () => ([
            ([
                LogicPredicates.option_hard_logic(),
                LogicPredicates.can_use_scent_seeds_for_smell(),
                LogicPredicates.can_use_pegasus_seeds()
            ]).every(Boolean),
            ([
                LogicPredicates.can_break_bush(),
                LogicPredicates.can_dive()
            ]).every(Boolean),
            LogicPredicates.can_switch_past_and_present()
        ]).some(Boolean),
    },
    "Ambi's Palace: Rescue Nayru": {
        "region_id": "rescue nayru",
        "vanilla_item": "Progressive Harp",
        "flag_byte": 0xc6d1,
        "bit_mask": 0x20,
        "room": 0x0038,
        "reachable": () => locations["Ambi's Palace: East Wing Chest"].reachable() && ([
            LogicPredicates.has_switch_hook(),
            LogicPredicates.can_use_mystery_seeds(),
            ([
                LogicPredicates.has_sword(),
                LogicPredicates.can_punch()
            ]).some(Boolean)
        ]).every(Boolean),
        "symbolic_name": "rescueNayru",
    },

    "West Lynna: Cave Near Restoration Wall": {
        "region_id": "restoration wall heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc8af,
        "room": 0x03af,
        "reachable": () => locations['deku forest']() && LogicPredicates.has_feather(),
        "symbolic_name": "restorationWallHP",
    },

    // South Shore Locations
    "South Shore (Present): Dirt Pile": {
        "region_id": "south shore dirt",
        "vanilla_item": "Ricky's Gloves",
        "flag_byte": 0xc798,
        "room": 0x0098,
        "reachable": () => LogicPredicates.can_remove_dirt(true) && locations['shore present'](),
        "symbolic_name": "southShoreDirt",
    },
    "South Shore (Past): Rafton Trade": {
        "region_id": "rafton trade",
        "vanilla_item": "Sea Ukulele",
        "flag_byte": 0xc71f,
        "room": 0x021f,
        "reachable": () => gameLogic.hasItem("Magic Oar") && locations["rafton's raft"](),
        "symbolic_name": "rafton",
    },

    // Yoll Graveyard Location
    "Yoll Graveyard: Cheval's Test": {
        "region_id": "cheval's test",
        "vanilla_item": "Progressive Flippers",
        "flag_byte": 0xcabf,
        "room": 0x05bf,
        "map_tile": 0x5b,
        "reachable": () => locations["cheval's grave"]() && ([
            ([
                LogicPredicates.has_feather(),
                LogicPredicates.can_swim(false),
            ]).some(Boolean),
            LogicPredicates.has_bracelet()
        ]).every(Boolean),
        "symbolic_name": "chevalTest",
    },
    "Yoll Graveyard: Cheval's Invention": {
        "region_id": "cheval's invention",
        "vanilla_item": "Cheval Rope",
        "flag_byte": 0xcab6,
        "room": 0x05b6,
        "map_tile": 0x5b,
        "reachable": () => locations["cheval's grave"]() && LogicPredicates.has_flippers(),
        "symbolic_name": "chevalInvention",
    },
    "Yoll Graveyard: Grave Under The Tree": {
        "region_id": "grave under tree",
        "vanilla_item": "Graveyard Key",
        "flag_byte": 0xcaed,
        "room": 0x05ed,
        "map_tile": 0x8d,
        "reachable": () => locations["yoll graveyard"](),
        "symbolic_name": "graveUnderTree",
    },
    "Yoll Graveyard: Syrup Shop Item #1": {
        "region_id": "syrup shop",
        "vanilla_item": "King Zora's Potion",
        "flag_byte": 0xc642,
        "room": 0x03fe,
        "bit_mask": 0x80,
        "scouting_byte": 0xc8ed,
        "scouting_mask": 0x10,
        "reachable": () => locations['syrup shop'](),
        "symbolic_name": "syrupShop1",
    },
    "Yoll Graveyard: Syrup Shop Item #2": {
        "region_id": "syrup shop",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc642,
        "room": 0x03fe,
        "bit_mask": 0x20,
        "scouting_byte": 0xc8ed,
        "scouting_mask": 0x10,
        "reachable": () => locations['syrup shop'](),
        "symbolic_name": "syrupShop2",
    },
    "Yoll Graveyard: Syrup Shop Item #3": {
        "region_id": "syrup shop",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc642,
        "room": 0x03fe,
        "bit_mask": 0x40,
        "scouting_byte": 0xc8ed,
        "scouting_mask": 0x10,
        "reachable": () => locations['syrup shop'](),
        "symbolic_name": "syrupShop3",
    },
    "Yoll Graveyard: Poe's Gift": {
        "region_id": "graveyard poe trade",
        "vanilla_item": "Poe Clock",
        "flag_byte": 0xc77c,
        "room": 0x007c,
        "reachable": () => locations['graveyard door']() && LogicPredicates.has_bracelet(),
        "symbolic_name": "graveyardPoe",
    },
    "Yoll Graveyard: Heart Piece": {
        "region_id": "yoll graveyard heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc78b,
        "room": 0x008b,
        "reachable": () => locations["yoll graveyard"]() && LogicPredicates.has_bracelet(),
        "symbolic_name": "yollGraveyardHP",
    },

    // Forest Items
    "Fairies' Woods: Single Chest": {
        "region_id": "fairies' woods chest",
        "vanilla_item": "Rupees (20)",
        "flag_byte": 0xc784,
        "room": 0x0084,
        "reachable": () => (
            locations["fairies' woods"]() && ([
                LogicPredicates.can_jump_1_wide_pit(true),
                LogicPredicates.has_switch_hook()
            ]).some(Boolean)
        ) || (
            locations['deku forest']() && LogicPredicates.can_go_back_to_present()
        )
    },
    "Deku Forest: Chest in Central Cave": {
        "region_id": "deku forest cave east",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xcab3,
        "room": 0x05b3,
        "map_tile": 0x172,
        "reachable": () => locations['deku forest'](),
    },
    "Deku Forest: Chest in Path to Seed Tree": {
        "region_id": "deku forest cave west",
        "vanilla_item": "Rupees (30)",
        "flag_byte": 0xcab5,
        "room": 0x05b5,
        "map_tile": 0x171,
        "reachable": () => locations['deku forest']() && ([
            LogicPredicates.has_bracelet(),
            ([
                LogicPredicates.can_jump_1_wide_pit(false),
                LogicPredicates.has_switch_hook(),
                LogicPredicates.can_use_ember_seeds(false),
                LogicPredicates.can_warp_using_gale_seeds(),
                LogicPredicates.can_switch_past_and_present(),
            ]).some(Boolean)
        ]).every(Boolean),
    },
    "Deku Forest: Soldier's Reward": {
        "region_id": "deku forest soldier",
        "vanilla_item": "Bombs (10)",
        "flag_byte": 0xc6d9,
        "bit_mask": 0x04,
        "room": 0x0172,
        "reachable": () => locations['deku forest']() && LogicPredicates.has_mystery_seeds(),
        "symbolic_name": "dekuForestSoldier",
    },
    "Deku Forest: Terrace in Cave Under Tree": {
        "region_id": "deku forest heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xcab1,
        "room": 0x05b1,
        "reachable": () => locations['deku forest']() && LogicPredicates.has_ember_seeds(false),
        "symbolic_name": "dekuForestHP",
    },

    // Crescent Island Items
    "Crescent Island (Present): Underwater Maze Cave": {
        "region_id": "under crescent island",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc8fd,
        "room": 0x03fd,
        "map_tile": 0xba,
        "reachable": () => locations['lynna city']() && LogicPredicates.can_dive(),
    },
    "Crescent Island (Present): Tokay Chef Trade": {
        "region_id": "tokay chef trade",
        "vanilla_item": "Tasty Meat",
        "flag_byte": 0xc73f,
        "room": 0x023f,
        "reachable": () => locations['crescent present east']() && gameLogic.hasItem("Stink Bag"),
        "symbolic_name": "tokayChef",
    },
    "Crescent Island (Past): Water Cave Tokay": {
        "region_id": "hidden tokay cave",
        "vanilla_item": "Progressive Shield",
        "flag_byte": 0xcae9,
        "room": 0x05e9,
        "map_tile": 0x1d9,
        "reachable": () => locations['lynna village']() && LogicPredicates.can_dive(),
        "symbolic_name": "hiddenTokayCave",
    },
    "Crescent Island (Past): Crystal Cave Chest": {
        "region_id": "tokay crystal cave",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xcaca,
        "room": 0x05ca,
        "map_tile": 0x1bb,
        "reachable": () => locations['crescent past west']() && ([
            ([
                LogicPredicates.has_shovel(),
                LogicPredicates.can_break_crystal(),
            ]).some(Boolean),
            LogicPredicates.can_jump_1_wide_pit(false)
        ]).every(Boolean),
    },
    "Crescent Island (Past): Bomb Cave Chest": {
        "region_id": "tokay bomb cave",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc7ce,
        "room": 0x02ce,
        "map_tile": 0x1cd,
        "reachable": () => locations['crescent past east']() && LogicPredicates.has_bracelet() && LogicPredicates.has_bombs(),
    },
    "Crescent Island (Past): Tokay Chicken House": {
        "region_id": "tokay chicken house",
        "vanilla_item": "Bombs (10)",
        /* "flag_byte": 0xc2e3, 
        - I am not sure if flag byte 0xc2e3 is correct. I tested it and the item still does not appear on the other side of the fence in it's vanilla position at the
        tokay chicken house. I know that the tracker does not need this property, but the randomizer does. */
        "room": 0x02e3,
        "map_tile": 0x1dc,
        "reachable": () => locations['crescent past east']() && LogicPredicates.has_bracelet(),
        "symbolic_name": "tokayChickenHouse",
    },
    "Crescent Island (Past): Wild Tokay Prize": {
        "region_id": "wild tokay game",
        "vanilla_item": "Scent Seedling",
        "flag_byte": 0xc7de,
        "room": 0x02de,
        "map_tile": 0x1bd,
        "reachable": () => locations['crescent past east']() && LogicPredicates.has_bombs() && LogicPredicates.has_bracelet(),
        "symbolic_name": "wildTokayGame",
    },
    "Crescent Island (Past): Market Item #1": {
        "region_id": "tokay market 1",
        "vanilla_item": "Progressive Shield",
        "flag_byte": 0xc6d6,
        "room": 0x02e4,
        "bit_mask": 0x40,
        "scouting_byte": 0xc7e4,
        "scouting_mask": 0x10,
        "reachable": () => locations['crescent past east']() && LogicPredicates.has_mystery_seeds(),
        "symbolic_name": "tokayMarket1",
    },
    "Crescent Island (Past): Market Item #2": {
        "region_id": "tokay market 2",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc6d6,
        "room": 0x02e4,
        "bit_mask": 0x80,
        "scouting_byte": 0xc7e4,
        "scouting_mask": 0x10,
        "reachable": () => locations['crescent past east']() && LogicPredicates.has_scent_seeds(),
        "symbolic_name": "tokayMarket2",
    },
    "Crescent Island (Past): Pot Cave": {
        "region_id": "tokay pot cave",
        "vanilla_item": "Power Ring L-2",
        "flag_byte": 0xcaf7,
        "room": 0x05f7,
        "map_tile": 0x1dd,
        "reachable": () => locations['crescent past east']() && LogicPredicates.has_long_hook(),
    },

    // Nuun Highlands Items
    "Nuun Highlands: Southern Cave": {
        "region_id": "nuun highlands cave",
        "vanilla_item": "Light Ring L-1",
        "flag_byte": [0xc7ec, 0xcab8, 0xc7f4],
        "room": [0x02ec, 0x05b8, 0x02f4],
        "map_tile": 0x37,
        "reachable": () => locations['nuun highlands cave'][
            gameLogic.settings.animal_companion
        ](),
    },
    "Nuun Highlands: Happy Mask Salesman Trade": {
        "region_id": "happy mask salesman trade",
        "vanilla_item": "Doggie Mask",
        "flag_byte": 0xc7e6,
        "room": 0x02e6,
        "reachable": () => locations["fairies' woods"]() && gameLogic.hasItem("Tasty Meat"),
        "symbolic_name": "maskSaleman",
    },

    // Symmetry Village Items
    "Symmetry Village: Brothers": {
        "region_id": "symmetry city brother",
        "vanilla_item": "Cracked Tuni Nut",
        "flag_byte": [0xc86e, 0xc86f],
        "room": [0x036e, 0x036f],
        "map_tile": 0x104,
        "reachable": () => locations['symmetry past'](),
        "symbolic_name": "symmetryCityBrother",
    },
    "Symmetry Village: Skinny Guy Trade": {
        "region_id": "symmetry middle man trade",
        "vanilla_item": "Cheesy Mustache",
        "flag_byte": 0xc7e8,
        "room": 0x02e8,
        "reachable": () => locations['symmetry past']() && gameLogic.hasItem("Dumbbell"),
        "symbolic_name": "middleMan",
    },

    // Talus Peaks Items
    "Talus Peaks (Present): Bomb Fairy": {
        "region_id": "bomb fairy",
        "vanilla_item": "Bombs (10)",
        "flag_byte": 0xc6d3,
        "bit_mask": 0x10,
        "room": 0x0050,
        "reachable": () => locations['talus peaks']() && LogicPredicates.has_bombs(),
        "symbolic_name": "bombFairy",
    },
    "Talus Peaks (Present): Southeastern Chest": {
        "region_id": "talus peaks chest",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc763,
        "room": 0x0063,
        "reachable": () => locations['restoration wall'](),
    },
    "Talus Peaks (Present): Heart Piece": {
        "region_id": "symmetry city heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc711,
        "room": 0x0011,
        "reachable": () => locations['symmetry past']() && LogicPredicates.can_go_back_to_present(),
        "symbolic_name": "symmetryCityHP",
    },
    "Talus Peaks (Past): Tokkey's Composition": {
        "region_id": "tokkey's composition",
        "vanilla_item": "Progressive Harp",
        "flag_byte": 0xc88f,
        "room": 0x038f,
        "map_tile": 0x101,
        "reachable": () => locations['symmetry past']() && LogicPredicates.has_flippers(),
        "symbolic_name": "tokkeyComposition",
    },
    "Talus Peaks (Past): Tuni Nut Restoration": {
        "region_id": "patch tuni nut ceremony",
        "vanilla_item": "Tuni Nut",
        "flag_byte": 0xc6d3,
        "room": 0x03be,
        "bit_mask": 0x40,
        "reachable": () => locations['patch']() && gameLogic.hasItem("Tuni Nut"),
        "symbolic_name": "patchTuni",
    },
    "Talus Peaks (Past): Broken Sword Restoration": {
        "region_id": "patch broken sword ceremony",
        "vanilla_item": "Progressive Sword",
        "flag_byte": 0xc6d5,
        "room": 0x03be,
        "bit_mask": 0x20,
        "reachable": () => locations['patch']() && gameLogic.hasItem("Broken Sword"),
        "symbolic_name": "patchSword",
    },

    // Rolling Ridge Items (hard for me to add the logic to without causing loops due to there being more than one posibility to accessing rolling ridge.)
    "Rolling Ridge Base (Present): Terrace Chest": {
        "region_id": "ridge base chest",
        "vanilla_item": "Rupees (50)",
        "flag_byte": 0xcab9,
        "room": 0x05b9,
        "map_tile": 0x28,
        "reachable": () => locations['ridge west present'](),
    },
    "Rolling Ridge Base (Present): First Goron Dance": {
        "region_id": "first goron dance",
        "vanilla_item": "Brother Emblem",
        "flag_byte": 0xc6d0,
        "bit_mask": 0x80,
        "room": [0x2ed, 0x2ef],
        "map_tile": 0x13d,
        "reachable": () => locations['ridge base present']() || locations['ridge base past east'](),
        "symbolic_name": "goronDance1",
    },
    "Rolling Ridge Base (Present): Pool in Mermaid Cave Entrance": {
        "region_id": "pool in d6 entrance",
        "vanilla_item": "Toss Ring",
        "flag_byte": 0xc80e,
        "room": 0x030e,
        "map_tile": 0x3c,
        "reachable": () => LogicPredicates.can_dive() && locations['ridge base present'](),
    },
    "Rolling Ridge Base (Present): Trade With Doorkeeper Goron": {
        "region_id": "trade rock brisket",
        "vanilla_item": "Goron Vase",
        "flag_byte": 0xc7fd,
        "room": 0x02fd,
        "map_tile": 0x3d,
        "reachable": () => gameLogic.hasItem("Rock Brisket") && gameLogic.hasItem("Brother Emblem") && locations['ridge base present'](),
        "symbolic_name": "tradeRockBrisket",
    },
    "Rolling Ridge Base (Past): Goron Elder": {
        "region_id": "goron elder",
        "vanilla_item": "Crown Key",
        "flag_byte": 0xcac3,
        "room": 0x05c3,
        "map_tile": 0x128,
        "reachable": () => gameLogic.hasItem("Bomb Flower") && locations['ridge west past base'](),
        "symbolic_name": "goronElder",
    },
    "Rolling Ridge Base (Past): Goron Dance With Letter": {
        "region_id": "goron dance, with letter",
        "vanilla_item": "Mermaid Key",
        "flag_byte": 0xc6d1,
        "bit_mask": 0x08,
        "room": 0x2ef,
        "map_tile": 0x13d,
        "reachable": () => gameLogic.hasItem("Letter of Introduction") && locations['ridge base past east'](),
        "symbolic_name": "goronDance2",
    },
    "Rolling Ridge Base (Past): Trade With Doorkeeper Goron": {
        "region_id": "trade goron vase",
        "vanilla_item": "Goronade",
        "flag_byte": 0xc7ff,
        "room": 0x02ff,
        "map_tile": 0x13d,
        "reachable": () => gameLogic.hasItem("Goron Vase") && gameLogic.hasItem("Brother Emblem") && locations['ridge base past east'](),
        "symbolic_name": "tradeGoronVase",
    },
    "Rolling Ridge Base (Past): Chest Behind Cracked Rocks": {
        "region_id": "ridge base bomb past",
        "vanilla_item": "Rupees (50)",
        "flag_byte": 0xcae0,
        "room": 0x05e0,
        "map_tile": 0x12b,
        "reachable": () => LogicPredicates.has_bombs() && locations['ridge base past west'](),
    },
    "Rolling Ridge Base (Past): Chest Beyond Diamonds": {
        "region_id": "ridge diamonds past",
        "vanilla_item": "Rupees (50)",
        "flag_byte": 0xcae1,
        "room": 0x05e1,
        "map_tile": 0x12b,
        "reachable": () => LogicPredicates.has_switch_hook() && locations['ridge base past west'](),
    },
    "Rolling Ridge (Present): West Stairs Cave Chest": {
        "region_id": "ridge west cave",
        "vanilla_item": "Rupees (30)",
        "flag_byte": 0xcac0,
        "room": 0x05c0,
        "map_tile": 0x18,
        "reachable": () => locations['ridge west present'](),
    },
    "Rolling Ridge (Present): Cave Under Moblin Keep": {
        "region_id": "under moblin keep",
        "vanilla_item": "Armor Ring L-1",
        "flag_byte": 0xc7be,
        "room": 0x02be,
        "map_tile": 0x09,
        "reachable": () => ([
            LogicPredicates.can_jump_1_wide_pit(false),
            LogicPredicates.can_swim(false),
            locations['ridge west present']()
        ]).every(Boolean),
    },
    "Rolling Ridge (Present): Defeat Great Moblin": {
        "region_id": "defeat great moblin",
        "vanilla_item": "Bomb Flower",
        "flag_byte": 0xc709,
        "room": 0x0009,
        "reachable": () => false,
        "symbolic_name": "defeatGreatMoblin",
    },
    "Rolling Ridge (Present): Goron's Hiding Place": {
        "region_id": "goron's hiding place",
        "vanilla_item": "Golden Joy Ring",
        "flag_byte": 0xcabd,
        "room": 0x05bd,
        "map_tile": 0x28,
        "reachable": () => LogicPredicates.has_bombs() && locations['ridge west present'](),
    },
    "Rolling Ridge (Present): Bush Cave Chest": {
        "region_id": "ridge bush cave",
        "vanilla_item": "Rupees (100)",
        "flag_byte": 0xc81f,
        "room": 0x031f,
        "map_tile": 0x11c,
        "reachable": () => LogicPredicates.has_switch_hook() && locations['ridge mid past'](),
    },
    "Rolling Ridge (Present): Target Carts 1st Prize": {
        "region_id": "target carts 1",
        "vanilla_item": "Rock Brisket",
        "flag_byte": 0xcad8,
        "bit_mask": 0x20,
        "room": 0x05d8,
        "map_tile": 0x1d,
        "reachable": () => ([
            LogicPredicates.has_seedshooter(),
            ([
                LogicPredicates.has_ember_seeds(),
                LogicPredicates.has_mystery_seeds(),
                LogicPredicates.has_pegasus_seeds(),
                LogicPredicates.has_scent_seeds(),
            ]).some(Boolean),
            locations['target carts']()
        ]).every(Boolean),
        "symbolic_name": "targetCart1",
    },
    "Rolling Ridge (Present): Target Carts 2nd Prize": {
        "region_id": "target carts 2",
        "vanilla_item": "Boomerang",
        "flag_byte": 0xcad8,
        "bit_mask": 0x40,
        "room": 0x05d8,
        "map_tile": 0x1d,
        "reachable": () => locations[
            "Rolling Ridge (Present): Target Carts 1st Prize"
        ].reachable(),
        "symbolic_name": "targetCart2",
    },
    "Rolling Ridge (Present): Big Bang Prize": {
        "region_id": "big bang game",
        "vanilla_item": "Old Mermaid Key",
        "flag_byte": 0xc83e,
        "room": 0x033e,
        "map_tile": 0x1c,
        "reachable": () => gameLogic.hasItem("Goronade") && locations['ridge mid present'](),
        "symbolic_name": "bigBangGame",
    },
    "Rolling Ridge (Present): Northeast Cave Chest": {
        "region_id": "ridge NE cave present",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xcaee,
        "room": 0x05ee,
        "map_tile": 0x0d,
        "reachable": () => locations['ridge mid present'](),
    },
    "Rolling Ridge (Present): Chest in Diamonds Room": {
        "region_id": "goron diamond cave",
        "vanilla_item": "Bombs (10)",
        "flag_byte": 0xcadd,
        "room": 0x05dd,
        "map_tile": 0x1c,
        "reachable": () => ([
            LogicPredicates.has_switch_hook(),
            LogicPredicates.can_jump_3_wide_pit(false),
        ]).some(Boolean),
    },
    "Rolling Ridge (Present): Heart Piece in Westmost Cave": {
        "region_id": "ridge west heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xcac1,
        "room": 0x05c1,
        "reachable": () => ([
            LogicPredicates.can_open_portal(),
            LogicPredicates.has_bracelet()
        ]).every(Boolean),
        "symbolic_name": "ridgeWestHP",
    },
    "Rolling Ridge (Present): Far Northeast Heart Piece": {
        "region_id": "ridge upper heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc70d,
        "room": 0x000d,
        "reachable": () => ([
            LogicPredicates.can_go_back_to_present(),
            LogicPredicates.can_break_bush(),
            locations['ridge upper past']()
        ]).every(Boolean),
        "symbolic_name": "ridgeUpperHP",
    },
    "Rolling Ridge (Past): Cave in Goron Face": {
        "region_id": "bomb goron head",
        "vanilla_item": "Rupees (100)",
        "flag_byte": 0xc7fc,
        "room": 0x02fc,
        "map_tile": 0x10d,
        "reachable": () => LogicPredicates.has_bombs() && locations['ridge upper past'](),
    },
    "Rolling Ridge (Past): Treasure Hunting Goron": {
        "region_id": "treasure hunting goron",
        "vanilla_item": "Red Luck Ring",
        "flag_byte": 0xc7f7,
        "room": 0x02f7,
        "reachable": () => ([
            LogicPredicates.has_bombs(),
            LogicPredicates.has_ember_seeds(),
            LogicPredicates.can_open_portal(),
            LogicPredicates.has_bracelet(),
            locations['ridge upper present']
        ]).every(Boolean),
    },
    "Rolling Ridge (Past): Baseball": {
        "region_id": "goron shooting gallery price",
        "vanilla_item": "Lava Juice",
        "flag_byte": 0xc8e7,
        "room": 0x03e7,
        "map_tile": 0x11d,
        "reachable": () => LogicPredicates.has_sword() && locations['goron shooting gallery'](),
        "symbolic_name": "goronShootingGallery",
    },
    "Rolling Ridge (Past): Trade With Graceful Goron's Friend": {
        "region_id": "trade lava juice",
        "vanilla_item": "Letter of Introduction",
        "flag_byte": 0xc81f,
        "room": 0x031f,
        "bit_mask": 0x40,
        "map_tile": 0x11c,
        "reachable": () => gameLogic.hasItem("Lava Juice") && locations['ridge mid past'](),
        "symbolic_name": "tradeLavaJuice",
    },

    // Zora Village (Present) Items
    "Zora Village (Present): Western Pool Chest": {
        "region_id": "zora village present",
        "vanilla_item": "Gasha Seed",
        "flag_byte": 0xc7c0,
        "room": 0x02c0,
        "reachable": () => locations['zora village'](),
    },
    "Zora Village (Present): Zora Palace Chest": {
        "region_id": "zora palace chest",
        "vanilla_item": "Rupees (200)",
        "flag_byte": 0xcaac,
        "room": 0x05ac,
        "map_tile": 0xa1,
        "reachable": () => locations['zora village'](),
    },
    "Zora Village (Present): Statues Cave": {
        "region_id": "zora NW cave",
        "vanilla_item": "Blue Luck Ring",
        "flag_byte": 0xcac7,
        "room": 0x05c7,
        "map_tile": 0xa0,
        "reachable": () => locations['zora village']() && (
            LogicPredicates.has_bombs()
            && LogicPredicates.has_glove()
        ),
    },
    "Zora Village (Present): Fairies' Coast Chest": {
        "region_id": "fairies' coast chest",
        "vanilla_item": "Green Holy Ring",
        "flag_byte": 0xc791,
        "room": 0x0091,
        "reachable": () => locations['zora village'](),
    },
    "Zora Village (Present): Zora King Gift": {
        "region_id": "zora king gift",
        "vanilla_item": "Library Key",
        "flag_byte": 0xcaab,
        "room": 0x05ab,
        "map_tile": 0xa1,
        "reachable": () => locations['zora village']() && (
            (
                connected2archipelago && gameLogic.isRandomizer() && gameLogic.hasItem("King Zora's Potion")
            ) || gameLogic.hasItem("Potion")
        ),
        "symbolic_name": "kingZora",
    },
    "Zora Village (Present): Zora's Reward": {
        "region_id": "zora's reward",
        "vanilla_item": "Zora Scale",
        "flag_byte": 0xc7a0,
        "room": 0x02a0,
        "reachable": () => locations['zora village']() && gameLogic.hasItem("Rolling Sea"),
        "symbolic_name": "zoraReward",
    },

    // Eyeglass Island Library Items
    "Eyeglass Island Library (Present): Old Man": {
        "region_id": "library present",
        "vanilla_item": "Book of Seals",
        "flag_byte": 0xcac8,
        "room": 0x05c8,
        "map_tile": 0xa5,
        "reachable": () => locations['library present'](),
        "symbolic_name": "libraryPresent",
    },
    "Eyeglass Island Library (Past): Old Man": {
        "region_id": "library past",
        "vanilla_item": "Fairy Powder",
        "flag_byte": 0xcae4,
        "room": 0x05e4,
        "map_tile": 0x1a5,
        "reachable": () => locations['library past'](),
        "symbolic_name": "libraryPast",
    },

    // Zora Seas Items
    "Zora Seas (Present): Southeast Island Chest": {
        "region_id": "zora seas chest",
        "vanilla_item": "Whimsical Ring",
        "flag_byte": 0xc7d5,
        "room": 0x00d5,
        "reachable": () => locations['zora village']() && gameLogic.hasItem("Fairy Powder"),
    },
    "Zora Seas (Past): Fisherman's Island Cave": {
        "region_id": "fisher's island cave",
        "vanilla_item": "Red Holy Ring",
        "flag_byte": 0xc74f,
        "room": 0x024f,
        "map_tile": 0x1c5,
        "reachable": () => locations['zora village']() && LogicPredicates.has_long_hook(),
    },

    // Sea of Storms Locations
    "Sea of Storms (Past): Piratian Captain": {
        "region_id": "piratian captain",
        "vanilla_item": "Tokay Eyeball",
        "flag_byte": 0xcaf8,
        "room": 0x05f8,
        "map_tile": 0x1d7,
        "reachable": () => ([
            LogicPredicates.can_dive(),
            gameLogic.hasItem("Zora Scale"),
            locations['lynna village']()
        ]).every(Boolean),
        "symbolic_name": "piratianCaptain",
    },
    "Sea of Storms (Past): Underwater Cave": {
        "region_id": "sea of storms past",
        "vanilla_item": "Pegasus Ring",
        "flag_byte": 0xc8ff,
        "room": 0x03ff,
        "map_tile": 0x1c7,
        "reachable": () => locations['Sea of Storms (Past): Piratian Captain'].reachable(),
        "symbolic_name": "seaofstorm",
    },
    /*
    NOTE: You normally can't get to this location in the vanilla game without being in a linked game. However, you can still reach it by performing a 
    Veran Wrap Glitch (really hard) without being in a linked game. Here is a link for the Veran Wrap glitch if you're curious. I am thinking about adding
    this location into my archipelago randomizer fork in the future. https://www.youtube.com/watch?v=vXteEbydr-8
    */
    "Sea of Storms (Present): Underwater Cave": {
        "region_id": "sea of storms present",
        "vanilla_item": "Gacha Seed",
        /*
        "flag_byte": 0xc8ff,
        "room": 0x03e8,
        "map_tile": 0x1c7,
        */
        "reachable": () => LogicPredicates.option_hard_logic() && locations['lynna city']() && LogicPredicates.can_dive() && LogicPredicates.has_seedshooter() && (
            LogicPredicates.has_mystery_seeds() && LogicPredicates.has_pegasus_seeds()
        ) && LogicPredicates.can_switch_past_and_present(),
        "symbolic_name": "seaofstormpresent",
    },

    // Sea of No Return Locations
    "Sea of No Return: Chest Under Statue": {
        "region_id": "sea of no return",
        "vanilla_item": "Blue Ring",
        "flag_byte": 0xc86d,
        "room": 0x016d,
        "reachable": () => gameLogic.dungeonsReachable[
            'Ancient Tomb'
        ]() && LogicPredicates.has_glove(),
    },
    "Coast of No Return: Old Zora Trade": {
        "region_id": "old zora trade",
        "vanilla_item": "Broken Sword",
        "flag_byte": 0xc7f5,
        "room": 0x02f5,
        "reachable": () => locations['lynna village']() && (
            (
                LogicPredicates.can_switch_past_and_present()
                || (
                    LogicPredicates.has_feather()
                    && (
                        LogicPredicates.has_switch_hook()
                        || LogicPredicates.can_dive()
                    )
                )
            ) && gameLogic.hasItem("Sea Ukulele")
        ),
        "symbolic_name": "oldZora",
    },


    "Maple Trade": {
        "region_id": "maple trade",
        "vanilla_item": "Magic Oar",
        "flag_byte": 0xc6d2,
        "room": 0x0300,
        "bit_mask": 0x80,
        "reachable": () => LogicPredicates.can_kill_normal_enemy(true) && gameLogic.hasItem("Touching Book"),
        "symbolic_name": "mapleTrade",
    },

    // Maku Path Locations
    "Maku Path: Heart Piece": {
        "region_id": "maku path heartpiece",
        "vanilla_item": "Piece of Heart",
        "flag_byte": 0xc906,
        "room": 0x0406,
        "reachable": () => (
            gameLogic.dungeonReachable("Maku Path") && LogicPredicates.has_small_keys(0)
        ) || locations["Ambi's Palace: Rescue Nayru"].reachable(),
        "symbolic_name": "makuPathHP",
    },
    "Maku Path: Key Chest": {
        "region_id": "d0 key chest",
        "vanilla_item": "Small Key (Maku Path)",
        "dungeon": 0,
        "flag_byte": 0xc908,
        "room": 0x0408,
        "map_tile": 0x148,
        "reachable": () => (
            LogicPredicates.has_small_keys(0) && locations["Ambi's Palace: Rescue Nayru"].reachable()
        ) || gameLogic.dungeonReachable("Maku Path"),
    },
    "Maku Path: Basement": {
        "region_id": "d0 basement",
        "vanilla_item": "Rupees (30)",
        "dungeon": 0,
        "flag_byte": 0xc905,
        "room": 0x0605,
        "reachable": () => (
            gameLogic.dungeonReachable("Maku Path") && LogicPredicates.has_small_keys(0)
        ) || locations["Ambi's Palace: Rescue Nayru"].reachable(),
        "symbolic_name": "d0Basement",
    },

    // Spirit's Grave Locations
    "Spirit's Grave: One-Button Chest": {
        "region_id": "d1 one-button chest",
        "vanilla_item": "Gasha Seed",
        "dungeon": 1,
        "flag_byte": 0xc915,
        "room": 0x0415,
        "reachable": () => locations["Spirit's Grave: Wide Room"].reachable(),
    },
    "Spirit's Grave: Two-Buttons Chest": {
        "region_id": "d1 two-button chest",
        "vanilla_item": "Small Key (Spirit's Grave)",
        "dungeon": 1,
        "flag_byte": 0xc916,
        "room": 0x0416,
        "reachable": () => locations["Spirit's Grave: Wide Room"].reachable(),
    },
    "Spirit's Grave: Wide Room": {
        "region_id": "d1 wide room",
        "vanilla_item": "Small Key (Spirit's Grave)",
        "dungeon": 1,
        "flag_byte": 0xc91a,
        "room": 0x041a,
        "reachable": () => locations["Spirit's Grave: Ghini Drop"].reachable() && LogicPredicates.has_small_keys(1, 2),
    },
    "Spirit's Grave: Crystal Room": {
        "region_id": "d1 crystal room",
        "vanilla_item": "Power Ring L-1",
        "dungeon": 1,
        "flag_byte": 0xc91c,
        "room": 0x041c,
        "reachable": () => locations["Spirit's Grave: East Terrace"].reachable() && LogicPredicates.can_use_ember_seeds(false) && LogicPredicates.can_break_crystal(),
    },
    "Spirit's Grave: Crossroad": {
        "region_id": "d1 crossroad",
        "vanilla_item": "Compass (Spirit's Grave)",
        "dungeon": 1,
        "flag_byte": 0xc91d,
        "room": 0x041d,
        "reachable": () => locations["Spirit's Grave: East Terrace"].reachable(),
    },
    "Spirit's Grave: West Terrace": {
        "region_id": "d1 west terrace",
        "vanilla_item": "Dungeon Map (Spirit's Grave)",
        "dungeon": 1,
        "flag_byte": 0xc91f,
        "room": 0x041f,
        "reachable": () => gameLogic.dungeonReachable("Spirit's Grave") && LogicPredicates.can_break_pot(),
    },
    "Spirit's Grave: Pot Chest": {
        "region_id": "d1 pot chest",
        "vanilla_item": "Boss Key (Spirit's Grave)",
        "dungeon": 1,
        "flag_byte": 0xc923,
        "room": 0x0423,
        "reachable": () => gameLogic.dungeonReachable("Spirit's Grave") && LogicPredicates.can_break_pot(),
    },
    "Spirit's Grave: East Terrace": {
        "region_id": "d1 east terrace",
        "vanilla_item": "Discovery Ring",
        "dungeon": 1,
        "flag_byte": 0xc925,
        "room": 0x0425,
        "reachable": () => gameLogic.dungeonReachable("Spirit's Grave") && LogicPredicates.can_kill_normal_enemy(true),
    },
    "Spirit's Grave: Ghini Drop": {
        "region_id": "d1 ghini drop",
        "vanilla_item": "Small Key (Spirit's Grave)",
        "dungeon": 1,
        "flag_byte": 0xc91e,
        "room": 0x041e,
        "reachable": () => locations["Spirit's Grave: East Terrace"].reachable(),
        "symbolic_name": "d1GhiniDrop",
    },
    "Spirit's Grave: Basement": {
        "region_id": "d1 basement",
        "vanilla_item": "Progressive Bracelet",
        "dungeon": 1,
        "flag_byte": 0xc910,
        "room": 0x0610,
        "reachable": () => locations['d1 U-room']() && LogicPredicates.can_use_ember_seeds(true),
        "symbolic_name": "d1Basement",
    },
    "Spirit's Grave: Boss": {
        "region_id": "d1 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 1,
        "flag_byte": 0xc913,
        "room": 0x0413,
        "reachable": () => locations["Spirit's Grave: Wide Room"].reachable() && (
            LogicPredicates.has_boss_key(1)
            && LogicPredicates.has_bracelet()
            && LogicPredicates.generic_boss_and_miniboss_kill()
        ),
        "symbolic_name": "d1Boss",
    },

    // Wing Dungeon Locations
    "Wing Dungeon (1F): Color Room": {
        "region_id": "d2 color room",
        "vanilla_item": "Boss Key (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc93e,
        "room": 0x043e,
        "reachable": () => locations['Wing Dungeon (1F): Statue Puzzle'].reachable() && LogicPredicates.has_small_keys(2, 5),
    },
    "Wing Dungeon (1F): Bombed Terrace": {
        "region_id": "d2 bombed terrace",
        "vanilla_item": "Dungeon Map (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc940,
        "room": 0x0440,
        "reachable": () => gameLogic.dungeonReachable("Wing Dungeon") && (
            (
                (
                    locations['d2 miniboss arena']() && LogicPredicates.can_jump_2_wide_pit(false)
                ) || LogicPredicates.can_kill_spiked_beetle()
            ) && LogicPredicates.has_bombs()
        ),
    },
    "Wing Dungeon (1F): Moblin Platform": {
        "region_id": "d2 moblin platform",
        "vanilla_item": "Gasha Seed",
        "dungeon": 2,
        "flag_byte": 0xc941,
        "room": 0x0441,
        "reachable": () => ([
            LogicPredicates.has_feather(),
            LogicPredicates.has_small_keys(2, 3),
            locations['d2 basement']
        ]).every(Boolean),
    },
    "Wing Dungeon (1F): Rope Room": {
        "region_id": "d2 rope room",
        "vanilla_item": "Compass (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc945,
        "room": 0x0445,
        "reachable": () => gameLogic.dungeonReachable("Wing Dungeon") && (
            LogicPredicates.can_kill_normal_enemy(true, true)
            && LogicPredicates.has_small_keys(2, 4)
        ),
    },
    "Wing Dungeon (1F): Ladder Chest": {
        "region_id": "d2 ladder chest",
        "vanilla_item": "Small Key (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc948,
        "room": 0x0448,
        "reachable": () => gameLogic.dungeonReachable("Wing Dungeon") && (
            LogicPredicates.can_kill_normal_enemy(true, true)
            && LogicPredicates.has_small_keys(2, 4)
            && LogicPredicates.has_bombs()
        ),
    },
    "Wing Dungeon (1F): Moblin Drop": {
        "region_id": "d2 moblin drop",
        "vanilla_item": "Small Key (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc939,
        "room": 0x0439,
        "reachable": () => gameLogic.dungeonReachable("Wing Dungeon") && (
            (
                (
                    locations['d2 miniboss arena']() && LogicPredicates.can_jump_2_wide_pit(false)
                ) || LogicPredicates.can_kill_spiked_beetle()
            ) && LogicPredicates.can_kill_normal_enemy()
        ),
        "symbolic_name": "d2MoblinDrop",
    },
    "Wing Dungeon (1F): Statue Puzzle": {
        "region_id": "d2 statue puzzle",
        "vanilla_item": "Small Key (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc942,
        "room": 0x0442,
        "reachable": () => locations['Wing Dungeon (1F): Moblin Platform'].reachable() && ([
            LogicPredicates.has_bracelet(),
            LogicPredicates.has_cane(),
            ([
                // push moblin into doorway, stand on button, use switch hook
                LogicPredicates.option_hard_logic(),
                LogicPredicates.can_push_enemy(),
                LogicPredicates.has_switch_hook()
            ]).every(Boolean)
        ]).some(Boolean),
        "symbolic_name": "d2StatuePuzzle",
    },
    "Wing Dungeon (B1F): Thwomp Shelf": {
        "region_id": "d2 thwomp shelf",
        "vanilla_item": "Rupees (30)",
        "dungeon": 2,
        "flag_byte": 0xc927,
        "room": 0x0627,
        "reachable": () => locations['d2 basement']() && (
            LogicPredicates.has_feather()
            || (
                LogicPredicates.option_hard_logic()
                && LogicPredicates.has_cane()
                && (
                    LogicPredicates.has_bombs()
                    || LogicPredicates.can_use_pegasus_seeds()
                )
            )
        ),
        "symbolic_name": "d2ThwompShelf",
    },
    "Wing Dungeon (B1F): Thwomp Tunnel": {
        "region_id": "d2 thwomp tunnel",
        "vanilla_item": "Feather",
        "dungeon": 2,
        "flag_byte": 0xc928,
        "room": 0x0628,
        "reachable": () => locations['d2 basement'](),
        "symbolic_name": "d2ThwompTunnel",
    },
    "Wing Dungeon (B1F): Basement Chest": {
        "region_id": "d2 basement chest",
        "vanilla_item": "Small Key (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc930,
        "room": 0x0430,
        "reachable": () => locations['d2 basement']() && (
            LogicPredicates.has_feather()
            && LogicPredicates.can_trigger_lever_from_minecart()
            && LogicPredicates.has_bombs()
            && LogicPredicates.can_kill_normal_enemy()
        ),
    },
    "Wing Dungeon (B1F): Basement Drop": {
        "region_id": "d2 basement drop",
        "vanilla_item": "Small Key (Wing Dungeon)",
        "dungeon": 2,
        "flag_byte": 0xc92e,
        "room": 0x042e,
        "reachable": () => locations['d2 basement']() && LogicPredicates.has_feather(),
        "symbolic_name": "d2BasementDrop",
    },
    "Wing Dungeon (1F): Boss": {
        "region_id": "d2 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 2,
        "flag_byte": 0xc92b,
        "room": 0x062b,
        "reachable": () => locations['Wing Dungeon (1F): Color Room'].reachable() && (
            LogicPredicates.has_boss_key(2)
            && (
                LogicPredicates.has_bombs()
                || LogicPredicates.option_hard_logic()
            )
        ),
        "symbolic_name": "d2Boss",
    },

    // Moonlit Grotto Locations
    "Moonlit Grotto (1F): Bridge Chest": {
        "region_id": "d3 bridge chest",
        "vanilla_item": "Rupees (20)",
        "dungeon": 3,
        "flag_byte": 0xc94e,
        "room": 0x044e,
        "reachable": () => false,
    },
    "Moonlit Grotto (1F): Mimic Room": {
        "region_id": "d3 mimic room",
        "vanilla_item": "Seed Shooter",
        "dungeon": 3,
        "flag_byte": 0xc958,
        "room": 0x0458,
        "reachable": () => false,
    },
    "Moonlit Grotto (1F): Bush Beetle Room": {
        "region_id": "d3 bush beetle room",
        "vanilla_item": "Rupees (30)",
        "dungeon": 3,
        "flag_byte": 0xc95c,
        "room": 0x045c,
        "reachable": () => false,
    },
    "Moonlit Grotto (1F): Crossroad": {
        "region_id": "d3 crossroad",
        "vanilla_item": "Gasha Seed",
        "dungeon": 3,
        "flag_byte": 0xc960,
        "room": 0x0460,
        "reachable": () => false,
    },
    "Moonlit Grotto (1F): Pols Voice Chest": {
        "region_id": "d3 pols voice chest",
        "vanilla_item": "Dungeon Map (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc965,
        "room": 0x0465,
        "reachable": () => false,
    },
    "Moonlit Grotto (1F): Armos Drop": {
        "region_id": "d3 armos drop",
        "vanilla_item": "Small Key (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc95e,
        "room": 0x045e,
        "reachable": () => false,
        "symbolic_name": "d3ArmosDrop",
    },
    "Moonlit Grotto (1F): Statue Drop": {
        "region_id": "d3 statue drop",
        "vanilla_item": "Small Key (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc961,
        "room": 0x0461,
        "reachable": () => false,
        "symbolic_name": "d3StatueDrop",
    },
    "Moonlit Grotto (1F): Six Blocs Drop": {
        "region_id": "d3 six-blocs drop",
        "vanilla_item": "Small Key (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc964,
        "room": 0x0464,
        "reachable": () => false,
        "symbolic_name": "d3SixBlocDrop",
    },
    "Moonlit Grotto (B1F): Moldorm Drop": {
        "region_id": "d3 moldorm drop",
        "vanilla_item": "Small Key (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc94b,
        "room": 0x044b,
        "reachable": () => false,
        "symbolic_name": "d3MoldormDrop",
    },
    "Moonlit Grotto (B1F): East": {
        "region_id": "d3 B1F east",
        "vanilla_item": "Boss Key (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc950,
        "room": 0x0450,
        "reachable": () => false,
    },
    "Moonlit Grotto (B1F): Torch Chest": {
        "region_id": "d3 torch chest",
        "vanilla_item": "Gasha Seed",
        "dungeon": 3,
        "flag_byte": 0xc955,
        "room": 0x0455,
        "reachable": () => false,
    },
    "Moonlit Grotto (B1F): Conveyor Belt Room": {
        "region_id": "d3 conveyor belt room",
        "vanilla_item": "Compass (Moonlit Grotto)",
        "dungeon": 3,
        "flag_byte": 0xc956,
        "room": 0x0456,
        "reachable": () => false,
    },
    "Moonlit Grotto (B1F): Boss": {
        "region_id": "d3 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 3,
        "flag_byte": 0xc94a,
        "room": 0x044a,
        "reachable": () => false,
        "symbolic_name": "d3Boss",
    },

    // Skull Dungeon Locations
    'Skull Dungeon (1F): Second Crystal Switch': {
        "region_id": "d4 second crystal switch",
        "vanilla_item": "Small Key (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc974,
        "room": 0x0474,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): Lava Pot Chest': {
        "region_id": "d4 lava pot chest",
        "vanilla_item": "Boss Key (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc97a,
        "room": 0x047a,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): Small Floor Puzzle': {
        "region_id": "d4 small floor puzzle",
        "vanilla_item": "Progressive Hook",
        "dungeon": 4,
        "flag_byte": 0xc987,
        "room": 0x0487,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): First Chest': {
        "region_id": "d4 first chest",
        "vanilla_item": "Compass (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc98b,
        "room": 0x048b,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): Minecart Chest': {
        "region_id": "d4 minecart chest",
        "vanilla_item": "Dungeon Map (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc98f,
        "room": 0x048f,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): Cube Chest': {
        "region_id": "d4 cube chest",
        "vanilla_item": "Small Key (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc990,
        "room": 0x0490,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): First Crystal Switch': {
        "region_id": "d4 first crystal switch",
        "vanilla_item": "Small Key (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc992,
        "room": 0x0492,
        "reachable": () => false,
    },
    'Skull Dungeon (1F): Color Tile Drop': {
        "region_id": "d4 color tile drop",
        "vanilla_item": "Small Key (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc97b,
        "room": 0x047b,
        "reachable": () => false,
        "symbolic_name": "d4ColorDrop",
    },
    'Skull Dungeon (B1F): Large Floor Puzzle': {
        "region_id": "d4 large floor puzzle",
        "vanilla_item": "Small Key (Skull Dungeon)",
        "dungeon": 4,
        "flag_byte": 0xc96f,
        "room": 0x046f,
        "reachable": () => false,
    },
    'Skull Dungeon (B1F): Boss': {
        "region_id": "d4 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 4,
        "flag_byte": 0xc96b,
        "room": 0x046b,
        "reachable": () => false,
        "symbolic_name": "d4Boss",
    },

    // Crown Dungeon Locations
    "Crown Dungeon (1F): Diamond Chest": {
        "region_id": "d5 diamond chest",
        "vanilla_item": "Compass (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc9ad,
        "room": 0x04ad,
        "reachable": () => false,
    },
    "Crown Dungeon (1F): Eyes Chest": {
        "region_id": "d5 eyes chest",
        "vanilla_item": "Small Key (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc9ba,
        "room": 0x04ba,
        "reachable": () => false,
    },
    "Crown Dungeon (1F): Three-Statue Puzzle": {
        "region_id": "d5 three-statue puzzle",
        "vanilla_item": "Small Key (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc9bc,
        "room": 0x04bc,
        "reachable": () => false,
    },
    "Crown Dungeon (1F): Blue Peg Chest": {
        "region_id": "d5 blue peg chest",
        "vanilla_item": "Dungeon Map (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc9be,
        "room": 0x04be,
        "reachable": () => false,
    },
    "Crown Dungeon (B1F): Like-Like Chest": {
        "region_id": "d5 like-like chest",
        "vanilla_item": "Small Key (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc99f,
        "room": 0x049f,
        "reachable": () => false,
    },
    "Crown Dungeon (B1F): Red Peg Chest": {
        "region_id": "d5 red peg chest",
        "vanilla_item": "Rupees (50)",
        "dungeon": 5,
        "flag_byte": 0xc999,
        "room": 0x0499,
        "reachable": () => false,
    },
    "Crown Dungeon (B1F): Owl Puzzle": {
        "region_id": "d5 owl puzzle",
        "vanilla_item": "Boss Key (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc99b,
        "room": 0x049b,
        "reachable": () => false,
    },
    "Crown Dungeon (B1F): Two-Statue Puzzle": {
        "region_id": "d5 two-statue puzzle",
        "vanilla_item": "Small Key (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc99e,
        "room": 0x049e,
        "reachable": () => false,
    },
    "Crown Dungeon (B1F): Dark Room": {
        "region_id": "d5 dark room",
        "vanilla_item": "Small Key (Crown Dungeon)",
        "dungeon": 5,
        "flag_byte": 0xc9a3,
        "room": 0x04a3,
        "reachable": () => false,
    },
    "Crown Dungeon (B1F): Six-Statue Puzzle": {
        "region_id": "d5 six-statue puzzle",
        "vanilla_item": "Cane of Somaria",
        "dungeon": 5,
        "flag_byte": 0xc9a5,
        "room": 0x04a5,
        "reachable": () => false,
    },
    "Crown Dungeon (1F): Boss": {
        "region_id": "d5 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 5,
        "flag_byte": 0xc9bf,
        "room": 0x04bf,
        "reachable": () => false,
        "symbolic_name": "d5Boss",
    },

    // Mermaid's Cave Locations
    "Mermaid's Cave (Present): Vire Chest": {
        "region_id": "d6 present vire chest",
        "vanilla_item": "Progressive Flippers",
        "dungeon": 6,
        "flag_byte": 0xca13,
        "room": 0x0513,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): Spinner Chest": {
        "region_id": "d6 present spinner chest",
        "vanilla_item": "Small Key (Mermaid's Cave Present)",
        "dungeon": 6,
        "flag_byte": 0xca14,
        "room": 0x0514,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): Rope Chest": {
        "region_id": "d6 present rope chest",
        "vanilla_item": "Small Key (Mermaid's Cave Present)",
        "dungeon": 6,
        "flag_byte": 0xca1b,
        "room": 0x051b,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): RNG Chest": {
        "region_id": "d6 present rng chest",
        "vanilla_item": "Boss Key (Mermaid's Cave)",
        "dungeon": 6,
        "flag_byte": 0xca1c,
        "room": 0x051c,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): Diamond Chest": {
        "region_id": "d6 present diamond chest",
        "vanilla_item": "Dungeon Map (Mermaid's Cave Present)",
        "dungeon": 6,
        "flag_byte": 0xca1d,
        "room": 0x051d,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): Beamos Chest": {
        "region_id": "d6 present beamos chest",
        "vanilla_item": "Rupees (10)",
        "dungeon": 6,
        "flag_byte": 0xca1f,
        "room": 0x051f,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): Cube Chest": {
        "region_id": "d6 present cube chest",
        "vanilla_item": "Small Key (Mermaid's Cave Present)",
        "dungeon": 6,
        "flag_byte": 0xca21,
        "room": 0x0521,
        "reachable": () => false,
    },
    "Mermaid's Cave (Present): Channel Chest": {
        "region_id": "d6 present channel chest",
        "vanilla_item": "Compass (Mermaid's Cave Present)",
        "dungeon": 6,
        "flag_byte": 0xca25,
        "room": 0x0525,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (1F): Stalfos Chest": {
        "region_id": "d6 past stalfos chest",
        "vanilla_item": "Small Key (Mermaid's Cave Past)",
        "dungeon": 9,
        "flag_byte": 0xca3c,
        "room": 0x053c,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (1F): Color Room": {
        "region_id": "d6 past color room",
        "vanilla_item": "Compass (Mermaid's Cave Past)",
        "dungeon": 9,
        "flag_byte": 0xca3f,
        "room": 0x053f,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (1F): Pool Chest": {
        "region_id": "d6 past pool chest",
        "vanilla_item": "Dungeon Map (Mermaid's Cave Past)",
        "dungeon": 9,
        "flag_byte": 0xca41,
        "room": 0x0541,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (1F): Wizzrobe": {
        "region_id": "d6 past wizzrobe",
        "vanilla_item": "Gasha Seed",
        "dungeon": 9,
        "flag_byte": 0xca45,
        "room": 0x0545,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (B1F): Diamond Chest": {
        "region_id": "d6 past diamond chest",
        "vanilla_item": "Small Key (Mermaid's Cave Past)",
        "dungeon": 9,
        "flag_byte": 0xca2c,
        "room": 0x052c,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (B1F): Spear Chest": {
        "region_id": "d6 past spear chest",
        "vanilla_item": "Rupees (30)",
        "dungeon": 9,
        "flag_byte": 0xca2e,
        "room": 0x052e,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (B1F): Rope Chest": {
        "region_id": "d6 past rope chest",
        "vanilla_item": "Small Key (Mermaid's Cave Past)",
        "dungeon": 9,
        "flag_byte": 0xca31,
        "room": 0x0531,
        "reachable": () => false,
    },
    "Mermaid's Cave (Past) (1F): Boss": {
        "region_id": "d6 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 9,
        "flag_byte": 0xca36,
        "room": 0x0536,
        "reachable": () => false,
        "symbolic_name": "d6Boss",
    },

    // Jabu-Jabu's Belly Locations
    "Jabu-Jabu's Belly (1F): Island Chest": {
        "region_id": "d7 island chest",
        "vanilla_item": "Like-Like Ring",
        "dungeon": 7,
        "flag_byte": 0xca4c,
        "room": 0x054c,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (1F): Stairway Chest": {
        "region_id": "d7 stairway chest",
        "vanilla_item": "Gasha Seed",
        "dungeon": 7,
        "flag_byte": 0xca4d,
        "room": 0x054d,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (1F): Miniboss Chest": {
        "region_id": "d7 miniboss chest",
        "vanilla_item": "Progressive Hook",
        "dungeon": 7,
        "flag_byte": 0xca4e,
        "room": 0x054e,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (1F): Cane/Diamond Puzzle": {
        "region_id": "d7 cane/diamond puzzle",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca53,
        "room": 0x0553,
        "reachable": () => false,
        "symbolic_name": "d7CaneDiamondPuzzle",
    },
    "Jabu-Jabu's Belly (1F): Boxed Chest": {
        "region_id": "d7 boxed chest",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca50,
        "room": 0x0550,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (1F): Flower Room": {
        "region_id": "d7 flower room",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca4b,
        "room": 0x054b,
        "reachable": () => false,
        "symbolic_name": "d7FlowerRoom",
    },
    "Jabu-Jabu's Belly (1F): Diamond Puzzle": {
        "region_id": "d7 diamond puzzle",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca55,
        "room": 0x0555,
        "reachable": () => false,
        "symbolic_name": "d7DiamondPuzzle",
    },
    "Jabu-Jabu's Belly (1F): Crab Chest": {
        "region_id": "d7 crab chest",
        "vanilla_item": "Compass (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca54,
        "room": 0x0554,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (2F): Left Wing": {
        "region_id": "d7 left wing",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca5f,
        "room": 0x055f,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (2F): Right Wing": {
        "region_id": "d7 right wing",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca64,
        "room": 0x0564,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (2F): Spike Chest": {
        "region_id": "d7 spike chest",
        "vanilla_item": "Dungeon Map (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca65,
        "room": 0x0565,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (3F): Hallway Chest": {
        "region_id": "d7 hallway chest",
        "vanilla_item": "Gasha Seed",
        "dungeon": 7,
        "flag_byte": 0xca6a,
        "room": 0x056a,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (3F): Post-Hallway Chest": {
        "region_id": "d7 post-hallway chest",
        "vanilla_item": "Boss Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca6c,
        "room": 0x056c,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (3F): Terrace": {
        "region_id": "d7 terrace",
        "vanilla_item": "Small Key (Jabu-Jabu's Belly)",
        "dungeon": 7,
        "flag_byte": 0xca72,
        "room": 0x0572,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly (2F): Boss": {
        "region_id": "d7 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 7,
        "flag_byte": 0xca62,
        "room": 0x0562,
        "reachable": () => false,
        "symbolic_name": "d7Boss",
    },

    // Ancient Tomb Locations
    'Ancient Tomb (1F): Single Chest': {
        "region_id": "d8 1f single chest",
        "vanilla_item": "Small Key (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xcaa7,
        "room": 0x05a7,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): Maze Chest': {
        "region_id": "d8 maze chest",
        "vanilla_item": "Small Key (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xca7b,
        "room": 0x057b,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): NW Slate Chest': {
        "region_id": "d8 nw slate chest",
        "vanilla_item": "Slate",
        "dungeon": 8,
        "flag_byte": 0xca7c,
        "room": 0x057c,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): NE Slate Chest': {
        "region_id": "d8 ne slate chest",
        "vanilla_item": "Slate",
        "dungeon": 8,
        "flag_byte": 0xca7e,
        "room": 0x057e,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): Ghini Chest': {
        "region_id": "d8 ghini chest",
        "vanilla_item": "Dungeon Map (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xca85,
        "room": 0x0585,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): SE Slate Chest': {
        "region_id": "d8 se slate chest",
        "vanilla_item": "Slate",
        "dungeon": 8,
        "flag_byte": 0xca92,
        "room": 0x0592,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): SW Slate Chest': {
        "region_id": "d8 sw slate chest",
        "vanilla_item": "Slate",
        "dungeon": 8,
        "flag_byte": 0xca94,
        "room": 0x0594,
        "reachable": () => false,
    },
    'Ancient Tomb (B1F): NW Chest': {
        "region_id": "d8 nw chest",
        "vanilla_item": "Small Key (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xca97,
        "room": 0x0597,
        "reachable": () => false,
    },
    'Ancient Tomb (B1F): Sarcophagus Chest': {
        "region_id": "d8 sarcophagus chest",
        "vanilla_item": "Gasha Seed",
        "dungeon": 8,
        "flag_byte": 0xca9f,
        "room": 0x059f,
        "reachable": () => false,
    },
    'Ancient Tomb (B1F): Blade Trap': {
        "region_id": "d8 blade trap",
        "vanilla_item": "Small Key (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xcaa3,
        "room": 0x05a3,
        "reachable": () => false,
    },
    'Ancient Tomb (B1F): Blue Peg Chest': {
        "region_id": "d8 blue peg chest",
        "vanilla_item": "Compass (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xcaa4,
        "room": 0x05a4,
        "reachable": () => false,
    },
    'Ancient Tomb (B1F): Floor Puzzle': {
        "region_id": "d8 floor puzzle",
        "vanilla_item": "Progressive Bracelet",
        "dungeon": 8,
        "flag_byte": 0xcaa6,
        "room": 0x05a6,
        "reachable": () => false,
    },
    'Ancient Tomb (B2F): Tile Room': {
        "region_id": "d8 tile room",
        "vanilla_item": "Gasha Seed",
        "dungeon": 8,
        "flag_byte": 0xca91,
        "room": 0x0591,
        "reachable": () => false,
    },
    'Ancient Tomb (B1F): Stalfos': {
        "region_id": "d8 stalfos",
        "vanilla_item": "Small Key (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xca98,
        "room": 0x0598,
        "reachable": () => false,
        "symbolic_name": "d8Stalfos",
    },
    'Ancient Tomb (B3F): Single Chest': {
        "region_id": "d8 b3f single chest",
        "vanilla_item": "Boss Key (Ancient Tomb)",
        "dungeon": 8,
        "flag_byte": 0xca79,
        "room": 0x0579,
        "reachable": () => false,
    },
    'Ancient Tomb (B3F): Boss': {
        "region_id": "d8 boss",
        "vanilla_item": "Heart Container",
        "dungeon": 8,
        "flag_byte": 0xca78,
        "room": 0x0578,
        "reachable": () => false,
        "symbolic_name": "d8Boss",
    },

    // Dungeon Essences
    "Spirit's Grave: Essence": {
        "region_id": "d1 boss",
        "flag_byte": 0xc911,
        "vanilla_item": "Eternal Spirit",
        "randomized": false,
        "reachable": () => false,
    },
    "Wing Dungeon: Essence": {
        "region_id": "d2 boss",
        "flag_byte": 0xc938,
        "vanilla_item": "Ancient Wood",
        "randomized": false,
        "reachable": () => false,
    },
    "Moonlit Grotto: Essence": {
        "region_id": "d3 boss",
        "flag_byte": 0xc949,
        "vanilla_item": "Echoing Howl",
        "randomized": false,
        "reachable": () => false,
    },
    "Skull Dungeon: Essence": {
        "region_id": "d4 boss",
        "flag_byte": 0xc969,
        "vanilla_item": "Burning Flame",
        "randomized": false,
        "reachable": () => false,
    },
    "Crown Dungeon: Essence": {
        "region_id": "d5 boss",
        "flag_byte": 0xc9b8,
        "vanilla_item": "Sacred Soil",
        "randomized": false,
        "reachable": () => false,
    },
    "Mermaid's Cave: Essence": {
        "region_id": "d6 boss",
        "flag_byte": 0xca37,
        "vanilla_item": "Lonely Peak",
        "randomized": false,
        "reachable": () => false,
    },
    "Jabu-Jabu's Belly: Essence": {
        "region_id": "d7 boss",
        "flag_byte": 0xca61,
        "vanilla_item": "Rolling Sea",
        "randomized": false,
        "reachable": () => false,
    },
    "Ancient Tomb: Essence": {
        "region_id": "d8 boss",
        "flag_byte": 0xca77,
        "vanilla_item": "Falling Star",
        "randomized": false,
        "reachable": () => false,
    },

    // Seed Tree Locations
    "Lynna City: Seed Tree": {
        "region_id": "south lynna tree",
        "local": true,
        "flag_byte": [0xc778, 0xc878],
        "room": [0x0078, 0x0178],
        "reachable": () => locations['lynna city']() && LogicPredicates.can_harvest_tree(!currentMap.endsWith("past")),
        "symbolic_name": "lynnaTree",
    },
    "Ambi's Palace: Seed Tree": {
        "region_id": "ambi's palace tree",
        "local": true,
        "flag_byte": 0xc825,
        "room": 0x0125,
        "reachable": () => locations['lynna village']() && LogicPredicates.can_harvest_tree(false),
        "symbolic_name": "palaceTree",
    },
    "Deku Forest: Seed Tree": {
        "region_id": "deku forest tree",
        "local": true,
        "flag_byte": 0xc880,
        "room": 0x0180,
        "reachable": () => locations['deku forest']() && ([
            LogicPredicates.can_harvest_tree(false),
            ([
                LogicPredicates.can_jump_1_wide_pit(false),
                LogicPredicates.has_switch_hook(),
                LogicPredicates.can_use_ember_seeds(false),
                LogicPredicates.can_warp_using_gale_seeds(),
                LogicPredicates.can_switch_past_and_present(),
            ]).some(Boolean)
        ]).every(Boolean),
        "symbolic_name": "forestTree",
    },
    "Crescent Island: Seed Tree": {
        "region_id": "crescent island tree",
        "local": true,
        "flag_byte": 0xc7ac,
        "room": 0x00ac,
        "reachable": () => locations['crescent past west']() && (
            (
                LogicPredicates.has_bracelet()
                || LogicPredicates.can_switch_past_and_present()
            )
            && gameLogic.hasItem("Scent Seedling")
            && LogicPredicates.can_harvest_tree(false)
            && (
                LogicPredicates.can_open_portal()
                || (
                    // Can get the warp point by swimming under crescent island, but that's pretty unintuitive, so it's hard logic only. (medium maybe ?)
                    LogicPredicates.option_hard_logic()
                    && LogicPredicates.can_dive()
                    && LogicPredicates.can_wrap_using_gale_seeds()
                )
            )
        ),
        "symbolic_name": "crescentTree",
    },
    "Symmetry City: Seed Tree": {
        "region_id": "symmetry city tree",
        "local": true,
        "flag_byte": 0xc713,
        "room": 0x0013,
        "reachable": () => locations['symmetry present'] && LogicPredicates.can_harvest_tree(false),
        "symbolic_name": "symmetryTree",
    },
    "Rolling Ridge West: Seed Tree": {
        "region_id": "ridge west tree",
        "local": true,
        "flag_byte": 0xc808,
        "room": 0x0108,
        "reachable": () => LogicPredicates.can_harvest_tree(false) && locations['ridge west past'](),
        "symbolic_name": "ridgeWestTree",
    },
    "Rolling Ridge East: Seed Tree": {
        "region_id": "ridge east tree",
        "local": true,
        "flag_byte": 0xc82d,
        "room": 0x012d,
        "reachable": () => LogicPredicates.can_harvest_tree(false) && (
            ([
                LogicPredicates.can_warp_using_gale_seeds(),
                locations['ridge mid past']()
            ]).every(Boolean) || locations['goron shooting gallery']()
        ),
        "symbolic_name": "ridgeEastTree",
    },
    "Zora Village: Seed Tree": {
        "region_id": "zora village tree",
        "local": true,
        "flag_byte": [0xc7c1, 0xc8c1],
        "room": [0x00c1, 0x01c1],
        "reachable": () => locations['zora village']() && LogicPredicates.canHarvestTree(false),
        "symbolic_name": "zoraTree",
    },

    // LOCATIONS LEADING TO NO ITEMS!

    // Starting Area
    "forest of time": () => true,
    "lynna city": () => locations['forest of time']() && LogicPredicates.can_break_bush(),
    "lynna village": () => locations['lynna city']() || (
        locations['forest of time']() && LogicPredicates.can_open_portal()
    ),

    // South Shore
    "rafton's raft": () => locations['lynna village']() && (
        gameLogic.hasItem("Cheval Rope")
        && gameLogic.hasItem("Island Chart")
    ),
    "shore present": () => (
        locations['forest of time']() && gameLogic.hasItem("Ricky's Gloves")
    ) || (
            locations['lynna city']() && ([
                LogicPredicates.can_swim_deepwater(true),
                LogicPredicates.has_bracelet(),
                LogicPredicates.can_go_back_to_present(),
                ([
                    LogicPredicates.can_break_bush(true),
                    LogicPredicates.can_jump_1_wide_pit(true)
                ]).every(Boolean)
            ]).some(Boolean)
        ),

    // Yoll Graveyard
    "yoll graveyard": () => locations['forest of time']() && LogicPredicates.can_use_ember_seeds(false),
    "cheval's grave": () => locations['yoll graveyard']() && ([
        LogicPredicates.can_kill_normal_enemy(true),
        LogicPredicates.can_jump_3_wide_pit(true)
    ]).some(Boolean),
    "graveyard door": () => locations['yoll graveyard']() && gameLogic.hasItem("Graveyard Key"),
    "syrup shop": () => locations['graveyard door']() && ([
        ([
            LogicPredicates.can_jump_2_wide_liquid(),
            LogicPredicates.can_swim(true),
            LogicPredicates.has_long_hook()
        ]).some(Boolean),
        LogicPredicates.has_rupees(400)
    ]).every(Boolean),

    // Forest
    "fairies' woods": () => locations['lynna city']() && ([
        LogicPredicates.can_swim(true),
        LogicPredicates.has_bracelet(),
        LogicPredicates.can_switch_past_and_present(),
        ([ // it's possible to switch hook the octorok through the boulder to enter fairies' woods. 
            LogicPredicates.option_hard_logic(),
            LogicPredicates.has_switch_hook()
        ]).every(Boolean)
    ]).some(Boolean),
    "deku forest": () => locations['lynna village']() && ([
        LogicPredicates.has_bracelet(),
        LogicPredicates.can_switch_past_and_present(),
    ]).some(Boolean),

    // Crescent Island
    "crescent past west": () => (
        locations['lynna village']() && LogicPredicates.can_swim_deepwater(false)
    ) || locations["rafton's raft"]() || (
            LogicPredicates.can_go_back_to_present() && locations['crescent present west']()
        ),
    "crescent present west": () => (
        locations['lynna city']() && LogicPredicates.can_swim_deepwater(true)
    ) || (
            ([
                LogicPredicates.can_go_back_to_present(),
                ([
                    LogicPredicates.has_shovel(),
                    LogicPredicates.can_open_portal()
                ]).every(Boolean)
            ]).some(Boolean) && locations["crescent past west"]()
        ),
    "crescent past east": () => (
        LogicPredicates.can_break_bush() && locations['crescent past west']()
    ) || (
            LogicPredicates.can_go_back_to_present() && locations['crescent present west']()
        ),
    "crescent present east": () => (
        LogicPredicates.can_open_portal() && locations['crescent past east']()
    ) || (
            LogicPredicates.can_go_back_to_present() && locations['crescent past west']()
        ),

    // Nuun Highlands
    "nuun": () => (
        locations['lynna village']() && LogicPredicates.can_go_back_to_present()
    ) || (
            locations["fairies' woods"]() && ([
                LogicPredicates.can_use_ember_seeds(false),
                LogicPredicates.has_seedshooter(),
            ]).every(Boolean)
        ),
    "nuun highlands cave": {
        hidden: true,
        ricky: () => ([
            LogicPredicates.can_summon_ricky(),
            LogicPredicates.can_go_back_to_present(),
        ]).some(Boolean),
        dimitri: () => LogicPredicates.can_summon_dimitri(),
        moosh: () => ([
            LogicPredicates.can_summon_moosh(),
            LogicPredicates.can_go_back_to_present(),
            ([
                LogicPredicates.can_break_bush(),
                LogicPredicates.can_jump_3_wide_pit(false),
            ]).every(Boolean)
        ]).some(Boolean)
    },

    // Symmetry City
    "symmetry present": () => locations['nuun']() && ([
        LogicPredicates.can_go_back_to_present(),
        LogicPredicates.has_flute(),
        ([
            LogicPredicates.is_companion_moosh(),
            LogicPredicates.can_break_bush(),
            LogicPredicates.can_jump_3_wide_pit(false),
            LogicPredicates.option_hard_logic(),
        ]).every(Boolean)
    ]).some(Boolean),
    "symmetry past": () => locations['symmetry present']() && ([
        LogicPredicates.can_switch_past_and_present(),
        ([
            LogicPredicates.can_open_portal(),
            LogicPredicates.can_break_bush(false)
        ]).every(Boolean)
    ]).some(Boolean),
    "talus peaks": () => locations['symmetry past']() && ([
        LogicPredicates.can_go_back_to_present(),
        LogicPredicates.has_bracelet()
    ]).every(Boolean),
    "restoration wall": () => (
        locations['talus peaks']() && ([
            LogicPredicates.can_swim(false),
            LogicPredicates.can_jump_3_wide_liquid()
        ]).some(Boolean)
    ) || (
            locations["fairies' woods"]() && LogicPredicates.can_switch_past_and_present()
        ),
    "patch": () => locations['restoration wall']() && ([
        LogicPredicates.has_sword(),
        ([
            LogicPredicates.option_medium_logic(),
            ([
                LogicPredicates.has_shield(),
                LogicPredicates.has_boomerang(),
                LogicPredicates.has_switch_hook(),
            ]).some(Boolean)
        ]).every(Boolean),
        ([
            LogicPredicates.option_hard_logic(),
            ([
                LogicPredicates.has_scent_seeds(),
                LogicPredicates.has_shovel(),
            ]).some(Boolean)
        ]).every(Boolean)
    ]).some(Boolean),

    /* Rolling Ridge (I worry that this might be an area where most infinite looping in the code may occur. If that's the case, please report that to me on the issues panel of the source code on 
    GitHub: https://github.com/josephanimate2021/oracle-of-ages-web-tracker/issues). Please also send me a screenshot of your error with DevTools open so that I can better visualize on what's going on. 
    To open DevTools, press F12 (or Fn + F12) on your keyboard and then head to the Console Tab. This should be an area where most errors will be reported. 
    Some errors may even take you to the Sources Tab where the code causing the error can be highlighted in red. Send me a screenshot of that part of the code as well If you can so that I can 
    really look into your error better. */
    "ridge west past base": () => (
        locations['lynna village']() && ([
            ([
                LogicPredicates.can_switch_past_and_present(),
                LogicPredicates.can_jump_1_wide_pit(false),
            ]).some(Boolean),
            ([
                LogicPredicates.can_jump_4_wide_pit(false),
                LogicPredicates.has_switch_hook(),
            ]).some(Boolean),
        ]).every(Boolean)
    ) || locations["ridge west past"](),
    "ridge west past": () => (
        ([
            LogicPredicates.can_open_portal(),
            LogicPredicates.has_bracelet()
        ]).every(Boolean) && locations['ridge west present']()
    ) || locations['Rolling Ridge Base (Past): Goron Elder'].reachable(),
    "ridge west present": () => (
        LogicPredicates.can_go_back_to_present() && locations['ridge west past']()
    ) || locations['ridge upper present'](),
    "ridge upper present": () => (
        LogicPredicates.can_jump_2_wide_pit(false) && locations['Rolling Ridge (Present): Defeat Great Moblin'].reachable()
    ) || (
            LogicPredicates.can_go_back_to_present() && locations['ridge upper past']()
        ) || (
            LogicPredicates.can_jump_3_wide_pit(false) && locations['ridge base present']()
        ),
    "ridge upper past": () => (
        LogicPredicates.has_switch_hook() && locations['ridge base past west']()
    ) || (
            LogicPredicates.can_switch_past_and_present() && locations['ridge upper present']()
        ),
    "ridge base present": () => (
        LogicPredicates.can_go_back_to_present() && (
            locations['ridge base past west']() || locations['ridge base past east']()
        )
    ) || locations['ridge upper present'](),
    "ridge base past east": () => LogicPredicates.can_swim(false) && locations['ridge base past west'](),
    "ridge base past west": () => (
        locations['lynna village']() && ([
            LogicPredicates.can_swim_deepwater(false),
            ([
                LogicPredicates.can_jump_1_wide_pit(false),
                LogicPredicates.can_switch_past_and_present()
            ]).some(Boolean)
        ]).every(Boolean)
    ) || (
        ([
            LogicPredicates.can_switch_past_and_present(),
            ([
                LogicPredicates.can_open_portal(),
                LogicPredicates.can_break_bush()
            ]).every(Boolean)
        ]).some(Boolean) && locations['ridge base present']()
    ),
    /* The rolling mid part I think should be better, I was mainly worried about most of the ridge west/base/upper locations 
    since there are mutiple ways to enter them and javascript might not like that (Main I wish I was an expert at Python :( ).
    */
    "ridge mid present": () => (
        ([
            gameLogic.hasItem("Brother Emblem"),
            ([
                LogicPredicates.has_switch_hook(),
                LogicPredicates.can_jump_3_wide_pit(false),
            ]).some(Boolean)
        ]).every(Boolean) && locations['ridge base present']()
    ) || (
        LogicPredicates.can_go_back_to_present() && locations['ridge mid past']()
    ),
    "ridge mid past": () => (
        LogicPredicates.can_switch_past_and_present() && locations['ridge mid present']()
    ) || (
        ([
            gameLogic.hasItem("Brother Emblem"),
            LogicPredicates.can_jump_2_wide_pit(false),
        ]).every(Boolean) && locations['ridge base past east']
    ),
    "target carts": () => (
        LogicPredicates.has_switch_hook() && locations['ridge mid present']()
    ) || (
        LogicPredicates.can_go_back_to_present() && locations['goron shooting gallery']()
    ),
    "goron shooting gallery": () => (
        ([
            LogicPredicates.can_open_portal(),
            LogicPredicates.has_bracelet(),
        ]).every(Boolean) && locations['target carts']()
    ) || (
        LogicPredicates.can_switch_past_and_present() && locations['ridge mid present']()
    ),

    // Zora Village
    "zora village": () => locations['lynna city']() && ([
        LogicPredicates.can_dive(),
        LogicPredicates.has_switch_hook(),
        LogicPredicates.can_switch_past_and_present(),
    ]).every(Boolean),
    "library present": () => locations['zora village']() && gameLogic.hasItem("Library Key"),
    "library past": () => locations['library present']() && gameLogic.hasItem("Book of Seals"),

    // Spirit's Grave
    "d1 U-room": () => (
        locations["Spirit's Grave: Wide Room"].reachable() && ([
            LogicPredicates.can_break_bush(),
            LogicPredicates.generic_boss_and_miniboss_kill(),
            LogicPredicates.has_small_keys(1, 3)
        ]).every(Boolean)
    ) || locations["Spirit's Grave: West Terrace"].reachable(),

    // Wing Dungeon
    "d2 miniboss arena": () => gameLogic.dungeonReachable("Wing Dungeon") && ([
        ([
            LogicPredicates.has_small_keys(2, 2),
            LogicPredicates.can_kill_normal_enemy(true, true)
        ]).every(Boolean),
        ([
            LogicPredicates.can_jump_2_wide_pit(false),
            LogicPredicates.can_kill_spiked_beetle()
        ]).every(Boolean)
    ]).some(Boolean),
    "d2 basement": () => locations['d2 miniboss arena']() && LogicPredicates.generic_boss_and_miniboss_kill()
}