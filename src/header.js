import { before,
         compose }     from './lib/functional'
import { $ }           from './lib/functional-dom'
import { multiply }    from './lib/functional-math'
import { PHONE_WIDTH } from './constants'

/**
 * Sets the height of the height of the header
 */
const setHeaderHeight = height => head.style.height = height + 'px'

/**
 * Moves the profile image up
 */
const moveProfileImageUp = (container, image) => px => {
    image.style.top = -px + 'px'
    container.style.height = px + 'px'
    return px
}

/**
 * Given the window width, return the profile image width. 80% on mobile or 500px
 * note: This must be kept in sync with the css.
 */
export const getProfileImageHeight = ({ width }) => width <= PHONE_WIDTH ? width * .8 : 500

/**
 * Set the header height based off the profile image height.
 * note: This is so the profile image will hover over half the header.
 */
export const setHeaderHeightFromImageHeight = multiplier =>
    compose(
        setHeaderHeight,
        multiply(multiplier),
        getProfileImageHeight)

export const setProfileImageTop = data =>
    compose(
        moveProfileImageUp($('.profile__container'), $('.profile__image')),
        multiply(.5),
        getProfileImageHeight
    )(data)

export const setHeaderAndProfileImagePosition =
    before(setProfileImageTop, setHeaderHeightFromImageHeight)
