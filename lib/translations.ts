export type Locale = 'fr' | 'en' | 'ar'

export const locales: Locale[] = ['fr', 'en', 'ar']

export const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
}

export const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.scanner': 'Scanner',
    'nav.interns': 'Stagiaires',
    'nav.history': 'Historique',

    // Sidebar
    'sidebar.management': 'Management',
    'sidebar.role': 'Admin',

    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.totalToday': "Total stagiaires aujourd'hui",
    'dashboard.presentNow': 'Actuellement présents',
    'dashboard.totalMonth': 'Total visites ce mois',
    'dashboard.avgDuration': 'Durée moyenne de présence',
    'dashboard.presentTitle': 'Stagiaires actuellement présents',
    'dashboard.arrival': 'Arrivée',
    'dashboard.checkout': 'Check-out',

    // Charts
    'chart.access7days': 'Accès des 7 derniers jours',
    'chart.distribution': 'Répartition par type de carte',
    'chart.other': 'Autre',

    // Scanner
    'scanner.title': 'Scanner',
    'scanner.camera': 'Caméra',
    'scanner.simulate': 'Simuler un scan',
    'scanner.resultTitle': 'Résultat du scan',
    'scanner.status.waiting': 'En attente de scan...',
    'scanner.status.detected': 'Carte détectée',
    'scanner.status.processing': 'Traitement...',
    'scanner.cardType': 'Type de carte',
    'scanner.name': 'Nom',
    'scanner.firstName': 'Prénom',
    'scanner.birthDate': 'Date de naissance',
    'scanner.nin': 'NIN',
    'scanner.ninStatus': 'Statut NIN',
    'scanner.ninValid': 'VALIDE',
    'scanner.arrivalTime': "Heure d'arrivée",
    'scanner.confirmCheckin': 'Confirmer le Check-in',
    'scanner.cancel': 'Annuler',

    // Interns
    'interns.title': 'Stagiaires',
    'interns.search': 'Rechercher par nom ou NIN...',
    'interns.allTypes': 'Tous les types',
    'interns.allStatuses': 'Tous les statuts',
    'interns.present': 'Présent',
    'interns.absent': 'Parti',
    'interns.photo': 'Photo',
    'interns.fullName': 'Nom Prénom',
    'interns.type': 'Type',
    'interns.lastVisit': 'Dernière visite',
    'interns.status': 'Statut',
    'interns.actions': 'Actions',
    'interns.viewProfile': 'Voir profil',

    // Profile
    'profile.title': 'Profil',
    'profile.back': 'Retour à la liste',
    'profile.birthPlace': 'Lieu de naissance',
    'profile.firstVisit': 'Première visite',
    'profile.totalVisits': 'Total visites',
    'profile.cardScan': 'Scan de carte',
    'profile.weekVisits': 'Visites cette semaine',
    'profile.totalTime': 'Temps total',
    'profile.avgArrival': "Moyenne d'arrivée",
    'profile.presence7days': 'Présence des 7 derniers jours',
    'profile.visitHistory': 'Historique des visites',

    // History
    'history.title': 'Historique',
    'history.stagiaire': 'Stagiaire',
    'history.cardType': 'Type carte',
    'history.date': 'Date',
    'history.arrival': 'Arrivée',
    'history.departure': 'Départ',
    'history.duration': 'Durée',
    'history.status': 'Statut',
    'history.complete': 'Complète',
    'history.print': 'Imprimer le rapport',

    // Table shared
    'table.date': 'Date',
    'table.arrival': 'Arrivée',
    'table.departure': 'Départ',
    'table.duration': 'Durée',
    'table.status': 'Statut',

    // Badges
    'badge.present': 'Présent',
    'badge.absent': 'Parti',
  },

  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.scanner': 'Scanner',
    'nav.interns': 'Interns',
    'nav.history': 'History',

    // Sidebar
    'sidebar.management': 'Management',
    'sidebar.role': 'Admin',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalToday': "Total interns today",
    'dashboard.presentNow': 'Currently present',
    'dashboard.totalMonth': 'Total visits this month',
    'dashboard.avgDuration': 'Average presence duration',
    'dashboard.presentTitle': 'Interns currently present',
    'dashboard.arrival': 'Arrival',
    'dashboard.checkout': 'Check-out',

    // Charts
    'chart.access7days': 'Access - Last 7 days',
    'chart.distribution': 'Distribution by card type',
    'chart.other': 'Other',

    // Scanner
    'scanner.title': 'Scanner',
    'scanner.camera': 'Camera',
    'scanner.simulate': 'Simulate scan',
    'scanner.resultTitle': 'Scan result',
    'scanner.status.waiting': 'Waiting for scan...',
    'scanner.status.detected': 'Card detected',
    'scanner.status.processing': 'Processing...',
    'scanner.cardType': 'Card type',
    'scanner.name': 'Last name',
    'scanner.firstName': 'First name',
    'scanner.birthDate': 'Date of birth',
    'scanner.nin': 'NIN',
    'scanner.ninStatus': 'NIN status',
    'scanner.ninValid': 'VALID',
    'scanner.arrivalTime': 'Arrival time',
    'scanner.confirmCheckin': 'Confirm check-in',
    'scanner.cancel': 'Cancel',

    // Interns
    'interns.title': 'Interns',
    'interns.search': 'Search by name or NIN...',
    'interns.allTypes': 'All types',
    'interns.allStatuses': 'All statuses',
    'interns.present': 'Present',
    'interns.absent': 'Absent',
    'interns.photo': 'Photo',
    'interns.fullName': 'Full name',
    'interns.type': 'Type',
    'interns.lastVisit': 'Last visit',
    'interns.status': 'Status',
    'interns.actions': 'Actions',
    'interns.viewProfile': 'View profile',

    // Profile
    'profile.title': 'Profile',
    'profile.back': 'Back to list',
    'profile.birthPlace': 'Place of birth',
    'profile.firstVisit': 'First visit',
    'profile.totalVisits': 'Total visits',
    'profile.cardScan': 'Card scan',
    'profile.weekVisits': 'Visits this week',
    'profile.totalTime': 'Total time',
    'profile.avgArrival': 'Average arrival',
    'profile.presence7days': 'Presence - Last 7 days',
    'profile.visitHistory': 'Visit history',

    // History
    'history.title': 'History',
    'history.stagiaire': 'Intern',
    'history.cardType': 'Card type',
    'history.date': 'Date',
    'history.arrival': 'Arrival',
    'history.departure': 'Departure',
    'history.duration': 'Duration',
    'history.status': 'Status',
    'history.complete': 'Complete',
    'history.print': 'Print report',

    // Table shared
    'table.date': 'Date',
    'table.arrival': 'Arrival',
    'table.departure': 'Departure',
    'table.duration': 'Duration',
    'table.status': 'Status',

    // Badges
    'badge.present': 'Present',
    'badge.absent': 'Absent',
  },

  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.scanner': 'الماسح',
    'nav.interns': 'المتدربون',
    'nav.history': 'السجل',

    // Sidebar
    'sidebar.management': 'الإدارة',
    'sidebar.role': 'مدير',

    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.totalToday': 'إجمالي المتدربين اليوم',
    'dashboard.presentNow': 'حاضرون حالياً',
    'dashboard.totalMonth': 'إجمالي الزيارات هذا الشهر',
    'dashboard.avgDuration': 'متوسط مدة الحضور',
    'dashboard.presentTitle': 'المتدربون الحاضرون حالياً',
    'dashboard.arrival': 'وقت الوصول',
    'dashboard.checkout': 'تسجيل الخروج',

    // Charts
    'chart.access7days': 'الوصول - آخر 7 أيام',
    'chart.distribution': 'التوزيع حسب نوع البطاقة',
    'chart.other': 'أخرى',

    // Scanner
    'scanner.title': 'الماسح',
    'scanner.camera': 'الكاميرا',
    'scanner.simulate': 'محاكاة المسح',
    'scanner.resultTitle': 'نتيجة المسح',
    'scanner.status.waiting': 'في انتظار المسح...',
    'scanner.status.detected': 'تم اكتشاف البطاقة',
    'scanner.status.processing': 'جاري المعالجة...',
    'scanner.cardType': 'نوع البطاقة',
    'scanner.name': 'الاسم',
    'scanner.firstName': 'اللقب',
    'scanner.birthDate': 'تاريخ الميلاد',
    'scanner.nin': 'رقم التعريف',
    'scanner.ninStatus': 'حالة رقم التعريف',
    'scanner.ninValid': 'صالح',
    'scanner.arrivalTime': 'وقت الوصول',
    'scanner.confirmCheckin': 'تأكيد تسجيل الدخول',
    'scanner.cancel': 'إلغاء',

    // Interns
    'interns.title': 'المتدربون',
    'interns.search': 'بحث بالاسم أو رقم التعريف...',
    'interns.allTypes': 'جميع الأنواع',
    'interns.allStatuses': 'جميع الحالات',
    'interns.present': 'حاضر',
    'interns.absent': 'غائب',
    'interns.photo': 'الصورة',
    'interns.fullName': 'الاسم الكامل',
    'interns.type': 'النوع',
    'interns.lastVisit': 'آخر زيارة',
    'interns.status': 'الحالة',
    'interns.actions': 'الإجراءات',
    'interns.viewProfile': 'عرض الملف',

    // Profile
    'profile.title': 'الملف الشخصي',
    'profile.back': 'العودة للقائمة',
    'profile.birthPlace': 'مكان الميلاد',
    'profile.firstVisit': 'أول زيارة',
    'profile.totalVisits': 'إجمالي الزيارات',
    'profile.cardScan': 'مسح البطاقة',
    'profile.weekVisits': 'زيارات هذا الأسبوع',
    'profile.totalTime': 'الوقت الإجمالي',
    'profile.avgArrival': 'متوسط وقت الوصول',
    'profile.presence7days': 'الحضور - آخر 7 أيام',
    'profile.visitHistory': 'سجل الزيارات',

    // History
    'history.title': 'السجل',
    'history.stagiaire': 'المتدرب',
    'history.cardType': 'نوع البطاقة',
    'history.date': 'التاريخ',
    'history.arrival': 'الوصول',
    'history.departure': 'المغادرة',
    'history.duration': 'المدة',
    'history.status': 'الحالة',
    'history.complete': 'مكتمل',
    'history.print': 'طباعة التقرير',

    // Table shared
    'table.date': 'التاريخ',
    'table.arrival': 'الوصول',
    'table.departure': 'المغادرة',
    'table.duration': 'المدة',
    'table.status': 'الحالة',

    // Badges
    'badge.present': 'حاضر',
    'badge.absent': 'غائب',
  },
}
