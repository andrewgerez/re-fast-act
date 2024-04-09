import { useCallback } from 'react'
import { getDOMElement } from '../../utils/get-dom-element'
import { FocusHandlerParams, NavigationDirections, NavigationHandlerParams } from './types'

function focusHandler({
  elementId,
  focusStateDispatcher
}: FocusHandlerParams) {
  if (!elementId) return

  const elementToFocus = getDOMElement(elementId)
  elementToFocus?.focus()
  focusStateDispatcher(elementId)
}

export function useNavigationHandler({
  elementOnFocus,
  setElementOnFocus,
}: NavigationHandlerParams) {
  return useCallback((event: KeyboardEvent) => {
    const element = getDOMElement(elementOnFocus)
    const nextElementId = element?.nextElementSibling?.id
    const previousElementId = element?.previousElementSibling?.id
  
    if (event.key === NavigationDirections.ARROW_RIGHT) {
      focusHandler({
        elementId: nextElementId,
        focusStateDispatcher: setElementOnFocus,
      })
    }
  
    if (event.key === NavigationDirections.ARROW_LEFT) {  
      focusHandler({
        elementId: previousElementId,
        focusStateDispatcher: setElementOnFocus,
      })
    }
  }, [elementOnFocus])
}
