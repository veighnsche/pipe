export type PipeFunction = (value: any) => any
export type NextFunction = (next: Function) => void

let logging = false

function log<T = any>(fn: PipeFunction, value: T): T {
  logging && console.log({
    functionEval: fn.toString(),
    val: value,
  })
  return value
}

export function toggleLogging(): void {
  logging = !logging
}


export function pipe<T>(...functions: PipeFunction[]): PipeFunction {
  return function (value: any): T {
    return functions.reduce((val: any, f: PipeFunction) => f(log(f, val)), value)
  }
}

export function asyncPipe(...functions: NextFunction[]) {
  (functions.reverse().reduce((val, f) => () => f(log(f, val))) as () => NextFunction)()
}

