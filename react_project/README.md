# World Atlas React App

A modern, interactive React application to explore countries around the world. Features include country search, filtering, sorting, dark mode, favorites, country comparison, and an interactive map. The app uses public APIs and axios for data fetching.

## Features

- 🌍 Browse and search countries
- 🔍 Filter by region and search by name
- ⬆️⬇️ Sort countries alphabetically (Asc/Desc)
- 🌙 Dark mode toggle
- ❤️ Add countries to favorites and view them on a dedicated page
- 📊 Compare multiple countries side-by-side
- 🗺️ Interactive world map (powered by react-leaflet)
- 🏳️ View country details (flag, population, region, capital, etc.)
- 🏷️ Multi-language support (English, Spanish, French)
- ⚡ Offline support (caches country data in localStorage)

## Tech Stack

- **React** (Vite)
- **React Router** for navigation
- **Axios** for API calls (see `/src/api/postApi.jsx`)
- **react-leaflet** for the interactive map
- **react-i18next** for translations
- **CSS** for modern, responsive styling

## API Usage

- Country data is fetched using axios from a public REST API (see `/src/api/postApi.jsx`).
- All API calls are handled with axios for reliability and easy error handling.
- Data is cached in localStorage for offline use.

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/amol-2027/world-atlas-react.git
   cd world-atlas-react
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Folder Structure

- `src/` - Main source code
  - `components/` - UI components
  - `pages/` - Page components (Home, Country, Favorites, etc.)
  - `api/postApi.jsx` - All axios API calls

## Author

- [amol-2027 on GitHub](https://github.com/amol-2027)

---

Feel free to fork, star, and contribute to this project!
