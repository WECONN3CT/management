# 🎯 Konsolidierter Branch - Setup Guide

## Branch Info

**Branch Name:** `claude/consolidated-stories-1-to-6.2-011CUQNpy9xJ5Cf1z9LVJys1`

**Enthält:** Alle Stories von 1 bis 6.2 vollständig zusammengeführt

---

## ✅ Setup-Anleitung

### 1. Branch auschecken

```bash
cd management/customer-platform
git fetch origin
git checkout claude/consolidated-stories-1-to-6.2-011CUQNpy9xJ5Cf1z9LVJys1
```

### 2. Dependencies installieren

```bash
pnpm install
```

### 3. Development Server starten

```bash
pnpm dev
```

Die Anwendung läuft auf: http://localhost:3000

---

## 📦 Enthaltene Features

### ✅ Story 2.1 - Login Screen
- **URL:** `/login`
- **Features:** Fake Auth, Auto-Redirect nach Login
- **Test:** Beliebige Email/Passwort eingeben

### ✅ Story 3.1 - Dashboard Overview
- **URL:** `/dashboard`
- **Features:**
  - Stats Cards (Active Customers, Projects, Tasks)
  - Project Chart (recharts)
  - Deadlines List
  - Team Workload
  - Recent Activity Feed

### ✅ Story 4.1 - Customer List
- **URL:** `/customers`
- **Features:**
  - Card & Table View Toggle
  - Search by name
  - Filter by status
  - Sort by various fields

### ✅ Story 4.2 - Customer Detail Modal
- **Features:**
  - Click auf Customer öffnet Modal
  - View/Edit Mode Toggle
  - Customer Info bearbeiten (visual only)

### ✅ Story 5.1 - Project List
- **URL:** `/projects`
- **Features:**
  - Grid View mit Project Cards
  - Filter nach Status (planning, in_development, review, completed)
  - Filter nach Type (website, app, software, marketing)
  - Search by project name
  - Click on card → navigates to detail

### ✅ Story 5.2 - Project Detail Page
- **URL:** `/projects/[id]`
- **Features:**
  - Project Overview (Info, Timeline, Team)
  - Story Statistics
  - Tab Navigation (Overview, Kanban, Backlog)
  - Click "View Kanban Board" → navigates to kanban

### ✅ Story 5.3 - AI Project Wizard (Mockup)
- **URL:** `/projects` → "Create Project" Button
- **Features:**
  - Multi-Step Wizard UI (visual only)
  - AI Assistent Mockup
  - Form für Project Details

### ✅ Story 6.1 & 6.2 - Kanban Board + Story Cards
- **URL:** `/projects/[id]/kanban`
- **Features:**
  - 5 Columns: Backlog → Ready → In Development → Review → Done
  - Story Cards mit:
    - Story ID, Title, Priority Badge
    - Assignee Avatar & Name
    - Deadline mit Overdue Indicator
    - Acceptance Criteria Count
  - Drag & Drop zwischen Columns (@dnd-kit)
  - Filter by Assignee
  - Filter by Priority
  - Search Stories by Title
  - Click Card → navigates to story detail (TBD in Story 7.1)

---

## 📁 Projekt-Struktur

```
customer-platform/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   └── login/page.tsx                    # Story 2.1
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx                # Story 3.1
│   │   ├── customers/page.tsx                # Story 4.1
│   │   ├── projects/
│   │   │   ├── page.tsx                      # Story 5.1
│   │   │   └── [id]/
│   │   │       ├── page.tsx                  # Story 5.2
│   │   │       └── kanban/page.tsx           # Story 6.1
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── customers/
│   │   ├── customer-card.tsx                 # Story 4.1
│   │   ├── customer-table.tsx                # Story 4.1
│   │   └── customer-detail-modal.tsx         # Story 4.2
│   ├── dashboard/
│   │   ├── stats-card.tsx                    # Story 3.1
│   │   ├── project-chart.tsx                 # Story 3.1
│   │   ├── deadlines-list.tsx                # Story 3.1
│   │   ├── team-workload.tsx                 # Story 3.1
│   │   └── recent-activity.tsx               # Story 3.1
│   ├── projects/
│   │   ├── project-card.tsx                  # Story 5.1
│   │   └── ai-wizard-mockup.tsx              # Story 5.3
│   ├── kanban/
│   │   ├── story-card.tsx                    # Story 6.2
│   │   ├── kanban-column.tsx                 # Story 6.1
│   │   └── kanban-filters.tsx                # Story 6.1
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── top-bar.tsx
│   │   └── mobile-sidebar.tsx
│   └── ui/                                    # shadcn/ui components
├── lib/
│   ├── mock-data.ts                          # Mock Data & API functions
│   ├── types.ts                              # TypeScript Types
│   └── utils.ts                              # Utility functions
└── middleware.ts                              # Auth Middleware
```

