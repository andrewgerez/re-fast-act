import { RefObject, useEffect, useRef } from 'react'

export function useCanvas(cb: any) {
  const canvasRef: RefObject<HTMLCanvasElement> | null = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    cb([canvas, context])
  }, [])

  return canvasRef
}
