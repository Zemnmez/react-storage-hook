import React from 'react'
import { useStorage } from 'react-storage-hook'

export const SavedTextarea = () => {
  const [text, setText] = useStorage('saved-text', {
    placeholder: ""
  });

  const onChange = (e: React.ChangeEvent) => setText(
    (e.target as HTMLInputElement).value);

  return <textarea {...{
    onChange,
    value: text
  }}/>
}
