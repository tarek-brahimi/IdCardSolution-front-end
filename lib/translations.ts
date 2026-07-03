export type Locale = 'fr' | 'en' | 'ar' | 'kab'

export const locales: Locale[] = ['fr', 'en', 'ar', 'kab']

export const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
  kab: 'Taqbaylit',
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
    'history.ongoing': 'En cours',
    'history.print': 'Imprimer le rapport',

    // Header
    'header.notifications': 'Notifications',

    // Profile
    'profile.notFound': 'Profil introuvable',

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
    'history.ongoing': 'In progress',
    'history.print': 'Print report',

    // Header
    'header.notifications': 'Notifications',

    // Profile
    'profile.notFound': 'Profile not found',

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
    'history.ongoing': 'جاري',
    'history.print': 'طباعة التقرير',

    // Header
    'header.notifications': 'الإشعارات',

    // Profile
    'profile.notFound': 'الملف الشخصي غير موجود',

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

  kab: {
    // Navigation
    'nav.dashboard': 'Awalen n usenfad',
    'nav.scanner': 'Askan',
    'nav.interns': 'Inelmaden',
    'nav.history': 'Amagnu',

    // Sidebar
    'sidebar.management': 'Asbeddu',
    'sidebar.role': 'Anagraw',

    // Dashboard
    'dashboard.title': 'Awalen n usenfad',
    'dashboard.totalToday': 'Amrid n yinelmaden assa',
    'dashboard.presentNow': 'Yella tura',
    'dashboard.totalMonth': 'Amrid n yuraren waggura-agi',
    'dashboard.avgDuration': 'Amsegher n uzrad',
    'dashboard.presentTitle': 'Inelmaden yellen tura',
    'dashboard.arrival': 'Akeččuṛ',
    'dashboard.checkout': 'Tawlaft',

    // Charts
    'chart.access7days': 'Anekcum – 7 issuran i ɣef yuwa',
    'chart.distribution': 'Aserser s wanus n tkarḍit',
    'chart.other': 'Wayeḍ',

    // Scanner
    'scanner.title': 'Askan',
    'scanner.camera': 'Takamiwt',
    'scanner.simulate': 'Saliw askan',
    'scanner.resultTitle': 'Agmuḍ n uskan',
    'scanner.status.waiting': 'Yerra kun s uskan...',
    'scanner.status.detected': 'Takarḍit ttwafṛen',
    'scanner.status.processing': 'Yettwasefrek...',
    'scanner.cardType': 'Ananus n tkarḍit',
    'scanner.name': 'Isem',
    'scanner.firstName': 'Isem n leqdac',
    'scanner.birthDate': 'Azemal n teyyurt',
    'scanner.nin': 'NIN',
    'scanner.ninStatus': 'Addad n NIN',
    'scanner.ninValid': 'IH',
    'scanner.arrivalTime': 'Akud n ukeččuṛ',
    'scanner.confirmCheckin': 'Sugem tuqqna',
    'scanner.cancel': 'Sefsex',

    // Interns
    'interns.title': 'Inelmaden',
    'interns.search': 'Nadi s isem neɣ NIN...',
    'interns.allTypes': 'Yemma-d iwanen',
    'interns.allStatuses': 'Yemma-d iaddaden',
    'interns.present': 'Yella',
    'interns.absent': 'Ulac-it',
    'interns.photo': 'Tawlaft',
    'interns.fullName': 'Isem ummid',
    'interns.type': 'Ananus',
    'interns.lastVisit': 'Aseɣẓan aneggaru',
    'interns.status': 'Addad',
    'interns.actions': 'Tigawin',
    'interns.viewProfile': 'Wali akaḍar',

    // Profile
    'profile.title': 'Akaḍar',
    'profile.back': 'Uɣal ɣer tebdart',
    'profile.birthPlace': 'Adeg n teyyurt',
    'profile.firstVisit': 'Aseɣẓan amenzu',
    'profile.totalVisits': 'Amrid n yiseɣẓanen',
    'profile.cardScan': 'Askan n tkarḍit',
    'profile.weekVisits': 'Iseɣẓanen n wayur-agi',
    'profile.totalTime': 'Akud ummid',
    'profile.avgArrival': 'Amsegher n ukeččuṛ',
    'profile.presence7days': 'Ussan – 7 issuran i ɣef yuwa',
    'profile.visitHistory': 'Amagnu n yiseɣẓanen',

    // History
    'history.title': 'Amagnu',
    'history.stagiaire': 'Anelmad',
    'history.cardType': 'Ananus n tkarḍit',
    'history.date': 'Azemal',
    'history.arrival': 'Akeččuṛ',
    'history.departure': 'Tawlaft',
    'history.duration': 'Azrad',
    'history.status': 'Addad',
    'history.complete': 'Igem',
    'history.ongoing': 'Yella s wakud',
    'history.print': 'Siggez asefrak',

    // Header
    'header.notifications': 'Ilɣa',

    // Profile
    'profile.notFound': 'Akaḍar ur yettwaf',

    // Table shared
    'table.date': 'Azemal',
    'table.arrival': 'Akeččuṛ',
    'table.departure': 'Tawlaft',
    'table.duration': 'Azrad',
    'table.status': 'Addad',

    // Badges
    'badge.present': 'Yella',
    'badge.absent': 'Ulac-it',
  },
}
