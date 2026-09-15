// Haute Executive 3D Dual-Device Rig: Separated & Realistic MacBook Pro + iPhone 15 Pro
// Engineered with Extruded Rounded Bevels, Dynamic Retina Canvas UI, and 60 FPS Parallax Physics

(function() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  // WebGL Availability Verification
  function checkWebGL() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!checkWebGL()) {
    console.warn('[Three.js] WebGL context unavailable. Displaying static high-res fallback.');
    container.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400 text-xs font-mono">3D Acceleration Unavailable</div>';
    return;
  }

  const isMobile = window.innerWidth < 768;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const initW = container.clientWidth || 500;
  const initH = container.clientHeight || 450;
  const camera = new THREE.PerspectiveCamera(38, initW / Math.max(initH, 1), 0.1, 1000);
  
  function updateCameraDistance() {
    const width = window.innerWidth;
    if (width < 640) {
      camera.position.set(0, 0.35, 8.5); // Mobile view: perfectly centered & sized
    } else if (width < 1024) {
      camera.position.set(0, 0.3, 7.6);  // Tablet
    } else {
      camera.position.set(0.1, 0.25, 6.8); // Desktop PC: cinematic perspective
    }
    const curW = container.clientWidth || 500;
    const curH = container.clientHeight || 450;
    camera.aspect = curW / Math.max(curH, 1);
    camera.updateProjectionMatrix();
  }
  updateCameraDistance();

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: 'high-performance' 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.touchAction = 'pan-y';
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Master Rig Group
  const masterRig = new THREE.Group();
  masterRig.position.set(-0.15, -0.05, 0);
  masterRig.rotation.set(0.14, -0.22, 0);
  scene.add(masterRig);

  // Helper to create rounded rectangle shape for realistic device chassis
  function createRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
    return shape;
  }

  // =========================================================================
  // 1. DYNAMIC RETINA CANVAS TEXTURES (Next.js SaaS Web & Flutter Mobile)
  // =========================================================================

  // A. Next.js SaaS Web Dashboard (1024 x 640)
  function createMacScreenTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    // Canvas Background
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, 1024, 640);

    // macOS Title Bar
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1024, 44);

    // macOS Window Controls
    ctx.fillStyle = '#EF4444';
    ctx.beginPath(); ctx.arc(24, 22, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath(); ctx.arc(44, 22, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(64, 22, 6, 0, Math.PI * 2); ctx.fill();

    // App Branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px -apple-system, sans-serif';
    ctx.fillText('NEXUS ARCHITECTURE', 96, 27);

    ctx.fillStyle = '#0A66C2';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('NEXT.JS 14 · APP ROUTER', 300, 26);

    // Top Right Production Badge
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(830, 10, 170, 24, 12);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(846, 22, 4, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'bold 11px monospace';
    ctx.fillText('PRODUCTION 99/100', 858, 26);

    // Sidebar
    ctx.fillStyle = '#080D1A';
    ctx.fillRect(0, 44, 60, 596);
    const navIcons = ['📊', '⚡', '👥', '💳', '⚙️'];
    ctx.font = '16px sans-serif';
    navIcons.forEach((icon, i) => {
      ctx.fillStyle = i === 0 ? '#0A66C2' : '#475569';
      if (i === 0) ctx.fillRect(0, 60 + i * 46, 4, 28);
      ctx.fillText(icon, 20, 80 + i * 46);
    });

    // 3 Stat Cards
    const stats = [
      { label: 'ANNUAL RUN RATE', val: '$284,500', note: '+34.2% MoM', col: '#10B981' },
      { label: 'P99 LATENCY', val: '14.2 ms', note: 'Edge Caching Active', col: '#0A66C2' },
      { label: 'FIDELITY SCORE', val: '100.0%', note: 'Pixel Perfect Code', col: '#38BDF8' }
    ];

    stats.forEach((s, i) => {
      const sx = 80 + i * 308;
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(sx, 60, 292, 92, 10);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px monospace';
      ctx.fillText(s.label, sx + 16, 82);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.fillText(s.val, sx + 16, 114);

      ctx.fillStyle = s.col;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(s.note, sx + 16, 136);
    });

    // Main Line Chart Box
    ctx.fillStyle = '#0F172A';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(80, 168, 920, 350, 12);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Live Revenue & Realtime Hydration', 100, 198);

    ctx.fillStyle = '#64748B';
    ctx.font = '10px monospace';
    ctx.fillText('SUPABASE REALTIME ENGINE · ZERO CLIENT HYDRATION LAG', 100, 215);

    // Chart Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    for (let gy = 240; gy <= 470; gy += 45) {
      ctx.beginPath();
      ctx.moveTo(100, gy);
      ctx.lineTo(980, gy);
      ctx.stroke();
    }

    // Chart Gradient Area
    const chartGrad = ctx.createLinearGradient(0, 240, 0, 480);
    chartGrad.addColorStop(0, 'rgba(10, 102, 194, 0.5)');
    chartGrad.addColorStop(1, 'rgba(10, 102, 194, 0.0)');

    const chartPts = [
      {x: 110, y: 440}, {x: 210, y: 410}, {x: 310, y: 430}, 
      {x: 410, y: 355}, {x: 520, y: 375}, {x: 630, y: 300}, 
      {x: 740, y: 320}, {x: 850, y: 255}, {x: 970, y: 240}
    ];

    ctx.fillStyle = chartGrad;
    ctx.beginPath();
    ctx.moveTo(chartPts[0].x, 480);
    chartPts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(chartPts[chartPts.length - 1].x, 480);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0A66C2';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    chartPts.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    chartPts.forEach(p => {
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
    });

    // Bottom Terminal Bar
    ctx.fillStyle = '#080D1A';
    ctx.fillRect(80, 532, 920, 84);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('● CLOUD RUN & POSTGRES READY', 100, 565);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px monospace';
    ctx.fillText('ACTIVE SPRINT CADENCE · 100% IP OWNERSHIP TRANSFERRED', 100, 592);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // B. Flutter Mobile App Screen (512 x 1024)
  function createIPhoneScreenTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Dark Obsidian
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, 512, 1024);

    // Dynamic Island
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(176, 18, 160, 36, 18);
    ctx.fill();

    // Camera Lens Dot
    ctx.fillStyle = '#1E293B';
    ctx.beginPath(); ctx.arc(310, 36, 5, 0, Math.PI * 2); ctx.fill();

    // App Header
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.fillText('AURA PULSE', 36, 100);

    // 60 FPS Badge
    ctx.fillStyle = 'rgba(10, 102, 194, 0.2)';
    ctx.strokeStyle = '#0A66C2';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(330, 78, 146, 32, 16);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('FLUTTER 60 FPS', 346, 99);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Unified iOS & Android Client', 36, 126);

    // Activity Rings
    const cx = 256;
    const cy = 290;

    // Ring 1 (Royal Blue)
    ctx.strokeStyle = 'rgba(10, 102, 194, 0.25)';
    ctx.lineWidth = 18;
    ctx.beginPath(); ctx.arc(cx, cy, 96, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#0A66C2';
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(cx, cy, 96, -Math.PI / 2, Math.PI * 0.95); ctx.stroke();

    // Ring 2 (Cyan)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 16;
    ctx.beginPath(); ctx.arc(cx, cy, 74, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#38BDF8';
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(cx, cy, 74, -Math.PI / 2, Math.PI * 0.7); ctx.stroke();

    // Ring 3 (Mint)
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 14;
    ctx.beginPath(); ctx.arc(cx, cy, 54, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#10B981';
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(cx, cy, 54, -Math.PI / 2, Math.PI * 1.05); ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('98.4%', cx, 288);

    ctx.fillStyle = '#64748B';
    ctx.font = '11px monospace';
    ctx.fillText('ENGINE SYNC', cx, 308);
    ctx.textAlign = 'left';

    // Feature Cards
    const cards = [
      { title: 'Global Multi-Currency Wallet', val: '$18,450.00 USD', icon: '💳', sub: 'Biometric 256-Bit Encrypted' },
      { title: 'Offline-First Cloud Sync', val: 'Synchronized', icon: '⚡', sub: 'Supabase Realtime Engine' },
      { title: 'App Store & Google Play', val: 'Release Ready', icon: '🚀', sub: 'Single Codebase Architecture' }
    ];

    cards.forEach((c, idx) => {
      const cardY = 440 + idx * 145;
      ctx.fillStyle = '#111827';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(32, cardY, 448, 125, 16);
      ctx.fill(); ctx.stroke();

      ctx.font = '24px sans-serif';
      ctx.fillText(c.icon, 52, cardY + 45);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(c.val, 92, cardY + 45);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText(c.title, 52, cardY + 82);

      ctx.fillStyle = '#38BDF8';
      ctx.font = '11px monospace';
      ctx.fillText(c.sub, 52, cardY + 104);
    });

    // Bottom Bar
    ctx.fillStyle = '#060A10';
    ctx.fillRect(0, 930, 512, 94);
    const bIcons = ['🏠', '📈', '🔔', '👤'];
    bIcons.forEach((bi, i) => {
      ctx.font = '20px sans-serif';
      ctx.fillText(bi, 60 + i * 115, 970);
    });

    // Home Bar
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(176, 1004, 160, 6, 3);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // =========================================================================
  // 2. CONSTRUCT REALISTIC MACBOOK PRO (LEFT SIDE)
  // =========================================================================
  const macGroup = new THREE.Group();
  // Distinct position separated from the phone:
  macGroup.position.set(-0.7, -0.15, -0.2);
  masterRig.add(macGroup);

  // Precision Apple Brushed Aluminum Material
  const macAluminumMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.85,
    roughness: 0.28
  });

  const macKeyboardMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    metalness: 0.5,
    roughness: 0.45
  });

  const macTrackpadMat = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.65,
    roughness: 0.32
  });

  // Base Chassis (Curved unibody extrusion)
  const baseShape = createRoundedRectShape(2.8, 1.85, 0.08);
  const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
    depth: 0.06,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  });
  const baseMesh = new THREE.Mesh(baseGeo, macAluminumMat);
  baseMesh.rotation.x = Math.PI / 2;
  baseMesh.position.set(0, 0, 0);
  macGroup.add(baseMesh);

  // Keyboard Bed
  const kbGeo = new THREE.BoxGeometry(2.4, 0.008, 0.95);
  const kbMesh = new THREE.Mesh(kbGeo, macKeyboardMat);
  kbMesh.position.set(0, 0.045, -0.25);
  macGroup.add(kbMesh);

  // Trackpad
  const tpGeo = new THREE.BoxGeometry(0.95, 0.006, 0.6);
  const tpMesh = new THREE.Mesh(tpGeo, macTrackpadMat);
  tpMesh.position.set(0, 0.045, 0.5);
  macGroup.add(tpMesh);

  // Hinge Cylinder
  const hingeGeo = new THREE.CylinderGeometry(0.025, 0.025, 2.4, 16);
  const hingeMesh = new THREE.Mesh(hingeGeo, macAluminumMat);
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, 0.04, -0.92);
  macGroup.add(hingeMesh);

  // Display Lid Group (Hinged at rear, angled upright to face viewer)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.04, -0.92);
  // Opened at ~104° backwards so screen faces directly forward into camera
  lidGroup.rotation.x = -Math.PI / 2 + 0.26;
  macGroup.add(lidGroup);

  // Lid Aluminum Back
  const lidShape = createRoundedRectShape(2.8, 1.82, 0.08);
  const lidGeo = new THREE.ExtrudeGeometry(lidShape, {
    depth: 0.035,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.012,
    bevelThickness: 0.012
  });
  const lidMesh = new THREE.Mesh(lidGeo, macAluminumMat);
  lidMesh.position.set(0, 0.91, 0);
  lidGroup.add(lidMesh);

  // Reflective Silver Apple Logo on MacBook Rear Lid (Visible in 360° rotation)
  const appleLogoGeo = new THREE.CircleGeometry(0.13, 32);
  const appleLogoMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.95,
    roughness: 0.12,
    emissive: 0x38BDF8,
    emissiveIntensity: 0.2
  });
  const appleLogoMesh = new THREE.Mesh(appleLogoGeo, appleLogoMat);
  appleLogoMesh.rotation.y = Math.PI; // faces backwards
  appleLogoMesh.position.set(0, 0.91, -0.02);
  lidGroup.add(appleLogoMesh);

  // Screen Bezel (Front Black Border)
  const bezelMat = new THREE.MeshBasicMaterial({ color: 0x050810 });
  const bezelGeo = new THREE.PlaneGeometry(2.74, 1.76);
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.set(0, 0.91, 0.024);
  lidGroup.add(bezelMesh);

  // Live Screen Texture Face
  const macTexture = createMacScreenTexture();
  const screenFaceGeo = new THREE.PlaneGeometry(2.62, 1.64);
  const screenFaceMat = new THREE.MeshBasicMaterial({ map: macTexture });
  const screenFaceMesh = new THREE.Mesh(screenFaceGeo, screenFaceMat);
  screenFaceMesh.position.set(0, 0.91, 0.026);
  lidGroup.add(screenFaceMesh);

  // =========================================================================
  // 3. CONSTRUCT REALISTIC IPHONE 15 PRO (SEPARATED RIGHT & IN FRONT)
  // =========================================================================
  const phoneGroup = new THREE.Group();
  // Generous separation from laptop (Laptop right edge is at ~0.7, phone center is at 1.42):
  phoneGroup.position.set(1.42, -0.12, 0.65);
  // Slightly tilted toward camera
  phoneGroup.rotation.set(0.08, -0.22, 0.04);
  masterRig.add(phoneGroup);

  // Polished Sapphire Titanium Frame
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x0A66C2,
    metalness: 0.94,
    roughness: 0.16
  });

  // iPhone Chassis with Extruded Rounded Corners
  const phoneShape = createRoundedRectShape(1.02, 2.12, 0.14);
  const phoneGeo = new THREE.ExtrudeGeometry(phoneShape, {
    depth: 0.065,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.015,
    bevelThickness: 0.015
  });
  const phoneMesh = new THREE.Mesh(phoneGeo, titaniumMat);
  phoneMesh.position.set(0, 0, 0);
  phoneGroup.add(phoneMesh);

  // Camera Island on Back
  const camShape = createRoundedRectShape(0.42, 0.42, 0.08);
  const camGeo = new THREE.ExtrudeGeometry(camShape, {
    depth: 0.025,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.01,
    bevelThickness: 0.01
  });
  const camMesh = new THREE.Mesh(camGeo, titaniumMat);
  camMesh.position.set(-0.22, 0.72, -0.045);
  phoneGroup.add(camMesh);

  // Polished Sapphire Emblem on iPhone Rear Back (Visible in 360° rotation)
  const phoneLogoGeo = new THREE.CircleGeometry(0.08, 32);
  const phoneLogoMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    metalness: 0.94,
    roughness: 0.12,
    emissive: 0x0A66C2,
    emissiveIntensity: 0.25
  });
  const phoneLogoMesh = new THREE.Mesh(phoneLogoGeo, phoneLogoMat);
  phoneLogoMesh.rotation.y = Math.PI; // faces backwards
  phoneLogoMesh.position.set(0, 0, -0.048);
  phoneGroup.add(phoneLogoMesh);

  // 3 Camera Lenses
  const lensGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.02, 16);
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x050810, metalness: 0.95, roughness: 0.1 });
  const l1 = new THREE.Mesh(lensGeo, lensMat);
  l1.rotation.x = Math.PI / 2;
  l1.position.set(-0.29, 0.82, -0.065);
  phoneGroup.add(l1);

  const l2 = new THREE.Mesh(lensGeo, lensMat);
  l2.rotation.x = Math.PI / 2;
  l2.position.set(-0.29, 0.62, -0.065);
  phoneGroup.add(l2);

  const l3 = new THREE.Mesh(lensGeo, lensMat);
  l3.rotation.x = Math.PI / 2;
  l3.position.set(-0.14, 0.72, -0.065);
  phoneGroup.add(l3);

  // iPhone Display Screen Face
  const phoneTexture = createIPhoneScreenTexture();
  const phoneScreenGeo = new THREE.PlaneGeometry(0.96, 2.05);
  const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
  const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
  phoneScreenMesh.position.set(0, 0, 0.048);
  phoneGroup.add(phoneScreenMesh);

  // =========================================================================
  // 4. STUDIO LIGHTING & AMBIENT GLOW
  // =========================================================================
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.96);
  scene.add(ambientLight);

  // Key Specular Light (Top-Right)
  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.9);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);

  // Sapphire Rim Light (Back-Left)
  const sapphireRim = new THREE.PointLight(0x0A66C2, 3.2, 12);
  sapphireRim.position.set(-4, -1, 3);
  scene.add(sapphireRim);

  // Cyan Front Specular
  const cyanFill = new THREE.PointLight(0x38BDF8, 1.4, 10);
  cyanFill.position.set(3, -2, 4);
  scene.add(cyanFill);

  // Studio Back Lighting for 360° Inspection (Illuminates rear aluminum & camera bump)
  const backStudioLight = new THREE.DirectionalLight(0xFFFFFF, 1.3);
  backStudioLight.position.set(-3, 4, -6);
  scene.add(backStudioLight);

  const backSapphireRim = new THREE.PointLight(0x0A66C2, 2.8, 12);
  backSapphireRim.position.set(3, 1, -4);
  scene.add(backSapphireRim);

  // =========================================================================
  // 5. 360° INTERACTIVE CURSOR & TOUCH HOLD-AND-DRAG ORBIT RIG WITH INERTIA
  // =========================================================================
  let isDragging = false;
  let prevPointerX = 0;
  let prevPointerY = 0;
  let velocityX = 0;
  let velocityY = 0;

  // Base rotation angles
  let targetRotY = -0.22;
  let targetRotX = 0.14;
  let currentRotY = -0.22;
  let currentRotX = 0.14;

  const dragHint = document.getElementById('drag-360-hint');
  const canvasElement = renderer.domElement;
  canvasElement.style.touchAction = 'none'; // Enables 360 touch drag without scrolling page

  // Pointer Down (Mouse Click or Touch Hold)
  function onPointerDown(e) {
    isDragging = true;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
    velocityX = 0;
    velocityY = 0;

    container.style.cursor = 'grabbing';
    document.body.style.cursor = 'grabbing';
    document.body.classList.add('select-none');

    try {
      canvasElement.setPointerCapture(e.pointerId);
    } catch (err) {}

    if (dragHint) {
      dragHint.style.opacity = '0.35';
    }
  }

  // Pointer Move (Active Dragging in 360°)
  function onPointerMove(e) {
    if (!isDragging) return;

    const deltaX = e.clientX - prevPointerX;
    const deltaY = e.clientY - prevPointerY;

    // Direct 360° rotational sensitivity
    const rotSpeed = 0.007;
    targetRotY += deltaX * rotSpeed;
    targetRotX += deltaY * rotSpeed;

    // Track instant velocity for smooth flick momentum/inertia
    velocityX = deltaX * rotSpeed;
    velocityY = deltaY * rotSpeed;

    // Clamp pitch (X-axis) between -80° and +80° so devices stay upright
    targetRotX = Math.max(-Math.PI * 0.44, Math.min(Math.PI * 0.44, targetRotX));

    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
  }

  // Pointer Up / Cancel (Release Hold)
  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;

    container.style.cursor = 'grab';
    document.body.style.cursor = '';
    document.body.classList.remove('select-none');

    try {
      canvasElement.releasePointerCapture(e.pointerId);
    } catch (err) {}
  }

  canvasElement.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // Subtle Mouse Parallax Influence When Idle
  let passiveX = 0;
  let passiveY = 0;
  window.addEventListener('mousemove', (e) => {
    if (isDragging) return;
    const mx = (e.clientX / window.innerWidth) * 2 - 1;
    const my = -(e.clientY / window.innerHeight) * 2 + 1;
    passiveX = mx * 0.08;
    passiveY = my * 0.08;
  }, { passive: true });

  // IntersectionObserver: Pause 60 FPS WebGL render loop when scrolled off-screen to save battery & GPU
  let isSceneVisible = true;
  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isSceneVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    visibilityObserver.observe(container);
  }

  // Handle window blur/focus to prevent stuck drag states
  window.addEventListener('blur', () => {
    isDragging = false;
    container.style.cursor = 'grab';
    document.body.style.cursor = '';
    document.body.classList.remove('select-none');
  });

  // 60 FPS Render Loop with Silky Momentum & Out-of-Phase Levitation
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isSceneVisible) return; // Save GPU/CPU when off-screen
    const elapsed = clock.getElapsedTime();

    if (!isDragging) {
      // Apply flick inertia / momentum
      targetRotY += velocityX;
      targetRotX += velocityY;

      // Friction damping deceleration
      velocityX *= 0.935;
      velocityY *= 0.935;

      // Gentle ambient 360° drift when at rest
      if (Math.abs(velocityX) < 0.0001 && Math.abs(velocityY) < 0.0001) {
        targetRotY += 0.0012;
      }
    }

    // Keep pitch within comfortable viewing bounds
    targetRotX = Math.max(-Math.PI * 0.44, Math.min(Math.PI * 0.44, targetRotX));

    // Smooth weighted interpolation (lerp)
    currentRotY += (targetRotY + (!isDragging ? passiveX : 0) - currentRotY) * 0.085;
    currentRotX += (targetRotX + (!isDragging ? -passiveY : 0) - currentRotX) * 0.085;

    masterRig.rotation.y = currentRotY;
    masterRig.rotation.x = currentRotX;

    // Gentle Independent Floating Levitation (Always perfectly separated!)
    macGroup.position.y = -0.15 + Math.sin(elapsed * 1.0) * 0.045;
    macGroup.rotation.z = Math.sin(elapsed * 0.7) * 0.01;

    phoneGroup.position.y = -0.12 + Math.sin(elapsed * 1.0 + 1.4) * 0.055;
    phoneGroup.rotation.z = 0.04 + Math.cos(elapsed * 0.8) * 0.015;

    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler with Debouncing
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!container) return;
      updateCameraDistance();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }, 100);
  });
})();
