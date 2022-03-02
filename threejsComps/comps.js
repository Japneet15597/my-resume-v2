import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Geometry = () => {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime() * 0.2;
    myMesh.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={myMesh} recieveShadow={true}>
      <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
      <meshToonMaterial color="#EE09FA" />
    </mesh>
  );
};

export function Stars() {
  let group = useRef();
  useFrame(({ clock }) => {
    if (group.current) {
      const r = 5 * Math.sin(THREE.Math.degToRad(clock.getElapsedTime()));
      const s = Math.cos(THREE.Math.degToRad(clock.getElapsedTime() * 2));
      group.current.rotation.set(r, r, r);
      group.current.scale.set(s, s, s);
    }
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(0.5, 4, 4);

    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#EE09FA"),
    });
    const coords = new Array(2000)
      .fill()
      .map((i) => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
      ]);
    return [geo, mat, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
}
