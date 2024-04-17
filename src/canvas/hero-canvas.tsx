import { memo, useEffect } from 'react'
import { CanvasHandler, CanvasHeroProps } from './types'
import { useCanvas } from './use-canvas'

// TO-DO: adjust args type (use readonly or constructor class)
function HeroCanvas(args: CanvasHeroProps) {
  const [width, height] = args.dimensions
  const dimensions = { width, height }
  console.log(args.backdropPath)

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
    img.src = args.backdropPath
    img.onload = () => {
      context.drawImage(img, 0, 0, context.canvas.width, context.canvas.height)

      const rightGradient = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height)
      rightGradient.addColorStop(0, 'transparent')
      rightGradient.addColorStop(0.2, 'transparent')
      rightGradient.addColorStop(0.75, 'black')
      rightGradient.addColorStop(1, 'black')

      const leftGradient = context.createLinearGradient(0, 0, context.canvas.width, context.canvas.height)
  leftGradient.addColorStop(0, 'black')
  leftGradient.addColorStop(0.1, 'black')
  leftGradient.addColorStop(0.75, 'transparent')

      context.fillStyle = rightGradient
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      context.fillStyle = leftGradient
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    }
  }

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    drawMutation(context)
  }, [args.backdropPath])

  return <canvas ref={canvasRef} {...args} {...dimensions} />
}

export default memo(HeroCanvas)
