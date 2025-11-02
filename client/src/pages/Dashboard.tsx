import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord - MedAssist DZ</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-card-border rounded-lg p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Total Patients
            </div>
            <div className="text-3xl font-bold">{stats?.totalPatients || 0}</div>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Consultations Aujourd'hui
            </div>
            <div className="text-3xl font-bold">{stats?.consultationsToday || 0}</div>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Rendez-vous Aujourd'hui
            </div>
            <div className="text-3xl font-bold">{stats?.appointmentsToday || 0}</div>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-6 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground mb-2">
              Rapports en Attente
            </div>
            <div className="text-3xl font-bold">{stats?.pendingReports || 0}</div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Bienvenue sur MedAssist DZ</h2>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <p className="text-muted-foreground">
              Votre application de gestion médicale est prête. Utilisez le menu de navigation pour accéder aux différentes fonctionnalités :
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>• Gestion des patients</li>
              <li>• Consultations avec assistance IA</li>
              <li>• Génération de documents médicaux</li>
              <li>• Gestion des rendez-vous</li>
              <li>• Base de données de médicaments</li>
              <li>• Statistiques et rapports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
