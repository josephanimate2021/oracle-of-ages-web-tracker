// This is the code behind the logic for The Legend of Zelda: Oracle of Ages (built in JavaScript).
// It defines the map layout and the requirements to access certain locations.
class AgesGameLogic {
    constructor() {
        // The Map Layout for Oracle of Ages
        this.mapLayout = {
            "default/overworld_present": [ // Overworld Present Locations
                {
                    x: 320,
                    y: 210,
                    location: "Lynna City: Comedian Trade",
                    metReachableRequirements: () => {
                        return this.canCutGrass() && this.hasItem("Cheesy Mustache")
                    }
                },
                {
                    x: 360,
                    y: 200,
                    location: "Lynna City: Mayor Plen's House",
                    metReachableRequirements: () => {
                        return this.canCutGrass() && this.itemCount("Progressive Hook") > 1
                    }
                },
                {
                    x: 462,
                    y: 125,
                    location: "Forest of Time: Impa's Gift",
                    metReachableRequirements: () => {
                        return true;
                    }
                },
                {
                    x: 462,
                    y: 125,
                    location: "Forest of Time: Nayru's House",
                    metReachableRequirements: () => {
                        return (this.isRandomizer() || this.hasItem("Spirit's Grave: Essence"));
                    }
                },
            ],
            "default/d0_past": [ // Maku Path Locations
                {
                    x: 66,
                    y: 50,
                    location: "Maku Path: Heart Piece",
                    metReachableRequirements: () => {
                        return this.canAccessPastMakuPath() && (this.hasItem("Small Key (Maku Path)") || this.canAccessMakuTree())
                    }
                },
                {
                    x: 66,
                    y: 50,
                    location: "Maku Path: Key Chest",
                    metReachableRequirements: () => {
                        return this.canAccessPastMakuPath()
                    }
                },
                {
                    x: 66,
                    y: 50,
                    location: "Maku Path: Basement",
                    metReachableRequirements: () => {
                        return this.canAccessPastMakuPath() && (this.hasItem("Small Key (Maku Path)") || this.canAccessMakuTree())
                    }
                },
            ],
            "default/d1": [ // Spirit's Grave Locations
                { x: 100, y: 200, color: "red" },
                { x: 150, y: 250, color: "blue" },  
                { x: 300, y: 400, color: "yellow" }
            ]
        }
    };

    /**
     * Checks to see if a player is playing in randomizer mode. For now, this is a placeholder that always returns true.
     * @returns {boolean} True if the player is playing in randomizer mode, false otherwise.
     */
    isRandomizer() {
        return true; // Placeholder until we have settings implemented
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
    hasEmberSeeds() {
        return [
            this.hasItem("Ember Seeds"),
            (this.hasMediumLogic() && this.hasMysterySeeds())
        ].some(Boolean);
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
        return (this.hasItem(`Small Key (${DUNGEON_NAMES[dungeonId]})`, amount)
            || this.hasItem(`Master Key (${DUNGEON_NAMES[dungeonId]})`));
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
                this.hasItem(`Master Key (${DUNGEON_NAMES[dungeonId]})`)
            ].some(Boolean);
        }

