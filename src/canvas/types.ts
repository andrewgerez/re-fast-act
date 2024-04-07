export interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  id?: string;
  elementOnFocus: boolean;
}

export type CanvasHandlerArgsType = [HTMLCanvasElement, CanvasRenderingContext2D]

export type CanvasHandler = ([canvas, context]: CanvasHandlerArgsType) => void
