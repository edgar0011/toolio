import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SMAAPreset,
} from 'postprocessing'
import * as THREE from 'three'

import { lerp, pickRandom, random } from '../../common.helpers'
import {
  buildDistortions,
  carLightsFragment,
  carLightsVertex,
  DEFAULT_OPTIONS,
  distortion_uniforms,
  distortion_vertex,
  islandFragment,
  resizeRendererToDisplaySize,
  roadFragment,
  roadVertex,
  sideSticksFragment,
  sideSticksVertex,
} from './hyperspeed.helpers'

/* ---- Three.js scene classes ---- */
class CarLights {
  webgl: any
  options: any
  colors: any
  speed: any
  fade: any
  mesh!: THREE.Mesh

  constructor(webgl: any, options: any, colors: any, speed: any, fade: any) {
    this.webgl = webgl
    this.options = options
    this.colors = colors
    this.speed = speed
    this.fade = fade
  }

  init() {
    const options = this.options
    const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1))
    const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false)
    const instanced = new THREE.InstancedBufferGeometry().copy(
      geometry as unknown as THREE.InstancedBufferGeometry,
    )
    instanced.instanceCount = options.lightPairsPerRoadWay * 2

    const laneWidth = options.roadWidth / options.lanesPerRoad
    const aOffset: number[] = []
    const aMetrics: number[] = []
    const aColor: number[] = []

    let colors = this.colors
    if (Array.isArray(colors)) {
      colors = colors.map((c: number) => new THREE.Color(c))
    } else {
      colors = new THREE.Color(colors)
    }

    for (let i = 0; i < options.lightPairsPerRoadWay; i++) {
      const radius = random(options.carLightsRadius)
      const length = random(options.carLightsLength)
      const speed = random(this.speed)
      const carLane = i % options.lanesPerRoad
      let laneX = carLane * laneWidth - options.roadWidth / 2 + laneWidth / 2
      const carWidth = random(options.carWidthPercentage) * laneWidth
      const carShiftX = random(options.carShiftX) * laneWidth
      laneX += carShiftX
      const offsetY = random(options.carFloorSeparation) + radius * 1.3
      const offsetZ = -random(options.length)

      aOffset.push(laneX - carWidth / 2, offsetY, offsetZ)
      aOffset.push(laneX + carWidth / 2, offsetY, offsetZ)
      aMetrics.push(radius, length, speed)
      aMetrics.push(radius, length, speed)
      const color = pickRandom(colors)
      aColor.push(color.r, color.g, color.b)
      aColor.push(color.r, color.g, color.b)
    }

    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false),
    )
    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false),
    )
    instanced.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false),
    )

    const material = new THREE.ShaderMaterial({
      fragmentShader: carLightsFragment,
      vertexShader: carLightsVertex,
      transparent: true,
      uniforms: Object.assign(
        {
          uTime: { value: 0 },
          uTravelLength: { value: options.length },
          uFade: { value: this.fade },
        },
        this.webgl.fogUniforms,
        options.distortion.uniforms,
      ),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    material.onBeforeCompile = (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        options.distortion.getDistortion,
      )
    }

    const mesh = new THREE.Mesh(instanced, material)
    mesh.frustumCulled = false
    this.webgl.scene.add(mesh)
    this.mesh = mesh
  }

  update(time: number) {
    ;(this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time
  }
}

class LightsSticks {
  webgl: any
  options: any
  mesh!: THREE.Mesh

  constructor(webgl: any, options: any) {
    this.webgl = webgl
    this.options = options
  }

  init() {
    const options = this.options
    const geometry = new THREE.PlaneGeometry(1, 1)
    const instanced = new THREE.InstancedBufferGeometry().copy(
      geometry as unknown as THREE.InstancedBufferGeometry,
    )
    const totalSticks = options.totalSideLightSticks
    instanced.instanceCount = totalSticks

    const stickoffset = options.length / (totalSticks - 1)
    const aOffset: number[] = []
    const aColor: number[] = []
    const aMetrics: number[] = []

    let colors = options.colors.sticks
    if (Array.isArray(colors)) {
      colors = colors.map((c: number) => new THREE.Color(c))
    } else {
      colors = new THREE.Color(colors)
    }

    for (let i = 0; i < totalSticks; i++) {
      const width = random(options.lightStickWidth)
      const height = random(options.lightStickHeight)
      aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random())
      const color = pickRandom(colors)
      aColor.push(color.r, color.g, color.b)
      aMetrics.push(width, height)
    }

