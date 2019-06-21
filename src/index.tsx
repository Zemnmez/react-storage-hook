import { fromJS } from 'immutable'
import * as React from 'react'
const Immutable = { fromJS }

/**
 * @hidden
 */
interface SimpleStorageEvent {
  readonly key: string | null
  readonly newValue: string | null
  readonly oldValue: string | null
  readonly storageArea: Storage | null
}

type value = any
type setValue<Kind> = (newValue: Kind) => void

export const useStorage = <InputType extends {}>(name: string, {
  placeholder, storageArea = window.localStorage } : {
    placeholder: any, storageArea: Storage
  }): [value, setValue<InputType>] => {
    const currentItem = storageArea.getItem(name)
    const [value, setValue] = React.useState(
      currentItem?
      Immutable.fromJS(currentItem):
      placeholder
    )

  const onStorage = (event: SimpleStorageEvent) => {
    const { key, oldValue, newValue, storageArea: eventStorageArea } = event
    // if it's not our record, the value has not changed, or it's for another storage area we skip
    // there could, or perhaps *should* be an extra check for if our local value differs from
    // the stored value, but this should be handled internally via React.
    if (key !== name || newValue == null || oldValue === newValue || storageArea !== eventStorageArea) return
    return setValue(Immutable.fromJS(JSON.parse(newValue)))
  }

  const setStorage = (value: InputType) => {
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
