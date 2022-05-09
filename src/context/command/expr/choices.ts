import { Expr } from './base'
import { Deferred } from './util/deferred'


export interface Choice {
  label: string
  value: Expr
}


interface ResolvedChoice {
  label: string
  value: string
}


export interface ChoicesIO {
  setMessage(msg: string): void
  setChoices(choices: ResolvedChoice[]): void
  onSelect(cb: (choice: ResolvedChoice) => void)
}


export class Choices extends Expr {
  io = new Deferred<ChoicesIO>()

  constructor(
    readonly msg: string,
    readonly choices: Choice[]
  ) { super() }

  plug(io: ChoicesIO) {
    this.io.resolve(io)
  }

  protected async _eval() {
    const io = await this.io.promise

    io.setMessage(this.msg)

    const choices: ResolvedChoice[] = []
    for (const choice of this.choices) {
      choices.push({
        label: choice.label,
        value: await this.delegate(choice.value, e => e.eval()),
      })
    }

    io.setChoices(choices)

    const deferred = new Deferred<string>()

    io.onSelect(choice => deferred.resolve(choice.value))

    return deferred.promise
  }
}
