import type { Express } from "express";
import { createServer } from "http";
import { db } from "./db";
import {
  patients,
  consultations,
  appointments,
  medications,
  templates,
  settings,
  insertPatientSchema,
  insertConsultationSchema,
  insertAppointmentSchema,
  insertMedicationSchema,
  insertTemplateSchema,
  insertSettingsSchema,
} from "../shared/schema";
import { eq, desc, sql } from "drizzle-orm";
import { aiService } from "./ai-service";

export function registerRoutes(app: Express) {
  // Statistics
  app.get("/api/stats", async (_req, res) => {
    try {
      const [patientCount] = await db.select({ count: sql<number>`count(*)` }).from(patients);
      const [consultationCount] = await db.select({ count: sql<number>`count(*)` }).from(consultations);
      const [appointmentCount] = await db.select({ count: sql<number>`count(*)` }).from(appointments)
        .where(eq(appointments.status, "scheduled"));

      res.json({
        totalPatients: Number(patientCount.count),
        consultationsToday: Number(consultationCount.count),
        appointmentsToday: Number(appointmentCount.count),
        pendingReports: 0,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching statistics" });
    }
  });

  // Patients
  app.get("/api/patients", async (_req, res) => {
    try {
      const allPatients = await db.select().from(patients).orderBy(desc(patients.createdAt));
      res.json(allPatients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching patients" });
    }
  });

  app.get("/api/patients/:id", async (req, res) => {
    try {
      const [patient] = await db.select().from(patients).where(eq(patients.id, req.params.id));
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.json(patient);
    } catch (error) {
      res.status(500).json({ message: "Error fetching patient" });
    }
  });

  app.post("/api/patients", async (req, res) => {
    try {
      const patientData = insertPatientSchema.parse(req.body);
      const [newPatient] = await db.insert(patients).values(patientData).returning();
      res.json(newPatient);
    } catch (error) {
      res.status(400).json({ message: "Invalid patient data" });
    }
  });

  app.put("/api/patients/:id", async (req, res) => {
    try {
      const patientData = insertPatientSchema.parse(req.body);
      const [updatedPatient] = await db
        .update(patients)
        .set(patientData)
        .where(eq(patients.id, req.params.id))
        .returning();

      if (!updatedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.json(updatedPatient);
    } catch (error) {
      res.status(400).json({ message: "Invalid patient data" });
    }
  });

  app.delete("/api/patients/:id", async (req, res) => {
    try {
      await db.delete(patients).where(eq(patients.id, req.params.id));
      res.json({ message: "Patient deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting patient" });
    }
  });

  // Consultations
  app.get("/api/consultations", async (_req, res) => {
    try {
      const allConsultations = await db.select().from(consultations).orderBy(desc(consultations.date));
      res.json(allConsultations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching consultations" });
    }
  });

  app.post("/api/consultations", async (req, res) => {
    try {
      const consultationData = insertConsultationSchema.parse(req.body);
      const [newConsultation] = await db.insert(consultations).values(consultationData).returning();
      res.json(newConsultation);
    } catch (error) {
      res.status(400).json({ message: "Invalid consultation data" });
    }
  });

  // Appointments
  app.get("/api/appointments", async (_req, res) => {
    try {
      const allAppointments = await db.select().from(appointments).orderBy(appointments.date);
      res.json(allAppointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const [newAppointment] = await db.insert(appointments).values(appointmentData).returning();
      res.json(newAppointment);
    } catch (error) {
      res.status(400).json({ message: "Invalid appointment data" });
    }
  });

  app.put("/api/appointments/:id", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const [updatedAppointment] = await db
        .update(appointments)
        .set(appointmentData)
        .where(eq(appointments.id, req.params.id))
        .returning();

      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ message: "Invalid appointment data" });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      await db.delete(appointments).where(eq(appointments.id, req.params.id));
      res.json({ message: "Appointment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting appointment" });
    }
  });

  // Medications
  app.get("/api/medications", async (_req, res) => {
    try {
      const allMedications = await db.select().from(medications).orderBy(medications.name);
      res.json(allMedications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching medications" });
    }
  });

  app.post("/api/medications", async (req, res) => {
    try {
      const medicationData = insertMedicationSchema.parse(req.body);
      const [newMedication] = await db.insert(medications).values(medicationData).returning();
      res.json(newMedication);
    } catch (error) {
      res.status(400).json({ message: "Invalid medication data" });
    }
  });

  // Templates
  app.get("/api/templates", async (_req, res) => {
    try {
      const allTemplates = await db.select().from(templates).orderBy(templates.name);
      res.json(allTemplates);
    } catch (error) {
      res.status(500).json({ message: "Error fetching templates" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const templateData = insertTemplateSchema.parse(req.body);
      const [newTemplate] = await db.insert(templates).values(templateData).returning();
      res.json(newTemplate);
    } catch (error) {
      res.status(400).json({ message: "Invalid template data" });
    }
  });

  // Settings
  app.get("/api/settings", async (_req, res) => {
    try {
      const [practiceSettings] = await db.select().from(settings).limit(1);
      res.json(practiceSettings || null);
    } catch (error) {
      res.status(500).json({ message: "Error fetching settings" });
    }
  });

  app.put("/api/settings", async (req, res) => {
    try {
      const settingsData = insertSettingsSchema.parse(req.body);
      const [existingSettings] = await db.select().from(settings).limit(1);

      if (existingSettings) {
        const [updatedSettings] = await db
          .update(settings)
          .set({ ...settingsData, updatedAt: new Date() })
          .where(eq(settings.id, existingSettings.id))
          .returning();
        res.json(updatedSettings);
      } else {
        const [newSettings] = await db.insert(settings).values(settingsData).returning();
        res.json(newSettings);
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid settings data" });
    }
  });

  // AI Services
  app.post("/api/ai/suggest-diagnosis", async (req, res) => {
    try {
      const { symptoms } = req.body;
      const suggestions = await aiService.suggestDiagnosis(symptoms);
      res.json({ suggestions });
    } catch (error) {
      res.status(500).json({ message: "Error generating diagnosis suggestions" });
    }
  });

  app.post("/api/ai/summarize", async (req, res) => {
    try {
      const { text } = req.body;
      const summary = await aiService.summarizeConsultation(text);
      res.json({ summary });
    } catch (error) {
      res.status(500).json({ message: "Error generating summary" });
    }
  });

  app.post("/api/ai/suggest-medication", async (req, res) => {
    try {
      const { diagnosis } = req.body;
      const medications = await aiService.suggestMedication(diagnosis);
      res.json({ medications });
    } catch (error) {
      res.status(500).json({ message: "Error suggesting medications" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
