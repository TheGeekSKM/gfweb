import type { KAPLAYCtx } from "kaplay";

export function LoadAssets(k: KAPLAYCtx) : void
{
    k.loadSprite("spr_dice", "art/spr_dice.png");
    k.loadBitmapFont("monogram", "font/monogram-bitmap.png", 6, 12);
}