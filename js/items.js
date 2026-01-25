const items = {
    //   "No Item": {
    //   'classification': "filler",
    //   "",
    //    'id': 0x00,
    //    'subid': 0x00
    //    },
    "Progressive Shield": {
        'classification': "progression",
        'id': 0x01
    },
    "Bombs (10)": {
        'classification': "progression",
        'id': 0x03
    },
    "Progressive Sword": {
        'classification': "progression",
        'id': 0x05
    },
    "Boomerang": {
        'classification': "progression",
        'id': 0x06
    },
    "Progressive Harp": {
        'classification': "progression",
        'id': 0x25,
        'subid': 0x00                                                                                                           
    },
    "Progressive Hook": {
        'classification': "progression",
        'id': 0x0a
    },
    "Cane of Somaria": {
        'classification': "progression",
        'id': 0x04
    },
    "Biggoron's Sword": {
        'classification': "progression",
        'id': 0x0c
    },
    "Bombchus (10)": {
        'classification': "progression",
        'id': 0x0d
    },
    "Ricky's Flute": {
        'classification': "progression",
        'id': 0x0e,
        'subid': 0x00
    },
    "Dimitri's Flute": {
        'classification': "progression",
        'id': 0x0e,
        'subid': 0x01
    },
    "Moosh's Flute": {
        'classification': "progression",
        'id': 0x0e,
        'subid': 0x02
    },
    "Seed Shooter": {
        'classification': "progression",
        'id': 0x0f
    },
    "Shovel": {
        'classification': "progression",
        'id': 0x15
    },
    "Progressive Bracelet": {
        'classification': "progression",
        'id': 0x16
    },
    "Feather": {
        'classification': "progression",
        'id': 0x17
    },
    "Seed Satchel": {
        'classification': "progression",
        'id': 0x19
    },
    "Ember Seeds": {
        'classification': "progression",
        'id': 0x20
    },
    "Scent Seeds": {
        'classification': "progression",
        'id': 0x21
    },
    "Pegasus Seeds": {
        'classification': "progression",
        'id': 0x22
    },
    "Gale Seeds": {
        'classification': "useful",
        'id': 0x23
    },
    "Mystery Seeds": {
        'classification': "progression",
        'id': 0x24
    },
    "Rupees (1)": {
        'classification': "filler",
        'id': 0x28,
        'subid': 0x00
    },
    "Rupees (5)": {
        'classification': "filler",
        'id': 0x28,
        'subid': 0x01
    },
    "Rupees (10)": {
        'classification': "filler",
        'id': 0x28,
        'subid': 0x02
    },
    "Rupees (20)": {
        'classification': "progression",
        'id': 0x28,
        'subid': 0x03
    },
    "Rupees (30)": {
        'classification': "progression",
        'id': 0x28,
        'subid': 0x04
    },
    "Rupees (50)": {
        'classification': "progression",
        'id': 0x28,
        'subid': 0x05
    },
    "Rupees (100)": {
        'classification': "progression",
        'id': 0x28,
        'subid': 0x06
    },
    "Rupees (200)": {
        'classification': "progression",
        'id': 0x28,
        'subid': 0x08
    },
    "Heart Container": {
        'classification': "useful",
        'id': 0x2a
    },
    "Piece of Heart": {
        'classification': "useful",
        'id': 0x2b,
        'subid': 0x01
    },
    "Progressive Flippers": {
        'classification': "progression",
        'id': 0x2e
    },
    "Potion": {
        'classification': "useful",
        'id': 0x2f
    },
    "King Zora's Potion": {
        'classification': "progression",
        'id': 0x37
    },

    "Small Key (Maku Path)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x00
    },
    "Small Key (Spirit's Grave)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x01
    },
    "Small Key (Wing Dungeon)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x02
    },
    "Small Key (Moonlit Grotto)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x03
    },
    "Small Key (Skull Dungeon)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x04
    },
    "Small Key (Crown Dungeon)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x05
    },
    "Small Key (Mermaid's Cave Past)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x0C
    },
    "Small Key (Mermaid's Cave Present)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x06
    },
    "Small Key (Jabu-Jabu's Belly)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x07
    },
    "Small Key (Ancient Tomb)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x08
    },
    "Master Key (Maku Path)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x00
    },
    "Master Key (Spirit's Grave)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x01
    },
    "Master Key (Wing Dungeon)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x02
    },
    "Master Key (Moonlit Grotto)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x03
    },
    "Master Key (Skull Dungeon)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x04
    },
    "Master Key (Crown Dungeon)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x05
    },
    "Master Key (Mermaid's Cave Past)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x0C
    },
    "Master Key (Mermaid's Cave Present)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x06
    },
    "Master Key (Jabu-Jabu's Belly)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x07
    },
    "Master Key (Ancient Tomb)": {
        'classification': "progression",
        'id': 0x30,
        'subid': 0x08
    },
    "Boss Key (Spirit's Grave)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x01
    },
    "Boss Key (Wing Dungeon)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x02
    },
    "Boss Key (Moonlit Grotto)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x03
    },
    "Boss Key (Skull Dungeon)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x04
    },
    "Boss Key (Crown Dungeon)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x05
    },
    "Boss Key (Mermaid's Cave)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x06
    },
    "Boss Key (Jabu-Jabu's Belly)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x07
    },
    "Boss Key (Ancient Tomb)": {
        'classification': "progression",
        'id': 0x31,
        'subid': 0x08
    },
    "Compass (Spirit's Grave)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x01
    },
    "Compass (Wing Dungeon)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x02
    },
    "Compass (Moonlit Grotto)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x03
    },
    "Compass (Skull Dungeon)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x04
    },
    "Compass (Crown Dungeon)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x05
    },
    "Compass (Mermaid's Cave Past)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x0C
    },
    "Compass (Mermaid's Cave Present)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x06
    },
    "Compass (Jabu-Jabu's Belly)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x07
    },
    "Compass (Ancient Tomb)": {
        'classification': "useful",
        'id': 0x32,
        'subid': 0x08
    },
    "Dungeon Map (Spirit's Grave)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x01
    },
    "Dungeon Map (Wing Dungeon)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x02
    },
    "Dungeon Map (Moonlit Grotto)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x03
    },
    "Dungeon Map (Skull Dungeon)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x04
    },
    "Dungeon Map (Crown Dungeon)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x05
    },
    "Dungeon Map (Mermaid's Cave Past)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x0C
    },
    "Dungeon Map (Mermaid's Cave Present)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x06
    },
    "Dungeon Map (Jabu-Jabu's Belly)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x07
    },
    "Dungeon Map (Ancient Tomb)": {
        'classification': "useful",
        'id': 0x33,
        'subid': 0x08
    },

    "Gasha Seed": {
        'classification': "filler",
        'id': 0x34,
        'subid': 0x01
    },
    
      "Maku Seed": {
            'classification': "progression",
          'id': 0x36
      },

    "Poe Clock": {
        'classification': "progression",
        'id': 0x3d
    },
    "Stationery": {
        'classification': "progression",
        'id': 0x3e
    },
    "Stink Bag": {
        'classification': "progression",
        'id': 0x3f
    },
    "Tasty Meat": {
        'classification': "progression",
        'id': 0x47
    },
    "Doggie Mask": {
        'classification': "progression",
        'id': 0x56
    },
    "Dumbbell": {
        'classification': "progression",
        'id': 0x57
    },
    "Cheesy Mustache": {
        'classification': "progression",
        'id': 0x5f
    },
    "Funny Joke": {
        'classification': "progression",
        'id': 0x3c
    },
    "Touching Book": {
        'classification': "progression",
        'id': 0x35
    },
    "Magic Oar": {
        'classification': "progression",
        'id': 0x38
    },
    "Sea Ukulele": {
        'classification': "progression",
        'id': 0x39
    },
    "Broken Sword": {
         'classification': "progression",
         'id': 0x3a
    },

    "Bomb Flower": {
        'classification': "progression",
        'id': 0x49
    },
    "Book of Seals": {
        'classification': "progression",
        'id': 0x55
    },
    "Brother Emblem": {
        'classification': "progression",
        'id': 0x5b
    },
    "Cheval Rope": {
        'classification': "progression",
        'id': 0x52
    },
    "Crown Key": {
        'classification': "progression",
        'id': 0x43
    },
    "Fairy Powder": {
        'classification': "progression",
        'id': 0x51
    },
    "Goron Vase": {
        'classification': "progression",
        'id': 0x5c
    },
    "Goronade": {
        'classification': "progression",
        'id': 0x5d
    },
    "Graveyard Key": {
        'classification': "progression",
        'id': 0x42,
    },
    "Island Chart": {
        'classification': "progression",
        'id': 0x54
    },
    "Lava Juice": {
        'classification': "progression",
        'id': 0x5a
    },
    "Letter of Introduction": {
        'classification': "progression",
        'id': 0x59
    },
    "Library Key": {
        'classification': "progression",
        'id': 0x46
    },
    "Mermaid Key": {
        'classification': "progression",
        'id': 0x44
    },
    "Old Mermaid Key": {
        'classification': "progression",
        'id': 0x45
    },
    "Ricky's Gloves": {
        'classification': "progression",
        'id': 0x48
    },
    "Rock Brisket": {
        'classification': "progression",
        'id': 0x5e
    },
    "Scent Seedling": {
        'classification': "progression",
        'id': 0x4d
    },
    "Slate": {
        'classification': "progression",
        'id': 0x4b
    },
    "Tokay Eyeball": {
        'classification': "progression",
        'id': 0x4f
    },
    "Cracked Tuni Nut": {
        'classification': "progression",
        'id': 0x4c,
        'subid': 0x00
    },
    "Tuni Nut": {
        'classification': "progression",
        'id': 0x3b,
        'subid': 0x00
    },
    "Zora Scale": {
        'classification': "progression",
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

    "Friendship Ring": {
        'classification': "filler",
        'id': 0x2d,
        'subid': 0x04,
        'ring': 'useless'
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

    "Eternal Spirit": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x00
    },
    "Ancient Wood": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x01
    },
    "Echoing Howl": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x02
    },
    "Burning Flame": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x03
    },
    "Sacred Soil": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x04
    },
    "Lonely Peak": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x05
    },
    "Rolling Sea": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x06
    },
    "Falling Star": {
        'classification': "progression",
        'id': 0x40,
        'subid': 0x07
    },
}