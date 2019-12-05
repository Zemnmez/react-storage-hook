> **[react-storage-hook](README.md)**

[Globals]() / [react-storage-hook](README.md) /

**`requires`** react

**`requires`** react-dom

**`summary`** A react state hook that is synchronised and persisted in localStorage, and between tabs.

**`version`** 1.0.0

**`author`** zemnmez

**`copyright`** zemnmez 2019

**`license`** MIT
## Installation

```bash
yarn add react-storage-hook
```
Check out the [live example](https://zemnmez.github.io/react-storage-hook)!
## Example

**`example`** 

```javascript
import React from 'react'
import { useStorage } from 'react-storage-hook'

export const SavedTextarea = () => {
  const [text, setText] = useStorage('saved-text', {
    placeholder: ""
  });

  const onChange = e => setText(e.target.value);

  return <textarea {...{
    onChange,
    value: text
  }}/>
}
```

### Index

#### Interfaces

* [Options](interfaces/react_storage_hook.options.md)

#### Functions

* [useStorage](README.md#const-usestorage)

## Functions

### `Const` useStorage

▸ **useStorage**<**InputType**>(`name`: *string*, `__namedParameters`: *object*): *[`Readonly<InputType>`, `setStored<InputType>`]*

*Defined in [index.tsx:40](https://github.com/noahm/react-storage-hook/blob/7bbad39/src/index.tsx#L40)*

useStorage is a react hook providing integration and synchronization with
localStorage. The value returned will likely not be the same type as input,
unless the input type is an immutable value that
would be produced by immutable.js.

The output value will always be an [[immutableValue]] of the kind produced by
immutable.js.

**Type parameters:**

▪ **InputType**: *`__type`*

**Parameters:**

▪ **name**: *string*

The key used to store the data in.

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type | Default |
------ | ------ | ------ |
`placeholder` | undefined \| `InputType` | - |
`storageArea` | `Storage` |  window.localStorage |

**Returns:** *[`Readonly<InputType>`, `setStored<InputType>`]*
