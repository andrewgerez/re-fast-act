import { CardCanvasDimensions } from '../../canvas/canvas-dimensions'
import CardCanvas from '../../canvas/card-canvas'
import { TMDBEnum } from '../../enums'
import { Content } from '../../hooks/content/types'
import { FocusKey } from '../../hooks/navigation/types'
import { Wrapper } from './styles'

interface ICarouselSlider {
  carouselIndex: number
  contents?: Content[]
  elementOnFocus: string
  onContentFocus: React.Dispatch<React.SetStateAction<string>>
}

export function CarouselSlider({
  carouselIndex,
  contents,
  elementOnFocus,
  onContentFocus
}: ICarouselSlider) {
  function scrollXOnFocusReceived(id: string, index: number) {
    const element = document.getElementById(id);

    if (!element) return;

    const elementWidth = element.offsetWidth;
    const parentElement = element?.parentElement;

    parentElement?.scrollTo({
      top: 0,
      left: elementWidth * index,
      behavior: 'smooth',
    })
  }

  return (
    <Wrapper id={`${FocusKey.CAROUSEL}-${carouselIndex}`}>
      {contents?.map((content, index) => {
        const focusKey = `${FocusKey.CANVAS}-${carouselIndex}-${index}`

        const onCardFocus = () => {
          onContentFocus(content.backdrop_path)
          scrollXOnFocusReceived(focusKey, index)
        }

        return (
          <CardCanvas
            key={focusKey}
            id={focusKey}
            elementOnFocus={elementOnFocus === focusKey}
            onCardFocus={onCardFocus}
            posterPath={`${TMDBEnum.POSTER_API}/w400${content.poster_path}`}
            dimensions={CardCanvasDimensions}
          />
        )
      })}
    </Wrapper>
  )
}
