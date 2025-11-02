# MedAssist DZ - Gestion Médicale Intelligente

## Overview
MedAssist DZ is a comprehensive medical practice management Progressive Web App (PWA) built with React, TypeScript, and Express. It provides AI-assisted consultations, patient management, professional document generation, and bilingual support (French/Arabic).

## Recent Changes
- **October 30, 2025**: Initial implementation of complete medical management system
  - Full patient management with CRUD operations
  - AI-assisted consultation interface with diagnostic suggestions
  - Professional document generation with 5 pre-built templates
  - Medication database with interaction warnings
  - Appointment scheduler with calendar views
  - Statistics dashboard with charts
  - Practice settings with full customization
  - Theme toggle (light/dark mode)
  - Bilingual interface (French/Arabic)

## Project Architecture

### Frontend (React + TypeScript + Vite)
- **Framework**: React 18 with TypeScript
- **Styling**: TailwindCSS + shadcn/ui component library
- **State Management**: React Query (TanStack Query v5)
- **Routing**: Wouter
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: Custom medical blue color scheme with dark mode support

### Backend (Node.js + Express)
- **Server**: Express.js
- **Storage**: In-memory storage (MemStorage class)
- **Validation**: Zod schemas from drizzle-zod
- **AI Service**: Mock AI service for offline functionality

### Key Features
1. **Patient Management**: Complete CRUD with search, medical history, allergies
2. **AI Consultations**: Symptom analysis, diagnostic suggestions, treatment recommendations
3. **Document Generation**: Professional medical documents (A4/A5 format)
4. **Templates**: 5 pre-built templates (HTA, Diabetes, Certificates, Sick Leave, Referrals)
5. **Medications**: Local database with contraindications and interaction warnings
6. **Appointments**: Calendar view with daily/weekly tracking
7. **Statistics**: Visual analytics with charts and trends
8. **Settings**: Full practice customization (logo, colors, format, language)

## File Structure
```
/client
├── src/
│   ├── pages/              # All main application pages
│   │   ├── Dashboard.tsx
│   │   ├── Patients.tsx
│   │   ├── Consultations.tsx
│   │   ├── Documents.tsx
│   │   ├── Templates.tsx
│   │   ├── Appointments.tsx
│   │   ├── MedicationsPage.tsx
│   │   ├── Statistics.tsx
│   │   └── Settings.tsx
│   ├── components/
│   │   ├── ui/             # shadcn/ui components
│   │   ├── app-sidebar.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/
│   │   ├── ThemeProvider.tsx
│   │   └── LanguageContext.tsx
│   └── App.tsx
/server
├── storage.ts              # In-memory storage with default data
├── ai-service.ts          # Mock AI service for offline functionality
└── routes.ts              # All API endpoints
/shared
└── schema.ts              # Drizzle schemas and Zod validation
/public
└── manifest.json          # PWA manifest
```

## Data Models

### Patient
- Personal information (name, DOB, gender, contact)
- Medical history and allergies
- Current medications
- Consultation history

### Consultation
- Patient reference
- Chief complaint and symptoms
- Diagnosis and treatment
- AI suggestions
- Follow-up dates

### Appointment
- Patient reference
- Date, time, duration
- Type (consultation, follow-up, urgent)
- Status (scheduled, completed, cancelled, no-show)

### Medication
- Name, generic name, dosage
- Form and category
- Indications and contraindications
- Side effects and interactions

### Document Template
- Name and type
- Content with placeholders
- Default template flag

### Practice Settings
- Practice and doctor information
- Logo and watermark URLs
- Primary/secondary colors
- Document format (A4/A5)
- Default language (FR/AR/Bilingual)
- Custom footer text

## API Endpoints

### Statistics
- `GET /api/stats` - Dashboard statistics

### Patients
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Consultations
- `GET /api/consultations` - List all consultations
- `POST /api/consultations` - Create consultation

### Appointments
- `GET /api/appointments` - List all appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Medications
- `GET /api/medications` - List all medications
- `POST /api/medications` - Create medication

### Templates
- `GET /api/templates` - List all templates
- `POST /api/templates` - Create template

### Settings
- `GET /api/settings` - Get practice settings
- `PUT /api/settings` - Update settings

### AI Services
- `POST /api/ai/suggest-diagnosis` - Get diagnostic suggestions
- `POST /api/ai/summarize` - Summarize consultation
- `POST /api/ai/suggest-medication` - Get medication recommendations

## Default Data

### Templates (5)
1. Ordonnance HTA (Hypertension prescription)
2. Ordonnance Diabète Type 2 (Diabetes prescription)
3. Certificat Médical (Medical certificate)
4. Certificat d'Arrêt de Travail (Sick leave certificate)
5. Lettre d'Adressage Spécialiste (Specialist referral letter)

### Medications (4)
1. Amlodipine (Antihypertensive)
2. Metformine (Antidiabetic)
3. Amoxicilline (Antibiotic)
4. Paracétamol (Analgesic)

## User Preferences

### Theme
- Light mode: Medical blue (#3b82f6) with clean whites and grays
- Dark mode: Automatically adapted with proper contrast ratios
- Theme persists in localStorage

### Language
- French (default)
- Arabic (RTL support)
- Bilingual mode
- Language selection persists across sessions

## Design System
- **Colors**: Medical blue primary (#3b82f6), semantic colors for status
- **Typography**: Inter for UI, JetBrains Mono for data, Noto Sans Arabic for Arabic text
- **Spacing**: Consistent 4px-based spacing system
- **Components**: shadcn/ui with custom medical theme
- **Interactions**: Subtle hover states with elevation system
- **Responsiveness**: Mobile-first, works on desktop/tablet

## PWA Features
- Installable on Windows
- Offline-ready with mock AI service
- Responsive design
- Native app-like experience

## Development Workflow
1. **Start**: `npm run dev` - Starts Express backend and Vite frontend
2. **Access**: Application runs on port 5000
3. **Hot Reload**: Vite provides instant HMR for frontend changes
4. **Backend**: Express auto-restarts on changes

## Future Enhancements
- Real OpenAI/Mistral/Anthropic API integration for production AI
- SQLite/PostgreSQL persistence for production data
- Advanced medication interaction checking
- Email/SMS appointment reminders
- Patient data import/export (CSV, PDF)
- Digital signature capture
- Multi-user support with authentication
- Cloud sync capabilities

## Technical Notes
- Uses in-memory storage (data resets on server restart)
- Mock AI provides intelligent offline suggestions
- All forms use react-hook-form with Zod validation
- Charts use Recharts with responsive containers
- All interactive elements have data-testid attributes for testing
- Follows accessibility best practices (WCAG AA)
