declare module "lucide/dist/esm/createElement.js" {
  const createElement: (
    iconNode: [string, Record<string, string | number>, unknown[]?][],
    customAttrs?: Record<string, string | number>,
  ) => SVGSVGElement;
  export default createElement;
}

declare module "lucide/dist/esm/icons/*.js" {
  const icon: [string, Record<string, string | number>, unknown[]?][];
  export default icon;
}
