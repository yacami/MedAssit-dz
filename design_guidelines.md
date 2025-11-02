# MedAssist DZ Design Guidelines

## Design Approach: Modern Medical Dashboard System

**Selected Approach:** Design System (Modern Dashboard Pattern)  
**Primary Reference:** Combination of Linear's clarity + Notion's data organization + shadcn/ui component patterns  
**Rationale:** Medical professionals require efficient, information-dense interfaces with consistent patterns across complex workflows. The application prioritizes data clarity, quick navigation, and reliable interactions over aesthetic experimentation.

---

## Typography System

### Font Families
- **Primary:** Inter (Google Fonts) - Clean, highly legible for UI elements and data
- **Data/Tabular:** JetBrains Mono (Google Fonts) - For patient IDs, medication codes, timestamps

### Hierarchy
- **Page Titles:** text-3xl font-bold (30px)
- **Section Headers:** text-xl font-semibold (20px)
- **Card Titles:** text-lg font-medium (18px)
- **Body Text:** text-base font-normal (16px)
- **Labels/Metadata:** text-sm font-medium (14px)
- **Helper Text:** text-xs text-muted-foreground (12px)

### Bilingual Support (FR/AR)
- Implement `dir="rtl"` switching via context
- Maintain same font sizes for both languages
- Use `text-start` instead of `text-left` for RTL compatibility
- Arabic text: Use "Noto Sans Arabic" as secondary font

---

## Layout System

### Spacing Primitives (Tailwind Units)
**Core spacing set:** 2, 4, 6, 8, 12, 16, 24  
- **Micro spacing (icons, badges):** p-2, gap-2
- **Component internal:** p-4, gap-4
- **Component external/section margins:** mb-6, space-y-6
- **Card padding:** p-6
- **Page containers:** p-8
- **Large sections:** py-12, gap-12
- **Page-level spacing:** p-16, mb-16

### Grid Structure
- **Sidebar Navigation:** Fixed 240px width (w-60)
- **Main Content Area:** flex-1 with max-w-7xl container
- **Dashboard Cards:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- **Data Tables:** Full width with horizontal scroll on mobile
- **Forms:** Single column max-w-2xl for optimal reading/input

### Container Strategy
- **Page Container:** px-8 py-6 max-w-7xl mx-auto
- **Card Container:** Rounded corners (rounded-lg), subtle border
- **Modal/Dialog:** max-w-2xl for forms, max-w-4xl for document previews

---

## Navigation Architecture

### Sidebar (Fixed Left, Desktop)
- **Width:** 240px fixed
- **Structure:** Logo/branding at top (h-16), navigation items grouped by function
- **Active State:** Distinct background treatment, not just color
- **Icons:** 20px (w-5 h-5) from lucide-react
- **Item Height:** h-10 with px-4 horizontal padding
- **Groups:** 
  - Core: Dashboard, Patients, Consultations
  - Documents: Templates, Generation
  - Management: Appointments, Medications
  - System: Statistics, Settings

### Mobile Navigation
- **Hamburger menu** revealing slide-out drawer
- **Bottom navigation bar** for primary actions (optional quick access)

---

## Component Library

### Data Tables (Patient List, Medication Database)
- **Header:** Sticky with font-semibold, border-bottom
- **Rows:** h-12 hover state, striped pattern (alternate row background)
- **Actions Column:** Right-aligned, icon buttons (Edit, Delete, View)
- **Search/Filter:** Top-aligned with gap-4 between search input and filter dropdowns
- **Pagination:** Bottom-aligned, showing "X-Y of Z" with Previous/Next buttons

### Cards (Dashboard, Patient Overview)
- **Standard Card:** p-6, rounded-lg, border, hover:shadow-md transition
- **Stat Card:** Includes icon (w-12 h-12 rounded-full background), metric (text-3xl font-bold), label (text-sm), trend indicator
- **Patient Card:** Avatar/initials (w-12 h-12), name (font-semibold), metadata (text-sm), action buttons

