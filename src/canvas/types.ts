export interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

export type CanvasHandlerArgsType = [HTMLCanvasElement, CanvasRenderingContext2D]

export type CanvasHandler = ([canvas, context]: CanvasHandlerArgsType) => void
