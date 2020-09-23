import { set, transform, camelCase, snakeCase } from 'lodash';
import { isArray, isObjectLike, isPlainObject, map } from 'lodash/fp';

function createIteratee(converter, self) {
  return (result, value, key) =>
    set(result, converter(key), isObjectLike(value) ? self(value) : value);
}

export default function createCaseConverter(keyConverter) {
  return function convert(node) {
    if (isArray(node)) return map(convert, node);
    if (isPlainObject(node))
      return transform(node, createIteratee(keyConverter, convert));
    return node;
  };
}

export const convertToCamelCase = createCaseConverter(camelCase);
export const convertToSnakeCase = createCaseConverter(snakeCase);
