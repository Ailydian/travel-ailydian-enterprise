// Three.js JSX element types for React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Geometry elements
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      boxGeometry: any;
      cylinderGeometry: any;
      
      // Lighting elements
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      
      // Camera elements
      perspectiveCamera: any;
      
      // Texture and Loader elements
      textureLoader: any;
      
      // Additional elements that might be used
      scene: any;
      primitive: any;
      object3D: any;
      points: any;
      line: any;
      lineBasicMaterial: any;
      bufferGeometry: any;
      vector3: any;
    }
  }
}

export {};
