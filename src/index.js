import { fromJS } from 'immutable'
import React from 'react'
const Immutable = { fromJS }

export const useStorage = (name, {
  placeholder, storageArea = window.localStorage } = {}) => {
  const [value, setValue] = React.useState(Immutable.fromJS(JSON.parse(storageArea.getItem(name))) || placeholder)

  const onStorage = ({ key, oldValue, newValue, storageArea: eventStorageArea }) => {
    // if it's not our record, the value has not changed, or it's for another storage area we skip
    // there could, or perhaps *should* be an extra check for if our local value differs from
    // the stored value, but this should be handled internally via React.
    if (key !== name || oldValue === newValue || storageArea !== eventStorageArea) return
    return setValue(Immutable.fromJS(JSON.parse(newValue)))
  }

  const setStorage = (value) => {
    const oldValue = storageArea.getItem(name)
    const newValue = JSON.stringify(value)
    storageArea.setItem(name, newValue)
    // fire our own onStorage event
    // because onStorage only fires between windows
    onStorage({
      key: name,
      newValue,
      oldValue,
      storageArea
    })
  }

  // listen to storage events on mount and unmount
  React.useEffect(() => {
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return [value, setStorage]
}
