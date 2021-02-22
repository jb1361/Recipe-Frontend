
export const convertToKebabCase = (str: string) => {
  return str.replace(/\s+/g, '-').toLowerCase();
};

export function toTitleCase(str: string) {
  return str
    .replace(/\w\S*/g,
      (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
    .replace(/And\s/, 'and ');
}

export function convertCamelCaseToTitleCase(str: string) {
  return str.replace(/([A-Z]+)/g,
    (txt: string) => txt.replace(txt.charAt(0), ' ' + txt.charAt(0))
  ).replace(' ', '');
}

export function stripPrefix(fieldName: string) {
  return fieldName.substring(fieldName.lastIndexOf('.') + 1);
}

/**
 * Returns the number of occurrences in a string
 * @param {string} str The string to check
 * @param {string} countStr The string to check for
 * @returns {number} The number of occurrences
 */
export function countOccurrencesInString(str: string, countStr: string) {
  return (str.match(new RegExp(countStr, 'g')) || []).length;
}

export function convertToVariableName(str: string) {
  // remove all non-variable characters and replace them with underscores.
  str = str.replace(/[^a-zA-Z0-9 -]|\s+/g, '_')
    // replace multiple underscores next to each other with only one underscore
    .replace(/_+/g, '_')
    .replace(/-+/g, '_');
  // remove the last underscore if the string ends with it.
  if (str.length > 1 && str.lastIndexOf('_') === str.length - 1) {
    str = str.substr(0, str.length - 1);
  }
  return str;
}

export function convertPascalToSentence(str: string) {
  return str.replace(/([A-Z])/g, ' $1');
}

export function isNullOrWhitespace(s: string | null | undefined) {
  return s === null || s === undefined || s.trim().length === 0;
}
