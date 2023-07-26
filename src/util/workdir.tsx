import React, { createContext, useContext } from 'react'


const WORKDIR_CONTEXT = createContext<string>(process.cwd())


export function WorkDirAware({ workdir, children }: { workdir: string, children: React.ReactNode }) {
  return (
    <WORKDIR_CONTEXT.Provider value={workdir}>
      {children}
    </WORKDIR_CONTEXT.Provider>
  )
}


export function useWorkDir() {
  return useContext(WORKDIR_CONTEXT)
}
