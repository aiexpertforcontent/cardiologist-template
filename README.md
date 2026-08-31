# Premier Cardiologist Website Template

An empathetic, modern, conversion-focused website template engineered specifically for **Interventional Cardiologists, Cardiac Clinics, and Heart Specialists** (configured for *Dr. Sanjay*).

---

## 💎 UI/UX & Design Highlights

- **Palette**:
  - **Base**: Midnight Navy (`#080E1A`) & Slate Blue (`#0F172A`) for medical authority, contrasted with Crisp Canvas (`#F8FAFC`).
  - **Structure**: Deep Navy & Frosted Glass (`rgba(255, 255, 255, 0.72)` / `rgba(15, 23, 42, 0.78)`).
  - **Action Accents**: Vital Heart Crimson (`#E11D48`) for CTAs, ECG Pulse Cyan (`#0EA5E9`), and Amber Gold (`#F59E0B`) for reviews.
- **Friendly & Empathetic Typography**: *Plus Jakarta Sans* for rounded, compassionate, and trustworthy headings; *Inter* for accessible clinical clarity.
- **Dynamic Patient Goal Navigator (`#goals`)**: Tabbed interaction allowing patients to choose their exact concern (*Angioplasty & Stenting*, *Chest Pain Triage*, *Preventive Heart Check*, *Palpitations & Arrhythmia*, *High Blood Pressure*) dynamically tailoring guidance, benefits, and appointment requests to reduce cognitive fatigue.
- **Glassmorphic Doctor Profile**: High-end rounded glassmorphic card showcasing degrees (`MBBS`, `MD`, `DM (Cardiology)`, `FACC`), consultation shifts, and clinical highlights with ambient glows.
- **Swipeable Carousels**:
  - **Hero Slider**: Full-screen touch-swipeable slides with animated ECG pulse graphics.
  - **Services Section**: Horizontal swipeable multi-card carousel instead of vertical stacking.
  - **Testimonials Section**: Frosted glass review cards with 5-star Google review ratings.
- **Persistent Mobile Action Bar**: Fixed bottom bar on mobile viewports with 48px touch targets for direct **Call**, **WhatsApp**, and **Book Consult**.
- **Static-Compatible Booking Modal**: Accessible form dispatching formatted patient information directly to WhatsApp.

---

## 📁 File Structure

```
cardiologist-template/
├── index.html                   # Semantic HTML5 production page with Schema.org JSON-LD
├── AGENTS.md                    # Agent guidelines and project scoping
├── README.md                    # Documentation & guide
├── css/
│   ├── variables.css            # 60-30-10 color tokens, glassmorphism tokens, fluid typography
│   ├── base.css                 # CSS reset, typography, container utilities
│   ├── glassmorphism.css        # Frosted glass, glow highlights, rounded borders
│   ├── components.css           # Buttons, pills, badges, modal dialog, sticky mobile bar
│   ├── sliders.css              # Touch-swipe slider styles for Hero, Services, and Testimonials
│   └── sections.css             # Navigation, hero layout, goal tabs, doctor profile, footer
├── js/
│   ├── main.js                  # Mobile drawer, modal handlers, scroll triggers, FAQs
│   ├── goal-tabs.js             # Dynamic Patient Goal Switcher
│   ├── sliders.js               # Zero-dependency, touch-swipeable carousel engine
│   └── booking.js               # Static-friendly WhatsApp appointment message composer
└── assets/
    └── images/
        └── doctor-sanjay.png    # Professional cardiologist portrait
```

---

## 🚀 How to View Locally

1. Open File Explorer and navigate to `c:\Users\shubh\Downloads\cardiologist-template\`.
2. Double-click `index.html` to open it in Chrome, Edge, or any modern web browser.
3. Test the interactive Goal Switcher, swipe the Services & Testimonials carousels, and verify the WhatsApp appointment generator!
