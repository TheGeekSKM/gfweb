import * as Types from "./templates.ts";
import * as Firebase from "../firebase.ts";

export const VIRTUAL_WIDTH : number = window.innerWidth;
export const VIRTUAL_HEIGHT : number = window.innerHeight;

let PLAYER = Types.CreateNewCharacter("Player, Destroyer of the worlds and ancients", 1, [], []);

export let playerLoaded : boolean = false;

export function GetPlayerData() : Types.Character
{
    return PLAYER;
}

export function LoadNewPlayerData(charID: string) : void
{
    Firebase.LoadCharacterData(charID, (data) => {
        PLAYER = data;
        console.log("Player data loaded:", PLAYER);
        playerLoaded = true;
    });
}