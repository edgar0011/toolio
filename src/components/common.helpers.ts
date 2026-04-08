export const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5

export const random = (base: number | number[]) => {
  if (Array.isArray(base)) {
    return Math.random() * (base[1] - base[0]) + base[0]
  }
  return Math.random() * base
}

export const pickRandom = (arr: any) => {
  if (Array.isArray(arr)) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  return arr
}

export function lerp(current: number, target: number, speed = 0.1, limit = 0.001): number {
  let change = (target - current) * speed
  if (Math.abs(change) < limit) {
    change = target - current
  }
  return change
}
