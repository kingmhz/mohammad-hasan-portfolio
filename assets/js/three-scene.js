// Haute Executive Luxury 3D Dual-Device Rig: MacBook Pro + iPhone Pro
// Showcasing Next.js SaaS Web Architecture & Flutter Mobile Engineering
// Precision WebGL 60 FPS with Dynamic Canvas UI Textures & Cursor Parallax

(function() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;

  const isMobile = window.innerWidth < 768;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  function updateCameraDistance() {
    const width = window.innerWidth;
    if (width < 640) {
      camera.position.set(0, 0.2, 8.4); // Mobile view
    } else if (width < 1024) {
      camera.position.set(0, 0.25, 7.6); // Tablet
    } else {
      camera.position.set(0, 0.25, 6.9); // Desktop PC
    }
    camera.aspect = container.clientWidth / container.clientHeight;
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

  // Main Rig Group
  const rigGroup = new THREE.Group();
  rigGroup.position.set(-0.35, -0.2, 0);
  rigGroup.rotation.set(0.18, -0.28, 0.02);
  scene.add(rigGroup);

  // =========================================================================
  // 1. GENERATE DYNAMIC 2D CANVAS TEXTURES FOR LAPTOP & PHONE SCREENS
  // =========================================================================

  // A. Next.js SaaS Web Dashboard Texture (1024 x 640)
  function createLaptopScreenTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    // Background: Deep Sleek Executive Obsidian
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, 1024, 640);

    // Top macOS Header Bar
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1024, 48);

    // Window Dots
    ctx.fillStyle = '#EF4444';
    ctx.beginPath(); ctx.arc(26, 24, 6.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath(); ctx.arc(46, 24, 6.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(66, 24, 6.5, 0, Math.PI * 2); ctx.fill();

    // App Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillText('NEXUS SAAS ANALYTICS', 100, 29);

    ctx.fillStyle = '#0A66C2';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('NEXT.JS 14 APP ROUTER', 310, 28);

    // Production Pill Badge
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(840, 12, 160, 24, 12);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(855, 24, 4, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'bold 11px monospace';
    ctx.fillText('PRODUCTION 99/100', 868, 28);

    // Left Navigation Mini Sidebar
    ctx.fillStyle = '#080D1A';
    ctx.fillRect(0, 48, 64, 592);

    const icons = ['📊', '⚡', '👥', '💳', '⚙️'];
    ctx.font = '18px sans-serif';
    icons.forEach((ic, i) => {
      ctx.fillStyle = i === 0 ? '#0A66C2' : '#475569';
      if (i === 0) {
        ctx.fillRect(0, 68 + i * 50, 4, 32);
      }
      ctx.fillText(ic, 22, 90 + i * 50);
    });

    // 3 Executive Metric Cards
    const metrics = [
      { label: 'ANNUAL RUN RATE', val: '$284,500', change: '+34.2% MoM', color: '#10B981' },
      { label: 'SERVER LATENCY (P99)', val: '14.2 ms', change: 'Edge Caching Active', color: '#0A66C2' },
      { label: 'FIGMA FIDELITY', val: '100.0%', change: 'Pixel Perfect Code', color: '#38BDF8' }
    ];

    metrics.forEach((m, idx) => {
      const cardX = 88 + idx * 304;
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(cardX, 68, 288, 100, 10);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#94A3B8';
      ctx.font = '10px monospace';
      ctx.fillText(m.label, cardX + 16, 92);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px -apple-system, sans-serif';
      ctx.fillText(m.val, cardX + 16, 126);

      ctx.fillStyle = m.color;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(m.change, cardX + 16, 150);
    });

    // Main Chart Box
    ctx.fillStyle = '#0F172A';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(88, 184, 896, 340, 12);
    ctx.fill(); ctx.stroke();

    // Chart Header
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Live Revenue & User Velocity', 108, 216);

    ctx.fillStyle = '#64748B';
    ctx.font = '11px monospace';
    ctx.fillText('30-DAY ROLLING AUDIT · SUPABASE REALTIME', 108, 234);

    // Chart Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    for (let y = 260; y <= 470; y += 45) {
      ctx.beginPath();
      ctx.moveTo(108, y);
      ctx.lineTo(964, y);
      ctx.stroke();
    }

    // Chart Area Gradient
    const grad = ctx.createLinearGradient(0, 240, 0, 480);
    grad.addColorStop(0, 'rgba(10, 102, 194, 0.45)');
    grad.addColorStop(1, 'rgba(10, 102, 194, 0.0)');

    const points = [
      {x: 120, y: 440}, {x: 220, y: 410}, {x: 320, y: 430}, 
      {x: 420, y: 360}, {x: 520, y: 380}, {x: 620, y: 310}, 
      {x: 720, y: 330}, {x: 820, y: 265}, {x: 950, y: 250}
    ];

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(points[0].x, 480);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, 480);
    ctx.closePath();
    ctx.fill();

    // Chart Line
    ctx.strokeStyle = '#0A66C2';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    points.forEach((p, idx) => {
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    // Chart Dots
    points.forEach(p => {
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath(); ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
    });

    // Bottom Status Bar
    ctx.fillStyle = '#080D1A';
    ctx.fillRect(88, 540, 896, 68);
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('● FASTAPI & PRISMA BACKEND CONNECTED', 108, 580);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px monospace';
    ctx.fillText('0 ERROR REPORTS · 60 FPS SMOOTH SCROLL', 620, 580);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // B. Flutter Mobile App Texture (512 x 1024)
  function createPhoneScreenTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Background: High-tech Dark Obsidian
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, 512, 1024);

    // Dynamic Island
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(176, 20, 160, 36, 18);
    ctx.fill();

    // Camera dot
    ctx.fillStyle = '#1E293B';
    ctx.beginPath(); ctx.arc(310, 38, 5, 0, Math.PI * 2); ctx.fill();

    // App Header Bar
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.fillText('AURA PULSE', 36, 105);

    // Flutter 60 FPS Badge
    ctx.fillStyle = 'rgba(10, 102, 194, 0.2)';
    ctx.strokeStyle = '#0A66C2';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(324, 82, 152, 34, 17);
    ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('FLUTTER 60 FPS', 342, 104);

    // Subtitle
    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px sans-serif';
    ctx.fillText('Unified iOS & Android Client', 36, 134);

    // Activity Circular Gauges (Apple Fitness Ring Style)
    const centerX = 256;
    const centerY = 310;

    // Outer Ring: Blue
    ctx.strokeStyle = 'rgba(10, 102, 194, 0.25)';
    ctx.lineWidth = 18;
    ctx.beginPath(); ctx.arc(centerX, centerY, 100, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = '#0A66C2';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(centerX, centerY, 100, -Math.PI / 2, Math.PI * 0.9); ctx.stroke();

    // Middle Ring: Cyan
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 16;
    ctx.beginPath(); ctx.arc(centerX, centerY, 76, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(centerX, centerY, 76, -Math.PI / 2, Math.PI * 0.7); ctx.stroke();

    // Inner Ring: Mint
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.lineWidth = 14;
    ctx.beginPath(); ctx.arc(centerX, centerY, 54, 0, Math.PI * 2); ctx.stroke();

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(centerX, centerY, 54, -Math.PI / 2, Math.PI * 1.1); ctx.stroke();

    // Metric In Ring Center
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('98.4%', centerX, 308);
    ctx.fillStyle = '#64748B';
    ctx.font = '11px monospace';
    ctx.fillText('HEALTH SYNC', centerX, 328);
    ctx.textAlign = 'left';

    // Stat Cards
    const cards = [
      { title: 'Global Multi-Currency Wallet', val: '$18,450.00 USD', icon: '💳', sub: 'Biometric 256-Bit Encrypted' },
      { title: 'Offline-First Cloud Sync', val: 'Synchronized', icon: '⚡', sub: 'Supabase Realtime Engine' },
      { title: 'App Store & Google Play', val: 'Ready for Release', icon: '🚀', sub: 'Single Codebase Architecture' }
    ];

    cards.forEach((c, idx) => {
      const cy = 470 + idx * 140;
      ctx.fillStyle = '#111827';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(36, cy, 440, 120, 16);
      ctx.fill(); ctx.stroke();

      ctx.font = '24px sans-serif';
      ctx.fillText(c.icon, 56, cy + 45);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText(c.val, 96, cy + 45);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '13px sans-serif';
      ctx.fillText(c.title, 56, cy + 80);

      ctx.fillStyle = '#38BDF8';
      ctx.font = '11px monospace';
      ctx.fillText(c.sub, 56, cy + 102);
    });

    // Bottom Navigation Bar
    ctx.fillStyle = '#060A10';
    ctx.fillRect(0, 930, 512, 94);

    const bIcons = ['🏠', '📈', '🔔', '👤'];
    bIcons.forEach((bi, i) => {
      ctx.font = '20px sans-serif';
      ctx.fillText(bi, 60 + i * 115, 970);
    });

    // Home Indicator Bar
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(176, 1004, 160, 6, 3);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // =========================================================================
  // 2. CONSTRUCT 3D MACBOOK PRO MODEL
  // =========================================================================
  const laptopGroup = new THREE.Group();
  rigGroup.add(laptopGroup);

  // Aluminum Metallic Materials
  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0xDCE3EB,
    metalness: 0.88,
    roughness: 0.25
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    metalness: 0.7,
    roughness: 0.4
  });

  // Base Chassis
  const baseGeo = new THREE.BoxGeometry(3.6, 0.1, 2.38);
  const baseMesh = new THREE.Mesh(baseGeo, aluminumMat);
  laptopGroup.add(baseMesh);

  // Keyboard Well
  const kbWellGeo = new THREE.BoxGeometry(3.2, 0.015, 1.25);
  const kbWellMesh = new THREE.Mesh(kbWellGeo, darkMetalMat);
  kbWellMesh.position.set(0, 0.051, -0.38);
  laptopGroup.add(kbWellMesh);

  // Trackpad
  const tpGeo = new THREE.BoxGeometry(1.25, 0.012, 0.82);
  const tpMat = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.6,
    roughness: 0.35
  });
  const tpMesh = new THREE.Mesh(tpGeo, tpMat);
  tpMesh.position.set(0, 0.051, 0.65);
  laptopGroup.add(tpMesh);

  // Display Screen Lid (Hinged at rear)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.05, -1.18);
  // Opened at ~106 degrees backwards
  lidGroup.rotation.x = -Math.PI * 0.59;
  laptopGroup.add(lidGroup);

  // Lid Back Cover
  const lidGeo = new THREE.BoxGeometry(3.6, 2.32, 0.05);
  const lidMesh = new THREE.Mesh(lidGeo, aluminumMat);
  lidMesh.position.set(0, 1.16, 0);
  lidGroup.add(lidMesh);

  // Screen Front Glass Face
  const laptopTexture = createLaptopScreenTexture();
  const screenFaceGeo = new THREE.PlaneGeometry(3.46, 2.18);
  const screenFaceMat = new THREE.MeshBasicMaterial({ map: laptopTexture });
  const screenFaceMesh = new THREE.Mesh(screenFaceGeo, screenFaceMat);
  screenFaceMesh.position.set(0, 1.16, 0.026);
  lidGroup.add(screenFaceMesh);

  // =========================================================================
  // 3. CONSTRUCT 3D IPHONE PRO MODEL (FLOATING RIGHT & FORWARD)
  // =========================================================================
  const phoneGroup = new THREE.Group();
  phoneGroup.position.set(1.68, -0.15, 0.85);
  phoneGroup.rotation.set(0.1, -0.22, 0.05);
  rigGroup.add(phoneGroup);

  // Phone Titanium Frame (Sapphire Blue Tint)
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x0A66C2,
    metalness: 0.92,
    roughness: 0.16
  });

  const phoneGeo = new THREE.BoxGeometry(1.22, 2.48, 0.1);
  const phoneMesh = new THREE.Mesh(phoneGeo, titaniumMat);
  phoneGroup.add(phoneMesh);

  // Camera Island on Rear
  const camBumpGeo = new THREE.BoxGeometry(0.5, 0.5, 0.04);
  const camBumpMesh = new THREE.Mesh(camBumpGeo, titaniumMat);
  camBumpMesh.position.set(-0.25, 0.85, -0.07);
  phoneGroup.add(camBumpMesh);

  // Phone Front Display Screen
  const phoneTexture = createPhoneScreenTexture();
  const phoneScreenGeo = new THREE.PlaneGeometry(1.15, 2.4);
  const phoneScreenMat = new THREE.MeshBasicMaterial({ map: phoneTexture });
  const phoneScreenMesh = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
  phoneScreenMesh.position.set(0, 0, 0.051);
  phoneGroup.add(phoneScreenMesh);

  // =========================================================================
  // 4. STUDIO LIGHTING & AMBIENT GLOW
  // =========================================================================
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.95);
  scene.add(ambientLight);

  // Key Specular Light (Top-Right)
  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
  keyLight.position.set(5, 7, 6);
  scene.add(keyLight);

  // Executive Sapphire Rim Light (Back-Left)
  const sapphireRim = new THREE.PointLight(0x0A66C2, 3.8, 14);
  sapphireRim.position.set(-4, -2, 3);
  scene.add(sapphireRim);

  // Cyan Front Fill
  const cyanFill = new THREE.PointLight(0x38BDF8, 1.8, 12);
  cyanFill.position.set(3, -3, 4);
  scene.add(cyanFill);

  // Subtle Orbiting Diamond Stardust (60 Particles)
  const starCount = 60;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i] = (Math.random() - 0.5) * 12;
    starPos[i + 1] = (Math.random() - 0.5) * 10;
    starPos[i + 2] = (Math.random() - 0.5) * 8;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x0A66C2,
    size: 0.04,
    transparent: true,
    opacity: 0.5
  });
  const stardust = new THREE.Points(starGeo, starMat);
  scene.add(stardust);

  // =========================================================================
  // 5. INTERACTION & PARALLAX SMOOTHING
  // =========================================================================
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetX = mouseX * 0.25;
    targetY = mouseY * 0.25;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      const touchX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      const touchY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      targetX = touchX * 0.15;
      targetY = touchY * 0.15;
    }
  }, { passive: true });

  // 60 FPS Render Loop with Floating Levitation
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Parallax Interpolation
    currentX += (targetX - currentX) * 0.045;
    currentY += (targetY - currentY) * 0.045;

    // Rig Master Parallax
    rigGroup.rotation.y = -0.28 + currentX;
    rigGroup.rotation.x = 0.18 - currentY;

    // Gentle Floating Breathing (Out-of-phase levitation)
    laptopGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.06;
    laptopGroup.rotation.z = Math.sin(elapsedTime * 0.7) * 0.012;

    phoneGroup.position.y = -0.15 + Math.sin(elapsedTime * 1.1 + 1.2) * 0.08;
    phoneGroup.rotation.z = 0.05 + Math.cos(elapsedTime * 0.8) * 0.02;

    stardust.rotation.y = elapsedTime * 0.02;

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
