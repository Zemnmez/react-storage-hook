import React from 'react'

import { useStorage } from 'react-storage'

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

  const onChange = e => setChecked(e.target.checked);

  return <input {...{
    checked,
    onChange,
    type: "checkbox"
  }}/>

}

const SavedTextarea = () => {
  const [text, setText] = useStorage('saved-text', {
    placeholder: ""
  });

  const onChange = e => setText(e.target.value);

  return <textarea {...{
    onChange,
    value: text
  }}/>
}