        return [
            this.hasItem(`Boss Key (${DUNGEON_NAMES[dungeonId]})`),
            this.hasItem(`Master Key (${DUNGEON_NAMES[dungeonId]})`)
        ].some(Boolean);
    }

    /**
     * Checks if the option is set to medium logic.
     * @param {object} gameSettings - The current game settings.
     * @returns {boolean} True if the option is set to medium logic, false otherwise.
     */
    hasMediumLogic(gameSettings) {
        return gameSettings.logicDifficulty === "medium" || gameSettings.logicDifficulty === "hard";
    }

    /**
     * Checks if the option is set to hard logic.
     * @param {object} gameSettings - The current game settings.
     * @returns {boolean} True if the option is set to hard logic, false otherwise.
     */
    hasHardLogic(gameSettings) {
        return gameSettings.logicDifficulty === "hard";
    }

    /**
     * Checks if the player has essences.
     * @param {number} target - The target number of essences.
     * @returns {boolean} True if the player has essences, false otherwise.
     */
    hasEssences(target) {
        // The tracker is not in a very good state to put the rest of this code here. I'll do it once I get the tracker to at least work at it's core.
    }
    
    /**
     * Checks if the player has enough essences for the Maku Seed.
     * @param {object} gameSettings - The current game settings
     * @returns {boolean} True if the player has enough essences for the Maku Seed, false otherwise.
     */
    hasEssencesForMakuSeed(gameSettings) {
        return this.hasEssences(gameSettings.required_essences_for_maku_seed);
    }

    /**
     * Checks if the player has enough slates to open the d8 basement.
     * @param {number} targetCount - The amount of slates to check for.
     * @returns {boolean} True if the player has enough slates. If not, then it's false.
     */
    hasSlates(targetCount) {
        return this.hasItem("Slate", targetCount);
    }

    hasEnoughSlates(gameSettings) {
        return this.hasSlates(gameSettings.required_slates);
    }

    /**
     * Checks if a player has a certain number of rupees for a certain check.
     * @param {number} amount - The amount of rupees to check for.
     * @returns {boolean} True if the player has more than enough rupees for the check. If not, then it's false.
     */
    hasRupees(amount) {
        // Rupee checks being quite approximative, being able to farm is a
        // must-have to prevent any stupid lock
        if (!this.canFarmRupees()) return false;

        let rupees = this.itemCount("Rupees (1)");
        rupees += this.itemCount("Rupees (5)") * 5;
        rupees += this.itemCount("Rupees (10)") * 10;
        rupees += this.itemCount("Rupees (20)") * 20;
        rupees += this.itemCount("Rupees (50)") * 50;
        rupees += this.itemCount("Rupees (100)") * 100;
        rupees += this.itemCount("Rupees (200)") * 200;

        // Secret rooms inside D2 and D6 containing loads of rupees, but only in medium logic
        if (hMediumLogic()) {
            if (this.hasItem("_reached_d2_rupee_room")) {
                rupees += 150;
            }
            if (this.hasItem("_reached_d6_rupee_room")) {
                rupees += 90;
            }
        }

        // Old men giving and taking rupees
        // const world = state.multiworld.worlds[player];
        // for (const [regionName, value] of Object.entries(world.old_man_rupee_values)) {
        //     const eventName = "rupees from " + regionName;
        //     if (this.hasItem(eventName)) {
        //         rupees += value;
        //     }
        // }

        return rupees >= amount;
    }

    /**
     * Checks if a player can farm rupees.
     * @returns {boolean} True if the player can farm rupees. If not, then it's false.
     */
    canFarmRupees() {
        // Having Ember Seeds and a weapon or a shovel is enough to guarantee that we can reach
        // a significant amount of rupees
        return this.hasSword() || this.hasShovel();
    }

    /**
     * Checks to see if a player can trigger a switch
     * @returns {boolean} True if a player can trigger a switch. If not, then it's false.
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
     * Checks to see if a player can trigger a switch from far away.
     * @returns {boolean} True if a player can trigger a switch from far away. If not, then it's false.
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
     * Checks to see if a player has a certain amount of bombs.
     * @param {number} amount - The amount of bombs to check for.
     * @returns {boolean} True if the player has enough bombs. If not, then it's false.
     */
    hasBombs(amount = 1) {
        return this.hasItem("Bombs (10)", amount);
    }

    /**
     * Checks to see if a player has a flute for one of the 3 animal companions.
     * @returns {boolean} True if a player does have a flute. If not, then it's false.
     */
    hasFlute() {
        return [
            this.canSummonRicky(),
            this.canSummonMoosh(),
            this.canSummonDimitri()
        ].some(Boolean);
    }

    /**
     * Checks to see if a player can summon ricky.
     * @returns {boolean} True if a player can summon ricky. If not, then it's false.
     */
    canSummonRicky() {
        return this.hasItem("Ricky's Flute");
    }

    /**
     * Checks to see if a player can summon Moosh.
     * @returns {boolean} True if a player can summon moosh. If not, then it's false.
     */
    canSummonMoosh() {
        return this.hasItem("Moosh's Flute");
    }

    /**
     * Checks to see if a player can summon dimitri.
     * @returns {boolean} True if a player can summon dimitri. If not, then it's false.
     */
    canSummonDimitri() {
        return this.hasItem("Dimitri's Flute");
    }

    /**
     * Checks to see if a player can open a time portal.
     * @returns {boolean} True if a player can open a portal. If not, then it's false.
     */
    canOpenPortal() {
        return this.hasItem("Progressive Harp");
    }

    /**
     * Checks to see if a player can go to the present (not the past)
     * @returns {boolean} True if a player can go to the present from the past. If not, then it's false.
     */
    canGoBackToPresent() {
        return this.hasItem("Progressive Harp", 2);
    }

    /**
     * Checks to see if a player can go to the present (and the past)
     * @returns {boolean} True if a player can go to the present from the past and etc. If not, then it's false.
     */
    canSwitchPastAndPresent() {
        return this.hasItem("Progressive Harp", 3);
    }

    /**
     * Checks to see if a player can jump one pixel wide.
     * @param {boolean} canSummonCompanion - Whatever or not an animal companion can be summoned.
     * @param {boolean} liquid - Whatever or not a player is jumping over liquid.
     * @returns {boolean} A player can jump one pixel wide. If not, then it's false.
     */
    canJump1Wide(canSummonCompanion = true, liquid = false) {
        if (liquid) return [
            this.hasFeather(),
            this.hasMediumLogic() && canSummonCompanion && this.canSummonRicky()
        ].some(Boolean);
        return this,hasFeather() ||
            (canSummonCompanion &&
                (this.canSummonMoosh() || this.canSummonRicky()));
    }

    /**
     * Checks to see if a player can jump two pixels wide.
     * @param {boolean} liquid - Whatever or not a player is jumping over liquid.
     * @param {boolean} canSummonCompanion - Whatever or not an animal companion can be summoned.
     * @returns {boolean} True if a player can jump two pixels wide. If not, then it's false.
     */
    canJump2Wide(liquid = false, canSummonCompanion = true) {
        if (liquid) return [
            this.hasFeather() && this.canUsePegasusSeeds(),
            this.hasHardLogic() && this.hasFeather() && this.hasBombs()
        ].some(Boolean);
        return (this.hasFeather() &&
                (this.hasMediumLogic() || this.canUsePegasusSeeds())) ||
            (canSummonCompanion && this.canSummonMoosh(state, player));
    }

    /**
     * Checks to see if a player can jump three pixels wide.
     * @param {boolean} liquid - Whatever or not a player is jumping over liquid.
     * @param {boolean} canSummonCompanion - Whatever or not an animal companion can be summoned.
     * @returns {boolean} True if a player can jump three pixels wide. If not, then it's false.
     */
    canJump3Wide(liquid = false, canSummonCompanion = true) {
        if (liquid) return [
            ooaOptionHardLogic(state, player),
            hasFeather(state, player),
            canUsePegasusSeeds(state, player),
            hasBombs(state, player),
        ].every(Boolean);
        return (ooaOptionMediumLogic(state, player) &&
                hasFeather(state, player) &&
                canUsePegasusSeeds(state, player)) ||
            (canSummonCompanion && canSummonMoosh(state, player));
    }

    /**
     * Checks to see if a player can jump 4 pixels wide.
     * @param {string} canSummonCompanion - Whatever or not an animal companion can be summoned.
     * @returns {boolean} True if a player can jump over 4 pixels wide. If not, then it's false.
     */
    canJump4WidePit(canSummonCompanion) {
        return canSummonCompanion && this.canSummonMoosh();
    }

    // Seed-related predicates ###########################################

    canUseSeeds(state, player) {
        return hasSeedshooter(state, player) || hasSatchel(state, player);
    }

    hasSeedKindCount(state, player, count) {
        let seedCount = 0;
        seedCount += hasEmberSeeds(state, player) ? 1 : 0;
        seedCount += hasMysterySeeds(state, player) ? 1 : 0;
        seedCount += hasScentSeeds(state, player) ? 1 : 0;
        seedCount += hasPegasusSeeds(state, player) ? 1 : 0;
        seedCount += hasGaleSeeds(state, player) ? 1 : 0;
        return seedCount >= count;
    }

    canUseEmberSeeds(state, player, acceptMysterySeeds) {
        return canUseSeeds(state, player) &&
            (hasEmberSeeds(state, player) ||
                (acceptMysterySeeds &&
                    ooaOptionMediumLogic(state, player) &&
                    hasMysterySeeds(state, player)));
    }

    canUseScentSeedsOffensively(state, player) {
        return (hasSeedshooter(state, player) ||
                (ooaOptionHardLogic(state, player) && hasSatchel(state, player))) &&
            hasScentSeeds(state, player);
    }

    canUseScentSeedsForSmell(state, player) {
        return hasSatchel(state, player) && hasScentSeeds(state, player);
    }

    canUsePegasusSeeds(state, player) {
        return hasSatchel(state, player) && hasPegasusSeeds(state, player);
    }

    canUsePegasusSeedsForStun(state, player) {
        return hasSeedshooter(state, player) && hasPegasusSeeds(state, player);
    }

    canWarpUsingGaleSeeds(state, player) {
        return hasSatchel(state, player) && hasGaleSeeds(state, player);
    }

    canUseGaleSeedsOffensively(state, player, ranged = false) {
        // If we don't have gale seeds or aren't at least in medium logic, don't even try
        if (!hasGaleSeeds(state, player) || !ooaOptionMediumLogic(state, player)) {
            return false;
        }

        return hasSeedshooter(state, player) ||
            (!ranged &&
                hasSatchel(state, player) &&
                (ooaOptionHardLogic(state, player) || hasFeather(state, player)));
    }

    canUseMysterySeeds(state, player) {
        return canUseSeeds(state, player) && hasMysterySeeds(state, player);
    }
}