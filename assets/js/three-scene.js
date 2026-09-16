// Haute Executive 3D Dual-Device Rig: Separated & Realistic MacBook Pro + iPhone 15 Pro
// Engineered with Extruded Rounded Bevels, Dynamic Retina Canvas UI, and 60 FPS Parallax Physics

function initThreeHeroScene() {
  const container = document.getElementById('three-hero-container');
  if (!container) return;
  if (typeof THREE === 'undefined') {
    setTimeout(initThreeHeroScene, 50);
    return;
  }
  if (container.dataset.initialized === 'true') return;
  container.dataset.initialized = 'true';

  const isMobile = window.innerWidth < 768;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const initW = container.clientWidth || 500;
  const initH = container.clientHeight || 450;
  const camera = new THREE.PerspectiveCamera(38, initW / Math.max(initH, 1), 0.1, 1000);
  
  function updateCameraDistance() {
    const width = window.innerWidth;
    if (width < 420) {
      camera.position.set(0, 0.15, 9.6); // Compact mobile view (avatar + dual devices fit comfortably)
    } else if (width < 640) {
      camera.position.set(0, 0.15, 8.8); // Standard mobile view
    } else if (width < 1024) {
      camera.position.set(0, 0.15, 7.8);  // Tablet
    } else {
      camera.position.set(0.1, 0.1, 6.9); // Desktop PC
    }
    const curW = container.clientWidth || window.innerWidth || 360;
    const curH = container.clientHeight || 340;
    camera.aspect = curW / Math.max(curH, 1);
    camera.updateProjectionMatrix();
  }
  updateCameraDistance();

  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: 'high-performance' 
  });
  const curW = container.clientWidth || window.innerWidth || 360;
  const curH = container.clientHeight || 340;
  renderer.setSize(curW, curH);
  renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
  renderer.domElement.style.touchAction = 'pan-y';
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Master Rig Group
  const masterRig = new THREE.Group();
  masterRig.position.set(-0.25, -0.02, 0);
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

  // Cross-browser safe canvas rounded rectangle helper (guaranteed support across all browser engines)
  function drawCanvasRoundedRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'undefined') radius = 4;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

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

    // MacBook Liquid Retina Camera Notch at Top Center
    ctx.fillStyle = '#050810';
    drawCanvasRoundedRect(ctx, 476, 0, 72, 20, 6);
    ctx.fill();

    // Camera Sensor Lens
    ctx.fillStyle = '#1E293B';
    ctx.beginPath(); ctx.arc(512, 10, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#050810';
    ctx.beginPath(); ctx.arc(512, 10, 2, 0, Math.PI * 2); ctx.fill();
    // Green Active Indicator LED
    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(526, 10, 1.5, 0, Math.PI * 2); ctx.fill();

    // App Branding
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px -apple-system, sans-serif';
    ctx.fillText('NEXUS ARCHITECTURE', 96, 27);

    ctx.fillStyle = '#0EA5E9';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('NEXT.JS 14 · APP ROUTER', 300, 26);

    // Top Right Production Badge
    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawCanvasRoundedRect(ctx, 830, 10, 170, 24, 12);
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
      ctx.fillStyle = i === 0 ? '#0EA5E9' : '#475569';
      if (i === 0) ctx.fillRect(0, 60 + i * 46, 4, 28);
      ctx.fillText(icon, 20, 80 + i * 46);
    });

    // 3 Stat Cards
    const stats = [
      { label: 'ANNUAL RUN RATE', val: '$284,500', note: '+34.2% MoM', col: '#10B981' },
      { label: 'P99 LATENCY', val: '14.2 ms', note: 'Edge Caching Active', col: '#0EA5E9' },
      { label: 'FIDELITY SCORE', val: '100.0%', note: 'Pixel Perfect Code', col: '#38BDF8' }
    ];

    stats.forEach((s, i) => {
      const sx = 80 + i * 308;
      ctx.fillStyle = '#0F172A';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      drawCanvasRoundedRect(ctx, sx, 60, 292, 92, 10);
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
    drawCanvasRoundedRect(ctx, 80, 168, 920, 350, 12);
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
    chartGrad.addColorStop(0, 'rgba(14, 165, 233, 0.5)');
    chartGrad.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

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

    ctx.strokeStyle = '#0EA5E9';
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
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 4;
    return texture;
  }

  
  // B. Ultra-Refined MacBook Pro Keyboard Deck Texture (Chiclet Keys, Speakers & Trackpad)
  function createMacKeyboardTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');

    // Unibody Space Gray / Silver Aluminum Surface
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(0, 0, 1024, 680);

    // Subtle brushed metallic gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 680);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 680);

    // Dual Speaker Grilles (Left & Right Flanking Micro-Perforations)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    // Left Speaker Strip
    for (let x = 40; x <= 96; x += 6) {
      for (let y = 48; y <= 385; y += 7) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Right Speaker Strip
    for (let x = 928; x <= 984; x += 6) {
      for (let y = 48; y <= 385; y += 7) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Recessed Keyboard Well (Dark Matte Anodized Aluminum Tray)
    ctx.fillStyle = '#090D16';
    drawCanvasRoundedRect(ctx, 116, 42, 792, 352, 8);
    ctx.fill();

    // Subtle inner bevel stroke
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Key Matrix Definition
    const keyRows = [
      { count: 14, y: 50, h: 28, labels: ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '⌽'] },
      { count: 14, y: 88, h: 46, labels: ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'] },
      { count: 14, y: 144, h: 46, labels: ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'] },
      { count: 13, y: 200, h: 46, labels: ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'] },
      { count: 12, y: 256, h: 46, labels: ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'shift'] },
      { isBottom: true, y: 312, h: 50 }
    ];

    keyRows.forEach((row) => {
      if (row.isBottom) {
        const bottomKeys = [
          { label: 'fn', w: 42, x: 128 },
          { label: 'control', w: 46, x: 178 },
          { label: 'option', w: 48, x: 232 },
          { label: 'command ⌘', w: 66, x: 288 },
          { label: '', w: 290, x: 362 }, // Spacebar
          { label: '⌘', w: 66, x: 660 },
          { label: 'option', w: 48, x: 734 },
          { label: '◀', w: 32, x: 790 },
          { label: '▲▼', w: 32, x: 830 },
          { label: '▶', w: 32, x: 870 }
        ];

        bottomKeys.forEach((k) => {
          ctx.fillStyle = '#151C2C';
          drawCanvasRoundedRect(ctx, k.x, row.y, k.w, row.h, 4);
          ctx.fill();

          ctx.fillStyle = '#1E283D';
          drawCanvasRoundedRect(ctx, k.x + 1, row.y + 1, k.w - 2, row.h - 3, 3);
          ctx.fill();

          if (k.label) {
            ctx.fillStyle = '#94A3B8';
            ctx.font = '9px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(k.label, k.x + k.w / 2, row.y + row.h / 2 + 3);
          }
        });
      } else {
        const startX = 128;
        const totalW = 768;
        const gap = 8;
        const keyW = (totalW - (row.count - 1) * gap) / row.count;

        for (let c = 0; c < row.count; c++) {
          const kx = startX + c * (keyW + gap);

          ctx.fillStyle = '#151C2C';
          drawCanvasRoundedRect(ctx, kx, row.y, keyW, row.h, 4);
          ctx.fill();

          ctx.fillStyle = '#1E283D';
          drawCanvasRoundedRect(ctx, kx + 1, row.y + 1, keyW - 2, row.h - 3, 3);
          ctx.fill();

          if (row.labels && row.labels[c]) {
            ctx.fillStyle = '#CBD5E1';
            ctx.font = row.h > 30 ? 'bold 11px -apple-system, sans-serif' : '9px -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(row.labels[c], kx + keyW / 2, row.y + row.h / 2 + 4);
          }
        }
      }
    });

    // Force Touch Trackpad (Large Centered Satin Glass)
    const tpX = 352;
    const tpY = 420;
    const tpW = 320;
    const tpH = 222;

    ctx.fillStyle = '#CBD5E1';
    drawCanvasRoundedRect(ctx, tpX, tpY, tpW, tpH, 10);
    ctx.fill();

    const tpGrad = ctx.createLinearGradient(tpX, tpY, tpX, tpY + tpH);
    tpGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    tpGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
    ctx.fillStyle = tpGrad;
    drawCanvasRoundedRect(ctx, tpX, tpY, tpW, tpH, 10);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 1.5;
    drawCanvasRoundedRect(ctx, tpX, tpY, tpW, tpH, 10);
    ctx.stroke();

    // Front Edge Opening Notch
    ctx.fillStyle = '#94A3B8';
    drawCanvasRoundedRect(ctx, 436, 664, 152, 16, 6);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
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
    drawCanvasRoundedRect(ctx, 176, 18, 160, 36, 18);
    ctx.fill();

    // Camera Lens Dot
    ctx.fillStyle = '#1E293B';
    ctx.beginPath(); ctx.arc(310, 36, 5, 0, Math.PI * 2); ctx.fill();

    // App Header
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.fillText('AURA PULSE', 36, 100);

    // 60 FPS Badge
    ctx.fillStyle = 'rgba(14, 165, 233, 0.2)';
    ctx.strokeStyle = '#0EA5E9';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    drawCanvasRoundedRect(ctx, 330, 78, 146, 32, 16);
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
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.25)';
    ctx.lineWidth = 18;
    ctx.beginPath(); ctx.arc(cx, cy, 96, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#0EA5E9';
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
      drawCanvasRoundedRect(ctx, 32, cardY, 448, 125, 16);
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
    drawCanvasRoundedRect(ctx, 176, 1004, 160, 6, 3);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 4;
    return texture;
  }


  // =========================================================================
  // 1.5. FLOATING NEON BADGE TEXTURE GENERATOR (LINKEDIN BANNER STYLE)
  // =========================================================================
  function createNeonBadgeTexture(label, brandColor, glowColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 280;
    canvas.height = 76;
    const ctx = canvas.getContext('2d');

    // Outer dark translucent glass pill
    ctx.fillStyle = 'rgba(11, 17, 32, 0.92)';
    drawCanvasRoundedRect(ctx, 4, 4, 272, 68, 34);
    ctx.fill();

    // Luminous Neon Glow Stroke
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 14;
    ctx.strokeStyle = brandColor;
    ctx.lineWidth = 3;
    drawCanvasRoundedRect(ctx, 4, 4, 272, 68, 34);
    ctx.stroke();
    ctx.restore();

    // Inner subtle hairline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1;
    drawCanvasRoundedRect(ctx, 7, 7, 266, 62, 31);
    ctx.stroke();

    // Brand Dot Glow Indicator
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 8;
    ctx.fillStyle = brandColor;
    ctx.beginPath();
    ctx.arc(42, 38, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Brand Label Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 68, 38);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  // =========================================================================
  // 2. CONSTRUCT ULTRA-REFINED MACBOOK PRO 16" (LEFT SIDE)
  // =========================================================================
  const macGroup = new THREE.Group();
  // Guaranteed generous separation from phone (phone is at x: 1.42):
  macGroup.position.set(1.58, -0.18, -0.22);
  macGroup.scale.set(0.78, 0.78, 0.78);
  macGroup.rotation.set(0.12, -0.32, 0.04);
  masterRig.add(macGroup);

  // Precision Apple Space Gray / Silver Anodized Aluminum
  const macAluminumMat = new THREE.MeshStandardMaterial({
    color: 0xD1D5DB,
    metalness: 0.88,
    roughness: 0.22
  });

  const darkPortMat = new THREE.MeshStandardMaterial({
    color: 0x090D16,
    metalness: 0.95,
    roughness: 0.15
  });

  // Base Chassis Dimensions: 2.62 wide x 1.72 deep x 0.046 high
  const baseW = 2.62;
  const baseD = 1.72;
  const baseRadius = 0.09;

  // Extruded Unibody Base with Multi-Segment Bevel
  const baseShape = createRoundedRectShape(baseW, baseD, baseRadius);
  const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
    depth: 0.046,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.012,
    bevelThickness: 0.012
  });
  const baseMesh = new THREE.Mesh(baseGeo, macAluminumMat);
  baseMesh.rotation.x = Math.PI / 2;
  baseMesh.position.set(0, -0.023, 0);
  macGroup.add(baseMesh);

  // Front Edge Thumb Scoop Opening Indent
  const scoopGeo = new THREE.BoxGeometry(0.38, 0.018, 0.02);
  const scoopMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8, roughness: 0.3 });
  const scoopMesh = new THREE.Mesh(scoopGeo, scoopMat);
  scoopMesh.position.set(0, 0.012, 0.87);
  macGroup.add(scoopMesh);

  // Precision Side I/O Ports
  // Left Side: MagSafe 3 + 2x Thunderbolt 4 (USB-C)
  const portGeo = new THREE.BoxGeometry(0.015, 0.014, 0.045);
  const p1 = new THREE.Mesh(portGeo, darkPortMat);
  p1.position.set(-baseW / 2 - 0.008, 0, -0.45);
  macGroup.add(p1);

  const p2 = new THREE.Mesh(portGeo, darkPortMat);
  p2.position.set(-baseW / 2 - 0.008, 0, -0.32);
  macGroup.add(p2);

  const p3 = new THREE.Mesh(portGeo, darkPortMat);
  p3.position.set(-baseW / 2 - 0.008, 0, -0.19);
  macGroup.add(p3);

  // Right Side: HDMI Port + SDXC Card Slot
  const hdmiGeo = new THREE.BoxGeometry(0.015, 0.015, 0.06);
  const pRight1 = new THREE.Mesh(hdmiGeo, darkPortMat);
  pRight1.position.set(baseW / 2 + 0.008, 0, -0.42);
  macGroup.add(pRight1);

  const sdGeo = new THREE.BoxGeometry(0.015, 0.008, 0.09);
  const pRight2 = new THREE.Mesh(sdGeo, darkPortMat);
  pRight2.position.set(baseW / 2 + 0.008, 0, -0.25);
  macGroup.add(pRight2);

  // High-Resolution Keyboard Deck Surface (Keys, Speakers & Trackpad)
  const kbTexture = createMacKeyboardTexture();
  const kbSurfaceGeo = new THREE.PlaneGeometry(baseW - 0.02, baseD - 0.02);
  const kbSurfaceMat = new THREE.MeshBasicMaterial({ map: kbTexture });
  const kbSurfaceMesh = new THREE.Mesh(kbSurfaceGeo, kbSurfaceMat);
  kbSurfaceMesh.rotation.x = -Math.PI / 2;
  kbSurfaceMesh.position.set(0, 0.024, 0);
  macGroup.add(kbSurfaceMesh);

  // 4 Black Rubber Feet on Bottom Chassis
  const footGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.01, 16);
  const footMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.9 });
  [
    [-1.05, -0.032, 0.62],
    [1.05, -0.032, 0.62],
    [-1.05, -0.032, -0.62],
    [1.05, -0.032, -0.62]
  ].forEach(([fx, fy, fz]) => {
    const foot = new THREE.Mesh(footGeo, footMat);
    foot.position.set(fx, fy, fz);
    macGroup.add(foot);
  });

  // Precision Rear Hinge Cylinder
  const hingeGeo = new THREE.CylinderGeometry(0.022, 0.022, baseW - 0.35, 20);
  const hingeMesh = new THREE.Mesh(hingeGeo, macAluminumMat);
  hingeMesh.rotation.z = Math.PI / 2;
  hingeMesh.position.set(0, 0.022, -0.84);
  macGroup.add(hingeMesh);

  // Display Lid Assembly (Hinged at rear, angled upright facing camera at ~103°)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.022, -0.84);
  // Upright angle at ~103° so Liquid Retina display faces directly into camera view
  lidGroup.rotation.x = -0.22;
  macGroup.add(lidGroup);

  // Slim Aluminum Display Lid Back
  const lidW = baseW;
  const lidH = 1.66;
  const lidShape = createRoundedRectShape(lidW, lidH, baseRadius);
  const lidGeo = new THREE.ExtrudeGeometry(lidShape, {
    depth: 0.024,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.01,
    bevelThickness: 0.01
  });
  const lidMesh = new THREE.Mesh(lidGeo, macAluminumMat);
  lidMesh.position.set(0, lidH / 2, 0);
  lidGroup.add(lidMesh);

  // Reflective Silver Apple Logo on MacBook Rear Lid (Visible in 360° rotation)
  const appleLogoGeo = new THREE.CircleGeometry(0.12, 32);
  const appleLogoMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    metalness: 0.96,
    roughness: 0.1,
    emissive: 0x38BDF8,
    emissiveIntensity: 0.22
  });
  const appleLogoMesh = new THREE.Mesh(appleLogoGeo, appleLogoMat);
  appleLogoMesh.rotation.y = Math.PI; // faces backwards
  appleLogoMesh.position.set(0, lidH / 2, -0.016);
  lidGroup.add(appleLogoMesh);

  // Ultra-Thin Screen Bezel (Front Black Border)
  const bezelMat = new THREE.MeshBasicMaterial({ color: 0x050810 });
  const bezelGeo = new THREE.PlaneGeometry(lidW - 0.04, lidH - 0.04);
  const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
  bezelMesh.position.set(0, lidH / 2, 0.036);
  lidGroup.add(bezelMesh);

  // Live Screen Texture Face with Liquid Retina Camera Notch
  const macTexture = createMacScreenTexture();
  const screenFaceGeo = new THREE.PlaneGeometry(lidW - 0.09, lidH - 0.09);
  const screenFaceMat = new THREE.MeshBasicMaterial({ map: macTexture });
  const screenFaceMesh = new THREE.Mesh(screenFaceGeo, screenFaceMat);
  screenFaceMesh.position.set(0, lidH / 2, 0.038);
  screenFaceMat.side = THREE.DoubleSide;
  lidGroup.add(screenFaceMesh);

  // =========================================================================
  // 3. CONSTRUCT REALISTIC IPHONE 15 PRO (SEPARATED RIGHT & IN FRONT)
  // =========================================================================
  const phoneGroup = new THREE.Group();
  // Generous separation from laptop (Laptop right edge is at ~0.7, phone center is at 1.42):
  phoneGroup.position.set(0.56, 0.04, 0.46);
  phoneGroup.scale.set(0.88, 0.88, 0.88);
  // Slightly tilted toward camera
  phoneGroup.rotation.set(0.06, -0.26, 0.03);
  masterRig.add(phoneGroup);

  // Polished Sapphire Titanium Frame
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    metalness: 0.88,
    roughness: 0.25
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
    emissive: 0x0EA5E9,
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
  phoneScreenMesh.position.set(0, 0, 0.082);
  phoneScreenMat.side = THREE.DoubleSide;
  phoneGroup.add(phoneScreenMesh);


  // =========================================================================
  // 3.5. MOHAMMAD HASAN 3D EXECUTIVE AVATAR & NEON BADGES (LINKEDIN BANNER)
  // =========================================================================
  const avatarGroup = new THREE.Group();
  avatarGroup.position.set(-0.88, 0.08, -0.05);
  masterRig.add(avatarGroup);

  // Soft Radiant Sky-Blue Rim Glow Disc (Directly behind avatar head/shoulders)
  const glowCanvas = document.createElement('canvas');
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  const glowCtx = glowCanvas.getContext('2d');
  const radGrad = glowCtx.createRadialGradient(128, 128, 15, 128, 128, 128);
  radGrad.addColorStop(0, 'rgba(14, 165, 233, 0.85)');
  radGrad.addColorStop(0.35, 'rgba(2, 132, 199, 0.5)');
  radGrad.addColorStop(0.7, 'rgba(2, 132, 199, 0.15)');
  radGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
  glowCtx.fillStyle = radGrad;
  glowCtx.fillRect(0, 0, 256, 256);

  const glowTex = new THREE.CanvasTexture(glowCanvas);
  glowTex.generateMipmaps = false;
  glowTex.minFilter = THREE.LinearFilter;
  const glowGeo = new THREE.PlaneGeometry(3.6, 3.6);
  const glowMat = new THREE.MeshBasicMaterial({
    map: glowTex,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  glowMesh.position.set(0, 0.35, -0.18);
  avatarGroup.add(glowMesh);

  // Dedicated Sky-Blue Back Rim Point Light
  const avatarBackLight = new THREE.PointLight(0x0EA5E9, 3.4, 10);
  avatarBackLight.position.set(0, 0.45, -0.28);
  avatarGroup.add(avatarBackLight);

  // 3D Avatar Plane (Aspect ratio 3:4 from 768x1024)
  const avatarGeo = new THREE.PlaneGeometry(2.35, 3.14);
  const avatarMat = new THREE.MeshBasicMaterial({
    transparent: true,
    alphaTest: 0.02,
    side: THREE.FrontSide
  });
  const avatarMesh = new THREE.Mesh(avatarGeo, avatarMat);
  avatarMesh.position.set(0, 0, 0);
  avatarGroup.add(avatarMesh);

  // Load avatar texture (WebP format for minimal asset payload)
  const texLoader = new THREE.TextureLoader();
  function applyAvatarTexture(tex) {
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    avatarMat.map = tex;
    avatarMat.needsUpdate = true;
  }
  texLoader.load('assets/images/hasan-3d-avatar.webp', applyAvatarTexture);

  // FLOATING NEON TECH BADGES (Matching LinkedIn Banner Composition)
  const badgesGroup = new THREE.Group();
  masterRig.add(badgesGroup);

  const badgeReact = new THREE.Mesh(
    new THREE.PlaneGeometry(0.92, 0.25),
    new THREE.MeshBasicMaterial({
      map: createNeonBadgeTexture('React', '#38BDF8', 'rgba(56, 189, 248, 0.85)'),
      transparent: true,
      depthWrite: false
    })
  );
  badgeReact.position.set(0.78, 1.34, 0.28);
  badgesGroup.add(badgeReact);

  const badgeNext = new THREE.Mesh(
    new THREE.PlaneGeometry(0.92, 0.25),
    new THREE.MeshBasicMaterial({
      map: createNeonBadgeTexture('Next.js', '#C084FC', 'rgba(192, 132, 252, 0.85)'),
      transparent: true,
      depthWrite: false
    })
  );
  badgeNext.position.set(1.78, 1.08, 0.05);
  badgesGroup.add(badgeNext);

  const badgeFlutter = new THREE.Mesh(
    new THREE.PlaneGeometry(0.92, 0.25),
    new THREE.MeshBasicMaterial({
      map: createNeonBadgeTexture('Flutter', '#0284C7', 'rgba(2, 132, 199, 0.85)'),
      transparent: true,
      depthWrite: false
    })
  );
  badgeFlutter.position.set(1.68, 0.44, 0.48);
  badgesGroup.add(badgeFlutter);

  const badgeTS = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.25),
    new THREE.MeshBasicMaterial({
      map: createNeonBadgeTexture('TypeScript', '#38BDF8', 'rgba(56, 189, 248, 0.85)'),
      transparent: true,
      depthWrite: false
    })
  );
  badgeTS.position.set(0.14, -0.95, 0.52);
  badgesGroup.add(badgeTS);

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
  const sapphireRim = new THREE.PointLight(0x0EA5E9, 3.2, 12);
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

  const backSapphireRim = new THREE.PointLight(0x0EA5E9, 2.8, 12);
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

  // Base rotation angles (Perfect three-quarter perspective facing viewer)
  const BASE_ROT_Y = -0.22;
  const BASE_ROT_X = 0.14;
  let targetRotY = BASE_ROT_Y;
  let targetRotX = BASE_ROT_X;
  let currentRotY = BASE_ROT_Y;
  let currentRotX = BASE_ROT_X;

  const dragHint = document.getElementById('drag-360-hint');
  const canvasElement = renderer.domElement;
  canvasElement.style.touchAction = 'pan-y'; // Allows natural page scroll on mobile while supporting horizontal 360 drag

  // Pointer Down (Mouse Click or Touch Hold)
  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    isDragging = true;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
    velocityX = 0;
    velocityY = 0;

    container.style.cursor = 'grabbing';
    document.body.style.cursor = 'grabbing';
    document.body.classList.add('select-none');

    // Only capture pointer for mouse to avoid capturing touch scrolling
    if (e.pointerType !== 'touch') {
      try {
        canvasElement.setPointerCapture(e.pointerId);
      } catch (err) {}
    }

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
    
    // On touch devices, allow pitch adjustment when horizontal drag is dominant
    if (e.pointerType !== 'touch' || Math.abs(deltaX) > Math.abs(deltaY)) {
      targetRotX += deltaY * rotSpeed;
    }

    // Track instant velocity for smooth flick momentum/inertia
    velocityX = deltaX * rotSpeed;
    velocityY = (e.pointerType !== 'touch') ? (deltaY * rotSpeed) : 0;

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

  // High performance render flag with IntersectionObserver
  let isSceneVisible = true;
  if ('IntersectionObserver' in window && container) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isSceneVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    heroObserver.observe(container);
  }

  // Handle window blur/focus to prevent stuck drag states
  window.addEventListener('blur', () => {
    isDragging = false;
    container.style.cursor = 'grab';
    document.body.style.cursor = '';
    document.body.classList.remove('select-none');
  });

  // Accessibility & Battery: Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // WebGL Context Loss & Restoration Handling (Prevents crashes on mobile tab suspension)
  let isContextLost = false;
  canvasElement.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    isContextLost = true;
    console.warn('[ThreeScene] WebGL context lost. Rendering paused.');
  }, false);

  canvasElement.addEventListener('webglcontextrestored', () => {
    isContextLost = false;
    console.info('[ThreeScene] WebGL context restored.');
    handleResize();
  }, false);

  // Cross-Device High-Refresh Render Loop (Delta Normalized for 60Hz / 90Hz / 120Hz Displays)
  const clock = new THREE.Clock();
  let wasHidden = false;

  function animate() {
    requestAnimationFrame(animate);
    if (!isSceneVisible || isContextLost) { wasHidden = true; return; } // Pause GPU cycles when scrolled away or context lost!
    if (wasHidden) { clock.getDelta(); wasHidden = false; return; } // Discard accumulated delta on first visible frame

    const delta = typeof clock.getDelta === 'function' ? Math.min(clock.getDelta(), 0.05) : 0.016;
    const elapsed = clock.getElapsedTime();
    const timeScale = delta / 0.0166; // Normalized to 60 FPS baseline
    const isMotionReduced = prefersReducedMotion.matches;

    if (!isDragging) {
      // Apply flick inertia / momentum scaled to delta time
      targetRotY += velocityX * timeScale;
      targetRotX += velocityY * timeScale;

      // Frame-rate independent friction damping
      const friction = Math.pow(0.935, timeScale);
      velocityX *= friction;
      velocityY *= friction;

      // Gentle floating sway facing forward when idle (damped if reduced motion requested)
      if (Math.abs(velocityX) < 0.0001 && Math.abs(velocityY) < 0.0001) {
        const idleSway = isMotionReduced ? 0 : Math.sin(elapsed * 0.55) * 0.06;
        const returnSpeed = 1.0 - Math.pow(0.975, timeScale);
        targetRotY += (BASE_ROT_Y + idleSway - targetRotY) * returnSpeed;
        targetRotX += (BASE_ROT_X - targetRotX) * returnSpeed;
      }
    }

    // Keep pitch within comfortable viewing bounds
    targetRotX = Math.max(-Math.PI * 0.44, Math.min(Math.PI * 0.44, targetRotX));

    // Smooth exponential lerp normalized across 60Hz, 120Hz ProMotion, and 144Hz displays
    const lerpFactor = 1.0 - Math.pow(0.08, delta);
    currentRotY += (targetRotY + (!isDragging ? passiveX : 0) - currentRotY) * lerpFactor;
    currentRotX += (targetRotX + (!isDragging ? -passiveY : 0) - currentRotX) * lerpFactor;

    masterRig.rotation.y = currentRotY;
    masterRig.rotation.x = currentRotX;

    // Gentle Independent Floating Levitation (scale motion down if reduced motion requested)
    const motionScale = isMotionReduced ? 0.15 : 1.0;
    macGroup.position.y = -0.18 + Math.sin(elapsed * 1.0) * 0.045 * motionScale;
    macGroup.rotation.z = Math.sin(elapsed * 0.7) * 0.01 * motionScale;

    phoneGroup.position.y = 0.04 + Math.sin(elapsed * 1.0 + 1.4) * 0.055 * motionScale;
    phoneGroup.rotation.z = 0.04 + Math.cos(elapsed * 0.8) * 0.015 * motionScale;

    // Mohammad Hasan 3D Avatar Dynamic Gaze & Damped Parallax (Keeps portrait facing forward)
    avatarGroup.position.y = 0.08 + Math.sin(elapsed * 0.85) * 0.03 * motionScale;
    avatarGroup.rotation.y = -masterRig.rotation.y * 0.72;
    avatarGroup.rotation.x = -masterRig.rotation.x * 0.45;

    // Floating Neon Badges Levitation
    badgeReact.position.y = 1.34 + Math.sin(elapsed * 1.2) * 0.035 * motionScale;
    badgeNext.position.y = 1.08 + Math.sin(elapsed * 1.1 + 1.0) * 0.04 * motionScale;
    badgeFlutter.position.y = 0.44 + Math.sin(elapsed * 1.3 + 2.0) * 0.035 * motionScale;
    badgeTS.position.y = -0.95 + Math.sin(elapsed * 1.0 + 3.0) * 0.03 * motionScale;

    renderer.render(scene, camera);
  }
  animate();

  // Resize Handler with Debouncing
  let resizeTimer;
  function handleResize() {
    if (!container) return;
    updateCameraDistance();
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 450;
    const mobile = window.innerWidth < 768;
    renderer.setPixelRatio(mobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
  }

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 100);
  });

  // Ensure size is calibrated after initial reflow and window load
  window.addEventListener('load', handleResize);
  setTimeout(handleResize, 200);
  setTimeout(handleResize, 600);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeHeroScene);
} else {
  initThreeHeroScene();
}
