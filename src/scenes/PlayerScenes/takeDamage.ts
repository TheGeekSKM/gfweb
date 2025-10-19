import type { KAPLAYCtx } from "kaplay";
import { AppStore } from "../../store";
import * as Firebase from "../../firebase.ts";

export function TakeDamageMenu(k: KAPLAYCtx) : void
{
    k.scene("takeDamageMenu", () => {
        AppStore.SetState((prevState) => ({
            ...prevState,
            currentScene: "takeDamageMenu",
            previousScene: prevState.currentScene,
        }), "TakeDamageMenuScene");

        const Unsubscribe = Firebase.Subscribe(`players/${AppStore.GetState().player.characterID}`, (data) => {
            if (data) {
                AppStore.SetState(prevState => ({
                    ...prevState,
                    player: {
                        ...prevState.player,
                        ...data
                    }
                }), "TakeDamageMenu_FirebasePlayerDataUpdate");

                Render();
                k.debug.log("Player data updated from Firebase subscription.");
            }
        });

        const fullBorder = k.add([
            k.rect(k.width() - 20, k.height() - 20, { radius: 10, fill: false }),
            k.anchor("center"),
            k.pos(k.center()),
            k.outline(5, k.rgb(255, 100, 100))
        ]);

        const titleText = fullBorder.add([
            k.text("Modify Health", { size: 32, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 50),
            k.anchor("center"),
            k.color(k.rgb(255, 100, 100))
        ]);

        const explanationText = fullBorder.add([
            k.text(`Press Heal or Damage to raise or lower your HP by 1 per each press.`, { size: 18, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -k.height() / 2 + 120),
            k.anchor("center"),
            k.color(k.rgb(150, 150, 150))
        ]);

        let currentHPText = fullBorder.add([
            k.text(`Current HP: ${AppStore.GetState().player.hitPoints} / ${AppStore.GetState().player.maxHitPoints}`, { size: 48, font: "monogram", width: k.width() - 40, align: "center" }),
            k.pos(0, -50),
            k.anchor("center"),
            k.color(k.rgb(255, 100, 100))
        ]);

        const healButton = fullBorder.add([
            k.rect(150, 50, { radius: 10, fill: true }),
            k.pos(0, fullBorder.height / 2 - 200),
            k.anchor("center"),
            k.color(k.rgb(100, 255, 100)),
            k.outline(3, k.rgb(150, 255, 150)),
            k.area(),
            k.scale(1),
        ]);

        const healButtonText = healButton.add([
            k.text("Heal +1", { size: 20, font: "monogram", width: healButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        const damageButton = fullBorder.add([
            k.rect(150, 50, { radius: 10, fill: true }),
            k.pos(0, healButton.pos.y + 70),
            k.anchor("center"),
            k.color(k.rgb(255, 100, 100)),
            k.outline(3, k.rgb(255, 150, 150)),
            k.area(),
            k.scale(1),
        ]);

        const damageButtonText = damageButton.add([
            k.text("Damage -1", { size: 20, font: "monogram", width: damageButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        const backButton = fullBorder.add([
            k.rect(150, 50, { radius: 10, fill: true }),
            k.pos(0, damageButton.pos.y + 70),
            k.anchor("center"),
            k.color(k.rgb(255, 214, 150)),
            k.outline(3, k.rgb(253, 123, 0)),
            k.area(),
            k.scale(1),
        ]);

        const backButtonText = backButton.add([
            k.text("Back", { size: 20, font: "monogram", width: backButton.width - 20, align: "center" }),
            k.pos(0, 0),
            k.anchor("center"),
            k.color(k.rgb(5, 5, 5)),
        ]);

        function Render() {
            currentHPText.text = `Current HP: ${AppStore.GetState().player.hitPoints} / ${AppStore.GetState().player.maxHitPoints}`;
        }

        Render();

        let isHoveringOverHeal = false;
        healButton.onMousePress(() => {
            if (healButton.hasPoint(k.mousePos())) {
                isHoveringOverHeal = true;
                k.tween(healButton.scale, k.vec2(1.1), 0.1, (s) => { healButton.scale = s; });
            }
        });

        healButton.onMouseRelease(() => {
            if (isHoveringOverHeal) 
            {
                k.tween(healButton.scale, k.vec2(1), 0.1, (s) => { healButton.scale = s; });
                let newHP = AppStore.GetState().player.hitPoints + 1;
    
                k.wait(0.1, () => {

                    AppStore.SetState((prevState) => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            hitPoints: newHP
                        }
                    }), "TakeDamageMenu_HealPlayer");
                    Render();
                });

                isHoveringOverHeal = false;
            }
        });

        let isHoveringOverDamage = false;
        damageButton.onMousePress(() => {
            if (damageButton.hasPoint(k.mousePos())) {
                isHoveringOverDamage = true;
                k.tween(damageButton.scale, k.vec2(1.1), 0.1, (s) => { damageButton.scale = s; });  
            }
        });

        damageButton.onMouseRelease(() => {
            if (isHoveringOverDamage) 
            {
                k.tween(damageButton.scale, k.vec2(1), 0.1, (s) => { damageButton.scale = s; });

                let newHP = AppStore.GetState().player.hitPoints - 1;
                if (newHP < 0) 
                {
                    newHP = 0;
                }

                k.wait(0.1, () => {
                    AppStore.SetState((prevState) => ({
                        ...prevState,
                        player: {
                            ...prevState.player,
                            hitPoints: newHP
                        }
                    }), "TakeDamageMenu_DamagePlayer");
                    Render();
                }); 

                isHoveringOverDamage = false;
            }
        });

        let isHoveringOverBack = false;
        backButton.onMousePress(() => {
            if (backButton.hasPoint(k.mousePos())) {
                isHoveringOverBack = true;
                k.tween(backButton.scale, k.vec2(1.1), 0.1, (s) => { backButton.scale = s; });  
            }
        });

        backButton.onMouseRelease(() => {
            if (isHoveringOverBack) 
            {
                k.tween(backButton.scale, k.vec2(1), 0.1, (s) => { backButton.scale = s; });
                k.wait(0.1, () => {
                    k.go("charSheet");
                }); 
            }
        });

        k.onSceneLeave(() => {
            Firebase.Publish(`players/${AppStore.GetState().player.characterID}/hitPoints`, AppStore.GetState().player.hitPoints);
            Firebase.Publish(`players/${AppStore.GetState().player.characterID}/maxHitPoints`, AppStore.GetState().player.maxHitPoints);
            Unsubscribe();
        });
    });
}