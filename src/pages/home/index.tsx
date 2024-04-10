import { useState, useEffect } from 'react'
import Canvas from '../../canvas/canvas'
import { FocusKey, NavigationEvents } from '../../hooks/navigation/types'
import { useNavigationHandler } from '../../hooks/navigation/use-navigation-handler'
import { getDOMElement } from '../../utils/get-dom-element'
import { useTMDBContent } from '../../hooks/content/use-tmdb-content'
import { TMDBEnum } from '../../enums'

export function Home() {
  const [elementOnFocus, setElementOnFocus] = useState<string>(`${FocusKey.CANVAS}-0`)
  const navigationHandler = useNavigationHandler({
    elementOnFocus,
    setElementOnFocus,
  })

  useEffect(() => {
    const element = getDOMElement(elementOnFocus)
    element?.focus()
  }, [])

  useEffect(() => {
    window.addEventListener(NavigationEvents.KEY_DOWN, navigationHandler)

    return () => {
      window.removeEventListener(NavigationEvents.KEY_DOWN, navigationHandler)
    }
  }, [navigationHandler])
  
  const { data } = useTMDBContent()
  const contents = data?.results

  console.log(contents)

  return (
    <div className="canvas-container">
      {contents?.map((content, index) => (
        <Canvas
          id={`${FocusKey.CANVAS}-${index}`}
          key={`${FocusKey.CANVAS}-${index}`}
          width={250}
          height={400}
          elementOnFocus={elementOnFocus === `${FocusKey.CANVAS}-${index}`}
          posterPath={`${TMDBEnum.POSTER_API}${content.poster_path}`}
        />
      ))}
    </div>
  )
}
