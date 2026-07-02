'use client';

import React, { useState, useEffect } from 'react';
import {
  Home,
  Camera,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Bell,
  Clock,
  LogOut,
  Eye,
  Download,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Types
interface Intern {
  id: string;
  photo: string;
  nom: string;
  prenom: string;
  type: 'CNI' | 'PERMIS' | 'AUTRE';
  nin: string;
  dateNaissance: string;
  lieuNaissance: string;
  firstVisit: string;
  totalVisits: number;
  status: 'present' | 'depart';
  lastVisit: string;
  arriveeTime?: string;
}

interface Visit {
  id: string;
  internId: string;
  stagiaire: string;
  type: 'CNI' | 'PERMIS' | 'AUTRE';
  arrivee: string;
  depart: string | null;
  duree: string;
  date: string;
}

// Mock data
const mockInterns: Intern[] = [
  {
    id: '1',
    photo: '👤',
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
    photo: '👤',
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
    photo: '👤',
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
  {
    id: '1',
    internId: '1',
    stagiaire: 'Alice Dupont',
    type: 'CNI',
    date: '2024-01-09',
    arrivee: '08:30',
    depart: '17:45',
    duree: '9h 15m',
  },
  {
    id: '2',
    internId: '2',
    stagiaire: 'Jean Martin',
    type: 'PERMIS',
    date: '2024-01-09',
    arrivee: '09:15',
    depart: '17:30',
    duree: '8h 15m',
  },
  {
    id: '3',
    internId: '3',
    stagiaire: 'Marie Bernard',
    type: 'CNI',
    date: '2024-01-08',
    arrivee: '08:45',
    depart: '17:00',
    duree: '8h 15m',
  },
  {
    id: '4',
    internId: '1',
    stagiaire: 'Alice Dupont',
    type: 'CNI',
    date: '2024-01-08',
    arrivee: '08:30',
    depart: '17:45',
    duree: '9h 15m',
  },
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

const presenceData30Days = [
  { date: '1', visits: 32 },
  { date: '2', visits: 28 },
  { date: '3', visits: 35 },
  { date: '4', visits: 30 },
  { date: '5', visits: 38 },
  { date: '6', visits: 42 },
  { date: '7', visits: 40 },
  { date: '8', visits: 35 },
  { date: '9', visits: 45 },
  { date: '10', visits: 38 },
];

const Badge = ({ type }: { type: 'CNI' | 'PERMIS' | 'AUTRE' }) => {
  const colors = {
    CNI: 'bg-green-100 text-green-800',
    PERMIS: 'bg-amber-100 text-amber-800',
    AUTRE: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[type]}`}>
      {type}
    </span>
  );
};

const StatCard = ({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ElementType }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
    <div className="p-3 bg-green-100 rounded-lg">
      <Icon className="w-6 h-6 text-green-600" />
    </div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

// Pages
const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard label="Total stagiaires aujourd'hui" value={45} icon={Users} />
      <StatCard label="Actuellement présents" value={12} icon={Check} />
      <StatCard label="Total visites ce mois" value={892} icon={ClipboardList} />
      <StatCard label="Durée moyenne de présence" value="8h 30m" icon={Clock} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Accès des 7 derniers jours</h2>
        <ResponsiveContainer width="100%" height={300}>
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
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Répartition par type de carte</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Stagiaires actuellement présents</h2>
      <div className="space-y-3">
        {mockInterns
          .filter((i) => i.status === 'present')
          .map((intern) => (
            <div key={intern.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">{intern.photo}</div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {intern.prenom} {intern.nom}
                  </p>
                  <p className="text-sm text-gray-500">Arrivée: {intern.arriveeTime}</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 flex items-center gap-1">
                <LogOut className="w-4 h-4" />
                Check-out
              </button>
            </div>
          ))}
      </div>
    </div>
  </div>
);

const Scanner = ({ onSelectIntern }: { onSelectIntern: (id: string) => void }) => {
  const [status, setStatus] = useState<'waiting' | 'detected' | 'processing'>('waiting');
  const [detectedIntern, setDetectedIntern] = useState<Intern | null>(null);

  const simulateScan = () => {
    setStatus('processing');
    setTimeout(() => {
      setDetectedIntern(mockInterns[Math.floor(Math.random() * mockInterns.length)]);
      setStatus('detected');
    }, 2000);
  };

  const handleCheckIn = () => {
    if (detectedIntern) {
      onSelectIntern(detectedIntern.id);
      setStatus('waiting');
      setDetectedIntern(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Scanner</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Caméra</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
            <div className="aspect-video flex items-center justify-center text-gray-400">
              <Camera className="w-16 h-16" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-gray-100 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${
                status === 'waiting' ? 'bg-yellow-500' : status === 'detected' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            />
            <p className="font-semibold text-gray-900">
              {status === 'waiting' && 'En attente de scan...'}
              {status === 'detected' && 'Carte détectée !'}
              {status === 'processing' && 'Traitement...'}
            </p>
          </div>

          <button
            onClick={simulateScan}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Simuler un scan
          </button>
        </div>

        {detectedIntern && status === 'detected' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Résultat du scan</h2>

            <div className="mb-6 p-4 bg-gray-100 rounded-lg flex items-center justify-center h-40 text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-2">{detectedIntern.photo}</div>
                <Badge type={detectedIntern.type} />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Type de carte:</span>
                <Badge type={detectedIntern.type} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nom:</span>
                <span className="font-semibold">{detectedIntern.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prénom:</span>
                <span className="font-semibold">{detectedIntern.prenom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date de naissance:</span>
                <span className="font-semibold">{detectedIntern.dateNaissance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">NIN:</span>
                <span className="font-semibold font-mono">{detectedIntern.nin}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Statut NIN:</span>
                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <Check className="w-4 h-4" /> VALIDE
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heure d&apos;arrivée:</span>
                <span className="font-semibold">
                  {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCheckIn}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Confirmer le Check-in
              </button>
              <button
                onClick={() => {
                  setStatus('waiting');
                  setDetectedIntern(null);
                }}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StagiairesPage = ({ onSelectIntern }: { onSelectIntern: (id: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'CNI' | 'PERMIS' | 'AUTRE'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'depart'>('all');

  const filtered = mockInterns.filter((intern) => {
    const matchesSearch =
      `${intern.prenom} ${intern.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.nin.includes(searchTerm);
    const matchesType = filterType === 'all' || intern.type === filterType;
    const matchesStatus = filterStatus === 'all' || intern.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Stagiaires</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom ou NIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les types</option>
            <option value="CNI">CNI</option>
            <option value="PERMIS">PERMIS</option>
            <option value="AUTRE">AUTRE</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="present">Présent</option>
            <option value="depart">Parti</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Photo</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Nom Prénom</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">NIN</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Dernière visite</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Statut</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((intern) => (
                <tr key={intern.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-center text-lg">{intern.photo}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {intern.prenom} {intern.nom}
                  </td>
                  <td className="px-4 py-3">
                    <Badge type={intern.type} />
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600">{intern.nin}</td>
                  <td className="px-4 py-3 text-gray-600">{intern.lastVisit}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        intern.status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${intern.status === 'present' ? 'bg-green-600' : 'bg-gray-400'}`} />
                      {intern.status === 'present' ? 'Présent' : 'Parti'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onSelectIntern(intern.id)}
                      className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Voir profil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ internId }: { internId: string }) => {
  const intern = mockInterns.find((i) => i.id === internId);
  if (!intern) return null;

  const weekVisits = [
    { date: 'Lun', duree: 8.5 },
    { date: 'Mar', duree: 9 },
    { date: 'Mer', duree: 8 },
    { date: 'Jeu', duree: 8.5 },
    { date: 'Ven', duree: 9 },
    { date: 'Sam', duree: 0 },
    { date: 'Dim', duree: 0 },
  ];

  const internVisits = mockVisits.filter((v) => v.internId === internId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {intern.prenom} {intern.nom}
        </h1>
        {intern.status === 'present' && (
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Check-out
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-6">
          <div className="text-6xl">{intern.photo}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge type={intern.type} />
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  intern.status === 'present'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${intern.status === 'present' ? 'bg-green-600' : 'bg-gray-400'}`} />
                {intern.status === 'present' ? 'Présent' : 'Parti'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">NIN</p>
                <p className="font-mono font-semibold text-gray-900">{intern.nin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date de naissance</p>
                <p className="font-semibold text-gray-900">{intern.dateNaissance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lieu de naissance</p>
                <p className="font-semibold text-gray-900">{intern.lieuNaissance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Première visite</p>
                <p className="font-semibold text-gray-900">{intern.firstVisit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total visites</p>
                <p className="font-semibold text-gray-900">{intern.totalVisits}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="p-4 bg-gray-100 rounded-lg mb-4 h-40 flex items-center justify-center text-gray-400 border-2 border-gray-200">
            Scan de carte
          </div>
          <Badge type={intern.type} />
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <p className="text-sm text-gray-600">Visites cette semaine</p>
              <p className="text-3xl font-bold text-green-600">5</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <p className="text-sm text-gray-600">Temps total</p>
              <p className="text-3xl font-bold text-green-600">42h</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center">
              <p className="text-sm text-gray-600">Moyenne d&apos;arrivée</p>
              <p className="text-3xl font-bold text-green-600">8:36</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Présence des 7 derniers jours</h3>
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

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Historique des visites</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Heure arrivée</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Heure départ</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Durée</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Statut</th>
              </tr>
            </thead>
            <tbody>
              {internVisits.map((visit) => (
                <tr key={visit.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{visit.date}</td>
                  <td className="px-4 py-3">{visit.arrivee}</td>
                  <td className="px-4 py-3">{visit.depart || '-'}</td>
                  <td className="px-4 py-3 font-semibold">{visit.duree}</td>
                  <td className="px-4 py-3">
                    <span className="text-green-600 font-semibold">✓ Complète</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const HistoriquePage = () => {
  const [dateFilter, setDateFilter] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Historique</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Imprimer le rapport
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Stagiaire</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Type carte</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Arrivée</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Départ</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Durée</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVisits.map((visit) => (
                <tr key={visit.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{visit.date}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{visit.stagiaire}</td>
                  <td className="px-4 py-3">
                    <Badge type={visit.type} />
                  </td>
                  <td className="px-4 py-3">{visit.arrivee}</td>
                  <td className="px-4 py-3">{visit.depart || '-'}</td>
                  <td className="px-4 py-3 font-semibold">{visit.duree}</td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">Détails</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatisticsPage = () => {
  const topStagiaires = [
    { name: 'Alice Dupont', visits: 42, type: 'CNI' },
    { name: 'Jean Martin', visits: 38, type: 'PERMIS' },
    { name: 'Marie Bernard', visits: 35, type: 'CNI' },
    { name: 'Pierre Durand', visits: 32, type: 'PERMIS' },
    { name: 'Sophie Moreau', visits: 28, type: 'CNI' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Taux de présence" value="92%" icon={Check} />
        <StatCard label="Total visites" value="1,245" icon={ClipboardList} />
        <StatCard label="Durée moyenne" value="8h 24m" icon={Clock} />
        <StatCard label="Types de cartes" value="3" icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Accès des 7 derniers jours</h2>
          <ResponsiveContainer width="100%" height={300}>
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
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Répartition par type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top stagiaires par nombre de visites</h2>
        <div className="space-y-3">
          {topStagiaires.map((stagiaire, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-semibold text-green-700">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{stagiaire.name}</p>
                  <Badge type={stagiaire.type as any} />
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

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [selectedInternId, setSelectedInternId] = useState<string | null>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home },
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'stagiaires', label: 'Stagiaires', icon: Users },
    { id: 'historique', label: 'Historique', icon: ClipboardList },
    { id: 'statistiques', label: 'Statistiques', icon: BarChart3 },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  const handleSelectIntern = (id: string) => {
    setSelectedInternId(id);
    setCurrentPage('profil');
  };

  const handleBack = () => {
    setSelectedInternId(null);
    setCurrentPage('stagiaires');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-bold">S</div>
            <div>
              <p className="font-bold text-lg">Stagify</p>
              <p className="text-xs text-gray-400">Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSelectedInternId(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold">JD</div>
            <div className="flex-1 text-sm">
              <p className="font-semibold">Jean Dupont</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {navigationItems.find((item) => item.id === currentPage)?.label}
            </h1>
            <p className="text-sm text-gray-500 capitalize">{time}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
              JD
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'scanner' && <Scanner onSelectIntern={handleSelectIntern} />}
          {currentPage === 'stagiaires' && <StagiairesPage onSelectIntern={handleSelectIntern} />}
          {currentPage === 'profil' && selectedInternId && (
            <div>
              <button
                onClick={handleBack}
                className="mb-4 text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
              >
                ← Retour
              </button>
              <ProfilePage internId={selectedInternId} />
            </div>
          )}
          {currentPage === 'historique' && <HistoriquePage />}
          {currentPage === 'statistiques' && <StatisticsPage />}
          {currentPage === 'parametres' && (
            <div className="text-center text-gray-500 py-12">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Section Paramètres - À venir</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
