import Rx                  from 'rx-lite'
import { map,
         compose,
         execute }         from './lib/functional'
import { multiply }        from './lib/functional-math'
import { $, $$ }           from './lib/functional-dom'
import { imageToHexagon }  from './hexagon'

console.clear()

// TODO: move a bunch of this shit to it's own service
const TABLET_WIDTH = 767
const mapImageToHexagon = map(imageToHexagon)
const images = $$('img[data-transform="hexagon"]')
const getDimensions = dom => ({ width: dom.outerWidth, height: dom.outerHeight })
const head = $('.head')
const getProfileImageHeight = ({ width }) => width <= TABLET_WIDTH ? width * .8 : 500
const setHeaderHeight = height => head.style.height = height + 'px'
const setHeaderHeightFromImageHeight =
    execute(
        compose(
            setHeaderHeight,
            multiply(.6),
            getProfileImageHeight))

const moveProfileImageUp = container => image => px => {
    image.style.top = -px + 'px'
    container.style.height = px + 'px'
    return px
}

const setProfileImageTop = data => compose(
        moveProfileImageUp($('.profile__container'))($('.profile__image')),
        multiply(.5),
        getProfileImageHeight
    )(data)

const setHeaderAndProfileImagePosition =
    compose(setProfileImageTop, setHeaderHeightFromImageHeight)

const setCardDimensions = card => {
    card.style.top = -(card.parentNode.clientWidth / 4) + 'px'
    card.style.paddingTop = (card.parentNode.clientWidth / 4) + 'px'
    card.style.marginBottom = -(card.parentNode.clientWidth / 6) + 'px'
}

const mapSetCardDimensions = map(setCardDimensions)

mapImageToHexagon(images)

const windowResizeObservable =
    Rx.Observable.fromEvent(window, 'DOMContentLoaded')
    .merge(Rx.Observable.fromEvent(window, 'resize'))
    .map(_ => getDimensions(window))
    .subscribeOnNext(data => {
        setHeaderAndProfileImagePosition(data)
        mapSetCardDimensions($$('.card'))
    })
