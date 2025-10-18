import kaplay from 'kaplay';
import * as Data from './data/globalData.ts';

const k = kaplay({
    width: Data.VIRTUAL_WIDTH,
    height: Data.VIRTUAL_HEIGHT,
    letterbox: true,
    debug: true,
    touchToMouse: true,
    background : [5, 5, 5],
    global: false,
    pixelDensity: window.devicePixelRatio,
    canvas: document.getElementById('gameCanvas') as HTMLCanvasElement,
    crisp: true,
});

export default k;