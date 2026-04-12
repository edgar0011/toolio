import { ced } from '@e1011/es-kit/utils'
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

const vertexShader = `
precision highp float;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;
uniform vec3 bgColor;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t) {
  if (lineGradientCount <= 1) return lineGradient[0];
  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled = clampedT * float(lineGradientCount - 1);
  int idx = int(floor(scaled));
  float f = fract(scaled);
  int idx2 = min(idx + 1, lineGradientCount - 1);
  return mix(lineGradient[idx], lineGradient[idx2], f);
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_movement = time * 0.1;
  float amp = sin(offset + time * 0.2) * 0.3;
  float y = sin(uv.x + offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius);
    y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void main() {
  vec2 baseUv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;

  if (parallax) baseUv += parallaxOffset;

  vec3 col = vec3(0.0);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += getLineColor(t) * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += getLineColor(t) * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi, baseUv, mouseUv, interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += getLineColor(t) * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi, baseUv, mouseUv, interactive
      ) * 0.1;
    }
  }

  gl_FragColor = vec4(bgColor + col, 1.0);
}
`

function hexToVec3(hex: string): Vector3 {
  const v = hex.replace('#', '')
  const r = parseInt(v.slice(0, 2), 16) / 255
  const g = parseInt(v.slice(2, 4), 16) / 255
  const b = parseInt(v.slice(4, 6), 16) / 255
  return new Vector3(r, g, b)
}

@ced('floating-lines')
class FloatingLines extends HTMLElement {
  private _active = false
  private _raf = 0
  private _renderer: WebGLRenderer | null = null
  private _ro: ResizeObserver | null = null

  connectedCallback() {
    this.style.position = 'absolute'
    this.style.inset = '0'
    this.style.pointerEvents = 'none'
    this.style.mixBlendMode = 'normal'
    this.style.zIndex = '0'

    this._active = true

    const gradient = (this.getAttribute('gradient') ?? '14262a,2F4BC0,47a1f5')
      .split(',')
      .map((h) => h.trim())
    const bgHex = this.getAttribute('bg-color') ?? '000000'
    const bgVec = hexToVec3(bgHex)

    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    camera.position.z = 1

    const renderer = new WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    this.appendChild(renderer.domElement)
    this._renderer = renderer

    const gradientVecs = Array.from({ length: 8 }, () => new Vector3(1, 1, 1))
    gradient.slice(0, 8).forEach((hex, i) => {
      const c = hexToVec3(hex)
      gradientVecs[i].set(c.x, c.y, c.z)
    })

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(1, 1, 1) },
      animationSpeed: { value: 1.0 },
      enableTop: { value: true },
      enableMiddle: { value: true },
      enableBottom: { value: true },
      topLineCount: { value: 6 },
      middleLineCount: { value: 6 },
      bottomLineCount: { value: 6 },
      topLineDistance: { value: 0.05 },
      middleLineDistance: { value: 0.05 },
      bottomLineDistance: { value: 0.05 },
      topWavePosition: { value: new Vector3(10.0, 0.5, -0.4) },
      middleWavePosition: { value: new Vector3(5.0, 0.0, 0.2) },
      bottomWavePosition: { value: new Vector3(2.0, -0.7, -1.0) },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: true },
      bendRadius: { value: 5.0 },
      bendStrength: { value: -0.5 },
      bendInfluence: { value: 0 },
      parallax: { value: true },
      parallaxStrength: { value: 0.2 },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: gradientVecs },
      lineGradientCount: { value: gradient.length },
      bgColor: { value: bgVec },
    }

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader })
    const geometry = new PlaneGeometry(2, 2)
    scene.add(new Mesh(geometry, material))

    const clock = new Clock()

    const targetMouse = new Vector2(-1000, -1000)
    const currentMouse = new Vector2(-1000, -1000)
    let targetInfluence = 0
    let currentInfluence = 0
    const targetParallax = new Vector2(0, 0)
    const currentParallax = new Vector2(0, 0)
    const damping = 0.05

    const setSize = () => {
      if (!this._active) {
        return
      }
      const w = this.clientWidth || 1
      const h = this.clientHeight || 1
      renderer.setSize(w, h, false)
      uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height, 1)
    }

    setSize()

    this._ro = new ResizeObserver(() => setSize())
    this._ro.observe(this)

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const dpr = renderer.getPixelRatio()
      targetMouse.set(x * dpr, (rect.height - y) * dpr)
      targetInfluence = 1.0
      const cx = rect.width / 2
      const cy = rect.height / 2
      targetParallax.set(((x - cx) / rect.width) * 0.2, (-(y - cy) / rect.height) * 0.2)
    }

    const onPointerLeave = () => {
      targetInfluence = 0
    }

    renderer.domElement.style.pointerEvents = 'auto'
    renderer.domElement.addEventListener('pointermove', onPointerMove)
    renderer.domElement.addEventListener('pointerleave', onPointerLeave)

    const loop = () => {
      if (!this._active) {
        return
      }
      uniforms.iTime.value = clock.getElapsedTime()
      currentMouse.lerp(targetMouse, damping)
      uniforms.iMouse.value.copy(currentMouse)
      currentInfluence += (targetInfluence - currentInfluence) * damping
      uniforms.bendInfluence.value = currentInfluence
      currentParallax.lerp(targetParallax, damping)
      uniforms.parallaxOffset.value.copy(currentParallax)
      renderer.render(scene, camera)
      this._raf = requestAnimationFrame(loop)
    }
    loop()
  }

  disconnectedCallback() {
    this._active = false
    cancelAnimationFrame(this._raf)
    this._ro?.disconnect()
    if (this._renderer) {
      this._renderer.dispose()
      this._renderer.forceContextLoss()
      this._renderer.domElement.remove()
      this._renderer = null
    }
  }
}

export default FloatingLines
