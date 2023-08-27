export function capitalize(text: string): string {
  return text[0].toUpperCase() +text.slice(1)
}

export const removeSpaces = (itemName: string): string => itemName.replace(/\s+/g, '-');