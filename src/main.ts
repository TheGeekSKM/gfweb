import k from "./kaplayCtx.ts";
import { LoadAssets } from "./data/loadAssets.ts";

import { MainMenuScene } from "./scenes/mainMenu.ts";

LoadAssets(k);

MainMenuScene(k);
k.go("mainMenu");

