// Haute Horlogerie & Luxury 3D Scene: Pure Gold & Liquid Silver Polyhedron
// Optimized for Ultra-Fluid Performance on Mobile, Tablet & Desktop PC

(function() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  // Adaptive device detection
  const isMobile = window.innerWidth < 768;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  function updateCameraDistance() {
    const width = window.innerWidth;
    if (width < 640) {
      camera.position.z = 8.8; // Mobile: properly framed, no clipping
    } else if (width < 1024) {
      camera.position.z = 7.8; // Tablet
    } else {
      camera.position.z = 7.0; // Desktop PC: crisp, immersive
    }
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  }
  updateCameraDistance();

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: !isMobile, // Disable heavy antialiasing on low-end mobile to preserve battery
    powerPreference: 'high-performance' 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit to 2x on high-DPI retina screens
  renderer.domElement.style.touchAction = 'pan-y'; // Allows seamless vertical mobile touch scrolling
  container.appendChild(renderer.domElement);

  // Group to rotate together
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Inner Core: Haute Champagne Gold Metal
  const innerGeo = new THREE.IcosahedronGeometry(1.6, 0);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x181510,
    roughness: 0.12,
    metalness: 0.96,
    flatShading: true,
    wireframe: false
  });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  mainGroup.add(innerCore);

  // 2. Outer Wireframe: Platinum Silver Lattice
  const wireGeo = new THREE.IcosahedronGeometry(2.05, 1);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xD4AF37,
    wireframe: true,
    transparent: true,
    opacity: 0.42
  });
  const outerWire = new THREE.Mesh(wireGeo, wireMat);
  mainGroup.add(outerWire);

  // 3. Floating Gold Tech Nodes
  const nodeCount = isMobile ? 30 : 50;
  const nodeGeo = new THREE.BufferGeometry();
  const nodePos = new Float32Array(nodeCount * 3);
  for (let i = 0; i < nodeCount * 3; i += 3) {
    const radius = 2.45 + Math.random() * 0.7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    nodePos[i] = radius * Math.sin(phi) * Math.cos(theta);
    nodePos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    nodePos[i + 2] = radius * Math.cos(phi);
  }
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
  const nodeMat = new THREE.PointsMaterial({
    color: 0xF3E5AB,
    size: isMobile ? 0.09 : 0.08,
    transparent: true,
    opacity: 0.9
  });
  const techNodes = new THREE.Points(nodeGeo, nodeMat);
  mainGroup.add(techNodes);

  // 4. Diamond Silver & Gold Particle Nebula
  const starCount = isMobile ? 220 : 380;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 16;
    starPos[i + 1] = (Math.random() - 0.5) * 16;
    starPos[i + 2] = (Math.random() - 0.5) * 12;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xE2E8F0,
    size: 0.035,
    transparent: true,
    opacity: 0.6
  });
  const starDust = new THREE.Points(starGeo, starMat);
  scene.add(starDust);

  // 5. Luxury Studio Lighting (Warm Champagne Gold + Cool Platinum Silver)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(ambientLight);

  const pointLightGold = new THREE.PointLight(0xD4AF37, 5, 16);
  pointLightGold.position.set(4, 3, 3);
  scene.add(pointLightGold);

  const pointLightSilver = new THREE.PointLight(0xF8FAFC, 3.8, 16);
  pointLightSilver.position.set(-4, -3, 2);
  scene.add(pointLightSilver);

  const pointLightWarm = new THREE.PointLight(0xC5A059, 2, 12);
  pointLightWarm.position.set(0, 4, -2);
  scene.add(pointLightWarm);

  // Cursor & Touch Tracking
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetX = mouseX * 0.4;
    targetY = mouseY * 0.4;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      const touchX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      const touchY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetX = touchX * 0.25;
      targetY = touchY * 0.25;
    }
  }, { passive: true });

  // Render Animation Loop (60 FPS)
  const clock = new THREE.Clock();
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    currentX += (targetX - currentX) * 0.045;
    currentY += (targetY - currentY) * 0.045;

    mainGroup.rotation.y = elapsedTime * 0.22 + currentX;
    mainGroup.rotation.x = Math.sin(elapsedTime * 0.28) * 0.12 - currentY;

    outerWire.rotation.y = -elapsedTime * 0.12;
    outerWire.rotation.z = elapsedTime * 0.08;

    techNodes.rotation.y = elapsedTime * 0.06;
    starDust.rotation.y = elapsedTime * 0.015;

    renderer.render(scene, camera);
  }
  animate();

  // Responsive Resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!container) return;
      updateCameraDistance();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }, 100);
  });
})();
