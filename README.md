react-storage-hook
==================

Javascript library for synchronously managing localStorage / sessionStorage. Typescript types included.

![demo.gif]

Installation
------------
```bash
yarn add react-storage-hook
```

Usage
-----

See also [live example](https://zemnmez.github.io/react-storage-hook) with sourcemaps and the [local copy](./example).

```typescript
import { useStorage } from 'react-storage-hook';

const SavedCheckbox = () => {
  const [checked, setChecked] = useStorage('saved-checkbox-checked', {
    placeholder: false,
    // storageArea: sessionStorage // to use session storage instead
  })

  const onChange = e => setChecked(e.target.checked);

  return <input {...{
    checked,
    onChange,
    type: "checkbox"
  }}>
}
```

The checked state will be stored and synchronized between instances of the page.

The typescript types are authoratative for API scheme. 


[demo.gif]: ./demo.gif