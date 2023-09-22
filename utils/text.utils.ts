export function capitalize(text: string): string {
  return text[0].toUpperCase() +text.slice(1)
}

export const highlightText = (targetText: string, highlightText: string, className="highlight-text") => {
  return targetText.replace(
    new RegExp(highlightText, 'gi'),
    match => `<mark class="${className}">${match}</mark>`
  )
}
