export interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  id?: string;
  elementOnFocus: boolean;
  posterPath: string;
}

export type CanvasHandlerArgsType = [HTMLCanvasElement, CanvasRenderingContext2D]

export type CanvasHandler = ([canvas, context]: CanvasHandlerArgsType) => void
