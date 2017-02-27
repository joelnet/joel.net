import { pipe }               from './lib/functional'
import { replaceDomWithHtml } from './lib/functional-dom'

// TODO: remove count state and replace with Random.
const imageToHexagonHtml = ({ count, image, className, strokeWidth = 2, strokeColor = '#333333' }) =>
  `<svg viewbox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" class="${ className }">
     <defs>
       <pattern id="img${ count }" patternUnits="userSpaceOnUse" width="100" height="100">
         <image xlink:href="${ image }" x="-25" width="150" height="100" />
       </pattern>
     </defs>
     <svg width="96" height="96" viewBox="0 0 100 100" x="2" y="2">
       <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img${ count })" stroke="white" stroke-width="3" />
     </svg>
     <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="transparent" stroke="${ strokeColor }" stroke-width="${ strokeWidth }" />
     <svg width="102" height="102" viewBox="0 0 100 100" x="-1" y="-1">
       <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="transparent" stroke="#ffffff" stroke-width="0.25" stroke-opacity="0.4" />
     </svg>
   </svg>`
const store = func => (state = 0) => obj => func({ count: ++state, ...obj })
const imageToHexagonHtmlStore = store(imageToHexagonHtml)()
const imageToOptions = dom => ({
        dom,
        image: dom.getAttribute('src'),
        className: dom.getAttribute('class') || '',
        strokeWidth: dom.getAttribute('data-stroke-width') || undefined,
        strokeColor: dom.getAttribute('data-stroke-color') || undefined
    })

const getHexagonHtml = x => ({ ...x, html: imageToHexagonHtmlStore(x) })

export const imageToHexagon = pipe(
    imageToOptions,
    getHexagonHtml,
    x => replaceDomWithHtml(x.html)(x.dom)
)
