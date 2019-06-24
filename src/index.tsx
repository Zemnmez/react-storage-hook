/**
 * @module react-storage-hook
 */

/**
 *
 */

import { fromJS } from 'immutable'
import * as React from 'react'

/**
 * @hidden
 */
const Immutable = { fromJS }

/**
 * An immutableValue is a value that would be returned
 * by immutable.js's [immutable.fromJS](https://github.com/immutable-js/immutable-js/wiki/Converting-from-JS-objects).
 */
type immutableValue = any

/**
 * @hidden
 */
type setStored<Kind> = (newValue: Kind) => void

/**
 * useStorage is a react hook providing integration and synchronization with
 * localStorage. The value returned will likely not be the same type as input,
 * unless the input type is an immutable value that
 * would be produced by immutable.js.
 *
 * The output value will always be an [[immutableValue]] of the kind produced by
 * immutable.js.
 * @param name The key used to store the data in.
 * @param InputType An optional type used for the stored value. This is only a type assertion on the input. The output type will always be a value returned by Immutable.fromJS.
 */
export const useStorage = <InputType extends {}>(name: string, {
   /**
    * The default value if no stored value is found.
    */
    placeholder,

   /**
    * The Storage used. Defaults to localStorage.
    */
    storageArea = window.localStorage
} : {
    placeholder: InputType, storageArea: Storage
  }): [immutableValue, setStored<InputType>] => {
    const currentItem = storageArea.getItem(name)
    const [value, setValue] = React.useState(
      currentItem?
      Immutable.fromJS(currentItem):
      placeholder
    )

    const onStorage = ({ key, oldValue, newValue, storageArea: eventStorageArea }:
                       Pick<StorageEvent, 'key' | 'oldValue' | 'newValue' | 'storageArea'>) => {
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

export default useStorage;
