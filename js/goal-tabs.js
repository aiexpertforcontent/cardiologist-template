/**
 * PATIENT GOAL-SWITCHER SYSTEM (Rajdevi MediClinic)
 * Configured with direct WhatsApp dispatch to +91 9000000000
 */

const GOAL_DATA = {
 angioplasty: {
 title: "Angioplasty & Coronary Stenting",
 subtitle: "Precision, minimally invasive transradial cardiac revascularization",
 description: "At Rajdevi MediClinic, Dr. Sanjay specializes in painless wrist-access (transradial) angioplasty with modern drug-eluting stents. Holds the Limca Book Record for treating acute heart attack in 16 minutes door-to-balloon time.",
 checklist: [
 "Wrist-Access (Transradial) for minimal discomfort",
 "Next-generation Drug-Eluting Stents (DES)",
 "High-definition IVUS & OCT imaging precision",
 "Short 24-hour typical hospital discharge"
 ],
 badge: "Specialized Procedure",
 rightTitle: "Fast Recovery & Direct Wrist Access",
 rightDesc: "Minimal bleeding risk, no prolonged leg immobility, and rapid resumption of everyday activities.",
 suggestedDoctor: "Dr. Sanjay (Limca Record Holder | Senior Interventional Cardiologist)",
 actionText: "Book Angioplasty Consultation",
 waMessage: "Hello Rajdevi MediClinic, I would like to consult Dr. Sanjay regarding Angioplasty / Angiography."
 },

 chestpain: {
 title: "Chest Pain & Urgent Heart Triage",
 subtitle: "Rapid diagnosis for angina, pressure, shortness of breath, and radiating pain",
 description: "Never ignore acute chest tightness, burning pressure, or unexplained breathlessness. Rajdevi MediClinic provides immediate STAT 12-lead ECG, high-sensitivity cardiac enzymes, and 24/7 Cath Lab readiness.",
 checklist: [
 "Immediate STAT 12-lead ECG evaluation",
 "High-sensitivity Troponin-I rapid testing",
 "24/7 Cath Lab emergency standby",
 "Rapid differential diagnosis (GERD vs Cardiac)"
 ],
 badge: "Urgent Care Priority",
 rightTitle: "Golden Hour Heart Protection",
 rightDesc: "Seeking medical attention within the first 60 minutes prevents permanent cardiac muscle damage.",
 suggestedDoctor: "Dr. Sanjay (Emergency Cardiac Team)",
 actionText: "Call Emergency (+91 9000000000)",
 waMessage: "EMERGENCY: Rajdevi MediClinic - Need immediate advice for acute chest pain."
 },

 prevention: {
 title: "Comprehensive Preventive Heart Check",
 subtitle: "Early detection of silent plaque buildup, hypertension, and metabolic risk",
 description: "Over 50% of cardiac events occur with zero warning signs. Our comprehensive preventive cardiac screening includes 2D Echo, Treadmill Test (TMT), lipid fractionations, and heart-healthy lifestyle guidance.",
 checklist: [
 "Advanced Lipid Sub-Fraction & ApoB analysis",
 "High-Resolution 2D Echo & Color Doppler",
 "Computerized Treadmill Stress Test (TMT)",
 "Nutritional guidance & heart-healthy diet plan"
 ],
 badge: "Preventive Health",
 rightTitle: "Proactive Arterial Protection",
 rightDesc: "Essential for individuals 30+ with family history of cardiac disease, sedentary stress, or diabetes.",
 suggestedDoctor: "Dr. Sanjay (Preventive Cardiology)",
 actionText: "Schedule Heart Checkup",
 waMessage: "Hello Rajdevi MediClinic, I would like to schedule a Comprehensive Preventive Heart Checkup."
 },

 arrhythmia: {
 title: "Heart Palpitations & Arrhythmia Clinic",
 subtitle: "Expert evaluation for fluttering, missed beats, tachycardia, and dizziness",
 description: "Irregular rhythms (arrhythmias) like atrial fibrillation or premature ectopic beats require continuous rhythm strips. We offer extended digital Holter monitoring and pacemaker interrogation.",
 checklist: [
 "24 - 48 Hour Digital Patch Holter Monitoring",
 "Atrial Fibrillation & Stroke Risk Profiling",
 "Pacemaker & AICD programming checks",
 "Electrophysiology consultation guidance"
 ],
 badge: "Rhythm & Pulse",
 rightTitle: "Continuous Beat-to-Beat Monitoring",
 rightDesc: "Detect intermittent rhythm anomalies that single momentary ECGs frequently miss.",
 suggestedDoctor: "Dr. Sanjay (Cardiologist)",
 actionText: "Consult for Palpitations",
 waMessage: "Hello Rajdevi MediClinic, I would like to consult Dr. Sanjay regarding heart palpitations."
 },

 bp: {
 title: "Hypertension & Cardio-Metabolic Care",
 subtitle: "Targeted blood pressure optimization and organ protection",
 description: "Chronic high blood pressure is the primary cause of heart enlargement and strokes. We treat resistant hypertension through arterial stiffness analysis, renal Doppler, and targeted chronotherapy.",
 checklist: [
 "Ambulatory Blood Pressure Monitoring (ABPM)",
 "Target organ damage assessment (LVH check)",
 "Salt sensitivity & dietary sodium balancing",
 "Medication fine-tuning without side effects"
 ],
 badge: "Long-term Vitality",
 rightTitle: "Maintain Healthy 120/80 Target",
 rightDesc: "Evidence-based blood pressure management preserves your heart, brain, and kidney vitality.",
 suggestedDoctor: "Dr. Sanjay (Physician & Cardiologist)",
 actionText: "Book BP Consultation",
 waMessage: "Hello Rajdevi MediClinic, I would like to consult regarding Blood Pressure management."
 }
};

