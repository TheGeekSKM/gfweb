import type { KAPLAYCtx } from "kaplay";

export function MainMenuScene(k: KAPLAYCtx) : void
{
    k.scene("mainMenu", () => {
    const fullBorder = k.add([
        k.rect(k.width() - 20, k.height() - 20, {fill: false, radius: 16}),
        k.anchor("center"),
        k.pos(k.width() / 2, k.height() / 2),
        k.outline(5, k.rgb(200, 200, 200)),
    ]);

    const titleText = fullBorder.add([
        k.text("Gamblers Fallacy RPG", { size: 48, font: "monogram" }),
        k.pos(0, -k.height() / 2 + 50),
        k.anchor("center"),
        k.color(k.rgb(200, 200, 200)),
    ]);

    const subtitleText = fullBorder.add([
        k.text("By Sai Mangipudi", { size: 24, font: "monogram" }),
        k.pos(0, -k.height() / 2 + 100),
        k.anchor("center"),
        k.color(k.rgb(150, 150, 150)),
    ]);

    const buttonBorder = fullBorder.add([
        k.rect(250, 200, { fill: false, radius: 12 }),
        k.pos(0, 0),
        k.anchor("center"),
        k.outline(5, k.rgb(200, 200, 200))
    ]);

    const playerModeButton = buttonBorder.add([
        k.rect(200, 60, { fill: true, radius: 8 }),
        k.pos(0, -40),
        k.anchor("center"),
        k.color(k.rgb(50, 150, 50)),
        k.outline(3, k.rgb(150, 250, 150)),
        k.area(),
        k.scale(1),
    ]);

    const playerModeButtonText = playerModeButton.add([
        k.text("Player Mode", { size: 32, font: "monogram" }),
        k.pos(0, -3),
        k.anchor("center"),
        k.color(k.rgb(150, 250, 150)),
        k.area(),
        k.scale(1),
    ]);

    const gmModeButton = buttonBorder.add([
        k.rect(200, 60, { fill: true, radius: 8 }),
        k.pos(0, 40),
        k.anchor("center"),
        k.color(k.rgb(50, 50, 150)),
        k.outline(3, k.rgb(150, 150, 250)),
        k.area(),
        k.scale(1),
    ]);

    const gmModeButtonText = gmModeButton.add([
        k.text("GM Mode", { size: 32, font: "monogram" }),
        k.pos(0, -3),
        k.anchor("center"),
        k.color(k.rgb(150, 150, 250)),
        k.area(),
        k.scale(1),
    ]);

    let isPlayerModeButtonHovered = false;
    playerModeButton.onMouseDown(() => {
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
                k.debug.log("Switching to Player Mode...");
            });
        }
    });

    let isGmModeButtonHovered = false;
    gmModeButton.onMouseDown(() => {
        if (gmModeButton.hasPoint(k.mousePos())) 
        {
            isGmModeButtonHovered = true;
            k.tween(gmModeButton.scale, k.vec2(1.1), 0.1, (s) => { gmModeButton.scale = s  });
        }
    });

    gmModeButton.onMouseRelease(() => {
        if (isGmModeButtonHovered) 
        {
            k.tween(gmModeButton.scale, k.vec2(1), 0.1, (s) => { gmModeButton.scale = s  });
            k.wait(0.1, () => {
                k.debug.log("Switching to GM Mode...");
            });
        }
    });

    });
}