import * as Types from "./templates.ts";

export const VIRTUAL_WIDTH : number = window.innerWidth;
export const VIRTUAL_HEIGHT : number = window.innerHeight;

export const PLAYER = Types.CreateNewCharacter("Player, Destroyer of the worlds and ancients", 1, [
    { name: "Defeated the Ancient Dragon", level: 1 },
    { name: "Conquered the Forgotten Tomb", level: 2 },
    { name: "Became the Champion of the Arena", level: 3 }
], [
    { itemName: "Sword of a Thousand Truths", usageCap : 10, usagePool: 10 },
    { itemName: "Shield of Eternal Light", usageCap : 5, usagePool: 5 },
    { itemName: "Potion of Infinite Healing", usageCap : 3, usagePool: 3 }
]);