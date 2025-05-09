
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'system';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    'settings.notifications': 'Notifications',
    'settings.notifications.description': 'Manage your notification preferences',
    'settings.email': 'Email Notifications',
    'settings.email.description': 'Receive email updates about your account',
    'settings.push': 'Push Notifications',
    'settings.push.description': 'Receive push notifications in your browser',
    'settings.appearance': 'Appearance',
    'settings.appearance.description': 'Customize how Keys-AI looks on your device',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.system': 'System',
    'settings.language': 'Language & Region',
    'settings.language.description': 'Set your preferred language and region',
    'settings.lang': 'Language',
    'settings.timezone': 'Time Zone',
    'settings.privacy': 'Privacy & Security',
    'settings.privacy.description': 'Manage your privacy and security settings',
    'settings.2fa': 'Two-Factor Authentication',
    'settings.2fa.description': 'Add an extra layer of security to your account',
    'settings.activity': 'Activity Log',
    'settings.activity.description': 'Keep track of your account activity',
    'settings.save': 'Save Changes',
    'settings.success': 'Settings saved successfully!',
  },
  es: {
    'settings.notifications': 'Notificaciones',
    'settings.notifications.description': 'Administra tus preferencias de notificación',
    'settings.email': 'Notificaciones de Correo',
    'settings.email.description': 'Recibe actualizaciones por correo sobre tu cuenta',
    'settings.push': 'Notificaciones Push',
    'settings.push.description': 'Recibe notificaciones push en tu navegador',
    'settings.appearance': 'Apariencia',
    'settings.appearance.description': 'Personaliza cómo se ve Keys-AI en tu dispositivo',
    'settings.theme': 'Tema',
    'settings.light': 'Claro',
    'settings.dark': 'Oscuro',
    'settings.system': 'Sistema',
    'settings.language': 'Idioma y Región',
    'settings.language.description': 'Configura tu idioma y región preferidos',
    'settings.lang': 'Idioma',
    'settings.timezone': 'Zona Horaria',
    'settings.privacy': 'Privacidad y Seguridad',
    'settings.privacy.description': 'Administra tu configuración de privacidad y seguridad',
    'settings.2fa': 'Autenticación de Dos Factores',
    'settings.2fa.description': 'Añade una capa extra de seguridad a tu cuenta',
    'settings.activity': 'Registro de Actividad',
    'settings.activity.description': 'Mantén un registro de la actividad de tu cuenta',
    'settings.save': 'Guardar Cambios',
    'settings.success': '¡Configuración guardada con éxito!',
  },
  fr: {
    'settings.notifications': 'Notifications',
    'settings.notifications.description': 'Gérer vos préférences de notification',
    'settings.email': 'Notifications par Email',
    'settings.email.description': 'Recevez des mises à jour par email concernant votre compte',
    'settings.push': 'Notifications Push',
    'settings.push.description': 'Recevez des notifications push dans votre navigateur',
    'settings.appearance': 'Apparence',
    'settings.appearance.description': 'Personnalisez l\'apparence de Keys-AI sur votre appareil',
    'settings.theme': 'Thème',
    'settings.light': 'Clair',
    'settings.dark': 'Sombre',
    'settings.system': 'Système',
    'settings.language': 'Langue et Région',
    'settings.language.description': 'Définissez votre langue et région préférées',
    'settings.lang': 'Langue',
    'settings.timezone': 'Fuseau Horaire',
    'settings.privacy': 'Confidentialité et Sécurité',
    'settings.privacy.description': 'Gérez vos paramètres de confidentialité et de sécurité',
    'settings.2fa': 'Authentification à Deux Facteurs',
    'settings.2fa.description': 'Ajoutez une couche supplémentaire de sécurité à votre compte',
    'settings.activity': 'Journal d\'Activité',
    'settings.activity.description': 'Suivez l\'activité de votre compte',
    'settings.save': 'Enregistrer les Modifications',
    'settings.success': 'Paramètres enregistrés avec succès !',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to system
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'system';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  // Function to get the system language
  const getSystemLanguage = (): 'en' | 'es' | 'fr' => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') return 'es';
    if (browserLang === 'fr') return 'fr';
    return 'en'; // Default to English for any other language
  };

  // Translation function
  const t = (key: string): string => {
    const currentLang = language === 'system' ? getSystemLanguage() : language;
    return translations[currentLang]?.[key] || key;
  };

  const value = { language, setLanguage, t };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
