import k from "./kaplayCtx.ts";
import type { GameObj } from "kaplay";
import { LoadAssets } from "./data/loadAssets.ts";
import * as Data from "./data/globalData.ts";
import * as Types from "./data/templates.ts";
import { AddExperience, AddItemObj } from "./ui.ts";

import { MainMenuScene } from "./scenes/mainMenu.ts";
import { LoadCreateCharMenu } from "./scenes/PlayerScenes/pLoadCreateCharMenu.ts";
import { CreateNewCharName } from "./scenes/PlayerScenes/CreateNewChar/newPlayerName.ts";
import { CreateNewCharExperiences } from "./scenes/PlayerScenes/CreateNewChar/newCharExperience.ts";
import { NewCharInventory } from "./scenes/PlayerScenes/CreateNewChar/newCharInventory.ts";
import { CharSheetScene } from "./scenes/PlayerScenes/charSheet.ts";

LoadAssets(k);

MainMenuScene(k);
LoadCreateCharMenu(k);
CreateNewCharName(k);
CreateNewCharExperiences(k);
NewCharInventory(k);
CharSheetScene(k);



k.go("mainMenu");




