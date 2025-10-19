import { type KAPLAYCtx } from "kaplay";
import { AppStore } from "../../store";
import * as Types from "../../data/templates.ts";
import * as Firebase from "../../firebase.ts";

export function ItemUsageMenu(k: KAPLAYCtx)
{
    k.scene("itemUsageMenu", () => {

        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "itemUsageMenu",
            previousScene: prevState.currentScene,
        }), "ItemUsageMenuScene");

        let usedPips : number = 0;

        let currentItem: Types.Item = AppStore.GetState().currentItemInUse ?? {
            itemName: "Null",
            usageCap: 0,
            usagePool: 0,
        };

        let fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(255, 171, 38))
        ]);

        let titleText = fullBorder.add([
            k.text(`${currentItem.itemName}`, {size: 32, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 50),
            k.anchor("center"),
            k.color(k.rgb(255, 171, 38))
        ]);

        let explanationText = fullBorder.add([
            k.text(`You may use up to ${currentItem.usageCap} pips from the Usage Pool on this turn.
                `, {size: 18, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 120),
            k.anchor("center"),
            k.color(k.rgb(100, 100, 100))
        ]);

        let usagePoolText = fullBorder.add([
            k.text(`Usage Pool: ${currentItem.usagePool}`, {size: 24, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 160),
            k.anchor("center"),
            k.color(k.rgb(255, 171, 38))
        ]);

        let usageCapText = fullBorder.add([
            k.text(`Usage Cap: ${currentItem.usageCap}`, {size: 24, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 200),
            k.anchor("center"),
            k.color(k.rgb(255, 171, 38))
        ]);

        let useItemButton = fullBorder.add([
            k.rect(200, 50, {radius: 10, fill: true}),
            k.pos(0, k.height() / 2 - 300),
            k.anchor("center"),
            k.color(k.rgb(255, 214, 150)),
            k.outline(5, k.rgb(253, 123, 0)),
            k.area(),
            k.scale(1),
            "useItemButton"
        ]);

        let useItemButtonText = useItemButton.add([
            k.text("Use Item", {size: 24, font: "monogram", width: useItemButton.width - 40, align: "center"}),
            k.anchor("center"),
            k.pos(0, 0),
            k.color(k.rgb(5, 5, 5))
        ]);

        let repairItemButton = fullBorder.add([
            k.rect(200, 50, {radius: 10, fill: true}),
            k.pos(0, useItemButton.pos.y + 80),
            k.anchor("center"),
            k.color(k.rgb(255, 214, 150)),
            k.outline(5, k.rgb(253, 123, 0)),
            k.area(),
            k.scale(1),
            "repairItemButton"
        ]);

        let repairItemButtonText = repairItemButton.add([
            k.text("Repair Item", {size: 24, font: "monogram", width: repairItemButton.width - 40, align: "center"}),
            k.anchor("center"),
            k.pos(0, 0),
            k.color(k.rgb(5, 5, 5))
        ]);

        let backButton = fullBorder.add([
            k.rect(150, 40, {radius: 10, fill: true}),
            k.pos(0, k.height() / 2 - 50),
            k.anchor("center"),
            k.color(k.rgb(255, 214, 150)),
            k.outline(5, k.rgb(253, 123, 0)),
            k.area(),
            k.scale(1),
            "backButton"
        ]);

        let backButtonText = backButton.add([
            k.text("Back", {size: 24, font: "monogram", width: backButton.width - 40, align: "center"}),
            k.anchor("center"),
            k.pos(0, 0),
            k.color(k.rgb(5, 5, 5))
        ]);

        let errorText = fullBorder.add([
            k.text("", {size: 18, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, repairItemButton.pos.y + 80),
            k.anchor("center"),
            k.color(k.rgb(255, 0, 0))
        ]);

        // literal cringe but it works
        function ReRender()
        {
            usagePoolText.text = `Usage Pool: ${currentItem.usagePool}`;
            usageCapText.text = `Usage Cap: ${currentItem.usageCap}`;
            errorText.text = "";
        }

        function ShowError(message: string)
        {
            errorText.text = message;
            errorText.color = k.rgb(255, 0, 0);

            k.wait(2, () => {
                k.tween(errorText.color, k.getBackground() ?? k.rgb(5, 5, 5), 0.5, (c) => {
                    errorText.color = c;
                });
                k.wait(0.5, () => {
                    errorText.text = "";
                });
            });
        }

        let isHoveringUseItem = false;
        let isHoveringRepairItem = false;
        let isHoveringBack = false;
        useItemButton.onMousePress(() => {
            if (useItemButton.hasPoint(k.mousePos()))
            {
                isHoveringUseItem = true;
                k.tween(useItemButton.scale, k.vec2(1.1), 0.1, (s) => {
                    useItemButton.scale = s;
                });
            }
        });

        useItemButton.onMouseRelease(() => {
            if (isHoveringUseItem)
            {
                if (useItemButton.hasPoint(k.mousePos()))
                {
                    
                    if (currentItem.usagePool < 0)
                    {
                        ShowError("Cannot use item: Usage Pool is zero.");
                    }
                    else if (usedPips >= currentItem.usageCap)
                    {
                        ShowError("Cannot use item: Usage Cap reached for this turn.");
                    }
                    else 
                    {
                        currentItem.usagePool -= 1;
                        usedPips += 1;
                        ReRender();
                    }
                }

                k.tween(useItemButton.scale, k.vec2(1), 0.1, (s) => {
                    useItemButton.scale = s;
                });
            }
        });

        repairItemButton.onMousePress(() => {
            if (repairItemButton.hasPoint(k.mousePos()))
            {
                isHoveringRepairItem = true;
                k.tween(repairItemButton.scale, k.vec2(1.1), 0.1, (s) => {
                    repairItemButton.scale = s;
                });
            }
        });

        repairItemButton.onMouseRelease(() => {
            if (isHoveringRepairItem)
            {
                if (repairItemButton.hasPoint(k.mousePos()))
                {
                    // Repair Item Logic
                    currentItem.usagePool += 1;
                    ReRender();
                }

                k.tween(repairItemButton.scale, k.vec2(1), 0.1, (s) => {
                    repairItemButton.scale = s;
                });
            }
        });

        backButton.onMousePress(() => {
            if (backButton.hasPoint(k.mousePos()))
            {
                isHoveringBack = true;
                k.tween(backButton.scale, k.vec2(1.1), 0.1, (s) => {
                    backButton.scale = s;
                });
            }
        });

        backButton.onMouseRelease(() => {
            if (isHoveringBack)
            {
                if (backButton.hasPoint(k.mousePos()))
                {
                    // Back Button Logic
                    k.go(AppStore.GetState().previousScene === "" ? "mainMenu" : AppStore.GetState().previousScene);
                }

                k.tween(backButton.scale, k.vec2(1), 0.1, (s) => {
                    backButton.scale = s;
                });
            }
        });

        k.onSceneLeave(() => {
            Firebase.Publish(`players/${AppStore.GetState().player.characterID}/inventory/${currentItem.itemName}`, currentItem);
        });

    });
}