import k from "./kaplayCtx.ts";
import type { GameObj, KAPLAYCtx } from "kaplay";
import { LoadAssets } from "./data/loadAssets.ts";
import * as Data from "./data/globalData.ts";
import * as Types from "./data/templates.ts";
import { AddExperience, AddItemObj } from "./ui.ts";
import { AppStore } from "./store.ts";

import { MainMenuScene } from "./scenes/mainMenu.ts";
import { LoadCreateCharMenu } from "./scenes/PlayerScenes/pLoadCreateCharMenu.ts";
import { LoadingCharacterData } from "./scenes/PlayerScenes/loadingCharData.ts";

import { CreateNewCharName } from "./scenes/PlayerScenes/CreateNewChar/newPlayerName.ts";
import { CreateNewCharHPSelect } from "./scenes/PlayerScenes/CreateNewChar/newHPSelect.ts";
import { CreateNewCharExperiences } from "./scenes/PlayerScenes/CreateNewChar/newCharExperience.ts";
import { CreateNewCharInventory } from "./scenes/PlayerScenes/CreateNewChar/newCharInventory.ts";

import { CharSheetScene } from "./scenes/PlayerScenes/charSheet.ts";
import { ItemUsageMenu } from "./scenes/PlayerScenes/itemUse.ts";

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

k.go("mainMenu");




