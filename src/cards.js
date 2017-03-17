import { map } from './lib/functional'

const setCardDimensions = card => {
    const px = card.parentNode.clientWidth / 8
    card.style.top = -px + 'px'
    card.style.paddingTop = px + 'px'
    card.style.marginBottom = -px + 'px'
}

export const setAllCardDimensions = map(setCardDimensions)
