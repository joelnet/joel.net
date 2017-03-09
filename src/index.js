import Rx                 from 'rx-lite'

import { map,
         compose,
         before }         from './lib/functional'
import { multiply }       from './lib/functional-math'
import { $,
         $$,
         getDimensions }  from './lib/functional-dom'
import { imageToHexagon } from './hexagon'
import { PHONE_WIDTH }   from './constants'

console.clear()

const images = $$('img[data-transform="hexagon"]')
const head = $('.head')

const getWindowDimensions = () => getDimensions(window)

const getProfileImageHeight = ({ width }) => width <= PHONE_WIDTH ? width * .8 : 500

const setHeaderHeight = height => head.style.height = height + 'px'

const setHeaderHeightFromImageHeight =
    compose(
        setHeaderHeight,
        multiply(.6),
        getProfileImageHeight)

const moveProfileImageUp = (container, image) => px => {
    image.style.top = -px + 'px'
    container.style.height = px + 'px'
    return px
}

const setProfileImageTop = data =>
    compose(
        moveProfileImageUp($('.profile__container'), $('.profile__image')),
        multiply(.5),
        getProfileImageHeight
    )(data)

const setHeaderAndProfileImagePosition =
    before(setProfileImageTop, setHeaderHeightFromImageHeight)

const setCardDimensions = card => {
    const px = card.parentNode.clientWidth / 8
    card.style.top = -px + 'px'
    card.style.paddingTop = px + 'px'
    card.style.marginBottom = -px + 'px'
}

const mapSetCardDimensions = map(setCardDimensions)

const windowLoadAndResizeEvents =
    Rx.Observable.fromEvent(window, 'DOMContentLoaded')
        .merge(Rx.Observable.fromEvent(window, 'resize'))

// convert images with hexagons
map(imageToHexagon)(images)

// resize hexagons with browser width
windowLoadAndResizeEvents
    .map(getWindowDimensions)
    .subscribeOnNext(data => {
        setHeaderAndProfileImagePosition(data)
        mapSetCardDimensions($$('.card'))
    })
