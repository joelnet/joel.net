import { set, pipe } from './functional'

export const $ = document.querySelectorAll.bind(document)

export const addEventListener = (...events) => func => obj =>
  events.reduce((obj, event) => (obj.addEventListener(event, func), obj) , obj)

export const hideElement = set('style', 'display')('none')

export const insertAfter = html => dom => dom.insertAdjacentHTML('afterend', html)

export const replaceDomWithHtml = html =>
    pipe(
        hideElement,
        dom => (insertAfter(html)(dom), dom) 
    )
