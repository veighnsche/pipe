export type Fn = (value: any) => any

let logging = false

const log = (fn: Fn, value: any) => {
  logging && console.log({
    functionEval: fn.toString(),
    val: value,
  })
  return value
}

export const pipe = (...functions: any): Fn => value => functions.reduce((val: any, fn: Fn) => fn(log(fn, val)), value)

export const toggleLogging = (): void => {
  logging = !logging
}
