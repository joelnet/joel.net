import { pipe }               from './lib/functional'
import { replaceDomWithHtml } from './lib/functional-dom'

/**
 * Get hexagon SVG code as a string
 */
const imageToHexagonHtml = ({ image, className, strokeWidth = 2, strokeColor = '#333333', number = Math.random() * 10000000000000000 }) =>
  `<svg viewbox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" class="${ className }">
     <defs>
       <pattern id="img${ number }" patternUnits="userSpaceOnUse" width="100" height="100">
         <image xlink:href="${ image }" x="-25" width="150" height="100" />
       </pattern>
     </defs>
     <svg width="96" height="96" viewBox="0 0 100 100" x="2" y="2">
       <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img${ number })" stroke="white" stroke-width="3" />
     </svg>
     <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="transparent" stroke="${ strokeColor }" stroke-width="${ strokeWidth }" />
     <svg width="102" height="102" viewBox="0 0 100 100" x="-1" y="-1">
       <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="transparent" stroke="#ffffff" stroke-width="0.25" stroke-opacity="0.4" />
     </svg>
   </svg>`

/**
 * Gets option values from the <img />
 */
const getImageOptions = dom =>
    ({
        dom,
        image: dom.getAttribute('src'),
        className: dom.getAttribute('class') || '',
        strokeWidth: dom.getAttribute('data-stroke-width') || undefined,
        strokeColor: dom.getAttribute('data-stroke-color') || undefined
    })

/**
 * Returns an objecct containing the original image and the SVG HTML string.
 */
const getHexagonHtml = image => ({ ...image, html: imageToHexagonHtml(image) })

/**
 * Replaces <img class="hexagon" /> with <svg/>
 */
export const imageToHexagon =
    pipe(getImageOptions,
         getHexagonHtml,
         x => replaceDomWithHtml(x.html)(x.dom))
