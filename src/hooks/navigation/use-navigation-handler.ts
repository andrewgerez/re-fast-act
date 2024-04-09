import { useCallback } from 'react'
import { getDOMElement } from '../../utils/get-dom-element'
import { FocusKey, NavigationDirections, NavigationHandlerParams } from './types'

export function useNavigationHandler({
  elementOnFocus,
  setElementOnFocus,
}: NavigationHandlerParams) {
  return useCallback((event: KeyboardEvent) => {
    const element = getDOMElement(elementOnFocus)
    const nextElementId = element?.nextElementSibling?.id
    const previousElementId = element?.previousElementSibling?.id
  
    if (event.key === NavigationDirections.ARROW_RIGHT && nextElementId) {
      if (!nextElementId.startsWith(FocusKey.CANVAS)) return
  
      const nextElement = getDOMElement(nextElementId)
      nextElement?.focus()
      setElementOnFocus(nextElementId)
    }
  
    if (event.key === NavigationDirections.ARROW_LEFT && previousElementId) {
      if (!previousElementId?.startsWith(FocusKey.CANVAS)) return
  
      const previousElement = getDOMElement(previousElementId)
      previousElement?.focus()
      setElementOnFocus(previousElementId)
    }
  }, [elementOnFocus])
}
