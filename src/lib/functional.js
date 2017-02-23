export const compose = (...functions) => data =>
  Array.prototype.reduceRight.call(functions, (value, func) => func(value), data)

export const map = f => x =>
  Array.prototype.map.call(x, f)

export const pipe = (...functions) => data =>
  Array.prototype.reduce.call(functions, (value, func) => func(value), data)

export const set = (prop, ...props) => value => obj =>
  !props.length
    ? (obj[prop] = value, obj)
    : (set(props)(value)(obj[prop]), obj)
