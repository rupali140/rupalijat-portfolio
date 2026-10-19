import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import './SolarScene.css'

// Procedural colors (no external texture downloads — keeps this lightweight
// and offline-safe). Each planet: orbit radius, orbit speed, self-rotation
// speed, size, color, and an optional ring.
const PLANETS = [
  { radius: 2.1, speed: 0.55, spin: 1.1, size: 0.22, color: '#a78bfa', emissive: '#6d49c9' },
  { radius: 2.9, speed: 0.4, spin: 0.8, size: 0.3, color: '#c4b5fd', emissive: '#8b5cf6' },
  { radius: 3.8, speed: 0.28, spin: 0.6, size: 0.4, color: '#8b5cf6', emissive: '#4c2a8f', ring: true },
  { radius: 4.8, speed: 0.19, spin: 0.9, size: 0.26, color: '#e9defc', emissive: '#7c5cc9' },
]

function Sun() {
  const ref = useRef(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08
  })
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      {[1.18, 1.55].map((r, i) => (
        <mesh key={r}>
          <sphereGeometry args={[r, 24, 24]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={i === 0 ? 0.16 : 0.07} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

function Planet({ config, speedMultiplier, segments }) {
  const orbitRef = useRef(null)
  const spinRef = useRef(null)
  const angle = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((_, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.y += delta * config.speed * speedMultiplier
    if (spinRef.current) spinRef.current.rotation.y += delta * config.spin * speedMultiplier
  })

  return (
    <group ref={orbitRef} rotation={[0, angle, 0]}>
      <group position={[config.radius, 0, 0]}>
        <mesh ref={spinRef}>
          <sphereGeometry args={[config.size, segments, segments]} />
          <meshStandardMaterial color={config.color} emissive={config.emissive} emissiveIntensity={0.35} roughness={0.6} />
        </mesh>
        {config.ring && (
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <ringGeometry args={[config.size * 1.5, config.size * 2.1, 48]} />
            <meshBasicMaterial color="#c4b5fd" side={THREE.DoubleSide} transparent opacity={0.35} />
          </mesh>
        )}
      </group>
    </group>
  )
}

function OrbitRings() {
  return (
    <>
      {PLANETS.map((p, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[p.radius - 0.004, p.radius + 0.004, 96]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

function ShootingStar({ enabled }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const start = useRef(new THREE.Vector3())
  const end = useRef(new THREE.Vector3())
  const t = useRef(0)
  const nextAt = useRef(4 + Math.random() * 6)

  useFrame((_, delta) => {
    if (!enabled) return
    if (!active) {
      nextAt.current -= delta
      if (nextAt.current <= 0) {
        start.current.set(-6 + Math.random() * 2, 3 + Math.random() * 1.5, -2)
        end.current.set(6, -1, -2)
        t.current = 0
        setActive(true)
      }
      return
    }

    t.current += delta * 0.9
    if (t.current >= 1) {
      setActive(false)
      nextAt.current = 5 + Math.random() * 7
      return
    }
    if (ref.current) {
      ref.current.position.lerpVectors(start.current, end.current, t.current)
      ref.current.material.opacity = 1 - Math.abs(t.current - 0.5) * 1.6
    }
  })

  if (!enabled) return null

  return (
    <mesh ref={ref} visible={active}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#f4f0f2" transparent opacity={0.9} />
    </mesh>
  )
}

function Parallax({ children, enabled }) {
  const group = useRef(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (!group.current) return
    const targetX = enabled ? pointer.y * 0.12 : 0
    const targetY = enabled ? pointer.x * 0.18 : 0
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04
  })

  return <group ref={group}>{children}</group>
}

/**
 * Real-time, continuously animated 3D solar system. Each planet orbits at
 * its own independent speed and spins on its own axis; a starfield drifts
 * behind, and an occasional shooting star streaks across. Mouse parallax
 * and shooting stars are desktop-only embellishments; everything scales
 * down for reduced motion and small screens.
 */
export default function SolarScene({ reducedMotion }) {
  const [isSmallScreen] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640
  )

  const speedMultiplier = reducedMotion ? 0 : 1
  const segments = isSmallScreen ? 16 : 32
  const starCount = reducedMotion ? 400 : isSmallScreen ? 900 : 2200
  const parallaxEnabled = !reducedMotion && !isSmallScreen

  return (
    <div className="solar-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.4, 9.5], fov: 50 }}
        dpr={isSmallScreen ? 1 : [1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[0, 0, 0]} intensity={2.2} color="#c4b5fd" distance={14} />

        <Suspense fallback={null}>
          <Stars radius={60} depth={30} count={starCount} factor={2.2} saturation={0} fade speed={reducedMotion ? 0 : 0.3} />
          <Parallax enabled={parallaxEnabled}>
            <group rotation={[0.35, 0, 0]}>
              <Sun />
              <OrbitRings />
              {PLANETS.map((p, i) => (
                <Planet key={i} config={p} speedMultiplier={speedMultiplier} segments={segments} />
              ))}
              <ShootingStar enabled={!reducedMotion} />
            </group>
          </Parallax>
        </Suspense>
      </Canvas>
    </div>
  )
}
