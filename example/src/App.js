import React, { PureComponent, useState, createRef } from 'react'

import Storage from 'react-storage'

export default class App extends React.PureComponent {
  render () {
    return (
      <SavedCheckbox/>
    )
  }
}

const SavedCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  const checkRef = React.createRef();
  const onCheckChange = () => setChecked(checkRef.current.value);

  return <Storage value={{checked}} name={"checkbox-checked"}>
      {({checked: storedChecked }) => <input
        type="checkbox"
        checked={storedChecked}
        ref={checkRef}
        onChanged={onCheckChange}
      />}
    </Storage>

}
