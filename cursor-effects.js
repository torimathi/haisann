/* ============================================================
   CURSOR EFFECTS — Đặc Sản Đà Nẵng
   - Custom cursor (dot + ring)
   - Sparkle particle trail
   - Click burst animation
   ============================================================ */

(function () {
    'use strict';

    /* ---------- 1. Tạo DOM cho custom cursor ---------- */
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorRing.id = 'cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    /* ---------- 2. Inject CSS ---------- */
    const style = document.createElement('style');
    style.textContent = `
    * { cursor: none !important; }

    #cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 8px; height: 8px;
      background: #c7252e;
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transform: translate(-50%, -50%);
      transition: transform 0.08s ease, background 0.2s;
      will-change: transform;
    }

    #cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 36px; height: 36px;
      border: 2px solid rgba(199,37,46,0.55);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999998;
      transform: translate(-50%, -50%);
      transition: width 0.25s, height 0.25s, border-color 0.25s, transform 0.12s ease;
      will-change: transform;
    }

    /* Hover trên phần tử clickable → ring phình to */
    body.cursor-hover #cursor-ring {
      width: 56px;
      height: 56px;
      border-color: rgba(199,37,46,0.35);
      background: rgba(199,37,46,0.06);
    }
    body.cursor-hover #cursor-dot {
      transform: translate(-50%, -50%) scale(0.5);
      background: #e84c55;
    }

    /* Click → dot nhấp nháy */
    body.cursor-click #cursor-dot {
      transform: translate(-50%, -50%) scale(2);
      background: #ff8c00;
    }

    /* ---------- Sparkle particles ---------- */
    .cursor-sparkle {
      position: fixed;
      pointer-events: none;
      z-index: 999997;
      border-radius: 50%;
      animation: sparkle-fade 0.7s ease-out forwards;
      will-change: transform, opacity;
    }

    @keyframes sparkle-fade {
      0%   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
      100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
    }

    /* ---------- Click burst ---------- */
    .cursor-burst {
      position: fixed;
      pointer-events: none;
      z-index: 999997;
      border-radius: 50%;
      animation: burst-out 0.5s ease-out forwards;
      will-change: transform, opacity;
    }

    @keyframes burst-out {
      0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
      60%  { opacity: 0.6; }
      100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
    }
  `;
    document.head.appendChild(style);

    /* ---------- 3. Theo dõi vị trí chuột ---------- */
    let mouseX = -200, mouseY = -200;
    let ringX = -200, ringY = -200;
    let rafId = null;

    // Smooth ring follow
    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        spawnSparkle(e.clientX, e.clientY);
    });

    /* ---------- 4. Hover state ---------- */
    const hoverSelectors = 'a, button, [onclick], .product-card, input, select, textarea, label';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            document.body.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            document.body.classList.remove('cursor-hover');
        }
    });

    /* ---------- 5. Click burst ---------- */
    document.addEventListener('mousedown', (e) => {
        document.body.classList.add('cursor-click');
        spawnBurst(e.clientX, e.clientY);
    });
    document.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-click');
    });

    /* ---------- 6. Sparkle trail ---------- */
    const SPARKLE_COLORS = [
        '#c7252e', '#ff6b6b', '#ffd60a', '#ff9f43',
        '#ff8c00', '#e84c55', '#fff3cd', '#ffbe76'
    ];

    let lastSparkleTime = 0;
    const SPARKLE_INTERVAL = 40; // ms giữa các hạt

    function spawnSparkle(x, y) {
        const now = Date.now();
        if (now - lastSparkleTime < SPARKLE_INTERVAL) return;
        lastSparkleTime = now;

        const el = document.createElement('div');
        el.classList.add('cursor-sparkle');

        const size = rand(4, 10);
        const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const tx = rand(-30, 30);
        const ty = rand(-30, 30);

        el.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      --tx: ${tx}px;
      --ty: ${ty}px;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove(), { once: true });
    }

    /* ---------- 7. Click burst rings ---------- */
    const BURST_COLORS = ['#c7252e', '#ff9f43', '#ffd60a', '#ff6b6b'];

    function spawnBurst(x, y) {
        for (let i = 0; i < 4; i++) {
            const el = document.createElement('div');
            el.classList.add('cursor-burst');

            const size = rand(14, 28);
            const color = BURST_COLORS[i % BURST_COLORS.length];
            const delay = i * 55;

            el.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        border: 2px solid ${color};
        background: transparent;
        animation-delay: ${delay}ms;
      `;

            document.body.appendChild(el);
            el.addEventListener('animationend', () => el.remove(), { once: true });
        }

        // Mini sparkle burst khi click
        for (let i = 0; i < 8; i++) {
            const el = document.createElement('div');
            el.classList.add('cursor-sparkle');

            const size = rand(3, 7);
            const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
            const angle = (360 / 8) * i;
            const dist = rand(25, 55);
            const tx = Math.cos((angle * Math.PI) / 180) * dist;
            const ty = Math.sin((angle * Math.PI) / 180) * dist;

            el.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        --tx: ${tx}px;
        --ty: ${ty}px;
        box-shadow: 0 0 8px ${color};
        animation-duration: 0.5s;
      `;

            document.body.appendChild(el);
            el.addEventListener('animationend', () => el.remove(), { once: true });
        }
    }

    /* ---------- Helper ---------- */
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    /* ---------- 8. Cursor rời window ---------- */
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
    });

})();
