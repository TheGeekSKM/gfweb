import type { KAPLAYCtx } from "kaplay";

export function LoadCreateCharMenu(k: KAPLAYCtx) 
{
    k.scene("pLoadCreateChar", () => {
        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(94, 150, 255))
        ]);

        const titleText = fullBorder.add([
            k.text("Load or Create New Character", {size: 48, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -k.height() / 2 + 90),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255))
        ]);

        const choiceBorder = fullBorder.add([
            k.rect(k.width() - 100, 300, {radius: 10}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153)),
        ]);

        const dividerBar = choiceBorder.add([
            k.rect(choiceBorder.width, 5),
            k.pos(0, -choiceBorder.height / 2 + 100),
            k.anchor("center"),
            k.color(k.getBackground() ?? k.rgb(5, 5, 5))
        ]);

        const createNewCharButton = choiceBorder.add([
            k.rect(choiceBorder.width - 40, 60, {radius: 10}),
            k.pos(0, -choiceBorder.height / 2 + 50),
            k.anchor("center"),
            k.color(k.getBackground() ?? k.rgb(5, 5, 5)),
            k.outline(5, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
            k.rotate(0),
        ]);

        const createNewCharButtonText = createNewCharButton.add([
            k.text("Create A New Character", {size: 24, font: "monogram", width: createNewCharButton.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color( k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
        ]);

        let isCreateNewCharButtonHovered = false;
        createNewCharButton.onMousePress(() => {
            if (createNewCharButton.hasPoint(k.mousePos())) 
            {
                isCreateNewCharButtonHovered = true;
                k.tween(createNewCharButton.scale, k.vec2(1.1), 0.1, (s) => { createNewCharButton.scale = s  });
            }
        });

        createNewCharButton.onMouseRelease(() => {
            if (isCreateNewCharButtonHovered) 
            {
                k.tween(createNewCharButton.scale, k.vec2(1), 0.1, (s) => { createNewCharButton.scale = s  });
                k.wait(0.1, () => {
                    k.go("newCharExp");
                });
            }
        });


        const loadCharInputFieldBorder = choiceBorder.add([
            k.rect(choiceBorder.width - 40, 50, {radius: 10}),
            k.pos(0, dividerBar.pos.y + 70),
            k.anchor("center"),
            k.color(k.rgb(56, 90, 153)),
        ]);

        // const loadCharText = loadCharInputFieldBorder.add([
        //     k.text("Enter Character ID to Load:", {size: 24, font: "monogram", width: loadCharInputFieldBorder.width - 20, align: "center"}),
        //     k.pos(0, 0),
        //     k.textInput(),
        //     k.anchor("center"),
        //     k.color( k.rgb(181, 205, 255)),
        // ]);

        const loadCharInputFieldLabel = loadCharInputFieldBorder.add([
            k.text("Character ID:", {size: 24, font: "monogram", width: loadCharInputFieldBorder.width - 20, align: "left"}),
            k.pos(0, -40),
            k.anchor("center"),
            k.color( k.rgb(181, 205, 255)),
        ]);


        const loadCharButtonBorder = choiceBorder.add([
            k.rect(choiceBorder.width - 40, 60, {radius: 10}),
            k.pos(0, dividerBar.pos.y + 150),
            k.anchor("center"),
            k.color(k.getBackground() ?? k.rgb(5, 5, 5)),
            k.outline(5, k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
            k.rotate(0),
        ]);


        const loadCharButtonText = loadCharButtonBorder.add([
            k.text("Load Previous Character", {size: 24, font: "monogram", width: loadCharButtonBorder.width - 20, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color( k.rgb(181, 205, 255)),
            k.area(),
            k.scale(1),
        ]);

        let isLoadCharButtonHovered = false;
        loadCharButtonBorder.onMousePress(() => {
            if (loadCharButtonBorder.hasPoint(k.mousePos())) 
            {
                isLoadCharButtonHovered = true;
                k.tween(loadCharButtonBorder.scale, k.vec2(1.1), 0.1, (s) => { loadCharButtonBorder.scale = s  });
            }
        });

        loadCharButtonBorder.onMouseRelease(() => {
            if (isLoadCharButtonHovered) 
            {
                k.tween(loadCharButtonBorder.scale, k.vec2(1), 0.1, (s) => { loadCharButtonBorder.scale = s  });
                k.wait(0.1, () => {
                    k.debug.log("Loading Character...");
                });
            }
        });

        const loadCharInputField = document.getElementById("loadPlayerInput") as HTMLInputElement;
        loadCharInputField.style.display = "block";
        loadCharInputField.style.top = (k.center().y + choiceBorder.pos.y + dividerBar.pos.y + 70 - loadCharInputFieldBorder.height / 2) - 5 + "px";
        loadCharInputField.style.width = (loadCharInputFieldBorder.width - 20) + "px";
        loadCharInputField.style.height = (loadCharInputFieldBorder.height) - 15 + "px";

        k.onSceneLeave(() => {
            loadCharInputField.style.display = "none";
        })
    });
}