"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const React = __importStar(require("react"));
/**
 * A React hook for synchronized use of localStorage,
 * sessionStorage etc
 * @param name Name of the localStorage key
 * @param placeholder Default value if nothing stored
 * @param storageArea Storage to use (default window.localStorage)
 */
exports.useStorage = (name, { placeholder, storageArea = window.localStorage } = {}) => {
    let currentValue = storageArea.getItem(name);
    let parsedValue;
    if (currentValue) {
        try {
            parsedValue = JSON.parse(currentValue);
        }
        catch (e) { }
    }
    const [value, setValue] = React.useState(parsedValue ? immutable_1.fromJS(parsedValue) : placeholder);
    // handle a storage event in our chosen storageArea
    const onStorage = ({ key, oldValue, newValue, storageArea: eventStorageArea }) => {
        // if it's not our record, the value has not changed, or it's for another storage area we skip
        if (key !== name || oldValue === newValue || storageArea !== eventStorageArea)
            return;
        let parsedNewValue;
        if (newValue !== null) {
            parsedNewValue = immutable_1.fromJS(JSON.parse(newValue));
        }
        setValue(parsedNewValue);
    };
    // set a new stored value
    const setStorage = React.useCallback((value) => {
        const oldValue = storageArea.getItem(name);
        let newValue;
        if (value === undefined || value === null) {
            newValue = null;
            storageArea.removeItem(name);
        }
        else {
            newValue = JSON.stringify(value);
            storageArea.setItem(name, newValue);
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
            window.removeEventListener('storage', onStorage);
        };
    }, []);
    return [Object.freeze(value), setStorage];
};
//# sourceMappingURL=storageHook.js.map