---

## 🔧 Technologie-Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **React:** 19.2.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui + Radix UI
- **Icons:** lucide-react
- **Theme:** next-themes (Dark Mode Support)

### State Management
- **Global State:** Zustand
- **Forms:** React Hook Form (planned)
- **Date Handling:** date-fns

### Drag & Drop
- **Library:** @dnd-kit/core
- **Packages:** @dnd-kit/sortable, @dnd-kit/utilities

### Animations
- **Library:** framer-motion

### Charts
- **Library:** recharts (in dashboard)

---

## 🧪 Test-Anleitung

### 1. Login (Story 2.1)
1. App starten → automatischer Redirect zu `/login`
2. Beliebige Email/Passwort eingeben
3. "Sign in" klicken → Redirect zu `/dashboard`

### 2. Dashboard (Story 3.1)
1. Stats Cards sollten Zahlen anzeigen
2. Project Chart sollte sichtbar sein
3. Deadlines List zeigt kommende Deadlines
4. Recent Activity zeigt letzte Aktivitäten

### 3. Customers (Story 4.1 & 4.2)
1. Sidebar → "Customers" klicken
2. Toggle zwischen Card/Table View
3. Search-Field testen
4. Filter testen
5. Customer klicken → Modal öffnet sich
6. "Edit" Button im Modal → Edit Mode aktivieren

### 4. Projects (Story 5.1, 5.2, 5.3)
1. Sidebar → "Projects" klicken
2. Filter nach Status/Type testen
3. Search testen
4. Project Card klicken → Detail Page öffnet sich
5. Tabs testen (Overview, Kanban, Backlog)
6. "Create Project" Button → AI Wizard Modal öffnet sich
7. "View Kanban Board" Button → Kanban öffnet sich

### 5. Kanban Board (Story 6.1 & 6.2)
1. Project Detail → "Kanban" Tab oder "View Kanban Board" Button
2. Story Cards sollten in 5 Columns angezeigt werden
3. Drag & Drop testen:
   - Story Card aus "Backlog" nach "Ready" ziehen
   - Story Card zwischen beliebigen Columns verschieben
4. Filter testen:
   - Filter by Assignee (Dropdown)
   - Filter by Priority (Dropdown)
5. Search testen (Title-Search)
6. Story Card klicken → Navigation zu Story Detail (404 - kommt in Story 7.1)

---

## 🐛 Bekannte Issues

### Phase 1 - Visual Only
- ⚠️ **Keine Persistenz:** Änderungen werden NICHT gespeichert
- ⚠️ **Drag & Drop:** Änderungen gehen beim Refresh verloren
- ⚠️ **Fake Data:** Alle Daten sind Mock-Daten
- ⚠️ **Forms:** Formulare sind visuell, speichern aber nichts
- ⚠️ **Story Detail:** Klick auf Story Card navigiert zu 404 (kommt in Story 7.1)

---

## 📊 Dependencies

### Alle installierten Packages:

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.546.0",
    "next": "16.0.0",
    "next-themes": "^0.4.6",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "tailwind-merge": "^3.3.1",
    "zustand": "^5.0.8"
  }
}
```

---

## 🚀 Nächste Stories

### Story 7.1 - Story Detail View
- Implementierung der Story-Detail-Seite
- URL: `/projects/[projectId]/stories/[storyId]`
- Zeigt Story-Details, Acceptance Criteria, Comments

### Story 7.2 - Story Creation/Edit
- Formular zum Erstellen neuer Stories
- Edit-Modus für bestehende Stories

---

## 🆘 Troubleshooting

### Problem: `pnpm install` schlägt fehl
**Lösung:**
```bash
# Cache leeren
rm -rf node_modules
rm pnpm-lock.yaml

# Neu installieren
pnpm install
```

### Problem: TypeScript Errors
**Lösung:**
```bash
# Type-Check durchführen
pnpm type-check

# Bei Errors: Node Modules neu installieren
```

### Problem: Port 3000 bereits belegt
**Lösung:**
```bash
# Port ändern
PORT=3001 pnpm dev
```

### Problem: Hot Reload funktioniert nicht
**Lösung:**
```bash
# Dev Server neu starten
pnpm dev
```

---

## 📞 Support

Bei Problemen oder Fragen:
1. Branch-Übersicht: `BRANCH-OVERVIEW.md`
2. Story 6.2 Review: `STORY-6.2-REVIEW.md`
3. Dieses Dokument: `CONSOLIDATED-BRANCH-GUIDE.md`

---

**Status:** ✅ Ready to use!
**Last Update:** 2025-10-23
**Branch:** `claude/consolidated-stories-1-to-6.2-011CUQNpy9xJ5Cf1z9LVJys1`
