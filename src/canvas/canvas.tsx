import { memo, useEffect } from 'react'
import { CanvasHandler, CanvasProps } from './types'
import { useCanvas } from './use-canvas'

function Canvas(args: CanvasProps) {
  const { elementOnFocus } = args
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
    context.fillRect(0, 0, Number(args.width), Number(args.height))

    const img = new Image()
    img.src = args.posterPath
    img.onload = () => {
      context?.drawImage(img, 0, 0)
    }

    if (elementOnFocus) {
      context.lineWidth = 10
      context.strokeRect(0, 0, context.canvas.width, context.canvas.height)
    }
  }

  function handleMutation() {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    const rerender = () => {
      drawMutation(context)
      animationID = window.requestAnimationFrame(rerender)
    }

    rerender()
  }

  useEffect(() => {
    drawMutation(canvasRef.current?.getContext('2d'))

    return () => window.cancelAnimationFrame(animationID)
  }, [elementOnFocus])

  return <canvas ref={canvasRef} onClick={handleMutation} {...args} />
}

export default memo(Canvas)
