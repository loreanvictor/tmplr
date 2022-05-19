import {
  camelCase, capitalCase, constantCase,
  dotCase, headerCase, paramCase, pascalCase,
  pathCase, sentenceCase, snakeCase
} from 'change-case'


function skip(str: string, param: number | string) {
  if (typeof param === 'string') {
    if (/^\d+$/.test(param)) {
      return skip(str, parseInt(param))
    } else {
      return str.startsWith(param) ? str.slice(param.length) : str
    }
  } else {
    return str.slice(param)
  }
}

function trim(str: string, param: number | string) {
  if (typeof param === 'string') {
    if (/^\d+$/.test(param)) {
      return trim(str, parseInt(param))
    } else {
      return str.endsWith(param) ? str.slice(0, -param.length) : str
    }
  } else {
    return str.substring(0, str.length - param)
  }
}

function upperCase(str: string) {
  return str.toUpperCase()
}

function lowerCase(str: string) {
  return str.toLowerCase()
}


const PIPES = {
  camelCase,
  'Capital Case': capitalCase,
  CONSTANT_CASE: constantCase,
  'dot.case': dotCase,
  'Header-Case': headerCase,
  'param-case': paramCase,
  'kebab-case': paramCase,
  PascalCase: pascalCase,
  'path/case': pathCase,
  'Sentence case': sentenceCase,
  snake_case: snakeCase,
  UPPERCASE: upperCase,
  lowercase: lowerCase,
  skip,
  trim,
}

export function parse(desc: string) {
  const [pipe, param] = desc.split(':').map(_ => _.trim())

  if (!(pipe! in PIPES)) {
    throw new Error('Invalid pipe: ' + pipe)
  } else {
    return (s: string) => PIPES[pipe!](s, param)
  }
}
