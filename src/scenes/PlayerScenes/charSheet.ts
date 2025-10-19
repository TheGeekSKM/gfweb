import type { KAPLAYCtx, GameObj } from "kaplay";
import * as Types from "../../data/templates.ts";
import { AddExperience, AddItemObj } from "../../ui.ts";
import { AppStore } from "../../store.ts";
import * as Firebase from "../../firebase.ts";

export function CharSheetScene(k: KAPLAYCtx) : void 
{

    
    
    k.scene("charSheet", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "charSheet",
            previousScene: prevState.currentScene,
        }), "CharSheetScene");
        
        
        const Unsubscribe = Firebase.Subscribe(`players/${AppStore.GetState().player.characterID}`, (data) => {
            if (data) {
                AppStore.SetState(prevState => ({  
                    ...prevState,
                    player: {
                        ...prevState.player,
                        ...data
                    }
                }), "CharSheet_FirebasePlayerDataUpdate");
    
                Render();
            }
    
        });

        

        k.onSceneLeave(() => {
            Unsubscribe();
        });


        
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
            k.pos(0, changeHealthButton.pos.y + (fullBorder.height / 4) / 2 + 40),
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
            k.rect(130, 40, { radius: 10 }),
            k.pos(-fullBorder.width / 2 + 95, fullBorder.height / 2 - 30),
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

        const addItemButton = fullBorder.add([
            k.rect(130, 40, { radius: 10 }),
            k.pos(fullBorder.width / 2 - 95, fullBorder.height / 2 - 30),
            k.anchor("center"),
            k.color(k.rgb(50, 200, 50)),
            k.outline(3, k.rgb(150, 250, 150)),
            k.area(),
            k.scale(1),
        ]);

        const addItemButtonText = addItemButton.add([
            k.text("Add Item", { size: 18, font: "monogram", width: addItemButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        function OnItemClick(item : Types.Item)
        {
            if (mouseInExperience) return;
            AppStore.SetState(prevState => ({
                ...prevState,
                currentItemInUse : item
            }), "CharSheet_OnItemClick");
            k.go("itemUsageMenu");
        }

        function OnChangeHPClick()
        {
            k.go("takeDamageMenu");
        }

        function OnLevelUpClick()
        {
            k.go("levelUpMenu");
        }

        let expObjectList : GameObj[] = [];
        let itemObjectList : GameObj[] = [];

        function Render()
        {
            titleText.text = `${AppStore.GetState().player.charName}`;
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

            for (const obj of expObjectList) {
                obj.destroy();
            }
            expObjectList = [];

            for (const obj of itemObjectList) {
                obj.destroy();
            }
            itemObjectList = [];

            let experienceCurrentYPos = -((experienceScrollContainer.height / 2) - 10);
            AppStore.GetState().player.experienceList.forEach((exp : Types.Experience) => {
                const expObj = AddExperience(k, exp, experienceScrollContainer, () => {});
                expObj.pos.y = experienceCurrentYPos + (expObj.height / 2);
                experienceCurrentYPos += expObj.height + 10;
                expObj.width = experienceScrollContainer.width - 50;
                expObj.pos.x = -15;
                expObjectList.push(expObj);
            });

            let inventoryCurrentYPos = -((inventoryScrollContainer.height / 2) - 10);
            let inventoryList : Types.Item[] = Types.RecordToItemList(AppStore.GetState().player.inventory);
            inventoryList.forEach((item : Types.Item) => {
                const itemObj = AddItemObj(k, item, inventoryScrollContainer, OnItemClick);
                itemObj.pos.y = inventoryCurrentYPos + (itemObj.height / 2);
                inventoryCurrentYPos += itemObj.height + 10;
                itemObj.width = inventoryScrollContainer.width - 50;
                itemObj.pos.x = -15;
                itemObjectList.push(itemObj);
            });
        }

        Render();


        let mouseInExperience : boolean = false;

        k.onUpdate(() => {

            mouseInExperience = experienceScrollContainer.hasPoint(k.mousePos());

        })

        let isHoveringOverChangeHealthButton = false;
        changeHealthButton.onMousePress(() => {
            if (changeHealthButton.hasPoint(k.mousePos())) 
            {
                isHoveringOverChangeHealthButton = true;
                k.tween(changeHealthButton.scale, k.vec2(1.1), 0.1, (s) => { changeHealthButton.scale = s  });
            }
        });

        changeHealthButton.onMouseRelease(() => {
            if (isHoveringOverChangeHealthButton) 
            {
                k.tween(changeHealthButton.scale, k.vec2(1), 0.1, (s) => { changeHealthButton.scale = s; });
                k.wait(0.1, () => {
                    OnChangeHPClick();
                });
                isHoveringOverChangeHealthButton = false;
            }
        });

        let isHoveringOverLevelUpButton = false;
        levelUpButton.onMousePress(() => {
            if (levelUpButton.hasPoint(k.mousePos())) 
            {
                isHoveringOverLevelUpButton = true;
                k.tween(levelUpButton.scale, k.vec2(1.1), 0.1, (s) => { levelUpButton.scale = s  });
            }
        });

        levelUpButton.onMouseRelease(() => {
            if (isHoveringOverLevelUpButton) 
            {
                k.tween(levelUpButton.scale, k.vec2(1), 0.1, (s) => { levelUpButton.scale = s; });
                k.wait(0.1, () => {
                    OnLevelUpClick();
                });
                isHoveringOverLevelUpButton = false;
            }
        });

        let isHoveringOverAddItemButton = false;
        addItemButton.onMousePress(() => {
            if (addItemButton.hasPoint(k.mousePos()))
            {
                isHoveringOverAddItemButton = true;
                k.tween(addItemButton.scale, k.vec2(1.1), 0.1, (s) => { addItemButton.scale = s  });
            }
        });

        addItemButton.onMouseRelease(() => {
            if (isHoveringOverAddItemButton)
            {
                k.tween(addItemButton.scale, k.vec2(1), 0.1, (s) => { addItemButton.scale = s  });
                k.wait(0.1, () => {
                    k.go("addItemMenu");
                });
            }
            isHoveringOverAddItemButton = false;
        });

        let isDraggingExperience = false;
        let lastMouseYExpPos = 0;

        let isDraggingInventory = false;
        let lastMouseYInvPos = 0;

        k.onMousePress(() => {
            if (experienceScrollContainer.hasPoint(k.mousePos()))
            {
                isDraggingExperience = true;
                lastMouseYExpPos = k.mousePos().y;
            }
            else if (inventoryScrollContainer.hasPoint(k.mousePos()))
            {
                isDraggingInventory = true;
                lastMouseYInvPos = k.mousePos().y;
            }
        })

        k.onMouseRelease(() => {
            isDraggingExperience = false;
            isDraggingInventory = false;
        });

        k.onMouseMove(() => {
            if (isDraggingExperience)
            {
                const deltaY = k.mousePos().y - lastMouseYExpPos;
                for (const obj of expObjectList)
                {
                    if (obj !== experienceScrollBorder)
                    {
                        obj.pos.y += deltaY;
                    }
                }

                lastMouseYExpPos = k.mousePos().y;
            }
            else if (isDraggingInventory)
            {
                const deltaY = k.mousePos().y - lastMouseYInvPos;
                for (const obj of itemObjectList)
                {
                    if (obj !== inventoryScrollBorder)
                    {
                        obj.pos.y += deltaY;
                    }
                }
                lastMouseYInvPos = k.mousePos().y;
            }
        })

    });
}