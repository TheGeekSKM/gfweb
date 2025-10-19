import type { KAPLAYCtx } from "kaplay";
import * as Data from "../../../data/globalData.ts";

export function CreateNewCharHPSelect(k: KAPLAYCtx) : void
{
    k.scene("charHPSelect", () => {
        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, { radius: 10, fill: false }),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(200, 200, 200))
        ]);

        const titleText = fullBorder.add([
            k.text("Set Character Hit Points", { size: 36, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 60),
            k.anchor("center"),
            k.color(k.rgb(200, 200, 200))
        ]);

        const subtitleText = fullBorder.add([
            k.text("Roll a d6 (or multiple d6 if your Dealer allows it) and add the results together.", { size: 18, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 120),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150))
        ]);

        const hitPointsInputFieldPosition = k.add([
            k.rect(300, 50, { radius: 10 }),
            k.pos(k.center().x, k.center().y - 20),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
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

        const hitPointsInputField = document.getElementById("actualHPInput") as HTMLInputElement;
        hitPointsInputField.value = "10";
        hitPointsInputField.type = "number";
        hitPointsInputField.style.position = "absolute";
        hitPointsInputField.style.display = "block";
        hitPointsInputField.style.top = `${hitPointsInputFieldPosition.pos.y - 45}px`;
        hitPointsInputField.style.left = `${hitPointsInputFieldPosition.pos.x}px`;
        hitPointsInputField.style.width = "280px";
        hitPointsInputField.style.height = "40px";
        hitPointsInputField.style.fontSize = "48px";
        hitPointsInputField.style.borderRadius = "10px";
        hitPointsInputField.style.textAlign = "center";
        hitPointsInputField.style.left = `${hitPointsInputFieldPosition.pos.x}px`;

        let isProceedButtonHovered = false;
        proceedButton.onMousePress(() => {
            if (proceedButton.hasPoint(k.mousePos())) {
                isProceedButtonHovered = true;
                k.tween(proceedButton.scale, k.vec2(1.1), 0.1, (s) => { proceedButton.scale = s });
            }
        });

        proceedButton.onMouseRelease(() => {
            if (isProceedButtonHovered) {
                k.tween(proceedButton.scale, k.vec2(1), 0.1, (s) => { proceedButton.scale = s });
                k.wait(0.1, () => {
                    Data.GetPlayerData().maxHitPoints = parseInt(hitPointsInputField.value) || 10;
                    Data.GetPlayerData().hitPoints = Data.GetPlayerData().maxHitPoints;
                    hitPointsInputField.style.display = "none";
                    k.go("newCharExp");
                });
            }
        });

        k.onSceneLeave(() => {
            hitPointsInputField.style.display = "none";
        });
    }); 
}