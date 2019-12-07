import React from 'react'

import { useStorage } from 'react-storage-hook'
import { SavedTextarea } from './example'

export default class App extends React.PureComponent {
  render () {
    return (
      <div>
        <p/>Any input entered here will be saved, and
        propagated to any other open instances of this page.
        <p/><SavedCheckbox/>
        <p/><SavedTextarea/>
        <p/>Here's another instance of this page.
        There's no direct communication between these instances.
        <p/><SelfFrame/>
      </div>
    )
  }
}

const SelfFrame = () => {
  if (window.location.search=="?framed") return null;
  return <iframe src="?framed"/>
}

const SavedCheckbox = () => {
  const [checked, setChecked] = useStorage('saved-checkbox-checked', {
    placeholder: false
  });

  const onChange = (e: React.ChangeEvent) => setChecked((e.target as HTMLInputElement).checked);

  return <input {...{
    checked,
    onChange,
    type: "checkbox"
  }}/>

}

