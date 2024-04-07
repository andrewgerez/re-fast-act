import { useCanvas } from './use-canvas'

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

type CanvasArrCb = [HTMLCanvasElement, CanvasRenderingContext2D]

export function Canvas(
  args: CanvasProps
) {
  function canvasDrawHandler([canvas, context]: CanvasArrCb) {
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const canvasRef = useCanvas(canvasDrawHandler)

  return <canvas ref={canvasRef} {...args} />
}
