// Verified skills only — drawn from Rupali's stated skill set and the
// technologies actually used in her live projects (see data/projects.js).
export const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'Java', 'JavaScript'],
  },
  {
    category: 'Data & Analysis',
    items: ['Pandas', 'Excel'],
  },
  {
    category: 'Apps & Backend',
    items: ['Streamlit', 'Flask', 'HTML', 'CSS'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'SQLite'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub'],
  },
]

// Flat list for the orbital skill visualization — order determines orbit
// position. Keep this in sync with skillGroups above.
export const orbitalSkills = [
  { name: 'Python', category: 'Languages', tip: 'Primary language for data work, scripting, and backend logic.' },
  { name: 'SQL', category: 'Languages', tip: 'Querying and shaping relational data.' },
  { name: 'Pandas', category: 'Data & Analysis', tip: 'Cleaning, transforming, and analyzing tabular data.' },
  { name: 'Streamlit', category: 'Apps & Backend', tip: 'Turning analysis into interactive, shareable apps.' },
  { name: 'Flask', category: 'Apps & Backend', tip: 'Lightweight Python web framework for backend APIs.' },
  { name: 'MySQL', category: 'Databases', tip: 'Relational database design and persistence.' },
  { name: 'SQLite', category: 'Databases', tip: 'Lightweight embedded database for local data storage.' },
  { name: 'Java', category: 'Languages', tip: 'Object-oriented programming and backend logic.' },
  { name: 'JavaScript', category: 'Languages', tip: 'Client-side interactivity and dynamic behavior.' },
  { name: 'Git', category: 'Tools', tip: 'Version control for every project.' },
  { name: 'GitHub', category: 'Tools', tip: 'Hosting code and shipping live demos.' },
]