    instanced.setAttribute(
      'aOffset',
      new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false),
    )
    instanced.setAttribute(
      'aColor',
      new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false),
    )
    instanced.setAttribute(
      'aMetrics',
      new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false),
    )

    const material = new THREE.ShaderMaterial({
      fragmentShader: sideSticksFragment,
      vertexShader: sideSticksVertex,
      side: THREE.DoubleSide,
      uniforms: Object.assign(
        {
          uTravelLength: { value: options.length },
          uTime: { value: 0 },
        },
        this.webgl.fogUniforms,
        options.distortion.uniforms,
      ),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    material.onBeforeCompile = (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        options.distortion.getDistortion,
      )
    }

    const mesh = new THREE.Mesh(instanced, material)
    mesh.frustumCulled = false
    this.webgl.scene.add(mesh)
    this.mesh = mesh
  }

  update(time: number) {
    ;(this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time
  }
}

class Road {
  webgl: any
  options: any
  uTime = { value: 0 }
  leftRoadWay!: THREE.Mesh
  rightRoadWay!: THREE.Mesh
  island!: THREE.Mesh

  constructor(webgl: any, options: any) {
    this.webgl = webgl
    this.options = options
  }

  createPlane(side: number, _width: number, isRoad: boolean) {
    const options = this.options
    const geometry = new THREE.PlaneGeometry(
      isRoad ? options.roadWidth : options.islandWidth,
      options.length,
      20,
      100,
    )
    let uniforms: any = {
      uTravelLength: { value: options.length },
      uColor: {
        value: new THREE.Color(isRoad ? options.colors.roadColor : options.colors.islandColor),
      },
      uTime: this.uTime,
    }
    if (isRoad) {
      uniforms = Object.assign(uniforms, {
        uLanes: { value: options.lanesPerRoad },
        uBrokenLinesColor: {
          value: new THREE.Color(options.colors.brokenLines),
        },
        uShoulderLinesColor: {
          value: new THREE.Color(options.colors.shoulderLines),
        },
        uShoulderLinesWidthPercentage: {
          value: options.shoulderLinesWidthPercentage,
        },
        uBrokenLinesLengthPercentage: {
          value: options.brokenLinesLengthPercentage,
        },
        uBrokenLinesWidthPercentage: {
          value: options.brokenLinesWidthPercentage,
        },
      })
    }
    const material = new THREE.ShaderMaterial({
      fragmentShader: isRoad ? roadFragment : islandFragment,
      vertexShader: roadVertex,
      side: THREE.DoubleSide,
      uniforms: Object.assign(uniforms, this.webgl.fogUniforms, options.distortion.uniforms),
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    material.onBeforeCompile = (shader: any) => {
      shader.vertexShader = shader.vertexShader.replace(
        '#include <getDistortion_vertex>',
        options.distortion.getDistortion,
      )
    }
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -Math.PI / 2
    mesh.position.z = -options.length / 2
    mesh.position.x += (options.islandWidth / 2 + options.roadWidth / 2) * side
    this.webgl.scene.add(mesh)
    return mesh
  }

  init() {
    this.leftRoadWay = this.createPlane(-1, this.options.roadWidth, true)
    this.rightRoadWay = this.createPlane(1, this.options.roadWidth, true)
    this.island = this.createPlane(0, this.options.islandWidth, false)
  }

  update(time: number) {
    this.uTime.value = time
  }
}

/* ---- Main App ---- */
class HyperspeedApp {
  options: any
  container: HTMLElement
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  fogUniforms: any
  clock: THREE.Clock
  road: Road
  leftCarLights: CarLights
  rightCarLights: CarLights
  leftSticks: LightsSticks
  fovTarget: number
  speedUpTarget: number
  speedUp: number
  timeOffset: number
  disposed = false
  hasValidSize = false
  renderPass!: RenderPass
  bloomPass!: EffectPass

  constructor(container: HTMLElement, options: any) {
    this.options = options
    if (this.options.distortion == null) {
      this.options.distortion = {
        uniforms: distortion_uniforms,
        getDistortion: distortion_vertex,
      }
    }
    this.container = container
    const initW = Math.max(1, container.offsetWidth)
    const initH = Math.max(1, container.offsetHeight)

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.setSize(initW, initH, false)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.composer = new EffectComposer(this.renderer)
    container.append(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(options.fov, initW / initH, 0.1, 10000)
    this.camera.position.set(0, 2, -5)
    this.scene = new THREE.Scene()
    this.scene.background = null

    const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500)
    this.scene.fog = fog
    this.fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far },
    }
    this.clock = new THREE.Clock()

    this.road = new Road(this, options)
    this.leftCarLights = new CarLights(
      this,
      options,
      options.colors.leftCars,
      options.movingAwaySpeed,
      new THREE.Vector2(0, 1 - options.carLightsFade),
    )
    this.rightCarLights = new CarLights(
      this,
      options,
      options.colors.rightCars,
      options.movingCloserSpeed,
      new THREE.Vector2(1, 0 + options.carLightsFade),
    )
    this.leftSticks = new LightsSticks(this, options)

    this.fovTarget = options.fov
    this.speedUpTarget = 0
    this.speedUp = 0
    this.timeOffset = 0

    this.tick = this.tick.bind(this)
    this.init = this.init.bind(this)
    this.setSize = this.setSize.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)

