import type { KAPLAYCtx } from "kaplay";
import { AppStore } from "../store";

export function MainMenuScene(k: KAPLAYCtx) : void
{
    k.scene("mainMenu", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "mainMenu",
            previousScene: prevState.currentScene,
        }), "MainMenuScene");

        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {fill: false, radius: 16}),
            k.anchor("center"),
            k.pos(k.width() / 2, k.height() / 2),
            k.outline(5, k.rgb(200, 200, 200)),
        ]);

        const titleText = fullBorder.add([
            k.text("Gamblers Fallacy RPG", { size: 48, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 70),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200)),
        ]);

        const subtitleText = fullBorder.add([
            k.text("By Sai Mangipudi", { size: 24, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 150),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150)),
        ]);

        const explanationText = fullBorder.add([
            k.text("This is simply a Companion App for the RPG. It does not contain any of the rules... :(", { size: 24, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, k.height() / 2 - 80),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150)),
        ]);

        const playerModeButton = fullBorder.add([
            k.rect(fullBorder.width - 40, 60, { fill: true, radius: 8 }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(50, 150, 50)),
            k.outline(3, k.rgb(150, 250, 150)),
            k.area(),
            k.scale(1),
        ]);

        const playerModeButtonText = playerModeButton.add([
            k.text("Begin", { size: 32, font: "monogram" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(150, 250, 150)),
            k.area(),
            k.scale(1),
        ]);

        

        let isPlayerModeButtonHovered = false;
        playerModeButton.onMousePress(() => {
            if (playerModeButton.hasPoint(k.mousePos())) 
            {
                isPlayerModeButtonHovered = true;
                k.tween(playerModeButton.scale, k.vec2(1.1), 0.1, (s) => { playerModeButton.scale = s  });
            }
        });

        playerModeButton.onMouseRelease(() => {
            if (isPlayerModeButtonHovered) 
            {
                k.tween(playerModeButton.scale, k.vec2(1), 0.1, (s) => { playerModeButton.scale = s  });
                k.wait(0.1, () => {
                    k.go("pLoadCreateChar");
                });
            }
        });

       

    });
}