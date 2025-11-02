export const aiService = {
  async suggestDiagnosis(symptoms: string): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const symptomsLower = symptoms.toLowerCase();

    const suggestions: string[] = [];

    if (symptomsLower.includes("fièvre") || symptomsLower.includes("fever")) {
      suggestions.push("Infection virale", "Grippe", "Infection bactérienne");
    }

    if (symptomsLower.includes("toux") || symptomsLower.includes("cough")) {
      suggestions.push("Bronchite", "Asthme", "Infection respiratoire");
    }

    if (symptomsLower.includes("mal de tête") || symptomsLower.includes("headache")) {
      suggestions.push("Migraine", "Tension", "Sinusite");
    }

    if (symptomsLower.includes("douleur abdominale") || symptomsLower.includes("abdominal pain")) {
      suggestions.push("Gastrite", "Appendicite", "Colite");
    }

    if (symptomsLower.includes("fatigue")) {
      suggestions.push("Anémie", "Hypothyroïdie", "Syndrome de fatigue chronique");
    }

    if (suggestions.length === 0) {
      suggestions.push("Examen clinique nécessaire", "Bilan sanguin recommandé", "Consultation spécialisée à envisager");
    }

    return suggestions.slice(0, 5);
  },

  async summarizeConsultation(text: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join(". ") + ".";

    return summary || "Résumé non disponible.";
  },

  async suggestMedication(diagnosis: string): Promise<Array<{ name: string; dosage: string; duration: string }>> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const diagnosisLower = diagnosis.toLowerCase();
    const medications: Array<{ name: string; dosage: string; duration: string }> = [];

    if (diagnosisLower.includes("infection") || diagnosisLower.includes("bactérien")) {
      medications.push({
        name: "Amoxicilline",
        dosage: "500mg 3x/jour",
        duration: "7 jours"
      });
    }

    if (diagnosisLower.includes("fièvre") || diagnosisLower.includes("fever") || diagnosisLower.includes("douleur")) {
      medications.push({
        name: "Paracétamol",
        dosage: "1g 3x/jour",
        duration: "5 jours"
      });
    }

    if (diagnosisLower.includes("toux") || diagnosisLower.includes("cough")) {
      medications.push({
        name: "Sirop antitussif",
        dosage: "15ml 3x/jour",
        duration: "5 jours"
      });
    }

    if (diagnosisLower.includes("hypertension") || diagnosisLower.includes("hta")) {
      medications.push({
        name: "Amlodipine",
        dosage: "5mg 1x/jour",
        duration: "Traitement continu"
      });
    }

    if (diagnosisLower.includes("diabète") || diagnosisLower.includes("diabetes")) {
      medications.push({
        name: "Metformine",
        dosage: "500mg 2x/jour",
        duration: "Traitement continu"
      });
    }

    if (medications.length === 0) {
      medications.push({
        name: "Consultation recommandée",
        dosage: "Selon avis médical",
        duration: "À déterminer"
      });
    }

    return medications;
  }
};
