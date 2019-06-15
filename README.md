# react-storage-hook

> A react state hook that is synchronised and persisted in localStorage, and between tabs.

[![NPM](https://img.shields.io/npm/v/react-storage-hook.svg)](https://www.npmjs.com/package/react-storage-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-storage-hook
```

## Usage
This example demonstrates a simple component whose text is stored. See the [full example](example/src/App.js) for more code
and check it out [live on github pages](https://zemnmez.github.io/react-storage-hook).

```jsx
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

## Reference
### useStorage(name, { placeholder, storageArea = window.localStorage })
#### name
The key that the value will be stored under.
#### placeholder (optional)
The initial value, if no value is already stored.
#### storageArea (optional)
An [nsIDOMStorage](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIDOMStorage) i.e. localStorage or sessionStorage (defaults to localStorage).

## License

MIT © [zemnmez](https://github.com/zemnmez)