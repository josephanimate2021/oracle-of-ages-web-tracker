class LogicPredicates {
    // ------------------------------
    // Items predicates
    // ------------------------------

    static has_sword(acceptBiggoron = true) {
        return (
            gameLogic.hasItem("Progressive Sword") ||
            (acceptBiggoron && gameLogic.hasItem("Biggoron's Sword"))
        );
    }

    static has_noble_sword() {
        return gameLogic.hasItem("Progressive Sword", 2);
    }

    static has_shield() {
        return gameLogic.hasItem("Progressive Shield");
    }

    static has_feather() {
        return gameLogic.hasItem("Feather");
    }

    static has_satchel(level = 1) {
        return gameLogic.hasItem("Seed Satchel", level);
    }

    static has_seedshooter() {
        return gameLogic.hasItem("Seed Shooter");
    }

    static has_boomerang() {
        return gameLogic.hasItem("Boomerang");
    }

    static has_cane() {
        return gameLogic.hasItem("Cane of Somaria");
    }

    static has_bracelet() {
        return gameLogic.hasItem("Progressive Bracelet");
    }

    static has_glove() {
        return gameLogic.hasItem("Progressive Bracelet", 2);
    }

    static has_shovel() {
        return gameLogic.hasItem("Shovel");
    }

    static has_flippers() {
        return gameLogic.hasItem("Progressive Flippers");
    }

    static has_siren_suit() {
        return gameLogic.hasItem("Progressive Flippers", 2);
    }

    static has_switch_hook() {
        return gameLogic.hasItem("Progressive Hook");
    }

    static has_long_hook() {
        return gameLogic.hasItem("Progressive Hook", 2);
    }

    static has_ember_seeds(canUseMystery = false) {
        return (
            gameLogic.hasItem("Ember Seeds") ||
            (gameLogic.hasItem("Mystery Seeds") &&
             LogicPredicates.option_medium_logic() && canUseMystery)
        );
    }

    static has_scent_seeds() {
        return gameLogic.hasItem("Scent Seeds")
    }

    static has_pegasus_seeds() {
        return gameLogic.hasItem("Pegasus Seeds");
    }

    static has_mystery_seeds() {
        return gameLogic.hasItem("Mystery Seeds");
    }

    static has_gale_seeds() {
        return gameLogic.hasItem("Gale Seeds");
    }

    static has_small_keys(dungeonId, amount = 1) {
        const dungeonName = gameLogic.dungeons[dungeonId];
        return (
            gameLogic.hasItem(`Small Key (${dungeonName})`, amount) ||
            gameLogic.hasItem(`Master Key (${dungeonName})`)
        );
    }

    static has_boss_key(dungeonId) {
        const dungeonName = gameLogic.dungeons[dungeonId];

        if (dungeonId === 6) return gameLogic.hasItem("Boss Key (Mermaid's Cave)") || gameLogic.hasItem(`Master Key (${dungeonName})`);

        return gameLogic.hasItem(`Boss Key (${dungeonName})`) || (
            gameLogic.settings.master_keys == "all_dungeon_keys" && gameLogic.hasItem(`Master Key (${dungeonName})`)
        )
    }

    

    // ------------------------------
    // Options and generation predicates
    // ------------------------------

    static option_medium_logic() {
        return gameLogic.settings.logic_difficulty === "medium" ||
               gameLogic.settings.logic_difficulty === "hard";
    }

    static option_hard_logic() {
        return gameLogic.settings.logic_difficulty === "hard";
    }

    static is_companion_ricky() {
        return gameLogic.settings.animal_companion === "ricky";
    }

    static is_companion_moosh() {
        return gameLogic.settings.animal_companion === "moosh";
    }

    static is_companion_dimitri() {
        return gameLogic.settings.animal_companion === "dimitri";
    }

    static has_essences(targetCount) {
        let essences = 0;
        for (let i = 1; i <= targetCount; i++) {
            const essence = Object.keys(items).find(k => items[k].imageName == `essences/d${i}`);
            if (essence && LogicPredicates.hasItem(essence)) essences++
        }
        return essences >= targetCount;
    }

    static has_essences_for_maku_seed() {
        const required = gameLogic.settings.required_essences_for_maku_seed;
        return LogicPredicates.has_essences(required);
    }

    static has_slates(targetCount) {
        return gameLogic.hasItem("Slate", targetCount);
    }

    static has_enough_slates() {
        const required = gameLogic.settings.required_slates;
        return LogicPredicates.has_slates(required);
    }

    

    // ------------------------------
    // Various item predicates
    // ------------------------------

    static has_rupees(amount) {
        // Must be able to farm rupees or logic breaks
        if (!LogicPredicates.can_farm_rupees()) {
            return false;
        }

        return items.Rupees.count >= amount;
    }

    static can_farm_rupees() {
        // Ember seeds + weapon OR shovel is enough to guarantee farming
        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.has_shovel()
        );
    }

    static can_trigger_switch() {
        return (
            LogicPredicates.has_boomerang() ||
            LogicPredicates.has_bombs() ||
            LogicPredicates.has_seedshooter() ||
            (
                LogicPredicates.has_satchel() &&
                (
                    LogicPredicates.has_ember_seeds() ||
                    LogicPredicates.has_scent_seeds() ||
                    LogicPredicates.has_mystery_seeds()
                )
            ) ||
            LogicPredicates.has_sword() ||
            LogicPredicates.has_switch_hook() ||
            LogicPredicates.can_punch()
        );
    }

    static can_trigger_far_switch() {
        return (
            LogicPredicates.has_boomerang() ||
            LogicPredicates.has_bombs() ||
            LogicPredicates.has_seedshooter() ||
            LogicPredicates.has_switch_hook() ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_sword(false) &&
                gameLogic.hasItem("Energy Ring")
            )
        );
    }

    static has_bombs(amount = 1) {
        return gameLogic.hasItem("Bombs (10)", amount);
    }

    static has_flute() {
        return (
            LogicPredicates.can_summon_ricky() ||
            LogicPredicates.can_summon_moosh() ||
            LogicPredicates.can_summon_dimitri()
        );
    }

    static can_summon_ricky() {
        return gameLogic.hasItem("Ricky's Flute");
    }

    static can_summon_moosh() {
        return gameLogic.hasItem("Moosh's Flute");
    }

    static can_summon_dimitri() {
        return gameLogic.hasItem("Dimitri's Flute");
    }

    static can_open_portal() {
        return gameLogic.hasItem("Progressive Harp");
    }

    static can_go_back_to_present() {
        return gameLogic.hasItem("Progressive Harp", 2);
    }

    static can_switch_past_and_present() {
        return gameLogic.hasItem("Progressive Harp", 3);
    }

    

    // ------------------------------
    // Jump-related predicates
    // ------------------------------

    static can_jump_1_wide_liquid(canSummonCompanion) {
        return (
            LogicPredicates.has_feather() ||
            (
                LogicPredicates.option_medium_logic() &&
                canSummonCompanion &&
                LogicPredicates.can_summon_ricky()
            )
        );
    }

    static can_jump_2_wide_liquid() {
        return (
            (
                LogicPredicates.has_feather() &&
                LogicPredicates.can_use_pegasus_seeds()
            ) ||
            (
                LogicPredicates.option_hard_logic() &&
                LogicPredicates.has_feather() &&
                LogicPredicates.has_bombs()
            )
        );
    }

    static can_jump_3_wide_liquid() {
        return (
            LogicPredicates.option_hard_logic() &&
            LogicPredicates.has_feather() &&
            LogicPredicates.can_use_pegasus_seeds() &&
            LogicPredicates.has_bombs()
        );
    }

    static can_jump_1_wide_pit(canSummonCompanion) {
        return (
            LogicPredicates.has_feather() ||
            (
                canSummonCompanion &&
                (
                    LogicPredicates.can_summon_moosh() ||
                    LogicPredicates.can_summon_ricky()
                )
            )
        );
    }

    static can_jump_2_wide_pit(canSummonCompanion) {
        return (
            (
                LogicPredicates.has_feather() &&
                (
                    LogicPredicates.option_medium_logic() ||
                    LogicPredicates.can_use_pegasus_seeds()
                )
            ) ||
            (
                canSummonCompanion &&
                LogicPredicates.can_summon_moosh()
            )
        );
    }

    static can_jump_3_wide_pit(canSummonCompanion) {
        return (
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_feather() &&
                LogicPredicates.can_use_pegasus_seeds()
            ) ||
            (
                canSummonCompanion &&
                LogicPredicates.can_summon_moosh()
            )
        );
    }

    static can_jump_4_wide_pit(canSummonCompanion) {
        return (
            canSummonCompanion &&
            LogicPredicates.can_summon_moosh()
        );
    }

    

    // ------------------------------
    // Seed-related predicates
    // ------------------------------

    static can_use_seeds() {
        return (
            LogicPredicates.has_seedshooter() ||
            LogicPredicates.has_satchel()
        );
    }

    static has_seed_kind_count(count) {
        let seedCount = 0;

        if (LogicPredicates.has_ember_seeds()) seedCount++;
        if (LogicPredicates.has_mystery_seeds()) seedCount++;
        if (LogicPredicates.has_scent_seeds()) seedCount++;
        if (LogicPredicates.has_pegasus_seeds()) seedCount++;
        if (LogicPredicates.has_gale_seeds()) seedCount++;

        return seedCount >= count;
    }

    static can_use_ember_seeds(acceptMysterySeeds) {
        return (
            LogicPredicates.can_use_seeds() &&
            (
                LogicPredicates.has_ember_seeds() ||
                (
                    acceptMysterySeeds &&
                    LogicPredicates.option_medium_logic() &&
                    LogicPredicates.has_mystery_seeds()
                )
            )
        );
    }

    static can_use_scent_seeds_offensively() {
        return (
            (
                LogicPredicates.has_seedshooter() ||
                (
                    LogicPredicates.option_hard_logic() &&
                    LogicPredicates.has_satchel()
                )
            ) &&
            LogicPredicates.has_scent_seeds()
        );
    }

    static can_use_scent_seeds_for_smell() {
        return (
            LogicPredicates.has_satchel() &&
            LogicPredicates.has_scent_seeds()
        );
    }

    static can_use_pegasus_seeds() {
        return (
            LogicPredicates.has_satchel() &&
            LogicPredicates.has_pegasus_seeds()
        );
    }

    static can_use_pegasus_seeds_for_stun() {
        return (
            LogicPredicates.has_seedshooter() &&
            LogicPredicates.has_pegasus_seeds()
        );
    }

    static can_warp_using_gale_seeds() {
        return (
            LogicPredicates.has_satchel() &&
            LogicPredicates.has_gale_seeds()
        );
    }

    static can_use_gale_seeds_offensively(ranged = false) {
        // Must have gale seeds AND be in medium logic or higher
        if (!LogicPredicates.has_gale_seeds() ||
            !LogicPredicates.option_medium_logic()) {
            return false;
        }

        return (
            LogicPredicates.has_seedshooter() ||
            (
                !ranged &&
                LogicPredicates.has_satchel() &&
                (
                    LogicPredicates.option_hard_logic() ||
                    LogicPredicates.has_feather()
                )
            )
        );
    }

    static can_use_mystery_seeds() {
        return (
            LogicPredicates.can_use_seeds() &&
            LogicPredicates.has_mystery_seeds()
        );
    }

    

    // ------------------------------
    // Break / kill predicates
    // ------------------------------

    static can_break_bush(canSummonCompanion = false) {
        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.has_bracelet() ||
            LogicPredicates.has_switch_hook() ||
            (canSummonCompanion && LogicPredicates.has_flute()) ||
            (
                LogicPredicates.option_medium_logic() &&
                (
                    LogicPredicates.has_bombs(2) ||
                    LogicPredicates.can_use_ember_seeds(false) ||
                    (
                        LogicPredicates.has_seedshooter() &&
                        LogicPredicates.has_gale_seeds()
                    )
                )
            )
        );
    }

    static can_break_tingle_balloon() {
        return (
            (
                LogicPredicates.has_sword() ||
                LogicPredicates.has_boomerang()
            ) &&
            LogicPredicates.has_feather()
        );
    }

    static can_harvest_regrowing_bush(allowBombs = true) {
        return (
            LogicPredicates.has_sword() ||
            (allowBombs && LogicPredicates.has_bombs())
        );
    }

    static can_break_pot() {
        return (
            LogicPredicates.has_bracelet() ||
            LogicPredicates.has_noble_sword() ||
            LogicPredicates.has_switch_hook() ||
            gameLogic.hasItem("Biggoron's Sword")
        );
    }

    static can_break_flowers(canSummonCompanion) {
        return (
            LogicPredicates.has_sword() ||
            (canSummonCompanion && LogicPredicates.has_flute()) ||
            (
                LogicPredicates.option_medium_logic() &&
                (
                    LogicPredicates.has_bombs(2) ||
                    LogicPredicates.can_use_ember_seeds(false) ||
                    (
                        LogicPredicates.has_seedshooter() &&
                        LogicPredicates.has_gale_seeds()
                    )
                )
            )
        );
    }

    static can_break_crystal() {
        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.has_bombs() ||
            LogicPredicates.has_bracelet() ||
            (
                LogicPredicates.option_medium_logic() &&
                gameLogic.hasItem("Expert's Ring")
            )
        );
    }

    static can_break_sign() {
        return (
            LogicPredicates.has_noble_sword() ||
            gameLogic.hasItem("Biggoron's Sword") ||
            LogicPredicates.has_bracelet() ||
            LogicPredicates.can_use_ember_seeds(false)
        );
    }

    static can_harvest_tree(canUseCompanion) {
        return (
            LogicPredicates.can_use_seeds() &&
            (
                LogicPredicates.has_sword() ||
                LogicPredicates.can_punch() ||
                (
                    canUseCompanion &&
                    LogicPredicates.option_medium_logic() &&
                    LogicPredicates.can_summon_dimitri()
                )
            )
        );
    }

    static can_push_enemy() {
        return LogicPredicates.has_shield();
    }

    static can_kill_normal_enemy(canKillWithHook = false, pitAvailable = false) {
        if (pitAvailable && LogicPredicates.can_push_enemy()) {
            return true;
        }

        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.can_kill_normal_using_satchel() ||
            LogicPredicates.can_kill_normal_using_seedshooter() ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_bombs(4)
            ) ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_cane()
            ) ||
            LogicPredicates.can_punch() ||
            (canKillWithHook && LogicPredicates.has_switch_hook())
        );
    }

    static can_kill_moldorm(pitAvailable = false) {
        if (pitAvailable && LogicPredicates.can_push_enemy()) {
            return true;
        }

        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.can_use_scent_seeds_offensively() ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_bombs(4)
            ) ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_cane()
            ) ||
            LogicPredicates.can_punch() ||
            LogicPredicates.has_switch_hook()
        );
    }

    static can_kill_wizzrobes(pitAvailable = false) {
        if (pitAvailable && LogicPredicates.can_push_enemy()) {
            return true;
        }

        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.can_kill_normal_using_satchel() ||
            LogicPredicates.can_kill_normal_using_seedshooter() ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_bombs(4)
            ) ||
            LogicPredicates.can_punch()
        );
    }

    static generic_boss_and_miniboss_kill() {
        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.can_use_scent_seeds_offensively() ||
            LogicPredicates.can_punch() ||
            LogicPredicates.has_switch_hook()
        );
    }

    static can_kill_underwater(canKillWithHook = false) {
        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.can_kill_normal_using_seedshooter() ||
            LogicPredicates.can_punch() ||
            (canKillWithHook && LogicPredicates.has_switch_hook())
        );
    }

    static can_kill_normal_using_satchel() {
        if (!LogicPredicates.has_satchel(2)) {
            return false;
        }

        return (
            LogicPredicates.has_ember_seeds() ||
            (
                LogicPredicates.option_medium_logic() &&
                (
                    LogicPredicates.has_scent_seeds() ||
                    LogicPredicates.has_mystery_seeds() ||
                    (
                        LogicPredicates.has_gale_seeds() &&
                        LogicPredicates.has_feather()
                    )
                )
            ) ||
            (
                LogicPredicates.option_hard_logic() &&
                LogicPredicates.has_gale_seeds()
            )
        );
    }

    static can_kill_normal_using_seedshooter() {
        if (!LogicPredicates.has_satchel(2)) {
            return false;
        }

        return (
            LogicPredicates.has_seedshooter() &&
            (
                LogicPredicates.has_ember_seeds() ||
                LogicPredicates.has_scent_seeds() ||
                (
                    LogicPredicates.option_medium_logic() &&
                    (
                        LogicPredicates.has_mystery_seeds() ||
                        LogicPredicates.has_gale_seeds()
                    )
                )
            )
        );
    }

    static can_kill_armored_enemy() {
        return (
            LogicPredicates.has_sword() ||
            (
                LogicPredicates.has_satchel(2) &&
                LogicPredicates.has_scent_seeds() &&
                (
                    LogicPredicates.has_seedshooter() ||
                    LogicPredicates.option_medium_logic()
                )
            ) ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_cane()
            ) ||
            LogicPredicates.can_punch()
        );
    }

    static can_kill_stalfos() {
        return LogicPredicates.can_kill_normal_enemy();
    }

    static can_kill_pols_voice(ranged = false) {
        return (
            LogicPredicates.can_open_portal() ||
            LogicPredicates.has_flute() ||
            LogicPredicates.has_bombs() ||
            LogicPredicates.can_use_gale_seeds_offensively(ranged)
        );
    }

    static can_kill_armos(ranged = false) {
        return (
            LogicPredicates.has_bombs() ||
            LogicPredicates.can_use_scent_seeds_offensively()
        );
    }

    static can_punch() {
        return (
            LogicPredicates.option_medium_logic() &&
            (
                gameLogic.hasItem("Fist Ring") ||
                gameLogic.hasItem("Expert's Ring")
            )
        );
    }

    static can_trigger_lever() {
        return (
            LogicPredicates.can_trigger_lever_from_minecart() ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_shovel()
            )
        );
    }

    static can_trigger_lever_from_minecart() {
        return (
            LogicPredicates.has_sword() ||
            LogicPredicates.has_boomerang() ||
            LogicPredicates.can_use_scent_seeds_offensively() ||
            LogicPredicates.can_use_mystery_seeds() ||
            LogicPredicates.has_seedshooter()
        );
    }

    static can_flip_spiked_beetle() {
        return (
            LogicPredicates.has_shield() ||
            (
                LogicPredicates.option_medium_logic() &&
                LogicPredicates.has_shovel()
            )
        );
    }

    static can_kill_spiked_beetle() {
        return (
            (
                LogicPredicates.can_flip_spiked_beetle() &&
                (
                    LogicPredicates.has_sword() ||
                    LogicPredicates.can_kill_normal_using_satchel() ||
                    LogicPredicates.can_kill_normal_using_seedshooter()
                )
            ) ||
            LogicPredicates.can_use_gale_seeds_offensively()
        );
    }

    

    // ------------------------------
    // Action predicates
    // ------------------------------

    static can_swim(canSummonCompanion) {
        return (
            LogicPredicates.has_flippers() ||
            (canSummonCompanion && LogicPredicates.can_summon_dimitri())
        );
    }

    static can_swim_deepwater(canSummonCompanion) {
        return (
            LogicPredicates.has_siren_suit() ||
            (canSummonCompanion && LogicPredicates.can_summon_dimitri())
        );
    }

    static can_dive() {
        return LogicPredicates.has_siren_suit();
    }

    static can_remove_rockslide(canSummonCompanion) {
        return (
            LogicPredicates.has_bombs() ||
            (canSummonCompanion && LogicPredicates.can_summon_ricky())
        );
    }

    static can_remove_dirt(canSummonCompanion) {
        return (
            LogicPredicates.has_shovel() ||
            (canSummonCompanion && LogicPredicates.has_flute())
        );
    }

    static can_meet_maple() {
        return LogicPredicates.can_kill_normal_enemy();
    }

    static can_toss_ring() {
        return (
            LogicPredicates.option_medium_logic() &&
            LogicPredicates.has_bracelet() &&
            gameLogic.hasItem("Toss Ring")
        );
    }
}

