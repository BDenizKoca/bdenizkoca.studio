export const siteConfig = {
  title: 'Deniz Koca',
  siteUrl: 'https://bdenizkoca.studio',
  description: 'Minimalist Chaos in a digital workshop and notebook by Deniz Koca.',
  defaultLang: 'en' as const,
  accentColor: '#608da8',
  languages: [
    { code: 'en', label: 'EN', name: 'English', urlPrefix: '' },
    { code: 'tr', label: 'TR', name: 'Türkçe', urlPrefix: '/tr' }
  ],
  nav: {
    en: [
      { label: 'Projects', anchor: '#projects', path: '/projects/' },
      { label: 'Notes', anchor: '#notes', path: '/notes/' },
      { label: 'About', anchor: '#about', path: '/me/' }
    ],
    tr: [
      { label: 'Projeler', anchor: '#projects', path: '/tr/projeler/' },
      { label: 'Notlar', anchor: '#notes', path: '/tr/notlar/' },
      { label: 'Hakkımda', anchor: '#about', path: '/tr/ben/' }
    ]
  },
  social: {
    github: 'https://github.com/bdenizkoca',
    email: 'mailto:denizburakkoca@gmail.com',
    patreon: 'https://github.com/sponsors/BDenizKoca'
  }
};
