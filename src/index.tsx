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
type setStored<Kind> = (newValue: Kind) => void

interface Options<InputType> {
   /**
    * The default value if no stored value is found.
    */
    placeholder?: InputType;

   /**
    * The Storage used. Defaults to localStorage.
    */
    storageArea?: Storage;
}

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
export const useStorage = <InputType extends {}>(
    name: string,
    { placeholder, storageArea = window.localStorage } : Options<InputType> = {}
): [Readonly<InputType>, setStored<InputType>] => {
    const currentItem = storageArea.getItem(name)
    let parsedValue = currentItem;
    if (currentItem) {
        try {
            parsedValue = JSON.parse(currentItem);
        } catch (e) {
            // console.warn(`[useStorage] could not decode ${name} from storage`, e);
        }
    }
    const [value, setValue] = React.useState(
      currentItem?
      fromJS(parsedValue):
      placeholder
    )

    const onStorage = ({ key, oldValue, newValue, storageArea: eventStorageArea }:
                       Pick<StorageEvent, 'key' | 'oldValue' | 'newValue' | 'storageArea'>) => {
    // if it's not our record, the value has not changed, or it's for another storage area we skip
    // there could, or perhaps *should* be an extra check for if our local value differs from
    // the stored value, but this should be handled internally via React.
    if (key !== name || newValue == null || oldValue === newValue || storageArea !== eventStorageArea) return
    return setValue(fromJS(JSON.parse(newValue)))
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
