import { memo, useEffect } from 'react'
import { CanvasHandler, CanvasProps } from './types'
import { useCanvas } from './use-canvas'

// TO-DO: adjust args type (use readonly or constructor class)
function CardCanvas(args: CanvasProps) {
  const { elementOnFocus } = args
  const [width, height] = args.dimensions
  const dimensions = { width, height }
  let animationID: number

  const canvasDrawHandler: CanvasHandler = ([canvas, context]) => {
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const canvasRef = useCanvas(canvasDrawHandler)

  function drawMutation(
    context: CanvasRenderingContext2D | null | undefined,
  ) {
    if (!context) return

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    const img = new Image()
    img.src = args.posterPath
    img.onload = () => {
      context.drawImage(img, 0, 0)

      if (elementOnFocus) {
        context.strokeStyle = 'orange'
        context.lineWidth = 10
        context.strokeRect(0, 0, width, height)
        
        args.onCardFocus()
      }
    }
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    drawMutation(context)

    return () => window.cancelAnimationFrame(animationID)
  }, [elementOnFocus])

  return <canvas ref={canvasRef} {...args} {...dimensions} />
}

export default memo(CardCanvas)
