import type { KAPLAYCtx } from "kaplay";
import * as Data from "../../../data/globalData.ts";
import { AppStore } from "../../../store.ts";

export function CreateNewCharName(k: KAPLAYCtx) : void
{
    
    k.scene("newPlayerName", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "newPlayerName",
            previousScene: prevState.currentScene,
        }), "CreateNewCharNameScene");
        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, { radius: 10, fill: false }),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(200, 200, 200))
        ]);

        const titleText = fullBorder.add([
            k.text("Create A New Character", { size: 36, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 60),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200))
        ]);

        const subtitleText = fullBorder.add([
            k.text("Enter Your Character's Name", { size: 18, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 120),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150))
        ]);

        const nameInputFieldPosition = k.add([
            k.rect(300, 50, { radius: 10 }),
            k.pos(k.center().x, k.center().y - 20),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200)),
        ]);

        const proceedButton = fullBorder.add([
            k.rect(150, 50, { radius: 10 }),
            k.pos(0, fullBorder.height / 2 - 80),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255)),
            k.outline(3, k.rgb(150, 200, 255)),
            k.area(),
            k.scale(1),
        ]);

        const proceedButtonText = proceedButton.add([
            k.text("Proceed", { size: 20, font: "monogram", width: proceedButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        const nameInputField = document.getElementById("playerNameInput") as HTMLInputElement;
        nameInputField.style.position = "absolute";
        nameInputField.style.display = "block";
        nameInputField.style.width = "280px";
        nameInputField.style.height = "40px";
        nameInputField.style.fontSize = "24px";
        nameInputField.style.borderRadius = "10px";
        nameInputField.style.textAlign = "center";
        nameInputField.style.left = `${nameInputFieldPosition.pos.x}px`;
        nameInputField.style.top = `${nameInputFieldPosition.pos.y - 30}px`;
        nameInputField.value = "";

        let isProceedButtonHovered = false;
        proceedButton.onMousePress(() => {
            if (proceedButton.hasPoint(k.mousePos()))
            {
                isProceedButtonHovered = true;
                k.tween(proceedButton.scale, k.vec2(1.1), 0.1, (s) => { proceedButton.scale = s  });
            }
        });

        k.onSceneLeave(() => {
            nameInputField.style.display = "none";
        });

        proceedButton.onMouseRelease(() => {
            if (isProceedButtonHovered)
            {
                k.tween(proceedButton.scale, k.vec2(1), 0.1, (s) => { proceedButton.scale = s  });
                k.wait(0.1, () => {
                    AppStore.GetState().player.charName = nameInputField.value || "Unnamed Hero";
                    k.go("charHPSelect");
                });
            }
            isProceedButtonHovered = false;
        });

    });
}