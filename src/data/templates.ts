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

export type Inventory = Record<string, Item>;

export type Character = {
    charName: string;
    level: number;
    hitPoints: number;
    maxHitPoints: number;
    experienceList: Experience[];
    inventory: Inventory;
    isDead: boolean;
    characterID: string;
}

export function ItemArrayToInventory(itemArr: Item[]) : Inventory
{
    const inventory: Inventory = {};
    for (const item of itemArr)
    {
        inventory[item.itemName] = item;
    }
    return inventory;
}

export function CreateNewCharacter(cName: string, mHitPoints: number, expList: Experience[], itemList?: Item[]) : Character
{
    let inventoryRecord = {};
    if (itemList) 
    {
        inventoryRecord = ItemArrayToInventory(itemList);
    }

    const newCharacter: Character = {
        charName: cName,
        level: 1,
        hitPoints: mHitPoints,
        maxHitPoints: mHitPoints,
        experienceList: expList,
        inventory: inventoryRecord,
        isDead: false,
        characterID: ""
    };

    newCharacter.characterID = newCharacter.charName.toLowerCase() + "_" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    return newCharacter;
}

export function AddItemToInventory(char: Character, item: Item) : void
{
    char.inventory[item.itemName] = item;
}

export function RecordToItemList(inventory: Inventory) : Item[]
{
    const itemList: Item[] = [];
    for (const key in inventory)
    {
        itemList.push(inventory[key]);
    }
    return itemList;
}