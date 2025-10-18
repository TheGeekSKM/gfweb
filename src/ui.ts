import type { GameObj, KAPLAYCtx } from "kaplay";
import * as Types from "./data/templates.ts";

export function AddExperience(k: KAPLAYCtx, experience: Types.Experience, parent?: GameObj) : GameObj
{
    const experienceBorderNoParent = k.add([
        k.rect(k.width() - 60, 100, {radius: 10}),
        k.pos(k.center()),
        k.anchor("center"),
    ]);

    const experienceObjectBorder = parent ? parent.add([
        k.rect(parent.width - 20, 100, {radius: 10}),
        k.pos(0, 0),
        k.anchor("center"),
        k.color(k.rgb(50, 50, 50)),
        k.outline(5, k.rgb(150, 150, 150)),
    ]) : experienceBorderNoParent;

    if (parent)
    {
        experienceBorderNoParent.destroy();
    }

    const levelText = experienceObjectBorder.add([
        k.text("Lv. " + experience.level.toString(), {size: 24, font: "monogram", width: (experienceObjectBorder.width * .2), align: "center"}),
        k.pos(-experienceObjectBorder.width / 2 + 10, 0),
        k.anchor("left"),
        k.color(k.rgb(200, 200, 200)),
    ]);

    const verticalDivider = experienceObjectBorder.add([
        k.rect(5, experienceObjectBorder.height),
        k.pos((-experienceObjectBorder.width / 2) + (experienceObjectBorder.width * .25), 0),
        k.anchor("center"),
        k.color(k.rgb(150, 150, 150)),
    ]);

    const nameText = experienceObjectBorder.add([
        k.text(experience.name, {size: 24, font: "monogram", width: (experienceObjectBorder.width * .6) - 10, align: "left"}),
        k.pos((verticalDivider.pos.x) + 10, 0),
        k.anchor("left"),
        k.color(k.rgb(200, 200, 200)),
    ]);

    const formatted = k.formatText({
        text: experience.name,
        size: 24,
        width: (experienceObjectBorder.width * .6) - 10,
    });

    experienceObjectBorder.height = formatted.height + 20;
    verticalDivider.height = experienceObjectBorder.height;

    return experienceObjectBorder;
}