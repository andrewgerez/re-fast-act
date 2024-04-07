import { useEffect, useState } from 'react'
import Canvas from './canvas/canvas'
import { getDOMElement } from './utils/get-dom-element'
import { useNavigationHandler } from './hooks/navigation/use-navigation-handler'
import { FocusKey, NavigationEvents } from './hooks/navigation/types'
import './App.css'

export default function App() {
  const [elementOnFocus, setElementOnFocus] = useState<string>('')
  const navigationHandler = useNavigationHandler({
    elementOnFocus,
    setElementOnFocus,
  })

  useEffect(() => {
    const element = getDOMElement(`${FocusKey.CANVAS}-0`)
    element?.focus()
    setElementOnFocus(`${FocusKey.CANVAS}-0`)
  }, [])

  useEffect(() => {
    window.addEventListener(NavigationEvents.KEY_DOWN, navigationHandler)

    return () => {
      window.removeEventListener(NavigationEvents.KEY_DOWN, navigationHandler)
    }
  }, [navigationHandler])

  return (
    <div className="canvas-container">
      {Array(7).fill(0).map((_, index) => (
        <Canvas
          id={`${FocusKey.CANVAS}-${index}`}
          key={`${FocusKey.CANVAS}-${index}`}
          width={250}
          height={400}
          elementOnFocus={elementOnFocus === `${FocusKey.CANVAS}-${index}`}
        />
      ))}
    </div>
  )
}
