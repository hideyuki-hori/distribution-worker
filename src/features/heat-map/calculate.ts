export function calculate(capture: Uint8ClampedArray, size: number, height: number) {
  const vertices = new Float32Array(size * size * 3)
  const colors = new Float32Array(size * size * 3)
  let vertexIndex = 0
  let colorIndex = 0

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4
      const movement = capture[i]
      const v = heightBy(movement, height, size)
      const [red, green, blue] = colorBy(movement)
      vertices[vertexIndex++] = (x - size / 2)
      vertices[vertexIndex++] = (y - size / 2) * -1
      vertices[vertexIndex++] = v
      colors[colorIndex++] = red
      colors[colorIndex++] = green
      colors[colorIndex++] = blue
    }
  }

  return [vertices, colors]
}

function colorBy(movement: number) {
  const normalizedMovement = movement / 255
  const brightness = 0.6

  let red = Math.round(203 + (normalizedMovement * (0 - 203)))
  let green = Math.round(27 + (normalizedMovement * (170 - 27)))
  let blue = Math.round(69 + (normalizedMovement * (144 - 69)))

  if (normalizedMovement > 0.2) {
    red = Math.round(0 + ((normalizedMovement - 0.5) * (0 - 0)))
    green = Math.round(170 + ((normalizedMovement - 0.5) * (0 - 170)))
    blue = Math.round(90 + ((normalizedMovement - 0.5) * (204 - 90)))
  }

  if (normalizedMovement > 0.8) {
    return [red / 255, green / 255, blue / 255]
  }

  red = Math.round(red * brightness)
  green = Math.round(green * brightness)
  blue = Math.round(blue * brightness)

  return [red / 255, green / 255, blue / 255]
}

function heightBy(movement: number, height: number, fullRange: number) {
  const factor = height * 0.24
  const normalizedMovement = 1 - (movement / fullRange)
  const mappedMovement = normalizedMovement * factor
  return mappedMovement
}