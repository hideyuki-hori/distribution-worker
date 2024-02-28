export type Payload = {
  capture: Uint8ClampedArray
  size: number
  height: number
}

export type Result = {
  vertices: ArrayBufferLike
  colors: ArrayBufferLike
}