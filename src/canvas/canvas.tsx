import { CanvasHandler, CanvasProps } from './types'
import { useCanvas } from './use-canvas'

interface CanvasComponentProps {
  readonly args: CanvasProps
}

export function Canvas({ args }: CanvasComponentProps) {
  const canvasDrawHandler: CanvasHandler = ([canvas, context]) => {
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const canvasRef = useCanvas(canvasDrawHandler)

  return <canvas ref={canvasRef} {...args} />
}
