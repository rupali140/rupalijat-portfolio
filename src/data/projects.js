// Verified, live projects only — each links to a real working demo.
// category drives the Projects filter buttons.
export const projects = [
  {
    id: 'sales-ai-analytics',
    title: 'Sales AI Analytics',
    tag: 'Forecasting',
    category: 'data-ai',
    summary: 'A sales forecasting dashboard that predicts upcoming revenue trends and surfaces at-risk regions early.',
    description:
      'An interactive Streamlit app that forecasts upcoming sales revenue from historical transaction data and flags regions trending at risk, so the next few weeks are easier to plan for.',
    stack: ['Python', 'Streamlit', 'Pandas'],
    link: 'https://sales-ai-dashboard-4rdp.onrender.com',
    github: null,
  },
  {
    id: 'ai-interview-prep-bot',
    title: 'AI Interview Prep Bot',
    tag: 'AI Application',
    category: 'data-ai',
    summary: 'Generates role-specific interview questions and gives AI-assisted feedback on typed answers.',
    description:
      'A Flask web app that generates role-specific interview questions, accepts typed answers, and gives AI-assisted feedback to help with interview preparation — with session history so progress carries over between visits.',
    stack: ['Python', 'Flask', 'SQLite'],
    link: 'https://ai-interview-v2.onrender.com',
    github: 'https://github.com/rupali140/ai-interview-v2',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    tag: 'Dashboarding',
    category: 'web',
    summary: 'Tracks personal expenses, transaction history, and remaining savings against a budget.',
    description:
      'A lightweight web app for tracking personal expenses — recording transactions, viewing history, and calculating remaining savings based on total available money and spending.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://rupali140.github.io/expense-tracker/',
    github: 'https://github.com/rupali140/expense-tracker',
  },
]

export const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'data-ai', label: 'Data & AI' },
  { id: 'web', label: 'Web Development' },
]