function initGoalTabs() {
 const tabButtons = document.querySelectorAll('.goal-tab-btn');
 const goalContentBox = document.getElementById('goalDynamicContent');

 if (!tabButtons.length || !goalContentBox) return;

 tabButtons.forEach(btn => {
 btn.addEventListener('click', () => {
 const goalKey = btn.getAttribute('data-goal');
 const data = GOAL_DATA[goalKey];

 if (!data) return;

 tabButtons.forEach(b => {
 b.classList.remove('active');
 b.setAttribute('aria-selected', 'false');
 });
 btn.classList.add('active');
 btn.setAttribute('aria-selected', 'true');

 goalContentBox.style.opacity = '0';
 goalContentBox.style.transform = 'translateY(8px)';

 setTimeout(() => {
 const checklistHtml = data.checklist.map(item => '
 <div class="goal-check-item">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
 <span>${item}</span>
 </div>
 ').join('');

 goalContentBox.innerHTML = '
 <div class="goal-content-left">
 <span class="goal-badge-pill">${data.badge}</span>
 <h3>${data.title}</h3>
 <p>${data.description}</p>
 <div class="goal-checklist">
 ${checklistHtml}
 </div>
 <div class="goal-actions-row" style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; width: 100%; margin-top: 1.25rem;">
 <button type="button" class="btn btn-primary" data-open-modal data-selected-goal="${data.title}">
 ${data.actionText}
 </button>
 <a href="https://wa.me/919000000000?text=${encodeURIComponent(data.waMessage)}" target="_blank" rel="noopener" class="btn btn-whatsapp">
 <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
 Ask via WhatsApp
 </a>
 </div>
 </div>
 <div class="goal-content-right">
 <div class="rating-stars" style="margin-bottom: 0.5rem; justify-content: center;">
 <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
 <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
 <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
 <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
 <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
 </div>
 <h4 class="goal-right-title">${data.rightTitle}</h4>
 <p class="goal-right-desc">${data.rightDesc}</p>
 <div style="font-size: 0.75rem; color: #94A3B8; padding-top: 0.75rem; border-top: 1px solid rgba(56, 189, 248, 0.2);">
 Consulting: <strong>${data.suggestedDoctor}</strong>
 </div>
 </div>
 ';

 goalContentBox.style.opacity = '1';
 goalContentBox.style.transform = 'translateY(0)';

 const newModalBtn = goalContentBox.querySelector('[data-open-modal]');
 if (newModalBtn && window.openAppointmentModal) {
 newModalBtn.addEventListener('click', () => {
 window.openAppointmentModal(data.title);
 });
 }
 }, 150);
 });
 });
}

document.addEventListener('DOMContentLoaded', initGoalTabs);
