import { fromJS } from 'immutable';
import * as React from 'react';


/**
 * setStored is returned by useStorage. It's used to set the stored value.
 * Passing `null` or `undefined` will delete the value from storage.
 * All components in all open tabs of the browser will receive the update.
 * @param InputType the data type to be stored.
 */
export type setStored<InputType> = (newValue: InputType | undefined) => void;

/**
 * Options that can be provided to useStorage.
 * @param InputType the data type to be stored
 */
export interface Options<InputType> {

    /**
     * The default value if nothing is stored
     * @default undefined
     */
    placeholder?: InputType;

    /**
     * The Storage to use.
     * @default window.localStorage
     */
    storageArea?: Storage;
}

/**
 * A React hook for synchronized use of localStorage,
 * sessionStorage etc
 * @param name Name of the localStorage key 
 * @param placeholder Default value if nothing stored
 * @param storageArea Storage to use (default window.localStorage)
 */
export const useStorage = <InputType>(
    name: string,
    {
        placeholder,
        storageArea = window.localStorage
    }: Options<InputType> = {}
): [Readonly<InputType> | undefined, setStored<InputType>] => {
    let currentValue = storageArea.getItem(name);
    let parsedValue: InputType | undefined;
    if (currentValue) {
        try {
            parsedValue = JSON.parse(currentValue);
        } catch (e) {}
    }

    const [value, setValue] = React.useState<InputType | undefined>(
        parsedValue? fromJS(parsedValue): placeholder
    )

    type onStorageEvent = Pick<StorageEvent, 'key' | 'oldValue' | 'newValue' | 'storageArea'>;

    // handle a storage event in our chosen storageArea
    const onStorage = ({
        key, oldValue, newValue, storageArea: eventStorageArea
    }: onStorageEvent) => {
        // if it's not our record, the value has not changed, or it's for another storage area we skip
        if (key !== name || oldValue === newValue || storageArea !== eventStorageArea) return

        let parsedNewValue: InputType | undefined;
        if (newValue !== null) {
            parsedNewValue = fromJS(JSON.parse(newValue))
        }
        setValue(parsedNewValue)
    }

    // set a new stored value
    const setStorage = React.useCallback((value: InputType | undefined) => {
        const oldValue: string | null = storageArea.getItem(name);
        let newValue: string | null;
        if (value === undefined || value === null) {
          newValue = null
          storageArea.removeItem(name)
        } else {
          newValue = JSON.stringify(value)
          storageArea.setItem(name, newValue)
        }

        // fire an event. onStorage only fires between windows
        // so this is needed to ensure we update ourselves.
        onStorage({
            key: name,
            newValue,
            oldValue,
            storageArea
        });
    }, [name, storageArea]);

    // listen to storage events on mount and unmount
    React.useEffect(() => {
        window.addEventListener('storage', onStorage);

        return () => {
            window.removeEventListener('storage', onStorage)
        }
    }, []);

    return [Object.freeze(value), setStorage];
}
