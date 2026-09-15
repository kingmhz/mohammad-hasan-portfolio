// Main Application Interactions: 3D Tilt, Project Filtering, Modals & Direct Video Call Scheduler
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
    
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

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
        b.classList.remove('bg-[#0A66C2]', 'text-white', 'border-[#0A66C2]', 'shadow-sm'); b.classList.add('text-slate-600', 'border-transparent');
      });
      btn.classList.add('bg-[#0A66C2]', 'text-white', 'border-[#0A66C2]', 'shadow-sm'); btn.classList.remove('text-slate-600', 'border-transparent');

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

  // 5. Direct Video Call Scheduler (Google Meet / Zoom)
  const slotPills = document.querySelectorAll('.slot-pill');
  const platformToggles = document.querySelectorAll('.platform-toggle');
  const heroBtnSlotLabel = document.getElementById('hero-btn-slot-label');
  const heroBookBtn = document.getElementById('hero-book-meeting-btn');
  const meetingModal = document.getElementById('meeting-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalSlotDisplay = document.getElementById('modal-slot-display');
  const modalHiddenSlot = document.getElementById('modal-hidden-slot');
  const modalHiddenPlatform = document.getElementById('modal-hidden-platform');
  const modalChangeSlot = document.getElementById('modal-change-slot');

  let selectedSlot = 'Thu, Sep 17 · 2:00 PM EST';
  let selectedPlatform = 'Google Meet';

  // Compute realistic upcoming business day slots
  function generateUpcomingSlots() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const times = ['2:00 PM EST', '10:30 AM EST', '4:00 PM EST'];
    
    let current = new Date();
    let slotData = [];
    let added = 0;
    
    for (let i = 1; i <= 10 && added < 3; i++) {
      let d = new Date();
      d.setDate(current.getDate() + i);
      let dayOfWeek = d.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
        let formatted = `${days[dayOfWeek]}, ${months[d.getMonth()]} ${d.getDate()} · ${times[added]}`;
        slotData.push({
          day: `${days[dayOfWeek]}, ${months[d.getMonth()]} ${d.getDate()}`,
          time: times[added],
          full: formatted
        });
        added++;
      }
    }
    return slotData;
  }

  const liveSlots = generateUpcomingSlots();
  if (slotPills && slotPills.length >= 3 && liveSlots.length >= 3) {
    slotPills.forEach((pill, idx) => {
      const s = liveSlots[idx];
      pill.setAttribute('data-slot', s.full);
      pill.innerHTML = `
        <div class="flex items-center justify-between w-full">
          <span class="text-[10px] uppercase font-mono-luxury ${idx === 0 ? 'text-[#0A66C2] font-bold' : 'text-slate-500 font-semibold'}">${s.day}</span>
          ${idx === 0 ? '<span class="w-1.5 h-1.5 rounded-full bg-[#0A66C2] inline-block"></span>' : ''}
        </div>
        <span class="${idx === 0 ? 'text-slate-950 font-bold' : 'text-slate-700 font-medium'} text-xs sm:text-sm font-sans tracking-tight mt-1">${s.time}</span>
      `;
    });
    selectedSlot = liveSlots[0].full;
    updateHeroBtnLabel();
  }

  function updateHeroBtnLabel() {
    if (heroBtnSlotLabel) {
      heroBtnSlotLabel.textContent = `${selectedSlot} (${selectedPlatform})`;
    }
    if (modalSlotDisplay) {
      modalSlotDisplay.textContent = `${selectedSlot} · ${selectedPlatform}`;
    }
    if (modalHiddenSlot) modalHiddenSlot.value = selectedSlot;
    if (modalHiddenPlatform) modalHiddenPlatform.value = selectedPlatform;
  }

  // Handle Platform Toggle (Google Meet vs Zoom)
  platformToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      platformToggles.forEach(t => {
        t.classList.remove('active', 'bg-white', 'text-slate-950', 'shadow-xs', 'border-slate-200/80', 'font-semibold');
        t.classList.add('text-slate-500', 'font-medium');
      });
      toggle.classList.add('active', 'bg-white', 'text-slate-950', 'shadow-xs', 'border-slate-200/80', 'font-semibold');
      toggle.classList.remove('text-slate-500', 'font-medium');
      selectedPlatform = toggle.getAttribute('data-platform') || 'Google Meet';
      updateHeroBtnLabel();
    });
  });

  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => {
        p.classList.remove('active');
        const daySpan = p.querySelector('span:first-child');
        const timeSpan = p.querySelector('span:last-child');
        const dotSpan = p.querySelector('.rounded-full');
        if (daySpan) {
          daySpan.classList.remove('text-[#0A66C2]', 'font-bold');
          daySpan.classList.add('text-slate-500', 'font-semibold');
        }
        if (timeSpan) {
          timeSpan.classList.remove('text-slate-950', 'font-bold');
          timeSpan.classList.add('text-slate-700', 'font-medium');
        }
        if (dotSpan) dotSpan.remove();
      });

      pill.classList.add('active');
      const topDiv = pill.querySelector('div:first-child');
      const activeDay = pill.querySelector('span:first-child');
      const activeTime = pill.querySelector('span:last-child');
      if (activeDay) {
        activeDay.classList.add('text-[#0A66C2]', 'font-bold');
        activeDay.classList.remove('text-slate-500');
      }
      if (topDiv && !topDiv.querySelector('.rounded-full')) {
        const dot = document.createElement('span');
        dot.className = 'w-1.5 h-1.5 rounded-full bg-[#0A66C2] inline-block';
        topDiv.appendChild(dot);
      }
      if (activeTime) {
        activeTime.classList.add('text-slate-950', 'font-bold');
        activeTime.classList.remove('text-slate-700');
      }

      selectedSlot = pill.getAttribute('data-slot');
      updateHeroBtnLabel();
      openModal();
    });
  });

  function openModal() {
    if (meetingModal) {
      meetingModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function closeModal() {
    if (meetingModal) {
      meetingModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', openModal);
  }

  const headerBookBtn = document.getElementById('header-book-call-btn');
  if (headerBookBtn) {
    headerBookBtn.addEventListener('click', openModal);
  }

  const mobileBookBtn = document.getElementById('mobile-book-call-btn');
  if (mobileBookBtn) {
    mobileBookBtn.addEventListener('click', () => {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) mobileMenu.classList.add('hidden');
      openModal();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalChangeSlot) {
    modalChangeSlot.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      const slotContainer = document.getElementById('hero-slot-list');
      if (slotContainer) {
        slotContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (meetingModal) {
    meetingModal.addEventListener('click', (e) => {
      if (e.target === meetingModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && meetingModal && !meetingModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 6. Direct Video Call Form Submission
  const meetingForm = document.getElementById('meeting-form');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalBtnText = document.getElementById('modal-btn-text');
  const modalFeedback = document.getElementById('modal-feedback');

  if (meetingForm) {
    meetingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (modalFeedback) {
        modalFeedback.className = 'hidden text-xs p-3 rounded-xl transition-all';
        modalFeedback.innerHTML = '';
      }

      const formData = new FormData(meetingForm);
      const payload = {
        name: formData.get('name') ? formData.get('name').trim() : '',
        email: formData.get('email') ? formData.get('email').trim() : '',
        projectType: formData.get('projectType') || '15-Min Technical Discovery',
        meetingSlot: formData.get('meetingSlot') || selectedSlot,
        platform: formData.get('platform') || selectedPlatform,
        _gotcha: formData.get('_gotcha')
      };

      if (!payload.name || payload.name.length < 2) {
        showModalFeedback('Please enter your name or company.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!payload.email || !emailRegex.test(payload.email)) {
        showModalFeedback('Please enter a valid work or personal email address.', 'error');
        return;
      }

      if (modalSubmitBtn) {
        modalSubmitBtn.disabled = true;
        modalSubmitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      }
      if (modalBtnText) modalBtnText.textContent = 'Locking In Video Call Slot...';

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
          const meetUrl = result.data?.meetingLink || 'https://meet.google.com/new';
          const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Video Consultation: Mohammad Hasan & ' + payload.name)}&details=${encodeURIComponent(`15-Min Video Consultation with Mohammad Hasan (Lead Consultant).\\nAgenda: ${payload.projectType}\\nJoin Video Call: ${meetUrl}`)}&location=${encodeURIComponent(meetUrl)}`;

          meetingForm.innerHTML = `
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xl animate-fade-in">
              <div class="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <i data-lucide="video" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono-luxury uppercase tracking-widest text-[#0A66C2] font-semibold">Video Call Scheduled · ${result.data ? result.data.reference : 'MH-EXEC'}</div>
                <h3 class="text-xl sm:text-2xl font-luxury font-bold text-slate-950">Private Video Room Ready</h3>
              </div>
              
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5 text-left">
                <div class="flex items-center justify-between text-slate-500 text-[10px]">
                  <span>DATE & TIME</span>
                  <span class="text-emerald-600 font-semibold">CONFIRMED</span>
                </div>
                <div class="text-slate-950 font-bold text-xs">🗓️ ${escapeHtml(payload.meetingSlot)}</div>
                <div class="text-slate-700 text-[11px] pt-1">Platform: <strong class="text-[#0A66C2]">${escapeHtml(payload.platform)}</strong></div>
                <div class="text-slate-500 text-[10px] truncate pt-0.5">Link: <a href="${meetUrl}" target="_blank" class="text-[#0A66C2] hover:underline">${meetUrl}</a></div>
              </div>

              <p class="text-xs text-slate-600 font-light max-w-sm mx-auto leading-relaxed">
                A calendar invite with your video room link has been dispatched to <strong class="text-slate-900">${escapeHtml(payload.email)}</strong>. Mohammad Hasan has received your direct alert.
              </p>

              <!-- Actions -->
              <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a href="${meetUrl}" target="_blank" rel="noopener noreferrer" class="btn-catchy-blue w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 text-white">
                  <i data-lucide="video" class="w-3.5 h-3.5 text-white"></i>
                  <span>Test Video Link</span>
                </a>
                <a href="${gCalUrl}" target="_blank" rel="noopener noreferrer" class="btn-silver w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 text-slate-800">
                  <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i>
                  <span>Add to Google Cal</span>
                </a>
              </div>

              <div class="pt-1">
                <button type="button" onclick="document.getElementById('meeting-modal').classList.add('hidden'); document.body.style.overflow='';" class="text-slate-500 hover:text-slate-900 text-xs font-mono uppercase tracking-wider">
                  Dismiss Window
                </button>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
        } else {
          showModalFeedback(result.error || 'Unable to schedule video call. Please retry or email hasanisbest786@gmail.com.', 'error');
          resetModalSubmitBtn();
        }
      } catch (err) {
        console.error('Booking error:', err);
        showModalFeedback('Connection error. Please email hasanisbest786@gmail.com directly.', 'error');
        resetModalSubmitBtn();
      }
    });
  }

  function showModalFeedback(msg, type) {
    if (!modalFeedback) return;
    modalFeedback.classList.remove('hidden');
    modalFeedback.className = 'text-xs p-3 rounded-xl border border-red-500/40 bg-red-950/30 text-red-300 flex items-center gap-2';
    modalFeedback.innerHTML = `<i data-lucide="alert-circle" class="w-4 h-4 text-red-400 shrink-0"></i><span>${escapeHtml(msg)}</span>`;
    if (window.lucide) window.lucide.createIcons();
  }

  function resetModalSubmitBtn() {
    if (modalSubmitBtn) {
      modalSubmitBtn.disabled = false;
      modalSubmitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
    if (modalBtnText) modalBtnText.textContent = 'Confirm Video Call Slot';
  }

  // 7. Interactive Luxury Brief Form Submission (Footer Section)
  const briefForm = document.getElementById('brief-form');
  const briefSubmitBtn = document.getElementById('brief-submit-btn');
  const btnText = document.getElementById('btn-text');
  const formFeedback = document.getElementById('form-feedback');

  if (briefForm) {
    briefForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (formFeedback) {
        formFeedback.className = 'hidden text-xs p-3.5 rounded-xl transition-all';
        formFeedback.innerHTML = '';
      }

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

      if (briefSubmitBtn) {
        briefSubmitBtn.disabled = true;
        briefSubmitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      }
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
            <div class="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xl">
              <div class="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-[#0A66C2] mx-auto flex items-center justify-center">
                <i data-lucide="check" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono-luxury uppercase tracking-widest text-[#0A66C2] font-semibold">Brief Confirmed · Reference ${result.data ? result.data.reference : 'MH-EXEC'}</div>
                <h3 class="text-xl sm:text-2xl font-luxury font-bold text-slate-950">Transmission Successful</h3>
              </div>
              <p class="text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong class="text-slate-900">${escapeHtml(payload.name)}</strong>. Your technical brief has been encrypted and routed directly to Mohammad Hasan. Expect an architectural reply within 24 hours.
              </p>
              <div class="pt-2">
                <button type="button" onclick="window.location.reload()" class="btn-silver px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold text-slate-800">
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
    if (!formFeedback) return;
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

  // 8. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
