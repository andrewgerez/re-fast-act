import { useState, useEffect } from 'react'
import { FocusKey, NavigationEvents } from '../../hooks/navigation/types'
import { useNavigationHandler } from '../../hooks/navigation/use-navigation-handler'
import { getDOMElement } from '../../utils/get-dom-element'
import { useTMDBContent } from '../../hooks/content/use-tmdb-content'
import { TMDBEnum } from '../../enums'
import { Container, Wrapper } from './styles'
import Canvas from '../../canvas'
import { CardCanvasDimensions } from '../../canvas/canvas-dimensions'

export function Home() {
  const { contents } = useTMDBContent()
  
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

  return (
    <Container>
      <Wrapper>
        {contents?.map((content, index) => (
          <Canvas
            key={`${FocusKey.CANVAS}-${index}`}
            id={`${FocusKey.CANVAS}-${index}`}
            elementOnFocus={elementOnFocus === `${FocusKey.CANVAS}-${index}`}
            posterPath={`${TMDBEnum.POSTER_API}${content.poster_path}`}
            dimensions={CardCanvasDimensions}
          />
        ))}
      </Wrapper>
    </Container>
  )
}
