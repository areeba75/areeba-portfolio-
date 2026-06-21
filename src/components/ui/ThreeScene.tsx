import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2('#0f0f0f', 0.18)

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 0, 5.6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 220, 28)
    const material = new THREE.MeshStandardMaterial({
      color: 0xf72585,
      emissive: 0x2a0f2a,
      metalness: 0.18,
      roughness: 0.28,
      transparent: true,
      opacity: 0.85,
    })
    const torusKnot = new THREE.Mesh(geometry, material)
    group.add(torusKnot)

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff7ab6,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const glowMesh = new THREE.Mesh(geometry, glowMaterial)
    glowMesh.scale.setScalar(1.18)
    group.add(glowMesh)

    const ambientLight = new THREE.AmbientLight(0x8a6dff, 1.2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xff4da6, 30, 10)
    pointLight.position.set(2, 2, 4)
    scene.add(pointLight)

    const pointLightTwo = new THREE.PointLight(0x7b61ff, 18, 10)
    pointLightTwo.position.set(-3, -1, 3)
    scene.add(pointLightTwo)

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      const aspect = width / height
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    resize()

    let frameId = 0
    let previousTime = performance.now()

    const animate = () => {
      const now = performance.now()
      const delta = (now - previousTime) / 1000
      previousTime = now

      torusKnot.rotation.x += delta * 0.35
      torusKnot.rotation.y += delta * 0.55
      glowMesh.rotation.x -= delta * 0.2
      glowMesh.rotation.y += delta * 0.3

      group.position.y = Math.sin(now * 0.001 * 0.5) * 0.12
      group.rotation.z = Math.sin(now * 0.001 * 0.25) * 0.08

      camera.position.x = Math.sin(now * 0.001 * 0.35) * 0.18
      camera.position.y = Math.cos(now * 0.001 * 0.25) * 0.12
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frameId)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      glowMaterial.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />
}
