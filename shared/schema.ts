import { pgTable, text, integer, timestamp, boolean, json, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const patients = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  medicalHistory: text("medical_history"),
  allergies: text("allergies"),
  currentMedications: text("current_medications"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultations = pgTable("consultations", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").references(() => patients.id).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  chiefComplaint: text("chief_complaint").notNull(),
  symptoms: text("symptoms"),
  diagnosis: text("diagnosis"),
  treatment: text("treatment"),
  notes: text("notes"),
  followUpDate: timestamp("follow_up_date"),
  aiSuggestions: json("ai_suggestions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").references(() => patients.id).notNull(),
  date: timestamp("date").notNull(),
  duration: integer("duration").notNull().default(30),
  type: text("type").notNull(),
  status: text("status").notNull().default("scheduled"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medications = pgTable("medications", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  genericName: text("generic_name"),
  dosage: text("dosage"),
  form: text("form"),
  category: text("category"),
  indications: text("indications"),
  contraindications: text("contraindications"),
  sideEffects: text("side_effects"),
  interactions: text("interactions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  content: text("content").notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const settings = pgTable("settings", {
  id: uuid("id").defaultRandom().primaryKey(),
  practiceName: text("practice_name").notNull(),
  doctorName: text("doctor_name").notNull(),
  specialty: text("specialty"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  logoUrl: text("logo_url"),
  watermarkUrl: text("watermark_url"),
  primaryColor: text("primary_color").default("#3b82f6"),
  secondaryColor: text("secondary_color").default("#10b981"),
  documentFormat: text("document_format").default("A4"),
  defaultLanguage: text("default_language").default("FR"),
  footerText: text("footer_text"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPatientSchema = createInsertSchema(patients);
export const selectPatientSchema = createSelectSchema(patients);
export type InsertPatient = z.infer<typeof insertPatientSchema>;
export type Patient = z.infer<typeof selectPatientSchema>;

export const insertConsultationSchema = createInsertSchema(consultations);
export const selectConsultationSchema = createSelectSchema(consultations);
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = z.infer<typeof selectConsultationSchema>;

export const insertAppointmentSchema = createInsertSchema(appointments);
export const selectAppointmentSchema = createSelectSchema(appointments);
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = z.infer<typeof selectAppointmentSchema>;

export const insertMedicationSchema = createInsertSchema(medications);
export const selectMedicationSchema = createSelectSchema(medications);
export type InsertMedication = z.infer<typeof insertMedicationSchema>;
export type Medication = z.infer<typeof selectMedicationSchema>;

export const insertTemplateSchema = createInsertSchema(templates);
export const selectTemplateSchema = createSelectSchema(templates);
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = z.infer<typeof selectTemplateSchema>;

export const insertSettingsSchema = createInsertSchema(settings);
export const selectSettingsSchema = createSelectSchema(settings);
export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = z.infer<typeof selectSettingsSchema>;
