import test from 'tape'

import { setAllCardDimensions } from '../src/cards'

const getCards = () => [
    { parentNode: { clientWidth: 100 }, style: {} }
]

test('setAllCardDimensions with no argument throws exception', t => {
    t.throws(() => setAllCardDimensions(null), /Array\.prototype\.map called on null or undefined/, 'should throw null or undefined exception.')
    t.throws(() => setAllCardDimensions(undefined), /Array\.prototype\.map called on null or undefined/, 'should throw null or undefined exception.')
    t.end()
})

test('setAllCardDimensions with empty array returns empty array', t => {
    const expected = 0
    const result = setAllCardDimensions([])
    const actual = result.length

    t.equals(expected, actual)
    t.end()
})

test('setAllCardDimensions sets card dimensions', t => {
    const expected = [ { parentNode: { clientWidth: 100 }, style: { top: '-12.5px', paddingTop: '12.5px', marginBottom: '-12.5px' } } ]
    const actual = setAllCardDimensions(getCards())

    t.same(expected, actual)
    t.end()
})
