import Rx                  from 'rx-lite'
import { map,
         get,
         compose }         from './lib/functional'
import { $,
         addEventListener,
         hideElement,
         insertAfter }     from './lib/functional-dom'
import { imageToHexagon }  from './hexagon'

console.clear()

const mapImageToHexagon = map(imageToHexagon)
const images = $('img[data-transform="hexagon"]')
const getDimensions = dom => ({ width: dom.outerWidth, height: dom.outerHeight })
const getCurrentTargetDimensions = compose(getDimensions, get('currentTarget'))
const head = $('.head')[0]

mapImageToHexagon(images)

Rx.Observable.fromEvent(window, 'resize')
    .throttle(100)
    .map(getCurrentTargetDimensions)
    .subscribeOnNext(data => {
        const profileImageHeight = Math.round($('svg.profile__image')[0].getBoundingClientRect().height)
        const newHeight = Math.round(profileImageHeight * .6)
        const profileImageTop = -(Math.round(profileImageHeight / 2))

        $('svg.profile__image')[0].style.top = profileImageTop + 'px'
        head.style.height = newHeight + 'px'
        $('.profile__container')[0].style.height = (-profileImageTop) + 'px'
    })
