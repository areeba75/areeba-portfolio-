import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../providers/ThemeProvider'

export function GlobalThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isDark = theme === 'dark'
    const sceneBackground = isDark ? 0x02020a : 0xf7f3ff
    const fogColor = isDark ? 0x02020a : 0xf7f3ff
    const accentColor = isDark ? 0xff2f90 : 0xe85a8d
    const accentSoft = isDark ? 0x6f22d2 : 0xcaa8ff
    const starColor = isDark ? 0xff7ecf : 0xff88bf
    const haloColor = isDark ? 0xff5aa5 : 0xef6fa8
    const ringColor = isDark ? 0x9d5bff : 0xc98dff

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(sceneBackground)
    scene.fog = new THREE.FogExp2(fogColor, isDark ? 0.08 : 0.06)

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
      color: starColor,
      size: isDark ? 0.08 : 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: isDark ? 0.72 : 0.48,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    root.add(stars)

    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.7, 64, 64),
      new THREE.MeshStandardMaterial({
        color: isDark ? 0x2b0a5b : 0xf1e8ff,
        emissive: accentSoft,
        emissiveIntensity: isDark ? 0.9 : 0.5,
        metalness: 0.1,
        roughness: isDark ? 0.18 : 0.22,
        transparent: true,
        opacity: isDark ? 0.78 : 0.55,
      }),
    )
    glowSphere.position.set(0.4, 0.2, 0)
    root.add(glowSphere)

    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.15, 0.32, 240, 32),
      new THREE.MeshPhysicalMaterial({
        color: accentColor,
        emissive: isDark ? 0x24061c : 0xf7d7ea,
        emissiveIntensity: isDark ? 1.1 : 0.65,
        metalness: 0.2,
        roughness: isDark ? 0.1 : 0.18,
        transmission: isDark ? 0.18 : 0.1,
        thickness: isDark ? 0.8 : 0.6,
        clearcoat: 1,
        clearcoatRoughness: isDark ? 0.08 : 0.12,
      }),
    )
    root.add(torusKnot)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.04, 64, 180),
      new THREE.MeshBasicMaterial({
        color: ringColor,
        transparent: true,
        opacity: isDark ? 0.18 : 0.12,
        wireframe: true,
      }),
    )
    ring.rotation.x = Math.PI / 2.4
    root.add(ring)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 32, 32),
      new THREE.MeshBasicMaterial({
        color: haloColor,
        transparent: true,
        opacity: isDark ? 0.04 : 0.06,
        side: THREE.BackSide,
      }),
    )
    root.add(halo)

    const ambientLight = new THREE.AmbientLight(isDark ? 0xb38dff : 0xe7dbff, isDark ? 1.3 : 1.1)
    scene.add(ambientLight)

    const keyLight = new THREE.PointLight(isDark ? 0xff4da6 : 0xff7eb3, isDark ? 35 : 22, 18)
    keyLight.position.set(3.2, 2.4, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(isDark ? 0x6f7bff : 0xb5b3ff, isDark ? 18 : 12, 15)
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
  }, [theme])

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />
}
