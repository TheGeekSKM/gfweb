import type { KAPLAYCtx } from "kaplay";
import * as Data from "../../../data/globalData.ts";
import * as Types from "../../../data/templates.ts";
import { AddExperience } from "../../../ui.ts";

export function CreateNewCharExperiences(k: KAPLAYCtx, ) : void
{
    k.scene("newCharExp",  () => {

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
        k.text("Add Experiences to Your Character", {size: 18, font: "monogram", width: k.width() - 40, align: "center"}),
        k.pos(0, -k.height() / 2 + 120),
        k.anchor("center"),
        k.color(k.rgb(150, 200, 255))
    ]);

    const experienceAddContainer = fullBorder.add([
        k.rect(fullBorder.width - 40, 150, {radius: 10}),
        k.pos(0, -fullBorder.height / 2 + 200),
        k.anchor("center"),
        k.color(k.rgb(56, 90, 153)),
    ]);

    const experienceInputFieldPosition = k.add([
        k.rect(150, 50, {radius: 10}),
        k.pos(k.center().x, k.center().y + experienceAddContainer.pos.y - 30),
        k.anchor("center"),
        k.color(k.rgb(200, 200, 200)),
    ]);

    const addExperienceButton = experienceAddContainer.add([
        k.rect(150, 50, {radius: 10}),
        k.pos(0, experienceAddContainer.height / 2 - 40),
        k.anchor("center"),
        k.color(k.rgb(94, 150, 255)),
        k.outline(3, k.rgb(181, 205, 255)),
        k.area(),
        k.scale(1),
    ]);

    const addExperienceButtonText = addExperienceButton.add([
        k.text("Add Experience", {size: 20, font: "monogram", width: addExperienceButton.width - 20, align: "center"}),
        k.pos(0, 0),
        k.anchor("center"),
        k.color(k.rgb(5, 5, 5)),
    ]);

    let isAddExperienceButtonHovered = false;
    addExperienceButton.onMousePress(() => {
        if (addExperienceButton.hasPoint(k.mousePos()))
        {
            isAddExperienceButtonHovered = true;
            k.tween(addExperienceButton.scale, k.vec2(1.1), 0.1, (s) => { addExperienceButton.scale = s  });
        }
    });

    function AddExperienceToList()
    {
        const experienceValue = experienceInputField.value.trim();
        if (experienceValue !== "")
        {
            Data.PLAYER.experienceList.push({ name: experienceValue, level: 1 });
            experienceInputField.value = "";
            k.go("newCharExp");
        }
    }

    addExperienceButton.onMouseRelease(() => {
        if (isAddExperienceButtonHovered)
        {
            k.tween(addExperienceButton.scale, k.vec2(1), 0.1, (s) => { addExperienceButton.scale = s  });
            k.wait(0.1, () => {
                AddExperienceToList();
            });
        }
        isAddExperienceButtonHovered = false;
    });

    const experienceListContainer = fullBorder.add([
        k.rect(fullBorder.width - 40, fullBorder.height - 360, {radius: 10}),
        k.pos(0, fullBorder.height / 2 - ((fullBorder.height - 255) / 2) - 25),
        k.anchor("center"),
        k.color(k.rgb(56, 90, 153)),
        k.mask("intersect"),
        k.area()
    ]);

    const experienceContainerVisualBorder = experienceListContainer.add([
        k.rect(experienceListContainer.width, experienceListContainer.height, {fill: true, radius: 10}),
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
    ]);

    const finishButtonText = finishButton.add([
        k.text("Continue", {size: 24, font: "monogram", width: finishButton.width - 20, align: "center"}),
        k.pos(0, 0),
        k.anchor("center"),
        k.color(k.rgb(5, 5, 5)),
    ]);

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
                k.go("newCharInv");
            });
        }
        isFinishButtonHovered = false;
    });

    function OnExperienceClick(exp : Types.Experience)
    {
        Data.PLAYER.experienceList = Data.PLAYER.experienceList.filter(e => e !== exp);
        k.go("newCharExp");
    }

    let currentYPos = -((experienceListContainer.height / 2) - 20);
    for (const exp of Data.PLAYER.experienceList)
    {
        const expObj = AddExperience(k, exp, experienceListContainer, OnExperienceClick);
        expObj.pos.y = currentYPos + (expObj.height / 2);
        expObj.pos.x -= 20;
        currentYPos += expObj.height + 10;
        expObj.width = experienceListContainer.width - 70;
    }

    const experienceInputField = document.getElementById("hitPointsInput") as HTMLInputElement;
    if (experienceInputField) {
        experienceInputField.value = "Enter Experience Here";
        experienceInputField.style.position = "absolute";
        experienceInputField.style.top = experienceInputFieldPosition.pos.y - 30 + "px";
        experienceInputField.style.left = experienceInputFieldPosition.pos.x + "px";
        experienceInputField.style.width = experienceListContainer.width - 50 + "px";
        experienceInputField.style.height = "30px";
        experienceInputField.style.fontSize = "20px";
        experienceInputField.style.textAlign = "center";
        experienceInputField.style.display = "block";
    }

    let isDragging = false;
    let lastMouseY = 0;

    // Use global mouse events to handle dragging outside the box
    k.onMousePress(() => {
        if (experienceListContainer.hasPoint(k.mousePos())) {
            isDragging = true;
            lastMouseY = k.mousePos().y;
        }
    });

    k.onMouseMove(() => {
        if (isDragging) {
            const deltaY = k.mousePos().y - lastMouseY;
            
            // Move all children of the container except the visual border
            for (const child of experienceListContainer.children) {
                if (child !== experienceContainerVisualBorder) {
                    child.pos.y += deltaY;
                }
            }

            lastMouseY = k.mousePos().y;
        }
    });

    k.onMouseRelease(() => {
        isDragging = false;
    });
});
}