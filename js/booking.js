/**
 * BOOKING & STATIC-COMPATIBLE WHATSAPP APPOINTMENT ENGINE
 * Configured for Rajdevi MediClinic (+91 9000000000)
 */

const CLINIC_CONFIG = {
  phone: "+919000000000",
  cleanPhone: "919000000000",
  doctorName: "Dr. Sanjay",
  clinicName: "Rajdevi MediClinic"
};

function initBookingSystem() {
  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('formService');

  // Global helper for opening modal with specific pre-selected goal/service
  window.openAppointmentModal = function(selectedService = '') {
    if (!bookingModal) return;
    if (selectedService && serviceSelect) {
      let matched = false;
      Array.from(serviceSelect.options).forEach(opt => {
        if (opt.value.toLowerCase().includes(selectedService.toLowerCase()) || 
            selectedService.toLowerCase().includes(opt.value.toLowerCase())) {
          opt.selected = true;
          matched = true;
        }
      });
      if (!matched && serviceSelect.options.length > 0) {
        serviceSelect.value = serviceSelect.options[1].value;
      }
    }
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open modal triggers
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const specificGoal = btn.getAttribute('data-selected-goal');
      window.openAppointmentModal(specificGoal || '');
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  // ESC key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submit -> Direct to WhatsApp Pre-filled message
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName')?.value.trim() || 'John Doe';
      const phone = document.getElementById('formPhone')?.value.trim() || 'Not provided';
      const service = document.getElementById('formService')?.value || 'Cardiac Consultation';
      const date = document.getElementById('formDate')?.value || 'Earliest Available';
      const notes = document.getElementById('formNotes')?.value.trim() || 'None';

      const message = 
        `*APPOINTMENT REQUEST - ${CLINIC_CONFIG.clinicName}*\n\n` +
        `• *Doctor:* ${CLINIC_CONFIG.doctorName}\n` +
        `• *Patient Name:* ${name}\n` +
        `• *Contact Number:* ${phone}\n` +
        `• *Concern / Test:* ${service}\n` +
        `• *Preferred Date:* ${date}\n` +
        `• *Brief Symptoms/Notes:* ${notes}\n\n` +
        `_Please confirm availability for consultation._`;

      const waUrl = `https://wa.me/${CLINIC_CONFIG.cleanPhone}?text=${encodeURIComponent(message)}`;

      // Close modal and redirect
      closeModal();
      window.open(waUrl, '_blank');
    });
  }
}

document.addEventListener('DOMContentLoaded', initBookingSystem);
