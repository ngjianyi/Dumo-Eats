/**
 * Capitalises the first letter of a string
 *
 * @param string - The input string
 * @returns - The input string with the first letter capitalised
 */
export default function capitaliseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
