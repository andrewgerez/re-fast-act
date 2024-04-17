import { useCallback } from 'react'
import { getDOMElement } from '../../utils/get-dom-element'
import { FocusHandlerParams, FocusKey, NavigationDirections, NavigationHandlerParams } from './types'

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
  function scrollYOnFocusReceived(id: string, index: number) {
    const element = document.getElementById(id);
    const parentElement = element?.parentElement

    if (!element) return;

    const elementHeight = element.offsetHeight;

    parentElement?.scrollTo({
      top: elementHeight * index,
      left: 0,
      behavior: 'smooth',
    })
  }
  
  return useCallback((event: KeyboardEvent) => {
    const element = getDOMElement(elementOnFocus)
    const parentElement = element?.parentElement
    const nextParentElement = parentElement?.nextElementSibling?.id;
    const previousParentElement = parentElement?.previousElementSibling?.id;
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

    if (event.key === NavigationDirections.ARROW_UP) {
      if (!previousParentElement) return

      const previousParentId = previousParentElement?.split('-').pop()
      const nextChildrenInNextParent = `${FocusKey.CANVAS}-${previousParentId}-0`

      focusHandler({
        elementId: nextChildrenInNextParent,
        focusStateDispatcher: setElementOnFocus,
      })

      scrollYOnFocusReceived(previousParentElement, Number(previousParentId))
    }

    if (event.key === NavigationDirections.ARROW_DOWN) {
      if (!nextParentElement) return

      const nextParentId = nextParentElement?.split('-').pop()
      const nextChildrenInNextParent = `${FocusKey.CANVAS}-${nextParentId}-0`

      focusHandler({
        elementId: nextChildrenInNextParent,
        focusStateDispatcher: setElementOnFocus,
      })

      scrollYOnFocusReceived(nextParentElement, Number(nextParentId))
    }
  }, [elementOnFocus])
}
