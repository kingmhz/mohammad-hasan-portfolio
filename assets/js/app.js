// Main Application Interactions: 3D Tilt, Project Filtering, Modals & Copy Actions
// Optimized for Mobile Touch, Tablet, and Desktop PC

document.addEventListener('DOMContentLoaded', () => {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);

  // 1. Interactive 3D Card Tilt Effect (Active on Desktop PC with Mouse)
  const tiltCards = document.querySelectorAll('.tilt-card');

  if (!isTouchDevice) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const maxTilt = 7;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.08s ease';
      });
    });
  }

  // 2. Mobile Menu Toggle with Smooth Dismiss
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking any nav link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Close mobile menu when tapping anywhere outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // 3. Reliable Copy Email with Cross-Device Fallback
  const copyBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback');

  function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((resolve, reject) => {
        document.execCommand('copy') ? resolve() : reject();
        textArea.remove();
      });
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'hasanisbest786@gmail.com';
      copyTextToClipboard(email).then(() => {
        if (copyFeedback) {
          copyFeedback.classList.remove('opacity-0');
          setTimeout(() => {
            copyFeedback.classList.add('opacity-0');
          }, 2000);
        }
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  }

  // 4. Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-gold-500/15', 'text-gold-400', 'border-gold-500/30');
        b.classList.add('text-silver-400', 'border-transparent');
      });
      btn.classList.add('bg-gold-500/15', 'text-gold-400', 'border-gold-500/30');
      btn.classList.remove('text-silver-400', 'border-transparent');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 5. Interactive Luxury Brief Form Submission
  const briefForm = document.getElementById('brief-form');
  const briefSubmitBtn = document.getElementById('brief-submit-btn');
  const btnText = document.getElementById('btn-text');
  const formFeedback = document.getElementById('form-feedback');

  if (briefForm) {
    briefForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      formFeedback.className = 'hidden text-xs p-3.5 rounded-xl transition-all';
      formFeedback.innerHTML = '';

      const formData = new FormData(briefForm);
      const payload = {
        name: formData.get('name') ? formData.get('name').trim() : '',
        email: formData.get('email') ? formData.get('email').trim() : '',
        projectType: formData.get('projectType'),
        budget: formData.get('budget'),
        message: formData.get('message') ? formData.get('message').trim() : '',
        _gotcha: formData.get('_gotcha')
      };

      if (!payload.name || payload.name.length < 2) {
        showFeedback('Please provide your name or organization (minimum 2 characters).', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!payload.email || !emailRegex.test(payload.email)) {
        showFeedback('Please enter a valid work or personal email address.', 'error');
        return;
      }

      if (!payload.message || payload.message.length < 10) {
        showFeedback('Please outline key goals or specifications for your project (minimum 10 characters).', 'error');
        return;
      }

      briefSubmitBtn.disabled = true;
      briefSubmitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      if (btnText) btnText.textContent = 'Transmitting Specifications...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          briefForm.innerHTML = `
            <div class="p-6 sm:p-8 rounded-2xl bg-[#090B0F]/90 border border-gold-500/40 text-center space-y-4 shadow-2xl">
              <div class="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center">
                <i data-lucide="check" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono-luxury uppercase tracking-widest text-gold-400">Brief Confirmed · Reference ${result.data ? result.data.reference : 'MH-EXEC'}</div>
                <h3 class="text-xl sm:text-2xl font-luxury font-bold text-white">Transmission Successful</h3>
              </div>
              <p class="text-xs sm:text-sm text-silver-300 font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong class="text-white">${escapeHtml(payload.name)}</strong>. Your technical brief has been encrypted and routed directly to Mohammad Hasan. Expect an architectural reply within 24 hours.
              </p>
              <div class="pt-2">
                <button type="button" onclick="window.location.reload()" class="btn-silver px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold">
                  Transmit Another Brief
                </button>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
        } else {
          showFeedback(result.error || 'Unable to transmit your brief. Please retry or contact directly via hasanisbest786@gmail.com.', 'error');
          resetSubmitBtn();
        }
      } catch (err) {
        console.error('Submission error:', err);
        showFeedback('Network issue encountered. Please verify your connection or email hasanisbest786@gmail.com directly.', 'error');
        resetSubmitBtn();
      }
    });
  }

  function showFeedback(msg, type) {
    formFeedback.classList.remove('hidden');
    if (type === 'error') {
      formFeedback.className = 'text-xs p-3.5 rounded-xl border border-red-500/40 bg-red-950/30 text-red-300 flex items-center gap-2';
      formFeedback.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 text-red-400 shrink-0"></i><span>${escapeHtml(msg)}</span>`;
    } else {
      formFeedback.className = 'text-xs p-3.5 rounded-xl border border-gold-500/40 bg-gold-950/20 text-gold-300 flex items-center gap-2';
      formFeedback.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-gold-400 shrink-0"></i><span>${escapeHtml(msg)}</span>`;
    }
    if (window.lucide) window.lucide.createIcons();
  }

  function resetSubmitBtn() {
    if (briefSubmitBtn) {
      briefSubmitBtn.disabled = false;
      briefSubmitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
    if (btnText) btnText.textContent = 'Transmit Project Brief';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // 6. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
