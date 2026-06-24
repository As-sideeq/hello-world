declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.glb" {
  const src: string;
  export default src;
}

declare module "*.gltf" {
  const src: string;
  export default src;
}

declare module "*.hdr" {
  const src: string;
  export default src;
}
