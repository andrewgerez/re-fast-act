import { RefObject, useEffect, useRef } from 'react'
import { CanvasHandler, CanvasHandlerArgsType } from './types'

export function useCanvas(cb: CanvasHandler) {
  const canvasRef: RefObject<HTMLCanvasElement> | null = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    cb([canvas, context] as CanvasHandlerArgsType)
  }, [])

  return canvasRef
}
