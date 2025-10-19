import type { KAPLAYCtx } from "kaplay";
import * as Types from "../../../data/templates";
import { AddItemObj } from "../../../ui";
import * as Firebase from "../../../firebase"
import { AppStore } from "../../../store";

export function CreateNewCharInventory(k: KAPLAYCtx) : void
{
    
    k.scene("newCharInv", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "newCharInv",
            previousScene: prevState.currentScene,
        }), "CreateNewCharInventoryScene");
        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(94, 150, 255))
        ]);

        const titleText = fullBorder.add([
            k.text("Create A New Character", {size: 36, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 60),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255))
        ]);

        const subtitleText = fullBorder.add([
            k.text("Add Items to Your Character", {size: 18, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 120),
            k.anchor("center"),
            k.color(k.rgb(150, 200, 255))
        ]);

        const itemAddContainer = fullBorder.add([
            k.rect(fullBorder.width - 40, 150, {radius: 10}),
            k.pos(0, -fullBorder.height / 2 + 200),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153)),
        ]);

        const itemAddButton = itemAddContainer.add([
            k.rect(150, 50, {radius: 10}),
            k.pos(0, itemAddContainer.height / 2 - 25),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(0.75),
        ]);

        const itemAddButtonText = itemAddButton.add([
            k.text("Add Item", {size: 20, font: "monogram", width: itemAddButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        const itemNameInputPosition = k.add([
            k.rect(itemAddContainer.width - 20, 40, {radius: 10}),
            k.pos(k.center().x, k.center().y + itemAddContainer.pos.y - 45),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200)),
        ]);

        const itemUsagePoolInputPosition = k.add([
            k.rect((itemAddContainer.width - 20) / 2.2, 40, {radius: 10}),
            k.pos(k.center().x - (itemAddContainer.width - 20) / 4, k.center().y + itemAddContainer.pos.y + 5),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200)),
        ]);

        const itemUsageCapInputPosition = k.add([
            k.rect((itemAddContainer.width - 20) / 2.2, 40, {radius: 10}),
            k.pos(k.center().x + (itemAddContainer.width - 20) / 4, k.center().y + itemAddContainer.pos.y + 5),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200)),
        ]);

        const errorBox = fullBorder.add([
            k.rect(fullBorder.width - 40, 50, {radius: 10}),
            k.pos(0, fullBorder.height / 2 - 40),
            k.anchor("center"),
            k.color(k.rgb(200, 50, 50)),
            k.area()
        ]);

    

        const itemListContainer = fullBorder.add([
            k.rect(fullBorder.width - 40, fullBorder.height - 360, {radius: 10}),
            k.pos(0, fullBorder.height / 2 - ((fullBorder.height - 255) / 2) - 25),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153)),
            k.area(),
            k.mask("intersect"),
        ]);

        const itemListContainerVisualBorder = itemListContainer.add([
            k.rect(itemListContainer.width, itemListContainer.height, {fill: true, radius: 10}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153))
        ]);

        const finishButton = fullBorder.add([
            k.rect(200, 50, {radius: 10}),
            k.pos(0, fullBorder.height / 2 - 40),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
            k.z(100),
        ]);

        const finishButtonText = finishButton.add([
            k.text("Continue", {size: 24, font: "monogram", width: finishButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        let currentItem : Types.Item | null = null;

        const itemUsageModal = fullBorder.add([
            k.rect(300, 200, {radius: 10}),
            k.pos(0, 100),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
            k.area(),
            k.outline(5, k.rgb(94, 150, 255))
        ]);

        const itemUsageText = itemUsageModal.add([
            k.text("Item: None", {size: 24, font: "monogram", width: itemUsageModal.width - 20, align: "center"}),
            k.pos(0, -70),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
        ]);

        const itemUsageAmountText = itemUsageModal.add([
            k.text("Usage: 0 / 0", {size: 20, font: "monogram", width: itemUsageModal.width - 20, align: "center"}),
            k.pos(0, -45),
            k.anchor("center"),
            k.color(k.rgb(150, 200, 255)),
        ]);

        const useItemButton = itemUsageModal.add([
            k.rect(itemUsageModal.width - 40, 50, {radius: 10}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
        ]);

        const useItemButtonText = useItemButton.add([
            k.text("Use Item", {size: 20, font: "monogram", width: useItemButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        const repairItemButton = itemUsageModal.add([
            k.rect(itemUsageModal.width - 40, 50, {radius: 10}),
            k.pos(0, 60),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
        ]);

        const repairItemButtonText = repairItemButton.add([
            k.text("Repair Item", {size: 20, font: "monogram", width: repairItemButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        let isUseItemButtonHovered = false;
        useItemButton.onMousePress(() => {
            if (useItemButton.hasPoint(k.mousePos()))
            {
                isUseItemButtonHovered = true;
                k.tween(useItemButton.scale, k.vec2(1.1), 0.1, (s) => { useItemButton.scale = s  });
            }
        });

        useItemButton.onMouseRelease(() => {
            if (isUseItemButtonHovered)
            {
                k.tween(useItemButton.scale, k.vec2(1), 0.1, (s) => { useItemButton.scale = s  });
                k.debug.log("Used item:", currentItem);
                if (currentItem) 
                {
                    if (currentItem.usagePool > 0)
                    {
                        currentItem.usagePool--;
                        itemUsageAmountText.text = `Usage: ${currentItem.usagePool} / ${currentItem.usageCap}`;
                        RenderItems();
                    }
                }
            
            }
            isUseItemButtonHovered = false;
        });

        let isRepairItemButtonHovered = false;
        repairItemButton.onMousePress(() => {
            if (repairItemButton.hasPoint(k.mousePos()))
            {
                isRepairItemButtonHovered = true;
                k.tween(repairItemButton.scale, k.vec2(1.1), 0.1, (s) => { repairItemButton.scale = s  });
            }
        });

        repairItemButton.onMouseRelease(() => {
            if (isRepairItemButtonHovered)
            {
                k.tween(repairItemButton.scale, k.vec2(1), 0.1, (s) => { repairItemButton.scale = s  });
                k.debug.log("Repaired item:", currentItem);
                if (currentItem) 
                {
                    currentItem.usagePool++;
                    itemUsageAmountText.text = `Usage: ${currentItem.usagePool} / ${currentItem.usageCap}`;
                    RenderItems();
                }
            }
            isRepairItemButtonHovered = false;
        });

        itemUsageModal.pos.y = 500;

        let isFinishButtonHovered = false;
        finishButton.onMousePress(() => {
            if (finishButton.hasPoint(k.mousePos()))
            {
                isFinishButtonHovered = true;
                k.tween(finishButton.scale, k.vec2(1.1), 0.1, (s) => { finishButton.scale = s  });
            }
        });

        finishButton.onMouseRelease(() => {
            if (isFinishButtonHovered)
            {
                k.tween(finishButton.scale, k.vec2(1), 0.1, (s) => { finishButton.scale = s  });
                k.wait(0.1, () => {
                    k.go("charSheet");
                });
            }
            isFinishButtonHovered = false;
        });

        itemUsageModal.onMousePress(() => {
            if (!itemUsageModal.hasPoint(k.mousePos()))
            {
                k.tween(itemUsageModal.pos.y, 500, 0.2, (p) => { itemUsageModal.pos.y = p });
            }
        })

        
        function OnItemClick(item : Types.Item) 
        {
            if (itemUsageModal.pos.y < 500) return;

            currentItem = item;
            const itemName = currentItem.itemName;
            itemUsageText.text = `Item: ${itemName}`;
            const itemUsage = `${currentItem.usagePool} / ${currentItem.usageCap}`;
            itemUsageAmountText.text = `Usage: ${itemUsage}`;
            k.tween(itemUsageModal.pos.y, 100, 0.2, (p) => { itemUsageModal.pos.y = p });
        }
        
        function RenderItems() 
        {
            let currentYPos = -((itemListContainer.height / 2) - 20);
            const itemList = Types.RecordToItemList(AppStore.GetState().player.inventory);
            for (const item of itemList)
            {
                const itemObj = AddItemObj(k, item, itemListContainer, OnItemClick);
                itemObj.pos.y = currentYPos + (itemObj.height / 2);
                itemObj.pos.x -= 20;
                currentYPos += itemObj.height + 10;
                itemObj.width = itemListContainer.width - 50;
            }
        }

        RenderItems();
        const itemNameInputField = document.getElementById("itemNameInput") as HTMLInputElement;
        const itemUsagePoolInputField = document.getElementById("itemUsagePoolInput") as HTMLInputElement;
        const itemUsageCapInputField = document.getElementById("itemUsageCapInput") as HTMLInputElement;
        itemNameInputField.style.display = "block";
        itemUsagePoolInputField.style.display = "block";
        itemUsageCapInputField.style.display = "block";

        itemNameInputField.style.fontSize = "18px";
        itemNameInputField.style.top = itemNameInputPosition.pos.y - 20 + "px";
        itemNameInputField.style.width = (itemNameInputPosition.width) - 30 + "px";
        itemNameInputField.style.height = (itemNameInputPosition.height) - 25 + "px";

        itemUsagePoolInputField.style.fontSize = "18px";
        itemUsagePoolInputField.style.top = itemUsagePoolInputPosition.pos.y - 22 + "px";
        itemUsagePoolInputField.style.left = itemUsagePoolInputPosition.pos.x + "px";
        itemUsagePoolInputField.style.width = (itemUsagePoolInputPosition.width) - 30 + "px";
        itemUsagePoolInputField.style.height = (itemUsagePoolInputPosition.height) - 25 + "px";

        itemUsageCapInputField.style.fontSize = "18px";
        itemUsageCapInputField.style.top = itemUsageCapInputPosition.pos.y - 22 + "px";
        itemUsageCapInputField.style.left = itemUsageCapInputPosition.pos.x + "px";
        itemUsageCapInputField.style.width = (itemUsageCapInputPosition.width) - 30 + "px";
        itemUsageCapInputField.style.height = (itemUsageCapInputPosition.height) - 25 + "px";

        itemNameInputField.value = "Item Name";
        itemUsagePoolInputField.value = "Usage Pool";
        itemUsageCapInputField.value = "Usage Cap";

        const errorBoxText = errorBox.add([
            k.text("Invalid input", {size: 20, font: "monogram", width: errorBox.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
            k.z(-500),
        ]);

        errorBox.pos.y = -400;

        function ShowErrorBox(message: string) 
        {
            errorBoxText.text = message;
            k.tween(errorBox.pos.y, -fullBorder.height / 2 + 40, 0.2, (p) => { errorBox.pos.y = p });
            k.wait(3).then(() => {
                k.tween(errorBox.pos.y, -400, 0.5, (p) => { errorBox.pos.y = p });
            });
        }

        function CreateItemFromInputs(itemName: string, itemUsagePool: string, itemUsageCap: string): Types.Item | null
        {
            let n = itemName.trim();
            let uPool = parseInt(itemUsagePool);
            let uCap = parseInt(itemUsageCap);

            if (!n || isNaN(uPool) || isNaN(uCap)) {
                ShowErrorBox("Please fill out all fields correctly.");
                return null;
            }

            return {
                itemName: n,
                usagePool: uPool,
                usageCap: uCap
            };
        }

        let isItemAddButtonHovered = false;
        itemAddButton.onMousePress(() => {
            if (itemAddButton.hasPoint(k.mousePos())) 
            {
                isItemAddButtonHovered = true;
                k.tween(itemAddButton.scale, k.vec2(0.8), 0.1, (s) => { itemAddButton.scale = s  });
            }
        });

        itemAddButton.onMouseRelease(() => {
            if (isItemAddButtonHovered && itemAddButton.hasPoint(k.mousePos()))
            {
                isItemAddButtonHovered = false;
                k.tween(itemAddButton.scale, k.vec2(0.75), 0.1, (s) => { itemAddButton.scale = s  });
                k.wait(0.1, () => {
                    const newItem = CreateItemFromInputs(itemNameInputField.value, itemUsagePoolInputField.value, itemUsageCapInputField.value);
                    if (newItem) {
                        Types.AddItemToInventory(AppStore.GetState().player, newItem);
                        itemNameInputField.value = "";
                        itemUsagePoolInputField.value = "";
                        itemUsageCapInputField.value = "";

                        k.go("newCharInv");
                    }
                });
            }
        });

        let isDragging = false;
        let lastMouseY = 0;

        k.onMousePress(() => {
            if (itemListContainer.hasPoint(k.mousePos()))
            {
                isDragging = true;
                lastMouseY = k.mousePos().y;
            }
        });

        k.onMouseRelease(() => {
            isDragging = false;
        });

        k.onMouseMove(() => {
            if (isDragging) {
                const deltaY = k.mousePos().y - lastMouseY;

                for (const child of itemListContainer.children) {
                    if (child !== itemListContainerVisualBorder) {
                        child.pos.y += deltaY;
                    }
                }

                lastMouseY = k.mousePos().y;
            }
        });

        k.onSceneLeave(() => {
            Firebase.Publish("players/" + AppStore.GetState().player.characterID, AppStore.GetState().player);

            itemNameInputField.style.display = "none";
            itemUsagePoolInputField.style.display = "none";
            itemUsageCapInputField.style.display = "none";
        });
    });
}