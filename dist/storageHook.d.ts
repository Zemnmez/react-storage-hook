/**
 * setStored is returned by useStorage.
 * It's used to set the stored value.
 * @param InputType the data type to be stored.
 */
export declare type setStored<InputType> = (newValue: InputType) => void;
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
export declare const useStorage: <InputType>(name: string, { placeholder, storageArea }: Options<InputType>) => [Readonly<InputType>, setStored<InputType>];
//# sourceMappingURL=storageHook.d.ts.map