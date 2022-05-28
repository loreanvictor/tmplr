import { createExecution } from '../../context'
import { Help } from '../../context/command'


export const showHelp = () => createExecution(new Help())
