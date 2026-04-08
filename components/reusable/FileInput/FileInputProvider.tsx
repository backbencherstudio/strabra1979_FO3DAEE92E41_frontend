import { createContext, useContext, useState, ReactNode } from 'react'

// 1. Create Context and Provider
interface FileInputContextType {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  addFile: (file: File, index: number) => void
  removeFile: (index: number) => void
}

const FileInputContext = createContext<FileInputContextType | undefined>(undefined)

export const FileInputProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<File[]>([])
  function addFile(file: File, index: number) {
    setFiles((prevFiles) => {
      prevFiles[index] = file
      return prevFiles
    })
  }

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index)
    setFiles(updated)
  }

  return (
    <FileInputContext.Provider value={{ files, addFile, setFiles, removeFile }}>
      {children}
    </FileInputContext.Provider>
  )
}

export const useFileInput = () => {
  const context = useContext(FileInputContext)
  if (!context) {
    throw new Error('useFileInput must be used within a FileInputProvider')
  }
  return context
}
