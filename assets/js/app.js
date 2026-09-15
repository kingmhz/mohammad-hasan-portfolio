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
        b.classList.remove('bg-[#0284C7]', 'text-white', 'border-[#0284C7]', 'shadow-sm'); b.classList.add('text-slate-600', 'border-transparent');
      });
      btn.classList.add('bg-[#0284C7]', 'text-white', 'border-[#0284C7]', 'shadow-sm'); btn.classList.remove('text-slate-600', 'border-transparent');

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

  // 5. Direct Video Call Scheduler & Interactive Date/Time Modal
  // Clients can pick ANY date and ANY time from 12:00 PM (Midday) to 12:00 AM (Midnight) Day/Night
  const heroPickDateTrigger = document.getElementById('hero-pick-date-trigger');
  const heroPickTimeTrigger = document.getElementById('hero-pick-time-trigger');
  const heroDateDisplay = document.getElementById('hero-selected-date-display');
  const heroTimeDisplay = document.getElementById('hero-selected-time-display');
  const heroBtnSlotLabel = document.getElementById('hero-btn-slot-label');
  const heroBookBtn = document.getElementById('hero-book-meeting-btn');
  const platformToggles = document.querySelectorAll('.platform-toggle');

  const meetingModal = document.getElementById('meeting-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalDateStrip = document.getElementById('modal-date-strip');
  const modalCustomDate = document.getElementById('modal-custom-date');
  const modalTimeGrid = document.getElementById('modal-time-grid');
  const timeFilterBtns = document.querySelectorAll('.time-filter-btn');
  const modalTimezoneSelect = document.getElementById('modal-timezone-select');
  const modalCustomTime = document.getElementById('modal-custom-time');
  const modalPlatformChoices = document.querySelectorAll('.modal-platform-choice');
  const modalSummarySlot = document.getElementById('modal-summary-slot');
  const modalHiddenSlot = document.getElementById('modal-hidden-slot');
  const modalHiddenPlatform = document.getElementById('modal-hidden-platform');

  // Available Time Slots: Strictly from 12:00 PM (Noon) to 12:00 AM (Midnight)
  const timeSlots = [
    // ☀️ Afternoon (12:00 PM - 5:00 PM)
    { time: '12:00 PM', period: 'afternoon' },
    { time: '12:30 PM', period: 'afternoon' },
    { time: '1:00 PM', period: 'afternoon' },
    { time: '1:30 PM', period: 'afternoon' },
    { time: '2:00 PM', period: 'afternoon' },
    { time: '2:30 PM', period: 'afternoon' },
    { time: '3:00 PM', period: 'afternoon' },
    { time: '3:30 PM', period: 'afternoon' },
    { time: '4:00 PM', period: 'afternoon' },
    { time: '4:30 PM', period: 'afternoon' },
    // 🌆 Evening (5:00 PM - 9:00 PM)
    { time: '5:00 PM', period: 'evening' },
    { time: '5:30 PM', period: 'evening' },
    { time: '6:00 PM', period: 'evening' },
    { time: '6:30 PM', period: 'evening' },
    { time: '7:00 PM', period: 'evening' },
    { time: '7:30 PM', period: 'evening' },
    { time: '8:00 PM', period: 'evening' },
    { time: '8:30 PM', period: 'evening' },
    // 🌙 Night (9:00 PM - 12:00 AM)
    { time: '9:00 PM', period: 'night' },
    { time: '9:30 PM', period: 'night' },
    { time: '10:00 PM', period: 'night' },
    { time: '10:30 PM', period: 'night' },
    { time: '11:00 PM', period: 'night' },
    { time: '11:30 PM', period: 'night' },
    { time: '12:00 AM', period: 'night' }
  ];

  // Helper to compute next 6 available business days (skipping Sundays)
  function getUpcomingDays() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const list = [];
    const now = new Date();
    let offset = now.getHours() >= 20 ? 1 : 0;
    
    for (let i = offset; list.length < 6; i++) {
      const cur = new Date();
      cur.setDate(now.getDate() + i);
      const dow = cur.getDay();
      if (dow !== 0) { // Skip Sundays
        list.push({
          dayName: days[dow],
          monthName: months[cur.getMonth()],
          dayNum: cur.getDate(),
          year: cur.getFullYear(),
          short: `${days[dow]}, ${months[cur.getMonth()]} ${cur.getDate()}`,
          full: `${days[dow]}, ${months[cur.getMonth()]} ${cur.getDate()}, ${cur.getFullYear()}`,
          iso: cur.toISOString().split('T')[0]
        });
      }
    }
    return list;
  }

  const upcomingDays = getUpcomingDays();

  // State Management
  let selectedDate = upcomingDays.length > 1 ? upcomingDays[1] : upcomingDays[0]; // Default to tomorrow/next available day
  let selectedTime = '2:00 PM';
  let selectedTimezone = 'EST';
  try {
    const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detectedTz) {
      if (detectedTz.includes('London') || detectedTz.includes('Dublin') || detectedTz.includes('UTC')) {
        selectedTimezone = 'GMT';
      } else if (detectedTz.includes('Paris') || detectedTz.includes('Berlin') || detectedTz.includes('Amsterdam') || detectedTz.includes('Rome')) {
        selectedTimezone = 'CET';
      } else if (detectedTz.includes('Dubai') || detectedTz.includes('Gulf')) {
        selectedTimezone = 'GST';
      } else if (detectedTz.includes('Karachi') || detectedTz.includes('Pakistan')) {
        selectedTimezone = 'PKT';
      } else if (detectedTz.includes('Calcutta') || detectedTz.includes('India')) {
        selectedTimezone = 'IST';
      } else if (detectedTz.includes('Singapore') || detectedTz.includes('Hong_Kong')) {
        selectedTimezone = 'SGT';
      } else if (detectedTz.includes('Pacific') || detectedTz.includes('Los_Angeles')) {
        selectedTimezone = 'PST';
      } else if (detectedTz.includes('Chicago') || detectedTz.includes('Central')) {
        selectedTimezone = 'CST';
      } else if (detectedTz.includes('New_York') || detectedTz.includes('Eastern')) {
        selectedTimezone = 'EST';
      }
      if (modalTimezoneSelect) modalTimezoneSelect.value = selectedTimezone;
    }
  } catch (e) {}
  let selectedPlatform = 'Google Meet';

  // Render Date Strip in Modal
  function renderDateStrip() {
    if (!modalDateStrip) return;
    modalDateStrip.innerHTML = '';

    upcomingDays.forEach((d) => {
      const isSelected = selectedDate.iso === d.iso;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
        isSelected 
          ? 'border-[#0284C7] bg-blue-50 text-[#0284C7] font-bold shadow-xs' 
          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
      }`;
      btn.innerHTML = `
        <div class="text-[10px] font-mono-luxury uppercase ${isSelected ? 'text-[#0284C7]' : 'text-slate-400'}">${d.dayName}</div>
        <div class="text-sm font-bold font-sans mt-0.5 ${isSelected ? 'text-slate-950' : 'text-slate-800'}">${d.dayNum}</div>
        <div class="text-[9px] font-mono uppercase ${isSelected ? 'text-[#0284C7]' : 'text-slate-400'}">${d.monthName}</div>
      `;

      btn.addEventListener('click', () => {
        selectedDate = d;
        if (modalCustomDate) modalCustomDate.value = d.iso;
        renderDateStrip();
        updateAllDisplays();
      });

      modalDateStrip.appendChild(btn);
    });

    if (modalCustomDate) {
      modalCustomDate.min = upcomingDays[0].iso;
      if (!modalCustomDate.value) modalCustomDate.value = selectedDate.iso;
    }
  }

  if (modalCustomDate) {
    modalCustomDate.addEventListener('change', (e) => {
      const val = e.target.value;
      if (!val) return;
      const parts = val.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      selectedDate = {
        dayName: days[d.getDay()],
        monthName: months[d.getMonth()],
        dayNum: d.getDate(),
        year: d.getFullYear(),
        short: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`,
        full: `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
        iso: val
      };
      renderDateStrip();
      updateAllDisplays();
    });
  }

  // Render Time Slots Grid
  let activePeriod = 'all';

  function renderTimeSlots() {
    if (!modalTimeGrid) return;
    modalTimeGrid.innerHTML = '';

    const filtered = activePeriod === 'all' 
      ? timeSlots 
      : timeSlots.filter(s => s.period === activePeriod);

    filtered.forEach(s => {
      const isSelected = selectedTime === s.time;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `py-2 px-2.5 rounded-xl text-xs font-mono transition-all text-center cursor-pointer border ${
        isSelected 
          ? 'border-[#0284C7] bg-[#0284C7] text-white font-bold shadow-sm ring-2 ring-[#0284C7]/20' 
          : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-[#0284C7]'
      }`;
      btn.textContent = s.time;

      btn.addEventListener('click', () => {
        selectedTime = s.time;
        if (modalCustomTime) modalCustomTime.value = '';
        renderTimeSlots();
        updateAllDisplays();
      });

      modalTimeGrid.appendChild(btn);
    });
  }

  // Time Period Tab Handlers
  timeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeFilterBtns.forEach(b => {
        b.classList.remove('active', 'bg-white', 'text-[#0284C7]', 'shadow-xs');
        b.classList.add('text-slate-600');
      });
      btn.classList.add('active', 'bg-white', 'text-[#0284C7]', 'shadow-xs');
      btn.classList.remove('text-slate-600');
      activePeriod = btn.getAttribute('data-period') || 'all';
      renderTimeSlots();
    });
  });

  // Timezone Dropdown Handler
  if (modalTimezoneSelect) {
    modalTimezoneSelect.addEventListener('change', (e) => {
      selectedTimezone = e.target.value;
      updateAllDisplays();
    });
  }

  // Custom Time Input Handler (Enforcing 12:00 PM to 12:00 AM)
  if (modalCustomTime) {
    modalCustomTime.addEventListener('change', (e) => {
      const val = e.target.value;
      if (!val) return;
      const [hStr, mStr] = val.split(':');
      let h = parseInt(hStr, 10);
      const m = mStr;

      // Validate not before 12:00 (midday)
      if (h < 12) {
        showModalFeedback('Please select a time between 12:00 PM (Midday) and 12:00 AM (Midnight).', 'error');
        modalCustomTime.value = '12:00';
        h = 12;
      }

      let ampm = 'PM';
      let displayH = h;
      if (h === 12) {
        ampm = 'PM';
      } else if (h === 24 || h === 0) {
        displayH = 12;
        ampm = 'AM';
      } else if (h > 12) {
        displayH = h - 12;
        ampm = 'PM';
      }

      selectedTime = `${displayH}:${m} ${ampm}`;
      renderTimeSlots();
      updateAllDisplays();
    });
  }

  // Synchronize Platform Selectors
  function setPlatform(platform) {
    selectedPlatform = platform;
    
    // Update Hero Platform Toggles
    platformToggles.forEach(t => {
      if (t.getAttribute('data-platform') === platform) {
        t.classList.add('active', 'bg-[#0284C7]', 'text-white', 'font-semibold');
        t.classList.remove('text-slate-400', 'font-medium');
      } else {
        t.classList.remove('active', 'bg-[#0284C7]', 'text-white', 'font-semibold');
        t.classList.add('text-slate-400', 'font-medium');
      }
    });

    // Update Modal Platform Choices
    modalPlatformChoices.forEach(choice => {
      const p = choice.getAttribute('data-platform');
      const dot = choice.querySelector('.rounded-full');
      if (p === platform) {
        choice.classList.add('active', 'border-[#0284C7]', 'bg-blue-50/70', 'text-slate-900');
        choice.classList.remove('border-slate-200', 'bg-slate-50', 'text-slate-700');
        if (dot) {
          dot.className = 'w-2 h-2 rounded-full bg-[#0284C7]';
        }
      } else {
        choice.classList.remove('active', 'border-[#0284C7]', 'bg-blue-50/70', 'text-slate-900');
        choice.classList.add('border-slate-200', 'bg-slate-50', 'text-slate-700');
        if (dot) {
          dot.className = 'w-2 h-2 rounded-full bg-transparent border border-slate-300';
        }
      }
    });

    updateAllDisplays();
  }

  platformToggles.forEach(t => {
    t.addEventListener('click', () => {
      setPlatform(t.getAttribute('data-platform') || 'Google Meet');
    });
  });

  modalPlatformChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      setPlatform(choice.getAttribute('data-platform') || 'Google Meet');
    });
  });

  // Centralized Display Update
  function updateAllDisplays() {
    const formattedSlot = `${selectedDate.full} · ${selectedTime} ${selectedTimezone}`;
    const shortSlot = `${selectedDate.short} · ${selectedTime} ${selectedTimezone}`;

    if (heroDateDisplay) heroDateDisplay.textContent = selectedDate.short;
    if (heroTimeDisplay) heroTimeDisplay.textContent = `${selectedTime} ${selectedTimezone}`;
    if (heroBtnSlotLabel) heroBtnSlotLabel.textContent = `${shortSlot} (${selectedPlatform})`;
    if (modalSummarySlot) modalSummarySlot.textContent = `${shortSlot} (${selectedPlatform})`;
    if (modalHiddenSlot) modalHiddenSlot.value = formattedSlot;
    if (modalHiddenPlatform) modalHiddenPlatform.value = selectedPlatform;
  }

  // Initialize Modal Dates & Time Slots
  renderDateStrip();
  renderTimeSlots();
  updateAllDisplays();

  // Modal Open & Close Functions
  function openModal(focusSection) {
    if (meetingModal) {
      meetingModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();

      if (focusSection === 'time' && modalTimeGrid) {
        setTimeout(() => {
          modalTimeGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      } else if (focusSection === 'date' && modalDateStrip) {
        setTimeout(() => {
          modalDateStrip.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    }
  }

  function closeModal() {
    if (meetingModal) {
      meetingModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (heroPickDateTrigger) {
    heroPickDateTrigger.addEventListener('click', () => openModal('date'));
  }
  if (heroPickTimeTrigger) {
    heroPickTimeTrigger.addEventListener('click', () => openModal('time'));
  }
  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', () => openModal('general'));
  }

  const headerBookBtn = document.getElementById('header-book-call-btn');
  if (headerBookBtn) {
    headerBookBtn.addEventListener('click', () => openModal('general'));
  }

  const mobileBookBtn = document.getElementById('mobile-book-call-btn');
  if (mobileBookBtn) {
    mobileBookBtn.addEventListener('click', () => openModal('general'));
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
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
      const slotString = modalHiddenSlot ? modalHiddenSlot.value : `${selectedDate.full} · ${selectedTime} ${selectedTimezone}`;
      const platformString = modalHiddenPlatform ? modalHiddenPlatform.value : selectedPlatform;

      const payload = {
        name: formData.get('name') ? formData.get('name').trim() : '',
        email: formData.get('email') ? formData.get('email').trim() : '',
        projectType: formData.get('projectType') || '15-Min Technical Consultation',
        meetingSlot: slotString,
        platform: platformString,
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
      if (modalBtnText) modalBtnText.textContent = 'Locking In Consultation Slot...';

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
          const meetUrl = result.data?.meetingLink || (payload.platform === 'Zoom' ? 'https://zoom.us/join' : 'https://meet.google.com/new');
          const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Video Consultation: Mohammad Hasan & ' + payload.name)}&details=${encodeURIComponent('15-Min Strategic Video Consultation with Mohammad Hasan (Lead Consultant).\nAgenda: ' + payload.projectType + '\nJoin Call: ' + meetUrl)}&location=${encodeURIComponent(meetUrl)}`;

          meetingForm.innerHTML = `
            <div class="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-xl animate-fade-in">
              <div class="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <i data-lucide="video" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono-luxury uppercase tracking-widest text-[#0284C7] font-semibold">Consultation Confirmed · ${result.data ? result.data.reference : 'MH-EXEC'}</div>
                <h3 class="text-xl sm:text-2xl font-luxury font-bold text-slate-950">Video Meeting Scheduled</h3>
              </div>
              
              <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-2 text-left">
                <div class="flex items-center justify-between text-slate-500 text-[10px]">
                  <span>DATE & TIME</span>
                  <span class="text-emerald-600 font-semibold uppercase">Locked In</span>
                </div>
                <div class="text-slate-950 font-bold text-sm">🗓️ ${escapeHtml(payload.meetingSlot)}</div>
                <div class="text-slate-700 text-xs pt-1">Platform: <strong class="text-[#0284C7]">${escapeHtml(payload.platform)}</strong></div>
                <div class="text-slate-500 text-[11px] truncate pt-0.5">Meeting Link: <a href="${meetUrl}" target="_blank" class="text-[#0284C7] hover:underline">${meetUrl}</a></div>
              </div>

              <p class="text-xs text-slate-600 font-light max-w-md mx-auto leading-relaxed">
                Calendar invite and room credentials have been emailed to <strong class="text-slate-900">${escapeHtml(payload.email)}</strong>. Mohammad Hasan has received direct notification.
              </p>

              <!-- Actions -->
              <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a href="${meetUrl}" target="_blank" rel="noopener noreferrer" class="btn-catchy-blue w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 text-white">
                  <i data-lucide="video" class="w-3.5 h-3.5 text-white"></i>
                  <span>Test Video Room</span>
                </a>
                <a href="${gCalUrl}" target="_blank" rel="noopener noreferrer" class="btn-silver w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 text-slate-800">
                  <i data-lucide="calendar-plus" class="w-3.5 h-3.5 text-[#0284C7]"></i>
                  <span>Add to Google Cal</span>
                </a>
              </div>

              <div class="pt-2">
                <button type="button" onclick="document.getElementById('meeting-modal').classList.add('hidden'); document.body.style.overflow='';" class="text-slate-500 hover:text-slate-900 text-xs font-mono uppercase tracking-wider cursor-pointer">
                  Close Window
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
    if (modalBtnText) modalBtnText.textContent = 'Confirm & Reserve Video Call';
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
              <div class="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 text-[#0284C7] mx-auto flex items-center justify-center">
                <i data-lucide="check" class="w-6 h-6"></i>
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono-luxury uppercase tracking-widest text-[#0284C7] font-semibold">Brief Confirmed · Reference ${result.data ? result.data.reference : 'MH-EXEC'}</div>
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
      formFeedback.className = 'text-xs p-3.5 rounded-xl border border-blue-200 bg-blue-50/80 text-[#0284C7] flex items-center gap-2 font-medium';
      formFeedback.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-[#0284C7] shrink-0"></i><span>${escapeHtml(msg)}</span>`;
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
