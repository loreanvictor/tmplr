import { createExecution } from '../../context'
import { Version } from '../../context/command'


export const showVersion = () => createExecution(new Version())
