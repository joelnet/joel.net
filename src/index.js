import Rx                                   from 'rx-lite'
import { map }                              from './lib/functional'
import { $,
         $$,
         log,
         clearLog,
         getWindowDimensions }              from './lib/functional-dom'
import { imageToHexagon }                   from './hexagon'
import { setHeaderAndProfileImagePosition } from './header'
import { setAllCardDimensions }             from './cards'

clearLog()
log('Welcome to joel.net')

const head = $('.head')
const images = $$('img[data-transform="hexagon"]')
const cards = $$('.card')

const windowLoadAndResizeEvents =
    Rx.Observable.fromEvent(window, 'DOMContentLoaded')
        .merge(Rx.Observable.fromEvent(window, 'resize'))

// resize hexagons from browser width
windowLoadAndResizeEvents
    .map(getWindowDimensions)
    .subscribeOnNext(data => {
        setHeaderAndProfileImagePosition(head)(data)
        setAllCardDimensions(cards)
    })

// convert images with hexagons
map(imageToHexagon)(images)
