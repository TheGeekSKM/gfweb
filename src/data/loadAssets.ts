import type { KAPLAYCtx } from "kaplay";

export function LoadAssets(k: KAPLAYCtx) : void
{
    k.loadSprite("spr_dice", "/art/spr_dice.png");
    k.loadFont("monogram", "/font/monogram-extended.ttf");
}