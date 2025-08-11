import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeViewer({ modelUrl }){
  const mountRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(()=>{
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth/mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias:true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const hemi = new THREE.HemisphereLight(0xffffff, 0x222233, 1.2);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(3,3,3);
    scene.add(dir);

    const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 180, 36);
    const material = new THREE.MeshStandardMaterial({ metalness: 0.2, roughness: 0.3 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let rafId;
    const onResize = ()=>{
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const animate = ()=>{
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return ()=>{
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return <div className="card" style={{ height: '480px' }}><div ref={mountRef} style={{ width:'100%', height:'100%' }}/></div>;
}
