import { Path } from '../../context/expr'
import { ParsingContext } from '../../context'


export function parsePath(context: ParsingContext, obj: any) {
  if (typeof obj !== 'object') {
    throw new Error('expected object')
  }

  if (!obj.path) {
    throw new Error('expected "path" field')
  }

  return new Path(
    obj.path,
    context.stack,
    context.root,
  )
}
