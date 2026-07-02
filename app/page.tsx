'use client';

import { useEffect, useState, type ElementType, type ReactElement, type ReactNode } from 'react';
import {
  BarChart3,
  Bell,
  Camera,
  Check,
  ClipboardList,
  Clock,
  Download,
  Eye,
  Home,
  LogOut,
  Settings,
  User,
  Users,
  X,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type CardType = 'CNI' | 'PERMIS' | 'AUTRE';
type InternStatus = 'present' | 'depart';
type FilterType = CardType | 'all';
type FilterStatus = InternStatus | 'all';
type PageId = 'dashboard' | 'scanner' | 'stagiaires' | 'profil' | 'historique' | 'statistiques' | 'parametres';

interface Intern {
  id: string;
  initials: string;
  nom: string;
  prenom: string;
  type: CardType;
  nin: string;
  dateNaissance: string;
  lieuNaissance: string;
  firstVisit: string;
  totalVisits: number;
  status: InternStatus;
  lastVisit: string;
  arriveeTime?: string;
}

interface Visit {
  id: string;
  internId: string;
  stagiaire: string;
  type: CardType;
  arrivee: string;
  depart: string | null;
  duree: string;
  date: string;
}

interface NavigationItem {
  id: Exclude<PageId, 'profil'>;
  label: string;
  icon: ElementType;
}

const cardTypes: CardType[] = ['CNI', 'PERMIS', 'AUTRE'];
const internStatuses: InternStatus[] = ['present', 'depart'];

const isFilterType = (value: string): value is FilterType => value === 'all' || cardTypes.includes(value as CardType);
const isFilterStatus = (value: string): value is FilterStatus =>
  value === 'all' || internStatuses.includes(value as InternStatus);

const mockInterns: Intern[] = [
  {
    id: '1',
    initials: 'AD',
    nom: 'Dupont',
    prenom: 'Alice',
    type: 'CNI',
    nin: '12345678901234',
    dateNaissance: '2000-05-15',
    lieuNaissance: 'Paris',
    firstVisit: '2024-01-10',
    totalVisits: 42,
    status: 'present',
    lastVisit: '2024-01-09',
    arriveeTime: '08:30',
  },
  {
    id: '2',
    initials: 'JM',
    nom: 'Martin',
    prenom: 'Jean',
    type: 'PERMIS',
    nin: '98765432109876',
    dateNaissance: '2001-03-22',
    lieuNaissance: 'Lyon',
    firstVisit: '2024-01-05',
    totalVisits: 38,
    status: 'present',
    lastVisit: '2024-01-09',
    arriveeTime: '09:15',
  },
  {
    id: '3',
    initials: 'MB',
    nom: 'Bernard',
    prenom: 'Marie',
    type: 'CNI',
    nin: '55555555555555',
    dateNaissance: '1999-12-01',
    lieuNaissance: 'Marseille',
    firstVisit: '2023-12-20',
    totalVisits: 35,
    status: 'depart',
    lastVisit: '2024-01-08',
  },
];

const mockVisits: Visit[] = [
  { id: '1', internId: '1', stagiaire: 'Alice Dupont', type: 'CNI', date: '2024-01-09', arrivee: '08:30', depart: '17:45', duree: '9h 15m' },
  { id: '2', internId: '2', stagiaire: 'Jean Martin', type: 'PERMIS', date: '2024-01-09', arrivee: '09:15', depart: '17:30', duree: '8h 15m' },
  { id: '3', internId: '3', stagiaire: 'Marie Bernard', type: 'CNI', date: '2024-01-08', arrivee: '08:45', depart: '17:00', duree: '8h 15m' },
  { id: '4', internId: '1', stagiaire: 'Alice Dupont', type: 'CNI', date: '2024-01-08', arrivee: '08:30', depart: '17:45', duree: '9h 15m' },
];

const chartData7Days = [
  { date: 'Lun', CNI: 25, PERMIS: 15, autre: 5 },
  { date: 'Mar', CNI: 30, PERMIS: 18, autre: 6 },
  { date: 'Mer', CNI: 28, PERMIS: 16, autre: 4 },
  { date: 'Jeu', CNI: 35, PERMIS: 20, autre: 7 },
  { date: 'Ven', CNI: 32, PERMIS: 19, autre: 5 },
  { date: 'Sam', CNI: 15, PERMIS: 10, autre: 2 },
  { date: 'Dim', CNI: 8, PERMIS: 5, autre: 1 },
];

const distributionData = [
  { name: 'CNI', value: 65, color: '#22c55e' },
  { name: 'PERMIS', value: 28, color: '#f59e0b' },
  { name: 'Autre', value: 7, color: '#ef4444' },
];

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: Home },
  { id: 'scanner', label: 'Scanner', icon: Camera },
  { id: 'stagiaires', label: 'Stagiaires', icon: Users },
  { id: 'historique', label: 'Historique', icon: ClipboardList },
  { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
  { id: 'parametres', label: 'Paramètres', icon: Settings },
];

