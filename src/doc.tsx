/**
 * @module react-storage-hook
 * @requires prop-types
 * @requires react
 * @requires react-dom
 * @summary A react state hook that is synchronised and persisted in localStorage, and between tabs.
 * @version 1.0.0
 * @author zemnmez
 * @copyright zemnmez 2019
 * @license MIT
 * ## Installation
 * 
 * ```bash
 * yarn add react-storage-hook
 * ```
 * 
 * ## Example
 * @example
 * 
 * ```javascript
 * import React from 'react'
 * 
 * export const SavedTextarea = () => {
 *   const [text, setText] = useStorage('saved-text', {
 *     placeholder: ""
 *   });
 * 
 *   const onChange = e => setText(e.target.value);
 * 
 *   return <textarea {...{
 *     onChange,
 *     value: text
 *   }}/>
 * }
 * ```
 * 
 */

/**
 *  
 */


