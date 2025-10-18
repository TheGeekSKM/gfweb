export type Experience = {
    level: number;
    name: string;
}

export type Item = {
    itemName: string;
    description?: string;
    usagePool: number;
    usageCap: number;
}

export type Character = {
    charName: string;
    level: number;
    hitPoints: number;
    maxHitPoints: number;
    experienceList: Experience[];
    inventory: Item[];
    isDead: boolean;
    characterID: string;
}

export function CreateNewCharacter(cName: string, mHitPoints: number, expList: Experience[], itemList?: Item[]) : Character
{
    const newCharacter: Character = {
        charName: cName,
        level: 1,
        hitPoints: mHitPoints,
        maxHitPoints: mHitPoints,
        experienceList: expList,
        inventory: itemList || [],
        isDead: false,
        characterID: ""
    };

    newCharacter.characterID = newCharacter.charName.toLowerCase() + "_" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    return newCharacter;
}