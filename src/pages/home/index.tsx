import { useState, useEffect } from 'react'
import { FocusKey, NavigationEvents } from '../../hooks/navigation/types'
import { useNavigationHandler } from '../../hooks/navigation/use-navigation-handler'
import { getDOMElement } from '../../utils/get-dom-element'
import { useTMDBContent } from '../../hooks/content/use-tmdb-content'
import { CarouselsWrapper, Container, Hero } from './styles'
import { CarouselSlider } from '../../components/carousel-slider'
import { BannerCanvasDimensions } from '../../canvas/canvas-dimensions'
import { TMDBEnum } from '../../enums'
import HeroCanvas from '../../canvas/hero-canvas'

export function Home() {
  const { contents } = useTMDBContent()

  const [elementOnFocus, setElementOnFocus] = useState<string>(`${FocusKey.CANVAS}-0-0`)
  const [contentImageOnFocus, setContentImageOnFocus] = useState<string>("/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg")
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
      <Hero>
        <HeroCanvas
          key={FocusKey.HERO}
          id={FocusKey.HERO}
          backdropPath={`${TMDBEnum.POSTER_API}/w1280${contentImageOnFocus}`}
          dimensions={BannerCanvasDimensions}
        />
      </Hero>
      <CarouselsWrapper>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselSlider
            key={`${FocusKey.CANVAS}-${index}`}
            carouselIndex={index}
            contents={contents}
            elementOnFocus={elementOnFocus}
            onContentFocus={setContentImageOnFocus}
          />
        ))}
      </CarouselsWrapper>
    </Container>
  )
}
