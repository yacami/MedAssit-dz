/*
  # Create MedAssist DZ Tables

  1. New Tables
    - `patients`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required)
      - `date_of_birth` (timestamp, required)
      - `gender` (text, required)
      - `phone` (text)
      - `email` (text)
      - `address` (text)
      - `medical_history` (text)
      - `allergies` (text)
      - `current_medications` (text)
      - `created_at` (timestamp, default now)

    - `consultations`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key to patients)
      - `date` (timestamp, default now)
      - `chief_complaint` (text, required)
      - `symptoms` (text)
      - `diagnosis` (text)
      - `treatment` (text)
      - `notes` (text)
      - `follow_up_date` (timestamp)
      - `ai_suggestions` (jsonb)
      - `created_at` (timestamp, default now)

    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key to patients)
      - `date` (timestamp, required)
      - `duration` (integer, default 30)
      - `type` (text, required)
      - `status` (text, default 'scheduled')
      - `notes` (text)
      - `created_at` (timestamp, default now)

    - `medications`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `generic_name` (text)
      - `dosage` (text)
      - `form` (text)
      - `category` (text)
      - `indications` (text)
      - `contraindications` (text)
      - `side_effects` (text)
      - `interactions` (text)
      - `created_at` (timestamp, default now)

    - `templates`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `type` (text, required)
      - `content` (text, required)
      - `is_default` (boolean, default false)
      - `created_at` (timestamp, default now)

    - `settings`
      - `id` (uuid, primary key)
      - `practice_name` (text, required)
      - `doctor_name` (text, required)
      - `specialty` (text)
      - `phone` (text)
      - `email` (text)
      - `address` (text)
      - `logo_url` (text)
      - `watermark_url` (text)
      - `primary_color` (text, default '#3b82f6')
      - `secondary_color` (text, default '#10b981')
      - `document_format` (text, default 'A4')
      - `default_language` (text, default 'FR')
      - `footer_text` (text)
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (for demo purposes, in production would be authenticated)
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth timestamp NOT NULL,
  gender text NOT NULL,
  phone text,
  email text,
  address text,
  medical_history text,
  allergies text,
  current_medications text,
  created_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on patients"
  ON patients
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  date timestamp DEFAULT now() NOT NULL,
  chief_complaint text NOT NULL,
  symptoms text,
  diagnosis text,
  treatment text,
  notes text,
  follow_up_date timestamp,
  ai_suggestions jsonb,
  created_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on consultations"
  ON consultations
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  date timestamp NOT NULL,
  duration integer DEFAULT 30 NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'scheduled' NOT NULL,
  notes text,
  created_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on appointments"
  ON appointments
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  generic_name text,
  dosage text,
  form text,
  category text,
  indications text,
  contraindications text,
  side_effects text,
  interactions text,
  created_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on medications"
  ON medications
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on templates"
  ON templates
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  practice_name text NOT NULL,
  doctor_name text NOT NULL,
  specialty text,
  phone text,
  email text,
  address text,
  logo_url text,
  watermark_url text,
  primary_color text DEFAULT '#3b82f6',
  secondary_color text DEFAULT '#10b981',
  document_format text DEFAULT 'A4',
  default_language text DEFAULT 'FR',
  footer_text text,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on settings"
  ON settings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (practice_name, doctor_name, specialty, phone, email, address)
VALUES (
  'Cabinet Médical MedAssist DZ',
  'Dr. Ahmed Benali',
  'Médecine Générale',
  '+213 555 123 456',
  'contact@medassist-dz.com',
  'Alger, Algérie'
)
ON CONFLICT DO NOTHING;

-- Insert default templates
INSERT INTO templates (name, type, content, is_default) VALUES
(
  'Ordonnance HTA',
  'prescription',
  'ORDONNANCE MÉDICALE

Patient: {patientName}
Date: {date}

Diagnostic: Hypertension Artérielle

Traitement:
- Amlodipine 5mg: 1 comprimé le matin
- Régime hyposodé strict
- Contrôle tensionnel régulier

Durée: 1 mois
Renouvellement: Après consultation

Dr. {doctorName}',
  true
),
(
  'Ordonnance Diabète Type 2',
  'prescription',
  'ORDONNANCE MÉDICALE

Patient: {patientName}
Date: {date}

Diagnostic: Diabète Type 2

Traitement:
- Metformine 500mg: 1 comprimé 2x/jour
- Régime diabétique
- Activité physique régulière
- Contrôle glycémique

Durée: 1 mois
Renouvellement: Après consultation

Dr. {doctorName}',
  true
),
(
  'Certificat Médical',
  'certificate',
  'CERTIFICAT MÉDICAL

Je soussigné(e) Dr. {doctorName}, certifie avoir examiné ce jour:

Patient: {patientName}
Date de naissance: {dateOfBirth}

Observations: {observations}

Ce certificat est délivré à la demande de l''intéressé(e) pour faire valoir ce que de droit.

Fait à {location}, le {date}

Dr. {doctorName}
{specialty}',
  true
),
(
  'Certificat d''Arrêt de Travail',
  'sick_leave',
  'CERTIFICAT D''ARRÊT DE TRAVAIL

Je soussigné(e) Dr. {doctorName}, certifie que:

Patient: {patientName}
Date de naissance: {dateOfBirth}

Doit observer un repos médical de {duration} jours
Du {startDate} au {endDate}

Motif: {reason}

Fait à {location}, le {date}

Dr. {doctorName}
{specialty}',
  true
),
(
  'Lettre d''Adressage Spécialiste',
  'referral',
  'LETTRE D''ADRESSAGE

Cher(e) Confrère/Consœur,

Je vous adresse:

Patient: {patientName}
Date de naissance: {dateOfBirth}

Motif de consultation: {reason}

Antécédents: {medicalHistory}

Examen clinique: {examination}

Je vous remercie pour votre prise en charge.

Cordialement,

Dr. {doctorName}
{specialty}
{date}',
  true
)
ON CONFLICT DO NOTHING;

-- Insert default medications
INSERT INTO medications (name, generic_name, dosage, form, category, indications, contraindications, side_effects, interactions) VALUES
(
  'Amlodipine',
  'Amlodipine',
  '5mg, 10mg',
  'Comprimé',
  'Antihypertenseur',
  'Hypertension artérielle, Angor',
  'Hypersensibilité, Choc cardiogénique',
  'Œdème périphérique, céphalées, flush',
  'Éviter avec jus de pamplemousse'
),
(
  'Metformine',
  'Metformine',
  '500mg, 850mg, 1000mg',
  'Comprimé',
  'Antidiabétique',
  'Diabète type 2',
  'Insuffisance rénale, acidose métabolique',
  'Troubles digestifs, acidose lactique (rare)',
  'Contrôle fonction rénale requis'
),
(
  'Amoxicilline',
  'Amoxicilline',
  '500mg, 1g',
  'Gélule/Comprimé',
  'Antibiotique',
  'Infections bactériennes',
  'Allergie aux pénicillines',
  'Réactions allergiques, troubles digestifs',
  'Vérifier interactions avec anticoagulants'
),
(
  'Paracétamol',
  'Paracétamol',
  '500mg, 1g',
  'Comprimé',
  'Antalgique/Antipyrétique',
  'Douleur, Fièvre',
  'Insuffisance hépatique sévère',
  'Rares: hépatotoxicité à forte dose',
  'Attention avec alcool'
)
ON CONFLICT DO NOTHING;
