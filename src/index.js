import { map }             from './lib/functional'
import { $,
         addEventListener,
         hideElement,
         insertAfter }     from './lib/functional-dom'
import { imageToHexagon }  from './hexagon'

console.clear()

const mapImageToHexagon = map(imageToHexagon)
const images = $('img[data-transform="hexagon"]')

mapImageToHexagon(images)
