import * as THREE from 'three'

import { nsin } from '../../common.helpers'

export const DEFAULT_OPTIONS = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
}

export function resizeRendererToDisplaySize(
  renderer: THREE.WebGLRenderer,
  setSize: (w: number, h: number, u: boolean) => void,
) {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (width <= 0 || height <= 0) {
    return false
  }
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    setSize(width, height, false)
  }
  return needResize
}

/* ---- Distortion presets ---- */
export function buildDistortions() {
  const mountainUniforms = {
    uFreq: { value: new THREE.Vector3(3, 6, 10) },
    uAmp: { value: new THREE.Vector3(30, 30, 20) },
  }
  const xyUniforms = {
    uFreq: { value: new THREE.Vector2(5, 2) },
    uAmp: { value: new THREE.Vector2(25, 15) },
  }
  const LongRaceUniforms = {
    uFreq: { value: new THREE.Vector2(2, 3) },
    uAmp: { value: new THREE.Vector2(35, 10) },
  }
  const turbulentUniforms = {
    uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
    uAmp: { value: new THREE.Vector4(25, 5, 10, 10) },
  }
  const deepUniforms = {
    uFreq: { value: new THREE.Vector2(4, 8) },
    uAmp: { value: new THREE.Vector2(10, 20) },
    uPowY: { value: new THREE.Vector2(20, 2) },
  }

  return {
    mountainDistortion: {
      uniforms: mountainUniforms,
      getDistortion: `
        uniform vec3 uAmp;
        uniform vec3 uFreq;
        #define PI 3.14159265358979
        float nsin(float val){ return sin(val)*0.5+0.5; }
        vec3 getDistortion(float progress){
          float movementProgressFix = 0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(movementProgressFix*PI*uFreq.x+uTime)*uAmp.x,
            nsin(progress*PI*uFreq.y+uTime)*uAmp.y - nsin(movementProgressFix*PI*uFreq.y+uTime)*uAmp.y,
            nsin(progress*PI*uFreq.z+uTime)*uAmp.z - nsin(movementProgressFix*PI*uFreq.z+uTime)*uAmp.z
          );
        }`,
      getJS: (progress: number, time: number) => {
        const movementProgressFix = 0.02
        const uFreq = mountainUniforms.uFreq.value
        const uAmp = mountainUniforms.uAmp.value
        const distortion = new THREE.Vector3(
          Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
          nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
            nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
          nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
            nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z,
        )
        return distortion.multiply(new THREE.Vector3(2, 2, 2)).add(new THREE.Vector3(0, 0, -5))
      },
    },
    xyDistortion: {
      uniforms: xyUniforms,
      getDistortion: `
        uniform vec2 uFreq;
        uniform vec2 uAmp;
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float movementProgressFix = 0.02;
          return vec3(
            cos(progress*PI*uFreq.x+uTime)*uAmp.x - cos(movementProgressFix*PI*uFreq.x+uTime)*uAmp.x,
            sin(progress*PI*uFreq.y+PI/2.+uTime)*uAmp.y - sin(movementProgressFix*PI*uFreq.y+PI/2.+uTime)*uAmp.y,
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const movementProgressFix = 0.02
        const uFreq = xyUniforms.uFreq.value
        const uAmp = xyUniforms.uAmp.value
        const distortion = new THREE.Vector3(
          Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
          Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -
            Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,
          0,
        )
        return distortion.multiply(new THREE.Vector3(2, 0.4, 1)).add(new THREE.Vector3(0, 0, -3))
      },
    },
    LongRaceDistortion: {
      uniforms: LongRaceUniforms,
      getDistortion: `
        uniform vec2 uFreq;
        uniform vec2 uAmp;
        #define PI 3.14159265358979
        vec3 getDistortion(float progress){
          float camProgress = 0.0125;
          return vec3(
            sin(progress*PI*uFreq.x+uTime)*uAmp.x - sin(camProgress*PI*uFreq.x+uTime)*uAmp.x,
            sin(progress*PI*uFreq.y+uTime)*uAmp.y - sin(camProgress*PI*uFreq.y+uTime)*uAmp.y,
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const camProgress = 0.0125
        const uFreq = LongRaceUniforms.uFreq.value
        const uAmp = LongRaceUniforms.uAmp.value
        const distortion = new THREE.Vector3(
          Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
            Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,
          Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
            Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,
          0,
        )
        return distortion.multiply(new THREE.Vector3(1, 1, 0)).add(new THREE.Vector3(0, 0, -5))
      },
    },
    turbulentDistortion: {
      uniforms: turbulentUniforms,
      getDistortion: `
        uniform vec4 uFreq;
        uniform vec4 uAmp;
        float nsin(float val){ return sin(val)*0.5+0.5; }
        #define PI 3.14159265358979
        float getDistortionX(float progress){
          return (
            cos(PI*progress*uFreq.r+uTime)*uAmp.r +
            pow(cos(PI*progress*uFreq.g+uTime*(uFreq.g/uFreq.r)),2.)*uAmp.g
          );
        }
        float getDistortionY(float progress){
          return (
            -nsin(PI*progress*uFreq.b+uTime)*uAmp.b +
            -pow(nsin(PI*progress*uFreq.a+uTime/(uFreq.b/uFreq.a)),5.)*uAmp.a
          );
        }
        vec3 getDistortion(float progress){
          return vec3(
            getDistortionX(progress)-getDistortionX(0.0125),
            getDistortionY(progress)-getDistortionY(0.0125),
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const uFreq = turbulentUniforms.uFreq.value
        const uAmp = turbulentUniforms.uAmp.value
        const getX = (p: number) =>
          Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
          Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y
        const getY = (p: number) =>
          -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
          Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w
        const distortion = new THREE.Vector3(
          getX(progress) - getX(progress + 0.007),
          getY(progress) - getY(progress + 0.007),
          0,
        )
        return distortion.multiply(new THREE.Vector3(-2, -5, 0)).add(new THREE.Vector3(0, 0, -10))
      },
    },
    deepDistortion: {
      uniforms: deepUniforms,
      getDistortion: `
        uniform vec4 uFreq;
        uniform vec4 uAmp;
        uniform vec2 uPowY;
        float nsin(float val){ return sin(val)*0.5+0.5; }
        #define PI 3.14159265358979
        float getDistortionX(float progress){
          return sin(progress*PI*uFreq.x+uTime)*uAmp.x;
        }
        float getDistortionY(float progress){
          return pow(abs(progress*uPowY.x),uPowY.y)+sin(progress*PI*uFreq.y+uTime)*uAmp.y;
        }
        vec3 getDistortion(float progress){
          return vec3(
            getDistortionX(progress)-getDistortionX(0.02),
            getDistortionY(progress)-getDistortionY(0.02),
            0.
          );
        }`,
      getJS: (progress: number, time: number) => {
        const uFreq = deepUniforms.uFreq.value
        const uAmp = deepUniforms.uAmp.value
        const uPowY = deepUniforms.uPowY.value
        const getX = (p: number) => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x
        const getY = (p: number) =>
          Math.pow(p * uPowY.x, uPowY.y) + Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y
        const distortion = new THREE.Vector3(
          getX(progress) - getX(progress + 0.01),
          getY(progress) - getY(progress + 0.01),
          0,
        )
        return distortion.multiply(new THREE.Vector3(-2, -4, 0)).add(new THREE.Vector3(0, 0, -10))
      },
    },
  }
}

/* ---- Shader chunks ---- */
export const carLightsFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor;
  varying vec2 vUv;
  uniform vec2 uFade;
  void main() {
    vec3 color = vec3(vColor);
    float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
    gl_FragColor = vec4(color, alpha);
    if (gl_FragColor.a < 0.0001) discard;
    ${THREE.ShaderChunk['fog_fragment']}
  }
`

export const carLightsVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute vec3 aOffset;
  attribute vec3 aMetrics;
  attribute vec3 aColor;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vColor;
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    float radius = aMetrics.r;
    float myLength = aMetrics.g;
    float speed = aMetrics.b;
    transformed.xy *= radius;
    transformed.z *= myLength;
    transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
    transformed.xy += aOffset.xy;
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    vColor = aColor;
    ${THREE.ShaderChunk['fog_vertex']}
  }
`

export const sideSticksVertex = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  attribute float aOffset;
  attribute vec3 aColor;
  attribute vec2 aMetrics;
  uniform float uTravelLength;
  uniform float uTime;
  varying vec3 vColor;
  mat4 rotationY(in float angle){
    return mat4(cos(angle),0,sin(angle),0,
                0,1.0,0,0,
                -sin(angle),0,cos(angle),0,
                0,0,0,1);
  }
  #include <getDistortion_vertex>
  void main(){
    vec3 transformed = position.xyz;
    float width = aMetrics.x;
    float height = aMetrics.y;
    transformed.xy *= vec2(width, height);
    float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);
    transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;
    transformed.z += -uTravelLength + time;
    float progress = abs(transformed.z / uTravelLength);
    transformed.xyz += getDistortion(progress);
    transformed.y += height / 2.;
    transformed.x += -width / 2.;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vColor = aColor;
    ${THREE.ShaderChunk['fog_vertex']}
  }
`

export const sideSticksFragment = `
  #define USE_FOG;
  ${THREE.ShaderChunk['fog_pars_fragment']}
  varying vec3 vColor;
  void main(){
    vec3 color = vec3(vColor);
    gl_FragColor = vec4(color,1.);
    ${THREE.ShaderChunk['fog_fragment']}
  }
`

export const roadBaseFragment = `
  #define USE_FOG;
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uTime;
  #include <roadMarkings_vars>
  ${THREE.ShaderChunk['fog_pars_fragment']}
  void main() {
    vec2 uv = vUv;
    vec3 color = vec3(uColor);
    #include <roadMarkings_fragment>
    gl_FragColor = vec4(color, 1.);
    ${THREE.ShaderChunk['fog_fragment']}
  }
`

export const islandFragment = roadBaseFragment
  .replace('#include <roadMarkings_fragment>', '')
  .replace('#include <roadMarkings_vars>', '')

export const roadMarkings_vars = `
  uniform float uLanes;
  uniform vec3 uBrokenLinesColor;
  uniform vec3 uShoulderLinesColor;
  uniform float uShoulderLinesWidthPercentage;
  uniform float uBrokenLinesWidthPercentage;
  uniform float uBrokenLinesLengthPercentage;
  highp float random(vec2 co){
    highp float a=12.9898; highp float b=78.233; highp float c=43758.5453;
    highp float dt=dot(co.xy,vec2(a,b));
    highp float sn=mod(dt,3.14);
    return fract(sin(sn)*c);
  }
`

export const roadMarkings_fragment = `
  uv.y = mod(uv.y + uTime * 0.05, 1.);
  float laneWidth = 1.0 / uLanes;
  float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
  float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;
  float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
  float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
  brokenLines = mix(brokenLines, sideLines, uv.x);
`

export const roadFragment = roadBaseFragment
  .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)
  .replace('#include <roadMarkings_vars>', roadMarkings_vars)

export const roadVertex = `
  #define USE_FOG;
  uniform float uTime;
  ${THREE.ShaderChunk['fog_pars_vertex']}
  uniform float uTravelLength;
  varying vec2 vUv;
  #include <getDistortion_vertex>
  void main() {
    vec3 transformed = position.xyz;
    vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
    transformed.x += distortion.x;
    transformed.z += distortion.y;
    transformed.y += -1. * distortion.z;
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
    ${THREE.ShaderChunk['fog_vertex']}
  }
`

export const distortion_uniforms = {
  uDistortionX: { value: new THREE.Vector2(80, 3) },
  uDistortionY: { value: new THREE.Vector2(-40, 2.5) },
}

export const distortion_vertex = `
  #define PI 3.14159265358979
  uniform vec2 uDistortionX;
  uniform vec2 uDistortionY;
  float nsin(float val){ return sin(val)*0.5+0.5; }
  vec3 getDistortion(float progress){
    progress = clamp(progress, 0., 1.);
    float xAmp = uDistortionX.r;
    float xFreq = uDistortionX.g;
    float yAmp = uDistortionY.r;
    float yFreq = uDistortionY.g;
    return vec3(
      xAmp * nsin(progress * PI * xFreq - PI / 2.),
      yAmp * nsin(progress * PI * yFreq - PI / 2.),
      0.
    );
  }
`
