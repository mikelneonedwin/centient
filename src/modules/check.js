/**
 * @param {any[]} array 
 * @returns {boolean}
 */
const check = (array) => Boolean(array.length) && array.every((value) => Boolean(value));

export default check;