    window.addEventListener('resize', this.onWindowResize)
    if (container.offsetWidth > 0 && container.offsetHeight > 0) {
      this.hasValidSize = true
    }
  }

  onWindowResize() {
    const w = this.container.offsetWidth
    const h = this.container.offsetHeight
    if (w <= 0 || h <= 0) {
      this.hasValidSize = false
      return
    }
    this.renderer.setSize(w, h)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.composer.setSize(w, h)
    this.hasValidSize = true
  }

  initPasses() {
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.bloomPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.2,
        luminanceSmoothing: 0,
        resolutionScale: 1,
      }),
    )
    const smaaPass = new EffectPass(
      this.camera,
      new SMAAEffect({
        preset: SMAAPreset.MEDIUM,
        ...({
          searchImage: SMAAEffect.searchImageDataURL,
          areaImage: SMAAEffect.areaImageDataURL,
        } as Record<string, unknown>),
      }),
    )
    this.renderPass.renderToScreen = false
    this.bloomPass.renderToScreen = false
    smaaPass.renderToScreen = true
    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.bloomPass)
    this.composer.addPass(smaaPass)
  }

  loadAssets() {
    return new Promise<void>((resolve) => {
      const manager = new THREE.LoadingManager(resolve)
      const searchImage = new Image()
      const areaImage = new Image()
      searchImage.addEventListener('load', function () {
        manager.itemEnd('smaa-search')
      })
      areaImage.addEventListener('load', function () {
        manager.itemEnd('smaa-area')
      })
      manager.itemStart('smaa-search')
      manager.itemStart('smaa-area')
      searchImage.src = SMAAEffect.searchImageDataURL
      areaImage.src = SMAAEffect.areaImageDataURL
    })
  }

  init() {
    this.initPasses()
    const options = this.options
    this.road.init()
    this.leftCarLights.init()
    this.leftCarLights.mesh.position.setX(-options.roadWidth / 2 - options.islandWidth / 2)
    this.rightCarLights.init()
    this.rightCarLights.mesh.position.setX(options.roadWidth / 2 + options.islandWidth / 2)
    this.leftSticks.init()
    this.leftSticks.mesh.position.setX(-(options.roadWidth + options.islandWidth / 2))

    this.container.addEventListener('mousedown', this.onMouseDown)
    this.container.addEventListener('mouseup', this.onMouseUp)
    this.container.addEventListener('mouseout', this.onMouseUp)
    this.container.addEventListener('touchstart', this.onMouseDown, {
      passive: true,
    })
    this.container.addEventListener('touchend', this.onMouseUp, {
      passive: true,
    })

    this.tick()
  }

  onMouseDown() {
    this.fovTarget = this.options.fovSpeedUp
    this.speedUpTarget = this.options.speedUp
  }

  onMouseUp() {
    this.fovTarget = this.options.fov
    this.speedUpTarget = 0
  }

  update(delta: number) {
    const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta)
    this.speedUp += lerp(this.speedUp, this.speedUpTarget, lerpPercentage, 0.00001)
    this.timeOffset += this.speedUp * delta
    const time = this.clock.elapsedTime + this.timeOffset

    this.rightCarLights.update(time)
    this.leftCarLights.update(time)
    this.leftSticks.update(time)
    this.road.update(time)

    let updateCamera = false
    const fovChange = lerp(this.camera.fov, this.fovTarget, lerpPercentage)
    if (fovChange !== 0) {
      this.camera.fov += fovChange * delta * 6
      updateCamera = true
    }
    if (this.options.distortion.getJS) {
      const distortion = this.options.distortion.getJS(0.025, time)
      this.camera.lookAt(
        new THREE.Vector3(
          this.camera.position.x + distortion.x,
          this.camera.position.y + distortion.y,
          this.camera.position.z + distortion.z,
        ),
      )
      updateCamera = true
    }
    if (updateCamera) {
      this.camera.updateProjectionMatrix()
    }
  }

  render(delta: number) {
    this.composer.render(delta)
  }

  dispose() {
    this.disposed = true
    this.scene.traverse((object: any) => {
      if (!object.isMesh) {
        return
      }
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((m: any) => m.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
    this.scene.clear()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    if (this.renderer.domElement?.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)
    }
    this.composer.dispose()
    window.removeEventListener('resize', this.onWindowResize)
    this.container.removeEventListener('mousedown', this.onMouseDown)
    this.container.removeEventListener('mouseup', this.onMouseUp)
    this.container.removeEventListener('mouseout', this.onMouseUp)
    this.container.removeEventListener('touchstart', this.onMouseDown)
    this.container.removeEventListener('touchend', this.onMouseUp)
  }

  setSize(width: number, height: number, updateStyles: boolean) {
    if (width <= 0 || height <= 0) {
      this.hasValidSize = false
      return
    }
    this.composer.setSize(width, height, updateStyles)
    this.hasValidSize = true
  }

  tick() {
    if (this.disposed) {
      return
    }
    if (!this.hasValidSize) {
      const w = this.container.offsetWidth
      const h = this.container.offsetHeight
      if (w > 0 && h > 0) {
        this.renderer.setSize(w, h, false)
        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()
        this.composer.setSize(w, h)
        this.hasValidSize = true
      } else {
        requestAnimationFrame(this.tick)
        return
      }
    }
    if (resizeRendererToDisplaySize(this.renderer, this.setSize)) {
      const canvas = this.renderer.domElement
      if (this.hasValidSize) {
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }
    }
    if (this.hasValidSize) {
      const delta = this.clock.getDelta()
      this.render(delta)
      this.update(delta)
    }
    requestAnimationFrame(this.tick)
  }
}

/* ---- Auto-init on [data-hyperspeed] sections ---- */
function initHyperspeed() {
  const host = document.querySelector('[data-hyperspeed]') as HTMLElement
  if (!host) {
    return
  }

  const section = host.querySelector('section') as HTMLElement
  if (!section) {
    return
  }

  // Remove the gradient, let canvas show through
  section.style.background = 'transparent'

  // Make the host element the positioning context
  host.style.display = 'block'
  host.style.position = 'relative'

  // Create the canvas container as a direct child of host, behind the section
  const container = document.createElement('div')
  container.style.cssText =
    'position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:0;background:black;'
  host.insertBefore(container, section)

  // Ensure the section sits above the canvas
  section.style.position = 'relative'
  section.style.zIndex = '1'

  const distortions = buildDistortions()
  const options: any = {
    ...DEFAULT_OPTIONS,
    colors: { ...DEFAULT_OPTIONS.colors },
  }
  options.distortion = (distortions as any)[options.distortion] || distortions.turbulentDistortion

  const app = new HyperspeedApp(container, options)
  app.loadAssets().then(app.init)
}

// Wait for toolio-section to render its inner <section> before init
function waitAndInit() {
  const host = document.querySelector('[data-hyperspeed]')
  if (!host) {
    return
  }

  // If section already exists, init immediately
  if (host.querySelector('section')) {
    initHyperspeed()
    return
  }

  // Otherwise watch for it to appear
  const observer = new MutationObserver(() => {
    if (host.querySelector('section')) {
      observer.disconnect()
      initHyperspeed()
    }
  })
  observer.observe(host, { childList: true, subtree: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitAndInit)
} else {
  waitAndInit()
}
