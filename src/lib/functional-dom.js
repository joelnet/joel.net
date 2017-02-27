import { set, pipe } from './functional'

export const $ = document.querySelectorAll.bind(document)

export const addEventListener = (...events) => func => obj =>
  events.reduce((obj, event) => (obj.addEventListener(event, func), obj) , obj)

export const hideElement = set('style', 'display')('none')

export const removeElement = dom => (dom.parentNode.removeChild(dom), dom)

export const insertAfter = html => dom => (dom.insertAdjacentHTML('afterend', html), dom)

export const replaceDomWithHtml = html =>
    pipe(
        dom => (insertAfter(html)(dom), dom),
        removeElement
    )
