import { CanvasType } from '../enums'

function getCanvasDimensions(type: CanvasType) {
  const map = {
    [CanvasType.CANVAS_BANNER]: [1920, 1080],
    [CanvasType.CANVAS_CARD]: [250, 400]
  }

  return map[type]
}

export const BannerCanvasDimensions = getCanvasDimensions(CanvasType.CANVAS_BANNER)
export const CardCanvasDimensions = getCanvasDimensions(CanvasType.CANVAS_CARD)
