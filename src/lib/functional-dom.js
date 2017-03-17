import { compose, call } from './functional'

export const $ = document.querySelector.bind(document)

export const $$ = document.querySelectorAll.bind(document)

export const addEventListener = (...events) => func => obj =>
    events.reduce((obj, event) => (obj.addEventListener(event, func), obj), obj)

export const removeElement = dom =>
    (dom.parentNode.removeChild(dom), dom)

export const insertAfter = html => dom =>
    (dom.insertAdjacentHTML('afterend', html), dom)

export const replaceDomWithHtml = html =>
    compose(
        removeElement,
        call(insertAfter(html)))

export const getDimensions = dom =>
    ({ width: dom.outerWidth, height: dom.outerHeight })

export const getWindowDimensions = (windoww = window) => getDimensions(window)

export const log = (...args) => console && console.log(...args)

export const clearLog = () => console && console.clear()
