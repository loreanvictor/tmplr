import { Choices } from '../../context/expr'
import { ParsingContext } from '../../context'


export function parseChoices(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('expected object')
  }

  if (!obj.choices) {
    throw new Error('expected "choices" field')
  }

  if (!obj.prompt) {
    throw new Error('expected "prompt" field')
  }

  return new Choices(
    obj.prompt,
    obj.choices.map(choice => {
      if (typeof choice === 'string') {
        return {
          label: choice,
          value: context.parseExpr(context, choice)
        }
      } else {
        const label = Object.keys(choice)[0]
        const value = context.parseExpr(context, choice[label!])

        return { label, value }
      }
    }),
  )
}
