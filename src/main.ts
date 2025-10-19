import k from "./kaplayCtx.ts";
import { LoadAssets } from "./data/loadAssets.ts";

import { MainMenuScene } from "./scenes/mainMenu.ts";
import { LoadCreateCharMenu } from "./scenes/PlayerScenes/pLoadCreateCharMenu.ts";
import { LoadingCharacterData } from "./scenes/PlayerScenes/loadingCharData.ts";

import { CreateNewCharName } from "./scenes/PlayerScenes/CreateNewChar/newPlayerName.ts";
import { CreateNewCharHPSelect } from "./scenes/PlayerScenes/CreateNewChar/newHPSelect.ts";
import { CreateNewCharExperiences } from "./scenes/PlayerScenes/CreateNewChar/newCharExperience.ts";
import { CreateNewCharInventory } from "./scenes/PlayerScenes/CreateNewChar/newCharInventory.ts";

import { CharSheetScene } from "./scenes/PlayerScenes/charSheet.ts";
import { ItemUsageMenu } from "./scenes/PlayerScenes/itemUse.ts";
import { TakeDamageMenu } from "./scenes/PlayerScenes/takeDamage.ts";
import { NewCharExpUpgrade } from "./scenes/PlayerScenes/Upgrade/newExperienceUpgrade.ts";
import { IncreaseHPUpgrade } from "./scenes/PlayerScenes/Upgrade/increaseHPUpgrade.ts";
import { LevelUpMenu } from "./scenes/PlayerScenes/Upgrade/levelUpMenu.ts";

LoadAssets(k);

MainMenuScene(k);
LoadCreateCharMenu(k);
LoadingCharacterData(k);

// New Character Creation Scenes
CreateNewCharName(k);
CreateNewCharHPSelect(k);
CreateNewCharExperiences(k);
CreateNewCharInventory(k);

// Character Sheet Scene
CharSheetScene(k);
ItemUsageMenu(k);
TakeDamageMenu(k);

// Level Up / Upgrade Scenes
NewCharExpUpgrade(k);
IncreaseHPUpgrade(k);
LevelUpMenu(k);

k.go("mainMenu");




