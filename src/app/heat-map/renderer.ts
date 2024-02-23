import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three'
import { VIDEO_CAPTURE_SIZE as SIZE } from '~/constants'

export class Renderer {
  private readonly renderer: WebGLRenderer
  private readonly scene: Scene
  private readonly camera: PerspectiveCamera
  private readonly geometry: BufferGeometry
  private readonly material: MeshBasicMaterial
  private readonly mesh: Mesh

  constructor(
    canvas: HTMLCanvasElement,
    private width: number,
    private height: number,
  ) {
    canvas.width = width
    canvas.height = height
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
    this.geometry = new PlaneGeometry(SIZE, SIZE, SIZE - 1, SIZE - 1)
    this.material = new MeshBasicMaterial({ vertexColors: true })
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.position.set(0, 0, 0)
    this.mesh.rotation.x = (-Math.PI / 2) * 0.55
    this.camera.position.z = 450
    this.scene.add(this.mesh)
    this.resize(width, height)
  }

  render(data: Uint8ClampedArray) {
    const vertices = this.geometry.attributes.position.array as Float32Array
    const colors = []
    const length = data.length

    for (let i = 0, j = 0; i < length; i += 4, j += 3) {
      const movement = data[i]
      const height = heightBy(movement, this.height)
      const color = colorBy(movement)
      colors.push(color.r, color.g, color.b)
      vertices[j * 3 + 2] = height
    }
    this.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
    this.material.needsUpdate = true
    this.renderer.render(this.scene, this.camera)
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.renderer.setSize(this.width, this.height)
  }
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
    return new Color(red / 255, green / 255, blue / 255)
  }

  red = Math.round(red * brightness)
  green = Math.round(green * brightness)
  blue = Math.round(blue * brightness)

  return new Color(red / 255, green / 255, blue / 255)
}

function heightBy(movement: number, height: number, fullRange = 512) {
  const factor = height * 0.15
  const normalizedMovement = 1 - (movement / fullRange)
  const mappedMovement = normalizedMovement * factor
  return mappedMovement
}
