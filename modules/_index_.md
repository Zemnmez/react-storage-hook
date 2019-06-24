> ## [react-storage-hook](../README.md)

["index"](_index_.md) /

# External module: "index"

### Index

#### Type aliases

* [setStored](_index_.md#setstored)
* [stored](_index_.md#stored)

#### Functions

* [useStorage](_index_.md#const-usestorage)

#### Object literals

* [Immutable](_index_.md#const-immutable)

## Type aliases

###  setStored

Ƭ **setStored**: *function*

*Defined in [index.tsx:6](https://github.com/Zemnmez/react-storage-hook/blob/db3d95c/src/index.tsx#L6)*

#### Type declaration:

▸ (`newValue`: `Kind`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newValue` | `Kind` |

___

###  stored

Ƭ **stored**: *any*

*Defined in [index.tsx:5](https://github.com/Zemnmez/react-storage-hook/blob/db3d95c/src/index.tsx#L5)*

___

## Functions

### `Const` useStorage

▸ **useStorage**<**InputType**>(`name`: string, `__namedParameters`: object): *[[stored](_index_.md#stored), [setStored](_index_.md#setstored)‹*`InputType`*›]*

*Defined in [index.tsx:11](https://github.com/Zemnmez/react-storage-hook/blob/db3d95c/src/index.tsx#L11)*

useStorage is a react hook providing integration and synchronization with localStorage.

**Type parameters:**

■` InputType`: *`__type`*

**Parameters:**

■` name`: *string*

■` __namedParameters`: *object*

Name | Type | Default |
------ | ------ | ------ |
`placeholder` | any | - |
`storageArea` | `Storage` |  window.localStorage |

**Returns:** *[[stored](_index_.md#stored), [setStored](_index_.md#setstored)‹*`InputType`*›]*

___

## Object literals

### `Const` Immutable

### ■ **Immutable**: *object*

*Defined in [index.tsx:3](https://github.com/Zemnmez/react-storage-hook/blob/db3d95c/src/index.tsx#L3)*

###  fromJS

● **fromJS**: *`fromJS`*

*Defined in [index.tsx:3](https://github.com/Zemnmez/react-storage-hook/blob/db3d95c/src/index.tsx#L3)*

___