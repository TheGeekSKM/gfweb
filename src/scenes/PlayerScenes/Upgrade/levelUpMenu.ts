import type { KAPLAYCtx } from "kaplay";
import { AppStore } from "../../../store.ts";

export function LevelUpMenu(k: KAPLAYCtx) : void 
{
    k.scene("levelUpMenu", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "levelUpMenu",
            previousScene: prevState.currentScene,
        }), "LevelUpMenuScene");

        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(94, 150, 255))
        ]);

        const titleText = fullBorder.add([
            k.text("Level Up Menu", {size: 36, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 60),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255))
        ]);

        const explanationText = fullBorder.add([
            k.text(`Select the Character Stat that you wish to level up by 1.`, {size: 18, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 120),
            k.anchor("center"),
            k.color(k.rgb(150, 200, 255))
        ]);

        const addAnExperienceButton = fullBorder.add([
            k.rect(200, 50, {radius: 10}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
        ]);

        const addAnExperienceButtonText = addAnExperienceButton.add([
            k.text("Upgrade Experience(s)", {size: 20, font: "monogram", width: addAnExperienceButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(255, 255, 255))
        ]);


        const increaseMaxHealthButton = fullBorder.add([
            k.rect(200, 50, {radius: 10}),
            k.pos(0, addAnExperienceButton.pos.y + 80),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
        ]);
        const increaseMaxHealthButtonText = increaseMaxHealthButton.add([
            k.text("Increase Max Health", {size: 20, font: "monogram", width: increaseMaxHealthButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(255, 255, 255))
        ]);

        const backButton = fullBorder.add([
            k.rect(150, 40, {radius: 10}),
            k.pos(0, increaseMaxHealthButton.pos.y + 80),
            k.anchor("center"),
            k.color(k.rgb(200, 50, 50)),
            k.outline(3, k.rgb(255, 100, 100)),
            k.area(),
            k.scale(1),
        ]);

        const backButtonText = backButton.add([
            k.text("Back", {size: 20, font: "monogram", width: backButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(255, 255, 255))
        ]);

        let isAddExperienceButtonHovered = false;
        addAnExperienceButton.onMousePress(() => {
            if (addAnExperienceButton.hasPoint(k.mousePos()))
            {
                isAddExperienceButtonHovered = true;
                k.tween(addAnExperienceButton.scale, k.vec2(1.1), 0.1, (s) => { addAnExperienceButton.scale = s  });
            }
        });

        addAnExperienceButton.onMouseRelease(() => {
            if (isAddExperienceButtonHovered)
            {
                k.tween(addAnExperienceButton.scale, k.vec2(1), 0.1, (s) => { addAnExperienceButton.scale = s  });
                k.wait(0.1, () => {
                    k.debug.log("Add Experience Clicked");
                    k.go("newCharExpUpgrade");
                });
            }
            isAddExperienceButtonHovered = false;
        });

        let isIncreaseMaxHealthButtonHovered = false;
        increaseMaxHealthButton.onMousePress(() => {
            if (increaseMaxHealthButton.hasPoint(k.mousePos()))
            {
                isIncreaseMaxHealthButtonHovered = true;
                k.tween(increaseMaxHealthButton.scale, k.vec2(1.1), 0.1, (s) => { increaseMaxHealthButton.scale = s  });
            }
        });

        increaseMaxHealthButton.onMouseRelease(() => {
            if (isIncreaseMaxHealthButtonHovered)
            {
                k.tween(increaseMaxHealthButton.scale, k.vec2(1), 0.1, (s) => { increaseMaxHealthButton.scale = s  });
                k.wait(0.1, () => {
                   k.go("increaseHPUpgrade");
                });   
            }
            isIncreaseMaxHealthButtonHovered = false;
        });

        let isBackButtonHovered = false;
        backButton.onMousePress(() => {
            if (backButton.hasPoint(k.mousePos()))
            {
                isBackButtonHovered = true;
                k.tween(backButton.scale, k.vec2(1.1), 0.1, (s) => { backButton.scale = s  });
            }
        });

        backButton.onMouseRelease(() => {
            if (isBackButtonHovered)
            {
                k.tween(backButton.scale, k.vec2(1), 0.1, (s) => { backButton.scale = s  });
                k.wait(0.1, () => {
                    k.go("charSheet");
                });
            }
            isBackButtonHovered = false;
        });

        k.onSceneLeave(() => {
        });

    });
}