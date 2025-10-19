import type { KAPLAYCtx } from "kaplay";
import * as Types from "../../data/templates.ts";
import { AddExperience, AddItemObj } from "../../ui.ts";
import { AppStore } from "../../store.ts";

export function CharSheetScene(k: KAPLAYCtx) : void 
{
    
    k.scene("charSheet", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "charSheet",
            previousScene: prevState.currentScene,
        }), "CharSheetScene");

        
        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, { radius: 10, fill: false }),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(200, 200, 200))
        ]);

        const titleText = fullBorder.add([
            k.text(`${AppStore.GetState().player.charName}`, { size: 20, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 50),
            k.anchor("center"),
            k.color(k.rgb(150, 200, 255))
        ]);

        const formattedTitle = k.formatText({
            text: `${AppStore.GetState().player.charName}`,
            size: 20,
            width: k.width() - 40,
            align: "center"
        })

        titleText.pos.y = (-k.height() / 2) + formattedTitle.height / 2 + 20;

        const levelText = fullBorder.add([
            k.text(`Level: ${AppStore.GetState().player.level} + CharID: ${AppStore.GetState().player.characterID}`, { size: 18, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 50),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150))
        ]);

        levelText.pos.y = titleText.pos.y + formattedTitle.height / 2 + 10 + levelText.height / 2;

        const hitPointText = fullBorder.add([
            k.text(`HP: ${AppStore.GetState().player.hitPoints} / ${AppStore.GetState().player.maxHitPoints}`, { size: 24, font: "monogram", width: k.width() - 40, align: "left" }),
            k.pos(0, -k.height() / 2 + formattedTitle.height + levelText.height + 70),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150))
        ]);

        const changeHealthButton = fullBorder.add([
            k.rect(150, 40, { radius: 10 }),
            k.pos(fullBorder.width / 2 - 85, hitPointText.pos.y),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(150, 200, 255)),
            k.area(),
            k.scale(1),
        ]);

        const changeHealthButtonText = changeHealthButton.add([
            k.text("Change HP", { size: 18, font: "monogram", width: changeHealthButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        const experienceScrollContainer = fullBorder.add([
            k.rect(fullBorder.width - 20, fullBorder.height / 4, { radius: 10 }),
            k.pos(0, changeHealthButton.pos.y + 100),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153)),
            k.mask("intersect"),
            k.area()
        ]);

        const experienceScrollBorder = experienceScrollContainer.add([
            k.rect(experienceScrollContainer.width, experienceScrollContainer.height, { fill: true, radius: 10 }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153))
        ]);

        const inventoryScrollContainer = fullBorder.add([
            k.rect(fullBorder.width - 20, fullBorder.height / 3, { radius: 10 }),
            k.pos(0, fullBorder.height / 2 - (fullBorder.height / 3) / 2 - 60),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153)),
            k.mask("intersect"),
            k.area()
        ]);

        const inventoryScrollBorder = inventoryScrollContainer.add([
            k.rect(inventoryScrollContainer.width, inventoryScrollContainer.height, { fill: true, radius: 10 }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153))
        ]);

        const levelUpButton = fullBorder.add([
            k.rect(150, 40, { radius: 10 }),
            k.pos(0, fullBorder.height / 2 - 30),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 50)),
            k.outline(3, k.rgb(250, 250, 150)),
            k.area(),
            k.scale(1),
        ]);

        const levelUpButtonText = levelUpButton.add([
            k.text("Level Up", { size: 18, font: "monogram", width: levelUpButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        function OnItemClick(item : Types.Item)
        {
            if (mouseInExperience) return;
            k.debug.log(`Clicked on item: ${item.itemName}`);
            AppStore.SetState(prevState => ({
                ...prevState,
                currentItemInUse : item
            }), "CharSheet_OnItemClick");
            k.go("itemUsageMenu");
        }

        function OnChangeHPClick()
        {
            k.debug.log("Change HP Clicked");
        }

        function OnLevelUpClick()
        {
            k.debug.log("Level Up Clicked");
        }

        hitPointText.text = `HP: ${AppStore.GetState().player.hitPoints} / ${AppStore.GetState().player.maxHitPoints}`;
        if (AppStore.GetState().player.hitPoints <= AppStore.GetState().player.maxHitPoints * 0.3)
        {
            hitPointText.color = k.rgb(255, 50, 50);
        }
        else 
        {
            hitPointText.color = k.rgb(150, 150, 150);
        }

        levelText.text = `Level: ${AppStore.GetState().player.level} | CharID: ${AppStore.GetState().player.characterID}`;

        let experienceCurrentYPos = -((experienceScrollContainer.height / 2) - 10);
        AppStore.GetState().player.experienceList.forEach((exp : Types.Experience) => {
            const expObj = AddExperience(k, exp, experienceScrollContainer, () => {});
            expObj.pos.y = experienceCurrentYPos + (expObj.height / 2);
            experienceCurrentYPos += expObj.height + 10;
            expObj.width = experienceScrollContainer.width - 50;
            expObj.pos.x = -15;
        });

        let inventoryCurrentYPos = -((inventoryScrollContainer.height / 2) - 10);
        let inventoryList : Types.Item[] = Types.RecordToItemList(AppStore.GetState().player.inventory);
        inventoryList.forEach((item : Types.Item) => {
            const itemObj = AddItemObj(k, item, inventoryScrollContainer, OnItemClick);
            itemObj.pos.y = inventoryCurrentYPos + (itemObj.height / 2);
            inventoryCurrentYPos += itemObj.height + 10;
            itemObj.width = inventoryScrollContainer.width - 50;
            itemObj.pos.x = -15;
        });


        let mouseInExperience : boolean = false;

        k.onUpdate(() => {

            mouseInExperience = experienceScrollContainer.hasPoint(k.mousePos());

        })

        


    });
}