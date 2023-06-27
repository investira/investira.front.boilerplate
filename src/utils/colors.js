// Generate palette
import { scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { rgb, color } from 'd3-color';

const generatePalette = (pDomain, pRangeColors) => {
    const xPalette = [];
    //let xRange = pRangeColors;
    let xRange = pRangeColors;

    if (pRangeColors.length === 1) {
        xRange = [xRange[0], rgb(xRange[0]).darker()];
    }

    if (pDomain.length === 1) {
        xRange = [xRange[0], xRange[0]];
    }

    const xStep = scaleLinear()
        .domain([0, xRange.length - 1])
        .range([0, pDomain.length - 1]);

    const xSteppedDomain = pDomain.map((xItem, xIndex) => {
        if (xIndex === 0 || xIndex === pDomain.length - 1) {
            return xIndex;
        } else {
            return xStep(xItem);
        }
    });

    const xDomain = pDomain.length === 1 ? [0, pDomain.length - 1] : xSteppedDomain;

    const xColor = scaleLinear().domain(xDomain).range(xRange).interpolate(interpolateHcl);

    for (let i = 0; i < pDomain.length; i++) {
        xPalette.push(color(xColor(i)).formatHex());
    }

    return xPalette;
};

const colors = {
    generatePalette
};

export default colors;
