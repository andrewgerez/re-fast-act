import './App.css'
import { Canvas } from './canvas/canvas'

export default function App() {
  return (
    <div className="canvas-container">
      <Canvas args={{ width: 800, height: 500 }} />
    </div>
  )
}
