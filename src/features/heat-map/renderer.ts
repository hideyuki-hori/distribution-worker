import {
  BufferGeometry,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three'
import { VIDEO_CAPTURE_SIZE as SIZE } from '~/app'

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
    this.mesh.rotation.x = (-Math.PI / 2) * 0.44
    this.camera.position.y = 80
    this.camera.position.z = 530
    this.scene.add(this.mesh)
    this.resize(width, height)
  }

  render(vertices: ArrayBufferLike, colors: ArrayBufferLike) {
    this.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
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

