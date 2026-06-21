import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function GlobalThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x02020a)
    scene.fog = new THREE.FogExp2(0x02020a, 0.08)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.pointerEvents = 'none'
    mount.appendChild(renderer.domElement)

    const root = new THREE.Group()
    scene.add(root)

    const starGeometry = new THREE.BufferGeometry()
    const starCount = 1600
    const starPositions = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      starPositions[i3] = (Math.random() - 0.5) * 40
      starPositions[i3 + 1] = (Math.random() - 0.5) * 22
      starPositions[i3 + 2] = (Math.random() - 0.5) * 40
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const starMaterial = new THREE.PointsMaterial({
      color: 0xff7ecf,
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    root.add(stars)

    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x2b0a5b,
        emissive: 0x6f22d2,
        emissiveIntensity: 0.9,
        metalness: 0.1,
        roughness: 0.18,
        transparent: true,
        opacity: 0.78,
      }),
    )
    glowSphere.position.set(0.4, 0.2, 0)
    root.add(glowSphere)

    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.15, 0.32, 240, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0xff2f90,
        emissive: 0x24061c,
        emissiveIntensity: 1.1,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.18,
        thickness: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      }),
    )
    root.add(torusKnot)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.04, 64, 180),
      new THREE.MeshBasicMaterial({
        color: 0x9d5bff,
        transparent: true,
        opacity: 0.18,
        wireframe: true,
      }),
    )
    ring.rotation.x = Math.PI / 2.4
    root.add(ring)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff5aa5,
        transparent: true,
        opacity: 0.04,
        side: THREE.BackSide,
      }),
    )
    root.add(halo)

    const ambientLight = new THREE.AmbientLight(0xb38dff, 1.3)
    scene.add(ambientLight)

    const keyLight = new THREE.PointLight(0xff4da6, 35, 18)
    keyLight.position.set(3.2, 2.4, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x6f7bff, 18, 15)
    fillLight.position.set(-4, -1.8, -3)
    scene.add(fillLight)

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    resize()

    let frameId = 0
    let previousTime = performance.now()
    const mouse = new THREE.Vector2(0, 0)

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('resize', resize)

    const animate = () => {
      const now = performance.now()
      const delta = (now - previousTime) / 1000
      previousTime = now

      root.rotation.y += delta * 0.08
      root.rotation.x = Math.sin(now * 0.001 * 0.4) * 0.06
      root.position.y = Math.sin(now * 0.001 * 0.6) * 0.12

      torusKnot.rotation.x += delta * 0.55
      torusKnot.rotation.y += delta * 0.78
      ring.rotation.z += delta * 0.18
      halo.rotation.x += delta * 0.08
      halo.rotation.y -= delta * 0.04
      stars.rotation.y += delta * 0.03
      stars.rotation.x = Math.sin(now * 0.001 * 0.2) * 0.02

      camera.position.x = mouse.x * 0.5
      camera.position.y = mouse.y * 0.28
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frameId)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />
}
