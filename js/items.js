const items = {
    //   "No Item": {
    //   'classification': "filler",
    //   "",
    //    'id': 0x00,
    //    'subid': 0x00
    //    },

    // Normal Progrssion Items
    "Progressive Shield": {
        'classification': "progression",
        'id': 0x01,
        'imageName': 'shield',
        'limit': 2
    },
    "Bombs (10)": {
        'classification': "progression",
        'id': 0x03,
        'imageName': 'bomb',
        'limit': 9,
        'defaultCount': 0
    },
    "Progressive Sword": {
        'classification': "progression",
        'id': 0x05,
        'imageName': 'sword',
        'limit': 2
    },
    "Boomerang": {
        'classification': "progression",
        'id': 0x06,
        'imageName': 'boomerang',
        'limit': 1
    },
    "Progressive Harp": {
        'classification': "progression",
        'id': 0x25,
        'subid': 0x00,
        'imageName': 'harp',
        'limit': 2,
        'defaultCount': 0                                                                                                           
    },
    "Progressive Hook": {
        'classification': "progression",
        'id': 0x0a,
        'imageName': 'switchhook',
        'limit': 2
    },
    "Cane of Somaria": {
        'classification': "progression",
        'id': 0x04,
        'imageName': 'somaria'
    },
    "Biggoron's Sword": {
        'classification': "progression",
        'id': 0x0c,
        'imageName': 'goron sword'
    },
    "Bombchus (10)": {
        'classification': "progression",
        'id': 0x0d,
        'imageName': 'Bombchu',
        'limit': 9,
        'dontChangeImage': true
    },
    "Ricky's Flute": {
        'classification': "animal_companion_flute",
        'imageName': "Ricky's Flute",
        'id': 0x0e,
        'subid': 0x00,
        'unclickable': true
    },
    "Dimitri's Flute": {
        'classification': "animal_companion_flute",
        'imageName': "Dimitri's Flute",
        'id': 0x0e,
        'subid': 0x01,
        'unclickable': true
    },
    "Moosh's Flute": {
        'classification': "animal_companion_flute",
        'imageName': "Moosh's Flute",
        'id': 0x0e,
        'subid': 0x02,
        'unclickable': true
    },
    "Strange Flute": {
        'classification': "progression",
        'limit': 3,
        'onChange': ($this) => {
            const flutes = ['flute', "Moosh's Flute (Icon)", "Ricky's Flute (Icon)", "Dimitri's Flute (Icon)"];
            $this.imageName = flutes[($this.count >= 1 ? $this.count - 1 : 0) || 0]
            for (const flute of flutes) {
                if (flute.endsWith("(Icon)")) {
                    items[flute.slice(0, -7)].count = flute == $this.imageName ? 1 : 0
                }
            }
        },
        'dontChangeImage': true
    },
    "Seed Shooter": {
        'classification': "progression",
        'imageName': 'shooter',
        'id': 0x0f,
    },
    "Shovel": {
        'classification': "progression",
        'id': 0x15,
        'imageName': 'shovel'
    },
    "Progressive Bracelet": {
        'classification': "progression",
        'id': 0x16,
        'imageName': 'bracelet',
        'limit': 1
    },
    "Feather": {
        'classification': "progression",
        'id': 0x17,
        'imageName': 'feather',
        'limit': 1
    },
    "Seed Satchel": {
        'classification': "progression",
        'id': 0x19,
        'imageName': 'satchel',
        'limit': 2,
        'defaultCount': 0
    },
    "Ember Seeds": {
        'classification': "progression",
        'id': 0x20,
        'scaleViaHeight': 20,
        'position': {
            top: '28px',
            left: '0px'
        },
        'imageName': 'seedember'
    },
    "Scent Seeds": {
        'classification': "progression",
        'id': 0x21,
        'scaleViaHeight': 20,
        'position': {
            top: '28px',
            left: '40px'
        },
        'imageName': 'seedscent'
    },
    "Pegasus Seeds": {
        'classification': "progression",
        'id': 0x22,
        'scaleViaHeight': 20,
        'position': {
            top: '28px',
            left: '80px'
        },
        'imageName': 'seedpegasus'
    },
    "Gale Seeds": {
        'classification': "progression",
        'id': 0x23,
        'scaleViaHeight': 20,
        'position': {
            top: '28px',
            left: '120px'
        },
        'imageName': 'seedgale'
    },
    "Mystery Seeds": {
        'classification': "progression",
        'id': 0x24,
        'scaleViaHeight': 20,
        'position': {
            top: '28px',
            left: '160px'
        },
        'imageName': 'seedmystery'
    },
    "Rupees": {
        'classification': "progression",
        'imageName': 'Rupee (Giant Red)',
        'unlimited': true,
        'unclickable': true,
        'displayCount': true,
    },
    "Rupees (1)": {
        'classification': "filler",
        'imageName': 'Rupee (Green)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x00,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count++
            }
        }
    },
    "Rupees (5)": {
        'classification': "filler",
        'imageName': 'Rupee (Blue)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x01,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 5
            }
        }
    },
    "Rupees (10)": {
        'classification': "filler",
        'imageName': 'Rupee (Small Red)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x02,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 10
            }
        }
    },
    "Rupees (20)": {
        'classification': "progression_skip_balancing",
        'imageName': 'Rupee (Red)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x03,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 20
            }
        }
    },
    "Rupees (30)": {
        'classification': "progression_skip_balancing",
        'imageName': 'Rupee (Dungeon 1)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x04,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 30
            }
        }
    },
    "Rupees (50)": {
        'classification': "progression_skip_balancing",
        'imageName': 'Rupee (Dungeon 2)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x05,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 50
            }
        }
    },
    "Rupees (100)": {
        'classification': "progression_skip_balancing",
        'imageName': 'Rupee (Giant Blue)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x06,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 100
            }
        }
    },
    "Rupees (200)": {
        'classification': "progression_skip_balancing",
        'imageName': 'Rupee (Giant Red)',
        'unlimited': true,
        'id': 0x28,
        'subid': 0x08,
        'onChange': ($this) => {
            if ($this.count) {
                items.Rupees.count ||= 0;
                items.Rupees.count += 200
            }
        }
    },
    "Heart Container": {
        'classification': "useful",
        'imageName': 'Heart Container',
        'id': 0x2a
    },
    "Piece of Heart": {
        'classification': "useful",
        'imageName': 'Heart Piece',
        'limit': 2,
        'dontChangeImage': true,
        'displayCount': true,
        'id': 0x2b,
        'subid': 0x01
    },
    "Progressive Flippers": {
        'classification': "progression",
        'id': 0x2e,
        'imageName': 'flippers',
        'limit': 1
    },
    "Potion": {
        'classification': "useful",
        'imageName': 'potion',
        'unlimited': true,
        'id': 0x2f
    },
    "King Zora's Potion": {
        'classification': "progression",
        'invisible': true,
        'id': 0x37
    },

    // Small Keys
    "Small Key (Maku Path)": {
        'classification': "d0",
        'id': 0x30,
        'subid': 0x00,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Spirit's Grave)": {
        'classification': "d1",
        'id': 0x30,
        'subid': 0x01,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Wing Dungeon)": {
        'classification': "d2",
        'id': 0x30,
        'subid': 0x02,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Moonlit Grotto)": {
        'classification': "d3",
        'id': 0x30,
        'subid': 0x03,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Skull Dungeon)": {
        'classification': "d4",
        'id': 0x30,
        'subid': 0x04,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Crown Dungeon)": {
        'classification': "d5",
        'id': 0x30,
        'subid': 0x05,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Mermaid's Cave Past)": {
        'classification': "d6",
        'invisible': true,
        'id': 0x30,
        'subid': 0x0C
    },
    "Small Key (Mermaid's Cave Present)": {
        'classification': "d6",
        'invisible': true,
        'id': 0x30,
        'subid': 0x06
    },
    "Small Key (Mermaid's Cave)": {
        'classification': "d6",
        'id': 0x30,
        'subid': 0x06,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Jabu-Jabu's Belly)": {
        'classification': "d7",
        'id': 0x30,
        'subid': 0x07,
        'imageName': 'smallkey',
        'displayCount': true
    },
    "Small Key (Ancient Tomb)": {
        'classification': "d8",
        'id': 0x30,
        'subid': 0x08,
        'imageName': 'smallkey',
        'displayCount': true
    },

    // Master Keys
    "Master Key (Maku Path)": {
        'classification': "d0",
        'id': 0x30,
        'subid': 0x00,
        'imageName': 'master_key'
    },
    "Master Key (Spirit's Grave)": {
        'classification': "d1",
        'id': 0x30,
        'subid': 0x01,
        'imageName': 'master_key'
    },
    "Master Key (Wing Dungeon)": {
        'classification': "d2",
        'id': 0x30,
        'subid': 0x02,
        'imageName': 'master_key'
    },
    "Master Key (Moonlit Grotto)": {
        'classification': "d3",
        'id': 0x30,
        'subid': 0x03,
        'imageName': 'master_key'
    },
    "Master Key (Skull Dungeon)": {
        'classification': "d4",
        'id': 0x30,
        'subid': 0x04,
        'imageName': 'master_key'
    },
    "Master Key (Crown Dungeon)": {
        'classification': "d5",
        'id': 0x30,
        'subid': 0x05,
        'imageName': 'master_key'
    },
    "Master Key (Mermaid's Cave Past)": {
        'classification': "d6",
        'invisible': true,
        'id': 0x30,
        'subid': 0x0C
    },
    "Master Key (Mermaid's Cave Present)": {
        'classification': "d6",
        'invisible': true,
        'id': 0x30,
        'subid': 0x06
    },
    "Master Key (Mermaid's Cave)": {
        'classification': "d6",
        'imageName': 'master_key'
    },
    "Master Key (Jabu-Jabu's Belly)": {
        'classification': "d7",
        'id': 0x30,
        'subid': 0x07,
        'imageName': 'master_key'
    },
    "Master Key (Ancient Tomb)": {
        'classification': "d8",
        'id': 0x30,
        'subid': 0x08,
        'imageName': 'master_key'
    },

    // Boss Keys
    "Boss Key (Spirit's Grave)": {
        'classification': "d1",
        'id': 0x31,
        'subid': 0x01,
        'imageName': 'bosskey'
    },
    "Boss Key (Wing Dungeon)": {
        'classification': "d2",
        'id': 0x31,
        'subid': 0x02,
        'imageName': 'bosskey'
    },
    "Boss Key (Moonlit Grotto)": {
        'classification': "d3",
        'id': 0x31,
        'subid': 0x03,
        'imageName': 'bosskey'
    },
    "Boss Key (Skull Dungeon)": {
        'classification': "d4",
        'id': 0x31,
        'subid': 0x04,
        'imageName': 'bosskey'
    },
    "Boss Key (Crown Dungeon)": {
        'classification': "d5",
        'id': 0x31,
        'subid': 0x05,
        'imageName': 'bosskey'
    },
    "Boss Key (Mermaid's Cave)": {
        'classification': "d6",
        'id': 0x31,
        'subid': 0x06,
        'imageName': 'bosskey'
    },
    "Boss Key (Jabu-Jabu's Belly)": {
        'classification': "d7",
        'id': 0x31,
        'subid': 0x07,
        'imageName': 'bosskey'
    },
    "Boss Key (Ancient Tomb)": {
        'classification': "d8",
        'id': 0x31,
        'subid': 0x08,
        'imageName': 'bosskey'
    },

    // Compasses
    "Compass (Spirit's Grave)": {
        'classification': "d1",
        'id': 0x32,
        'subid': 0x01,
        'imageName': 'Compass'
    },
    "Compass (Wing Dungeon)": {
        'classification': "d2",
        'id': 0x32,
        'subid': 0x02,
        'imageName': 'Compass'
    },
    "Compass (Moonlit Grotto)": {
        'classification': "d3",
        'id': 0x32,
        'subid': 0x03,
        'imageName': 'Compass'
    },
    "Compass (Skull Dungeon)": {
        'classification': "d4",
        'id': 0x32,
        'subid': 0x04,
        'imageName': 'Compass'
    },
    "Compass (Crown Dungeon)": {
        'classification': "d5",
        'id': 0x32,
        'subid': 0x05,
        'imageName': 'Compass'
    },
    "Compass (Mermaid's Cave Past)": {
        'classification': "d6",
        'invisible': true,
        'id': 0x32,
        'subid': 0x0C
    },
    "Compass (Mermaid's Cave)": {
        'classification': "d6",
        'imageName': 'Compass'
    },
    "Compass (Mermaid's Cave Present)": {
        'classification': "d6",
        'invisible': true,
        'id': 0x32,
        'subid': 0x06
    },
    "Compass (Jabu-Jabu's Belly)": {
        'classification': "d7",
        'id': 0x32,
        'subid': 0x07,
        'imageName': 'Compass'
    },
    "Compass (Ancient Tomb)": {
        'classification': "d8",
        'id': 0x32,
        'subid': 0x08,
        'imageName': 'Compass'
    },

    // Dungeon Maps
    "Dungeon Map (Spirit's Grave)": {
        'classification': "d1",
        'id': 0x33,
        'subid': 0x01,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Wing Dungeon)": {
        'classification': "d2",
        'id': 0x33,
        'subid': 0x02,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Moonlit Grotto)": {
        'classification': "d3",
        'id': 0x33,
        'subid': 0x03,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Skull Dungeon)": {
        'classification': "d4",
        'id': 0x33,
        'subid': 0x04,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Crown Dungeon)": {
        'classification': "d5",
        'id': 0x33,
        'subid': 0x05,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Mermaid's Cave Past)": {
        'classification': "d6",
        'id': 0x33,
        'subid': 0x0C,
        'invisible': true,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Mermaid's Cave Present)": {
        'classification': "d6",
        'id': 0x33,
        'subid': 0x06,
        'invisible': true,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Mermaid's Cave)": {
        'classification': "d6",
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Jabu-Jabu's Belly)": {
        'classification': "d7",
        'id': 0x33,
        'subid': 0x07,
        'imageName': 'Dungeon Map'
    },
    "Dungeon Map (Ancient Tomb)": {
        'classification': "d8",
        'id': 0x33,
        'subid': 0x08,
        'imageName': 'Dungeon Map'
    },

    // Seeds
    "Gasha Seed": {
        'classification': "filler",
        'imageName': 'Gasha Seed',
        'dontChangeImage': true,
        'limit': 13,
        'displayCount': true,
        'id': 0x34,
        'subid': 0x01
    },
    "Maku Seed": {
        'classification': "progression",
        'imageName': 'makuseed',
        'id': 0x36
    },

    // Trade Sequence Items
    "Poe Clock": {
        'classification': "trade",
        'imageName': 'Poe Clock',
        'id': 0x3d
    },
    "Stationery": {
        'classification': "trade",
        'imageName': 'Stationery',
        'id': 0x3e
    },
    "Stink Bag": {
        'classification': "trade",
        'imageName': 'Stink Bag',
        'id': 0x3f
    },
    "Tasty Meat": {
        'classification': "trade",
        'imageName': 'Tasty Meat',
        'id': 0x47
    },
    "Doggie Mask": {
        'classification': "trade",
        'imageName': 'Doggie Mask',
        'id': 0x56
    },
    "Dumbbell": {
        'classification': "trade",
        'imageName': 'Dumbbell',
        'id': 0x57
    },
    "Cheesy Mustache": {
        'classification': "trade",
        'imageName': 'Cheesy Mustache',
        'improveImageVisibility': true,
        'id': 0x5f
    },
    "Funny Joke": {
        'classification': "trade",
        'imageName': 'Funny Joke',
        'id': 0x3c
    },
    "Touching Book": {
        'classification': "trade",
        'imageName': 'Touching Book',
        'id': 0x35
    },
    "Magic Oar": {
        'classification': "trade",
        'imageName': 'Magic Oar',
        'id': 0x38
    },
    "Sea Ukulele": {
        'classification': "trade",
        'imageName': 'Sea Ukelele',
        'id': 0x39
    },
    "Broken Sword": {
        'classification': "trade",
        'imageName': "Broken Sword",
        'id': 0x3a
    },

    // Items you get after completeing some puzzles, trades, or gives you access to dungeons
    "Bomb Flower": {
        'classification': "progression",
        'imageName': 'bombflower',
        'id': 0x49
    },
    "Book of Seals": {
        'classification': "progression",
        'imageName': 'book',
        'id': 0x55
    },
    "Brother Emblem": {
        'classification': "progression",
        'imageName': 'emblem',
        'id': 0x5b
    },
    "Cheval Rope": {
        'classification': "progression",
        'imageName': 'cheval',
        'id': 0x52
    },
    "Crown Key": {
        'classification': "progression",
        'imageName': 'keycrown',
        'id': 0x43
    },
    "Fairy Powder": {
        'classification': "progression",
        'invisible': true,
        'id': 0x51
    },
    "Fairy Powder & King Zora's Potion": {
        'classification': "progression",
        'imageName': 'powderpotion',
        'limit': 2,
        'noDisable': true,
        'defaultCount': 0
    },
    "Goron Vase": {
        'classification': "progression",
        'imageName': 'vase',
        'id': 0x5c
    },
    "Goronade": {
        'classification': "progression",
        'imageName': 'goronade',
        'id': 0x5d
    },
    "Graveyard Key": {
        'classification': "progression",
        'imageName': 'keygraveyard',
        'id': 0x42,
    },
    "Island Chart": {
        'classification': "progression",
        'imageName': 'chart',
        'id': 0x54
    },
    "Lava Juice": {
        'classification': "progression",
        'imageName': 'lavajuice',
        'id': 0x5a
    },
    "Letter of Introduction": {
        'classification': "progression",
        'imageName': 'letter',
        'id': 0x59
    },
    "Library Key": {
        'classification': "progression",
        'imageName': 'keylibrary',
        'id': 0x46
    },
    "Mermaid Key": {
        'classification': "progression",
        'imageName': 'keymermaid',
        'id': 0x44
    },
    "Old Mermaid Key": {
        'classification': "progression",
        'imageName': 'keymermaid_old',
        'id': 0x45
    },
    "Ricky's Gloves": {
        'classification': "progression",
        'imageName': 'gloves',
        'id': 0x48
    },
    "Rock Brisket": {
        'classification': "progression",
        'imageName': 'brisket',
        'id': 0x5e
    },
    "Scent Seedling": {
        'classification': "progression",
        'imageName': 'seedling',
        'id': 0x4d
    },
    "Slate": {
        'classification': "progression",
        'imageName': 'slate',
        'limit': 3,
        'dontChangeImage': true,
        'displayCount': true,
        'id': 0x4b
    },
    "Tokay Eyeball": {
        'classification': "progression",
        'imageName': 'eyeball',
        'id': 0x4f
    },
    "Cracked Tuni Nut": {
        'classification': "progression",
        'invisible': true,
        'id': 0x4c,
        'subid': 0x00
    },
    "Tuni Nut": {
        'classification': "progression",
        'limit': 2,
        'imageName': 'tuninut',
        'noDisable': true,
        'defaultCount': 0,
        'id': 0x3b,
        'subid': 0x00
    },
    "Zora Scale": {
        'classification': "progression",
        'imageName': 'scale',
        'id': 0x4e
    },
    //   "Bomb Upgrade": {
    //   'classification': "progression",
    //   "",
    //        'id': 0x61
    //    },
    //   "Satchel Upgrade": {
    //   'classification': "progression",
    //   "",
    //        'id': 0x62)

    // Rings
    "Friendship Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x04,
        'ring': 'useless',
        'onChange': () => {
            var count = 1;
            for (var i in items) {
                if (!i.includes("Ring")) continue;
                items[i].imageName = `Rings/${(count.toString().length == 1 ? '0' : '') + (count++)} - ${i}`;
                items[i].improveImageVisibility = true;
            }
        }
    },
    "Power Ring L-1": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x05,
        'ring': 'good'
    },
    "Power Ring L-2": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x06,
        'ring': 'good'
    },
    "Power Ring L-3": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x07,
        'ring': 'good'
    },
    "Armor Ring L-1": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x08,
        'ring': 'good'
    },
    "Armor Ring L-2": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x09,
        'ring': 'good'
    },
    "Armor Ring L-3": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x0a,
        'ring': 'good'
    },
    "Red Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x0b,
        'ring': 'good'
    },
    "Blue Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x0c,
        'ring': 'good'
    },
    "Green Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x0d,
        'ring': 'good'
    },
    "Cursed Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x0e,
        'ring': 'useless'
    },
    "Expert's Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x0f,
        'ring': 'good'
    },
    "Blast Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x10,
        'ring': 'good'
    },
    "Rang Ring L-1": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x11,
        'ring': 'good'
    },
    "GBA Time Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x12,
        'ring': 'useless'
    },
    "Maple's Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x13,
        'ring': 'good'
    },
    "Steadfast Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x14,
        'ring': 'good'
    },
    "Pegasus Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x15,
        'ring': 'good'
    },
    "Toss Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x16,
        'ring': 'good'
    },
    "Heart Ring L-1": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x17,
        'ring': 'good'
    },
    "Heart Ring L-2": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x18,
        'ring': 'good'
    },
    "Swimmer's Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x19,
        'ring': 'good'
    },
    "Charge Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x1a,
        'ring': 'good'
    },
    "Light Ring L-1": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x1b,
        'ring': 'good'
    },
    "Light Ring L-2": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x1c,
        'ring': 'good'
    },
    "Bomber's Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x1d,
        'ring': 'good'
    },
    "Green Luck Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x1e,
        'ring': 'good'
    },
    "Blue Luck Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x1f,
        'ring': 'good'
    },
    "Gold Luck Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x20,
        'ring': 'good'
    },
    "Red Luck Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x21,
        'ring': 'good'
    },
    "Green Holy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x22,
        'ring': 'good'
    },
    "Blue Holy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x23,
        'ring': 'good'
    },
    "Red Holy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x24,
        'ring': 'good'
    },
    "Snowshoe Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x25,
        'ring': 'good'
    },
    "Roc's Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x26,
        'ring': 'good'
    },
    "Quicksand Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x27,
        'ring': 'good'
    },
    "Red Joy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x28,
        'ring': 'good'
    },
    "Blue Joy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x29,
        'ring': 'good'
    },
    "Gold Joy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x2a,
        'ring': 'good'
    },
    "Green Joy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x2b,
        'ring': 'good'
    },
    "Discovery Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x2c,
        'ring': 'good'
    },
    "Rang Ring L-2": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x2d,
        'ring': 'good'
    },
    "Octo Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x2e,
        'ring': 'useless'
    },
    "Moblin Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x2f,
        'ring': 'useless'
    },
    "Like Like Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x30,
        'ring': 'useless'
    },
    "Subrosian Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x31,
        'ring': 'useless'
    },
    "First Gen Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x32,
        'ring': 'useless'
    },
    "Spin Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x33,
        'ring': 'good'
    },
    "Bombproof Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x34,
        'ring': 'good'
    },
    "Energy Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x35,
        'ring': 'good'
    },
    "Dbl. Edge Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x36,
        'ring': 'good'
    },
    "GBA Nature Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x37,
        'ring': 'useless'
    },
    "Slayer's Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x38,
        'ring': 'useless'
    },
    "Rupee Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x39,
        'ring': 'useless'
    },
    "Victory Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x3a,
        'ring': 'useless'
    },
    "Sign Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x3b,
        'ring': 'useless'
    },
    "100th Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x3c,
        'ring': 'useless'
    },
    "Whisp Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x3d,
        'ring': 'good'
    },
    "Gasha Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x3e,
        'ring': 'good'
    },
    "Peace Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x3f,
        'ring': 'good'
    },
    "Zora Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x40,
        'ring': 'good'
    },
    "Fist Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x41,
        'ring': 'good'
    },
    "Whimsical Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x42,
        'ring': 'good'
    },
    "Protection Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x43,
        'ring': 'good'
    },

    // Essences
    "Eternal Spirit": {
        'classification': "d1",
        'imageName': 'essences/d1',
        'id': 0x40,
        'subid': 0x00
    },
    "Ancient Wood": {
        'classification': "d2",
        'imageName': 'essences/d2',
        'id': 0x40,
        'subid': 0x01
    },
    "Echoing Howl": {
        'classification': "d3",
        'imageName': 'essences/d3',
        'id': 0x40,
        'subid': 0x02
    },
    "Burning Flame": {
        'classification': "d4",
        'imageName': 'essences/d4',
        'id': 0x40,
        'subid': 0x03
    },
    "Sacred Soil": {
        'classification': "d5",
        'imageName': 'essences/d5',
        'id': 0x40,
        'subid': 0x04
    },
    "Lonely Peak": {
        'classification': "d6",
        'imageName': 'essences/d6',
        'id': 0x40,
        'subid': 0x05
    },
    "Rolling Sea": {
        'classification': "d7",
        'imageName': 'essences/d7',
        'id': 0x40,
        'subid': 0x06
    },
    "Falling Star": {
        'classification': "d8",
        'imageName': 'essences/d8',
        'id': 0x40,
        'subid': 0x07
    },
}