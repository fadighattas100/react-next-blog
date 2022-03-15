'use strict';

export const isEmpty = (val) => {
    return (typeof val === "undefined" || typeof val === 'undefined' || val === undefined || val == null || val === '' || val === "" || val.length <= 0);
};

/**
 * Check if object is empty
 *
 * @param {Object} obj
 *
 * @return boolean
 */
export const isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

/**
 * Remove object form array by key/value
 *
 * @param {Array} array
 * @param {String} key
 * @param {String} value
 *
 * @return Array
 */
export const removeObjectFromArrayByKey = (array, key, value) => {
    return array.filter((obj) => {
        return obj[key] !== value;
    });
};