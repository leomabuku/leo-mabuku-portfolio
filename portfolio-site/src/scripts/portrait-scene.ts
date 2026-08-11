import * as THREE from 'three';

export interface PortraitSceneController {
  setProgress(value: number): void;
  destroy(): void;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uProgress;
  varying vec2 vUv;

  vec2 coverUv(vec2 uv) {
    float screenAspect = uResolution.x / max(uResolution.y, 1.0);
    float imageAspect = uImageResolution.x / max(uImageResolution.y, 1.0);
    vec2 scale = vec2(1.0);
    if (screenAspect > imageAspect) scale.y = imageAspect / screenAspect;
    else scale.x = screenAspect / imageAspect;
    return (uv - 0.5) * scale + 0.5;
  }

  float band(vec2 uv, float frequency, float speed) {
    return sin((uv.y * frequency) + (uTime * speed));
  }

  void main() {
    vec2 uv = coverUv(vUv);
    float distanceToPointer = max(distance(vUv, uPointer), 0.08);
    float pointerField = (1.0 - smoothstep(0.05, 0.48, distanceToPointer));
    float scan = band(vUv, 620.0, 1.8) * 0.0018;
    float block = step(0.82, fract(vUv.y * 31.0 + uTime * 0.18)) * sin(vUv.y * 90.0 + uTime) * 0.008;
    float shift = (scan + block) * (0.35 + uProgress * 1.35) + pointerField * 0.006;

    vec4 redSample = texture2D(uImage, uv + vec2(shift, 0.0));
    vec4 greenSample = texture2D(uImage, uv);
    vec4 blueSample = texture2D(uImage, uv - vec2(shift * 0.65, 0.0));
    vec3 image = vec3(redSample.r, greenSample.g, blueSample.b);
    float luminance = dot(image, vec3(0.299, 0.587, 0.114));

    vec2 pixel = 1.0 / max(uImageResolution, vec2(1.0));
    float edge = abs(luminance - dot(texture2D(uImage, uv + vec2(pixel.x * 2.0, 0.0)).rgb, vec3(0.299, 0.587, 0.114)));
    vec3 lime = vec3(0.78, 0.94, 0.0);
    vec3 colour = mix(vec3(luminance), image, 0.08);
    colour += lime * edge * (2.4 + uProgress * 4.0);
    colour += lime * pointerField * 0.045;

    float scanline = 0.94 + 0.06 * sin(vUv.y * uResolution.y * 1.25);
    float reveal = smoothstep(-0.18, 1.08, vUv.y + uProgress * 0.18);
    float signal = clamp((edge * 16.0) + (pointerField * 0.22) + ((abs(scan) + abs(block)) * 18.0), 0.0, 1.0);
    float alpha = signal * mix(0.22, 0.92, uProgress) * reveal;
    gl_FragColor = vec4(colour * scanline, alpha);
  }
`;

async function loadTextureImage(src: string): Promise<HTMLImageElement> {
  const image = new Image();
  image.decoding = 'async';
  image.src = src;
  if (image.complete && image.naturalWidth) await image.decode();
  else await new Promise<void>((resolve, reject) => {
    image.addEventListener('load', () => resolve(), { once: true });
    image.addEventListener('error', () => reject(new Error('Portrait texture failed to load.')), { once: true });
  });
  return image;
}

/**
 * Create the optional portrait signal layer. The real image remains underneath,
 * so a failed or paused WebGL context never removes Leo's primary content.
 */
export async function createPortraitScene(canvas: HTMLCanvasElement, imageSrc: string): Promise<PortraitSceneController> {
  const stage = canvas.closest<HTMLElement>('[data-portrait-stage]');
  if (!stage) throw new Error('Portrait stage is missing.');

  const image = await loadTextureImage(imageSrc);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: true,
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));

  const texture = new THREE.Texture(image);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  const uniforms = {
    uImage: { value: texture },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uImageResolution: { value: new THREE.Vector2(image.naturalWidth, image.naturalHeight) },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uProgress: { value: 0 },
  };

  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    depthWrite: false,
  });
  scene.add(new THREE.Mesh(geometry, material));

  let destroyed = false;
  let visible = true;
  const startedAt = performance.now();

  const resize = () => {
    if (destroyed) return;
    const { width, height } = stage.getBoundingClientRect();
    renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
    uniforms.uResolution.value.set(Math.max(width, 1), Math.max(height, 1));
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);

  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
  }, { rootMargin: '120px' });
  intersectionObserver.observe(stage);

  const handlePointer = (event: PointerEvent) => {
    const rect = stage.getBoundingClientRect();
    uniforms.uPointer.value.set(
      THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width, 0, 1),
      THREE.MathUtils.clamp(1 - ((event.clientY - rect.top) / rect.height), 0, 1),
    );
  };
  stage.addEventListener('pointermove', handlePointer, { passive: true });

  const render = () => {
    // Avoid background GPU work when the portrait or document cannot be seen.
    if (destroyed || !visible || document.hidden) return;
    uniforms.uTime.value = (performance.now() - startedAt) / 1000;
    renderer.render(scene, camera);
  };
  renderer.setAnimationLoop(render);

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    canvas.classList.add('portrait-canvas--failed');
    destroy();
  };
  canvas.addEventListener('webglcontextlost', handleContextLost, { once: true });
  canvas.classList.add('portrait-canvas--ready');

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    renderer.setAnimationLoop(null);
    stage.removeEventListener('pointermove', handlePointer);
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
  };

  return {
    setProgress(value) {
      uniforms.uProgress.value = THREE.MathUtils.clamp(value, 0, 1);
    },
    destroy,
  };
}
