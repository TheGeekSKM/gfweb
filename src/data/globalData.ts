import * as Types from "./templates.ts";

export const VIRTUAL_WIDTH : number = window.innerWidth;
export const VIRTUAL_HEIGHT : number = window.innerHeight;

export const PLAYER = Types.CreateNewCharacter("Player", 1, [
    {level: 1, name: "I like to eat entire balls for breakfast"},
    {level: 2, name: "Apprentice"},
    {level: 3, name: "Adept"},
    {level: 4, name: "Expert"},
    {level: 5, name: "Master"},
], []);