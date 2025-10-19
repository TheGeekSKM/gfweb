import type { KAPLAYCtx } from "kaplay";
import { AppStore } from "../../store.ts";

export function LoadingCharacterData(k: KAPLAYCtx) : void
{
    
    k.scene("loadingCharData", () => {

        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "loadingCharData",
            previousScene: prevState.currentScene,
        }), "LoadingCharacterDataScene");

        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(94, 150, 255))
        ]);

        const loadingText = fullBorder.add([
            k.text("Loading Character Data...", {size: 36, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(94, 150, 255))
        ]);

        k.onUpdate(() => {
            if (AppStore.GetState().playerLoaded)
            {
                k.go("charSheet");
            }
        });

        k.wait(5, () => {
            k.go("cantLoadCharData");
        });
    });

    k.scene("cantLoadCharData", () => {
        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, {radius: 10, fill: false}),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(255, 94, 94))
        ]);
        const errorText = fullBorder.add([
            k.text("Error: Unable to Load Character Data.", {size: 36, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, -20),
            k.anchor("center"),
            k.color(k.rgb(255, 94, 94))
        ]); 

        const retryText = fullBorder.add([
            k.text("Tap the screen to retry.", {size: 24, font: "monogram", width: k.width() - 40, align: "center"}),
            k.pos(0, 50),
            k.anchor("center"),
            k.color(k.rgb(255, 150, 150))
        ]);

        k.onMousePress(() => {
            k.go("mainMenu");
        });
    });
}