const Badge = ({ type }: { type: CardType }) => {
  const colors: Record<CardType, string> = {
    CNI: 'bg-green-100 text-green-800',
    PERMIS: 'bg-amber-100 text-amber-800',
    AUTRE: 'bg-red-100 text-red-800',
  };

  return <span className={`rounded-full px-2 py-1 text-xs font-semibold ${colors[type]}`}>{type}</span>;
};

const Avatar = ({ initials }: { initials: string }) => (
  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
    {initials}
  </div>
);

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string | number; icon: ElementType }) => (
  <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm">
    <div className="rounded-lg bg-green-100 p-3">
      <Icon className="h-6 w-6 text-green-600" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard label="Total stagiaires aujourd'hui" value={45} icon={Users} />
      <StatCard label="Actuellement présents" value={12} icon={Check} />
      <StatCard label="Total visites ce mois" value={892} icon={ClipboardList} />
      <StatCard label="Durée moyenne de présence" value="8h 30m" icon={Clock} />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ChartCard title="Accès des 7 derniers jours">
        <BarChart data={chartData7Days}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="CNI" fill="#22c55e" />
          <Bar dataKey="PERMIS" fill="#f59e0b" />
          <Bar dataKey="autre" fill="#ef4444" />
        </BarChart>
      </ChartCard>

      <ChartCard title="Répartition par type de carte">
        <PieChart>
          <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
            {distributionData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartCard>
    </div>

    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Stagiaires actuellement présents</h2>
      <div className="space-y-3">
        {mockInterns
          .filter((intern) => intern.status === 'present')
          .map((intern) => (
            <div key={intern.id} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Avatar initials={intern.initials} />
                <div>
                  <p className="font-semibold text-gray-900">
                    {intern.prenom} {intern.nom}
                  </p>
                  <p className="text-sm text-gray-500">Arrivée: {intern.arriveeTime}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-700 hover:bg-red-200">
                <LogOut className="h-4 w-4" />
                Check-out
              </button>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: ReactElement }) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

const Scanner = ({ onSelectIntern }: { onSelectIntern: (id: string) => void }) => {
  const [status, setStatus] = useState<'waiting' | 'detected' | 'processing'>('waiting');
  const [detectedIntern, setDetectedIntern] = useState<Intern | null>(null);

  const simulateScan = () => {
    setStatus('processing');
    window.setTimeout(() => {
      setDetectedIntern(mockInterns[Math.floor(Math.random() * mockInterns.length)]);
      setStatus('detected');
    }, 1000);
  };

  const resetScan = () => {
    setStatus('waiting');
    setDetectedIntern(null);
  };

  const handleCheckIn = () => {
    if (!detectedIntern) {
      return;
    }

    onSelectIntern(detectedIntern.id);
    resetScan();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Scanner</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Caméra</h2>
          <div className="mb-4 overflow-hidden rounded-lg bg-gray-900">
            <div className="flex aspect-video items-center justify-center text-gray-400">
              <Camera className="h-16 w-16" />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-4">
            <span
              className={`h-3 w-3 rounded-full ${
                status === 'waiting' ? 'bg-yellow-500' : status === 'detected' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            />
            <p className="font-semibold text-gray-900">
              {status === 'waiting' && 'En attente de scan...'}
              {status === 'detected' && 'Carte détectée'}
              {status === 'processing' && 'Traitement...'}
            </p>
          </div>
          <button
            onClick={simulateScan}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Simuler un scan
          </button>
        </div>

        {detectedIntern && status === 'detected' && (
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Résultat du scan</h2>
            <div className="mb-6 flex h-40 items-center justify-center rounded-lg bg-gray-100 p-4 text-gray-400">
              <div className="text-center">
                <div className="mb-3 flex justify-center">
                  <Avatar initials={detectedIntern.initials} />
                </div>
                <Badge type={detectedIntern.type} />
              </div>
            </div>
            <div className="mb-6 space-y-3">
              <InfoRow label="Type de carte" value={<Badge type={detectedIntern.type} />} />
              <InfoRow label="Nom" value={detectedIntern.nom} />
              <InfoRow label="Prénom" value={detectedIntern.prenom} />
              <InfoRow label="Date de naissance" value={detectedIntern.dateNaissance} />
              <InfoRow label="NIN" value={<span className="font-mono">{detectedIntern.nin}</span>} />
              <InfoRow label="Statut NIN" value={<span className="text-green-600">VALIDE</span>} />
              <InfoRow
                label="Heure d'arrivée"
                value={new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCheckIn}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                <Check className="h-5 w-5" />
                Confirmer le Check-in
              </button>
              <button
                onClick={resetScan}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                <X className="h-5 w-5" />
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-600">{label}:</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const StagiairesPage = ({ onSelectIntern }: { onSelectIntern: (id: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filtered = mockInterns.filter((intern) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = `${intern.prenom} ${intern.nom}`.toLowerCase().includes(query) || intern.nin.includes(query);
    const matchesType = filterType === 'all' || intern.type === filterType;
    const matchesStatus = filterStatus === 'all' || intern.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Stagiaires</h1>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou NIN..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="col-span-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2"
          />
          <select
            value={filterType}
            onChange={(event) => isFilterType(event.target.value) && setFilterType(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les types</option>
            <option value="CNI">CNI</option>
            <option value="PERMIS">PERMIS</option>
            <option value="AUTRE">AUTRE</option>
          </select>
          <select
            value={filterStatus}
            onChange={(event) => isFilterStatus(event.target.value) && setFilterStatus(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="present">Présent</option>
            <option value="depart">Parti</option>
          </select>
        </div>
        <InternTable interns={filtered} onSelectIntern={onSelectIntern} />
      </div>
    </div>
  );
};

const InternTable = ({ interns, onSelectIntern }: { interns: Intern[]; onSelectIntern: (id: string) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          {['Photo', 'Nom Prénom', 'Type', 'NIN', 'Dernière visite', 'Statut', 'Actions'].map((heading) => (
            <th key={heading} className="px-4 py-3 text-left font-semibold text-gray-700">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {interns.map((intern) => (
          <tr key={intern.id} className="border-b border-gray-200 transition hover:bg-gray-50">
            <td className="px-4 py-3">
              <Avatar initials={intern.initials} />
            </td>
            <td className="px-4 py-3 font-semibold text-gray-900">
              {intern.prenom} {intern.nom}
            </td>
            <td className="px-4 py-3">
              <Badge type={intern.type} />
            </td>
            <td className="px-4 py-3 font-mono text-gray-600">{intern.nin}</td>
            <td className="px-4 py-3 text-gray-600">{intern.lastVisit}</td>
            <td className="px-4 py-3">
              <StatusBadge status={intern.status} />
            </td>
            <td className="px-4 py-3">
              <button
                onClick={() => onSelectIntern(intern.id)}
                className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
              >
                <Eye className="h-4 w-4" />
                Voir profil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatusBadge = ({ status }: { status: InternStatus }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
      status === 'present' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }`}
  >
    <span className={`h-2 w-2 rounded-full ${status === 'present' ? 'bg-green-600' : 'bg-gray-400'}`} />
    {status === 'present' ? 'Présent' : 'Parti'}
  </span>
);

const ProfilePage = ({ internId }: { internId: string }) => {
  const intern = mockInterns.find((candidate) => candidate.id === internId);

  if (!intern) {
    return null;
  }

  const weekVisits = [
    { date: 'Lun', duree: 8.5 },
    { date: 'Mar', duree: 9 },
    { date: 'Mer', duree: 8 },
    { date: 'Jeu', duree: 8.5 },
    { date: 'Ven', duree: 9 },
    { date: 'Sam', duree: 0 },
    { date: 'Dim', duree: 0 },
  ];
  const internVisits = mockVisits.filter((visit) => visit.internId === internId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {intern.prenom} {intern.nom}
        </h1>
        {intern.status === 'present' && (
          <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
            <LogOut className="h-5 w-5" />
            Check-out
          </button>
        )}
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-start gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
            {intern.initials}
          </div>
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <Badge type={intern.type} />
              <StatusBadge status={intern.status} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ProfileField label="NIN" value={intern.nin} mono />
              <ProfileField label="Date de naissance" value={intern.dateNaissance} />
              <ProfileField label="Lieu de naissance" value={intern.lieuNaissance} />
              <ProfileField label="Première visite" value={intern.firstVisit} />
              <ProfileField label="Total visites" value={intern.totalVisits.toString()} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-40 items-center justify-center rounded-lg border-2 border-gray-200 bg-gray-100 text-gray-400">
            Scan de carte
          </div>
          <Badge type={intern.type} />
        </div>
        <div className="lg:col-span-2">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <MiniStat label="Visites cette semaine" value="5" />
            <MiniStat label="Temps total" value="42h" />
            <MiniStat label="Moyenne d'arrivée" value="8:36" />
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">Présence des 7 derniers jours</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weekVisits}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="duree" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <VisitsTable visits={internVisits} title="Historique des visites" />
    </div>
  );
};

const ProfileField = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`font-semibold text-gray-900 ${mono ? 'font-mono' : ''}`}>{value}</p>
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-white p-4 text-center shadow-sm">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-3xl font-bold text-green-600">{value}</p>
  </div>
);

const HistoriquePage = () => {
  const [dateFilter, setDateFilter] = useState('');
  const visits = dateFilter ? mockVisits.filter((visit) => visit.date === dateFilter) : mockVisits;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Historique</h1>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <input
            type="date"
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="ml-auto flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
            <Download className="h-5 w-5" />
            Imprimer le rapport
          </button>
        </div>
        <VisitsTable visits={visits} />
      </div>
    </div>
  );
};

const VisitsTable = ({ visits, title }: { visits: Visit[]; title?: string }) => (
  <div className={title ? 'rounded-lg bg-white p-6 shadow-sm' : ''}>
    {title && <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {['Date', 'Stagiaire', 'Type carte', 'Arrivée', 'Départ', 'Durée', 'Statut'].map((heading) => (
              <th key={heading} className="px-4 py-3 text-left font-semibold text-gray-700">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.id} className="border-b border-gray-200 transition hover:bg-gray-50">
              <td className="px-4 py-3">{visit.date}</td>
              <td className="px-4 py-3 font-semibold text-gray-900">{visit.stagiaire}</td>
              <td className="px-4 py-3">
                <Badge type={visit.type} />
              </td>
              <td className="px-4 py-3">{visit.arrivee}</td>
              <td className="px-4 py-3">{visit.depart || '-'}</td>
              <td className="px-4 py-3 font-semibold">{visit.duree}</td>
              <td className="px-4 py-3 font-semibold text-green-600">Complète</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const StatisticsPage = () => {
  const topStagiaires: Array<{ name: string; visits: number; type: CardType }> = [
    { name: 'Alice Dupont', visits: 42, type: 'CNI' },
    { name: 'Jean Martin', visits: 38, type: 'PERMIS' },
    { name: 'Marie Bernard', visits: 35, type: 'CNI' },
    { name: 'Pierre Durand', visits: 32, type: 'PERMIS' },
    { name: 'Sophie Moreau', visits: 28, type: 'CNI' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="Taux de présence" value="92%" icon={Check} />
        <StatCard label="Total visites" value="1,245" icon={ClipboardList} />
        <StatCard label="Durée moyenne" value="8h 24m" icon={Clock} />
        <StatCard label="Types de cartes" value="3" icon={BarChart3} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Accès des 7 derniers jours">
          <BarChart data={chartData7Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="CNI" fill="#22c55e" />
            <Bar dataKey="PERMIS" fill="#f59e0b" />
            <Bar dataKey="autre" fill="#ef4444" />
          </BarChart>
        </ChartCard>
        <ChartCard title="Répartition par type">
          <PieChart>
            <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
              {distributionData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartCard>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Top stagiaires par nombre de visites</h2>
        <div className="space-y-3">
          {topStagiaires.map((stagiaire, index) => (
            <div key={stagiaire.name} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{stagiaire.name}</p>
                  <Badge type={stagiaire.type} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{stagiaire.visits}</p>
                <p className="text-sm text-gray-600">visites</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [selectedInternId, setSelectedInternId] = useState<string | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const handleSelectIntern = (id: string) => {
    setSelectedInternId(id);
    setCurrentPage('profil');
  };

  const handleNavigation = (pageId: NavigationItem['id']) => {
    setCurrentPage(pageId);
    setSelectedInternId(null);
  };

  const topBarLabel = currentPage === 'profil' ? 'Profil' : navigationItems.find((item) => item.id === currentPage)?.label;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="flex w-64 flex-col bg-gray-900 text-white">
        <div className="border-b border-gray-800 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 font-bold">S</div>
            <div>
              <p className="text-lg font-bold">Stagify</p>
              <p className="text-xs text-gray-400">Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-800 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold">JD</div>
            <div className="flex-1 text-sm">
              <p className="font-semibold">Jean Dupont</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{topBarLabel}</h1>
            <p className="text-sm capitalize text-gray-500">{time}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-lg p-2 text-gray-700 transition hover:bg-gray-100" aria-label="Notifications">
              <Bell className="h-6 w-6" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'scanner' && <Scanner onSelectIntern={handleSelectIntern} />}
          {currentPage === 'stagiaires' && <StagiairesPage onSelectIntern={handleSelectIntern} />}
          {currentPage === 'profil' && selectedInternId && (
            <div>
              <button
                onClick={() => {
                  setSelectedInternId(null);
                  setCurrentPage('stagiaires');
                }}
                className="mb-4 flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
              >
                Retour
              </button>
              <ProfilePage internId={selectedInternId} />
            </div>
          )}
          {currentPage === 'historique' && <HistoriquePage />}
          {currentPage === 'statistiques' && <StatisticsPage />}
          {currentPage === 'parametres' && (
            <div className="py-12 text-center text-gray-500">
              <Settings className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Section Paramètres - à venir</p>
            </div>
          )}
          {currentPage === 'profil' && !selectedInternId && (
            <div className="py-12 text-center text-gray-500">
              <User className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>Aucun profil sélectionné</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
