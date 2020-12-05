export type NextFunction = (next: Function, args?: any) => void
export type Action = { type: any, payload?: any }
export type State = Record<any, any>

let logging = false

export function toggleLogging(val: boolean): void {
  logging = val ?? !logging
}


function log<T = any>(f: Function, value: T): T {
  logging && console.log({
    functionEval: f.toString(),
    val: value,
  })
  return value
}

export function pipe<T>(...functions: Function[]): Function {
  return function (value: any): T {
    return functions.reduce((val: any, f: Function) => f(log(f, val)), value)
  }
}

export function asyncPipe(...functions: NextFunction[]) {
  (functions.reverse().reduce((chain, f) => (args: any) => f(chain, log(f, args))) as () => NextFunction)()
}

export function actionPipe(reducer: (prevState: State, action: Action) => State) {
  return function (...actions: ((payload: any) => Action)[]) {
    return function (state: State, payload: any) {
      return actions.reduce((nextStore, action) => {
        return reducer(nextStore, action(payload))
      }, state)
    }
  }
}
