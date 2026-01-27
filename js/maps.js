// These are the maps from the game + room numbers came from the oracles disasm code.
const maps = {
    "symmetry_city_present": {
        layouts: {
            default: []
        },
        roomCondtionals: [
            {
                min: 0x012,
                max: 0x014
            },
            {
                min: 0x002,
                max: 0x004
            },
        ]
    },
    "animal_companion_regions": {
        layouts: {
            default: []
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
            },
        ]
    },
    "overworld_present": {
        layouts: {
            default: []
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
            default: []
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
            default: []
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
            default: []
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
    }
}