import { useEffect } from 'react'
import { CanvasHandler, CanvasProps } from './types'
import { useCanvas } from './use-canvas'

interface CanvasComponentProps {
  readonly args?: CanvasProps
}

export function Canvas({ args }: CanvasComponentProps) {
  const canvasDrawHandler: CanvasHandler = ([canvas, context]) => {
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  const canvasRef = useCanvas(canvasDrawHandler)

  function drawMutation(
    context: CanvasRenderingContext2D | null | undefined,
    count: number
  ) {
    context?.clearRect(0, 0, context.canvas.width, context.canvas.height)
    const delta = count % 800
    context?.fillRect(10 + delta, 10, 100, 100)
  }

  function handleMutation() {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    let count = 0
    let animationID: number

    const rerender = () => {
      count ++
      drawMutation(context, count)
      animationID = window.requestAnimationFrame(rerender)
    }

    rerender()

    return () => {
      window.cancelAnimationFrame(animationID)
    }
  }

  return <canvas ref={canvasRef} onClick={handleMutation} {...args} />
}
