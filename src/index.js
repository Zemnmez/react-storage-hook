import React from 'react'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
const Immutable = { fromJS }

const Storage = ({
  value,
  name,
  storageArea = window.localStorage,
  children
}) => {
  const [localValue, setLocalValue] = React.useState(storageArea.getItem(name) || value)

  const onStorage = ({ key, oldValue, newValue, storageArea: eventStorageArea }) => {
    // if it's not our record, the value has not changed, or it's for another storage area we skip
    // there could, or perhaps *should* be an extra check for if our local value differs from
    // the stored value, but this should be handled internally via React.
    if (key !== name || oldValue === newValue || storageArea !== eventStorageArea) return
    return setLocalValue(Immutable.fromJS(JSON.parse(newValue)))
  }

  // listen to storage events on mount and unmount
  React.useEffect(() => {
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  // sync any changes in value ... NB: *NOT* a change in `localValue`
  // this is simply when the prop `value` changes. localValue
  // is only set by changing what's in storage.
  React.useEffect(() => {
    storageArea.setItem(name, JSON.stringify(value))
  }, [value])

  return children(localValue)
}

Storage.propTypes = {
  value: PropTypes.object,
  name: PropTypes.string.isRequired,
  storageArea: PropTypes.shape({
    getItem: PropTypes.func.isRequired,
    setItem: PropTypes.func.isRequired
  }),
  children: PropTypes.func.isRequired
}

export default Storage
