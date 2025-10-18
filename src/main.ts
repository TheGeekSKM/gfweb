import k from "./kaplayCtx.ts";
import { LoadAssets } from "./data/loadAssets.ts";
import * as Data from "./data/globalData.ts";
import * as Types from "./data/templates.ts";
import { AddExperience } from "./ui.ts";

import { MainMenuScene } from "./scenes/mainMenu.ts";
import { LoadCreateCharMenu } from "./scenes/PlayerScenes/pLoadCreateCharMenu.ts";
import { CreateNewCharExperiences } from "./scenes/PlayerScenes/CreateNewChar/newCharExperience.ts";


LoadAssets(k);

MainMenuScene(k);
LoadCreateCharMenu(k);
CreateNewCharExperiences(k);




k.go("mainMenu");

