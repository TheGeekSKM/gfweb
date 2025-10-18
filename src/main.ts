import k from "./kaplayCtx.ts";
import { LoadAssets } from "./data/loadAssets.ts";
import * as Data from "./data/globalData.ts";

import { MainMenuScene } from "./scenes/mainMenu.ts";
import { LoadCreateCharMenu } from "./scenes/PlayerScenes/pLoadCreateCharMenu.ts";
import { AddExperience } from "./ui.ts";


LoadAssets(k);

MainMenuScene(k);
LoadCreateCharMenu(k);

k.scene("createNewCharacter",  () => {

    const fullBorder = k.add([
        k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
        k.anchor("center"),
        k.pos(k.center()),
        k.outline(5, k.rgb(94, 150, 255))
    ]);

    const titleText = fullBorder.add([
        k.text("Create A New Character", {size: 36, font: "monogram", width: k.width() - 40, align: "center"}),
        k.pos(0, -k.height() / 2 + 90),
        k.anchor("center"),
        k.color(k.rgb(94, 150, 255))
    ]);

    const experienceListContainer = fullBorder.add([
        k.rect(fullBorder.width - 40, fullBorder.height - 400, {radius: 10}),
        k.pos(0, fullBorder.height / 2 - ((fullBorder.height - 400) / 2) - 25),
        k.anchor("center"),
        k.color(k.rgb(56, 90, 153)),
    ]);

    let currentYPos = -((experienceListContainer.height / 2) - 20);
    for (const exp of Data.PLAYER.experienceList)
    {
        const expObj = AddExperience(k, exp, experienceListContainer);
        expObj.pos.y = currentYPos + (expObj.height / 2);
        currentYPos += expObj.height + 10;
    }
});


k.go("createNewCharacter");