### Forms (Patient Entry, Consultation Notes)
- **Form Groups:** space-y-6 for sections
- **Label:** block mb-2 text-sm font-medium
- **Input Fields:** h-10 px-4 rounded-md border, focus:ring-2 treatment
- **Textarea:** min-h-32 for consultation notes
- **Multi-column:** grid-cols-2 gap-4 for related fields (First Name | Last Name)
- **Required Indicator:** Red asterisk next to label

### Document Preview (A4/A5 Generation)
- **Preview Area:** Central container with actual document dimensions
- **A4 Preview:** aspect-[210/297] with border shadow
- **A5 Preview:** aspect-[148/210] with border shadow
- **Toolbar:** Top-aligned with action buttons (Print, Export, Edit Template)
- **Real-time Updates:** Preview refreshes as user types in editor panel (split view)

### Calendar/Appointment Scheduler
- **Week View:** 7 columns, time slots as rows (30min increments)
- **Day View:** Single column, expanded time detail
- **Month View:** Calendar grid with appointment count indicators
- **Appointment Block:** rounded corners, truncated text, click to expand
- **Header:** Date navigation with Today/Week/Month toggle buttons

### AI Assistance Panels
- **Side Panel:** Fixed width 320px, slide-in from right
- **Suggestion Cards:** p-4 rounded-md border-l-4 accent
- **Chat-like Interface:** User input at bottom, suggestions scrolling above
- **Action Buttons:** "Apply Suggestion" inline with each recommendation

### Alerts & Notifications
- **Toast Notifications:** Top-right position, auto-dismiss after 5s
- **Alert Banner:** Full-width at page top for critical warnings
- **Inline Alerts:** Within forms for validation errors (border-l-4 treatment)
- **Icons:** Alert severity icons (Shield, CheckCircle, XCircle, AlertTriangle)

---

## Settings/Configuration Page

### Layout Structure
- **Two-column layout:** Settings categories (left sidebar 240px) + active settings panel (flex-1)
- **Categories:** Cabinet Info, Document Format, Appearance, Language, Notifications
- **Section Spacing:** Each settings group has mb-8

### Specific Components
- **Logo Upload:** Drag-drop area (h-48) with preview (max-w-xs)
- **Watermark Upload:** Similar treatment as logo
- **Color Pickers:** Visual swatches with hex input fields
- **Format Toggles:** Radio button group for A4/A5 selection
- **Preview Panel:** Real-time document preview showing applied settings
- **Footer Editor:** Rich text input showing live preview below

---

## Responsive Breakpoints
- **Mobile:** < 768px (single column, stacked cards, bottom nav)
- **Tablet:** 768px - 1024px (2-column grids, sidebar collapses to hamburger)
- **Desktop:** > 1024px (full sidebar, 3-column grids, optimal spacing)

---

## Animations
**Minimal, purposeful only:**
- Page transitions: None (instant)
- Modal/Dialog: Fade in (150ms)
- Dropdown menus: Slide down (200ms)
- Toast notifications: Slide in from edge (250ms)
- NO scroll-triggered animations
- NO hover animations beyond state changes

---

## Accessibility Standards
- **Minimum touch targets:** 44px (h-11 for buttons)
- **Focus indicators:** Clear 2px ring on all interactive elements
- **Color contrast:** WCAG AA minimum (4.5:1 for text)
- **Keyboard navigation:** All features accessible via keyboard
- **Screen reader:** Proper ARIA labels on all complex components

---

## Images
**No hero images.** This is a dashboard application focused on data and functionality. All visual elements serve informational purposes:
- **Avatars:** Patient profile placeholders (generated initials)
- **Icons:** Lucide-react icon library throughout
- **Document Previews:** Rendered document thumbnails
- **Charts/Graphs:** Recharts for statistics visualization