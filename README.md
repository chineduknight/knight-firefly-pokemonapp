# Knight Pokémon – Firefly Assignment (Frontend)

A polished, interactive Pokémon Explorer built as part of the Firefly Full‑Stack Engineer take‑home assignment.  
This project showcases clean architecture, strong UI/UX, React Query caching, infinite scrolling, and a beautifully animated Pokémon details modal.

## 🚀 Demo (Optional)
If hosted, add link here (e.g. Netlify or Vercel).

## 📘 Table of Contents
- [About The App](#about-the-app)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Approach](#approach)
- [Bonus Enhancements](#bonus-enhancements)
- [Status](#status)
- [Credits](#credits)
- [License](#license)

---

## 🎯 About The App

Knight Pokémon is a modern web app that fetches Pokémon data from a custom backend connected to PokeAPI.  
It provides a smooth browsing experience with large Pokémon cards, infinite scrolling, detailed modal views, and favorites management stored in MongoDB.

The application focuses on:
- Clean architecture  
- Reusable hooks  
- Component-driven UI  
- Real-world engineering tradeoffs  
- Exceptional UX polish  

Built for **Firefly** as a senior‑level demonstration of full‑stack proficiency.

---

## ✨ Features

### Core Requirements
- View the first 150 Pokémon  
- Search by name  
- View detailed Pokémon info: types, abilities, evolution chain  
- Add / remove favorites (persistent via backend)  
- Display favorites within the list  
- Backend communication with React Query  

### Bonus Enhancements
- **Infinite scrolling** with Intersection Observer  
- **Animated modal transitions** using Framer Motion  
- **Clickable evolution chips** that load other Pokémon in place  
- Large card-based UI with hover motion  
- “Knight Pokémon” banner and polished theme  
- Fully typed TypeScript API + domain models  
- Unified API response envelope + robust error handling  

---

## 🖼️ Screenshots

Add your own images or URLs, e.g.:

```
<img src="your-image-url" width="600" />
```

---

## 🧰 Technologies

**Frontend:**
- React + Vite  
- TypeScript  
- Chakra UI  
- React Query  
- Axios  
- Framer Motion  

**Backend:**
- Node.js / Express  
- TypeScript  
- MongoDB + Mongoose  
- PokeAPI  

---

## 📂 Project Structure

```
src/
  api/
  components/
    pokemon/
    common/
  hooks/
  pages/
  state/
  types/
  theme/
```

---

## ⚙️ Setup

### 1. Clone repo

```
git clone https://github.com/your-username/firefly-pokemon.git
cd firefly-pokemon/frontend
```

### 2. Install deps

```
yarn install
```

### 3. Run backend (must be on http://localhost:4000)

### 4. Start frontend

```
yarn dev
```

---

## 🧠 Approach

- Feature-based architecture  
- Reusable hooks:
  - `usePokemonList`  
  - `usePokemonDetails`  
  - `useFavoriteActions`  
  - `useUiState`  
- React Query handles caching + invalidation  
- Chakra UI provides accessibility & responsiveness  
- Framer Motion adds subtle transitions  
- Clean Code principles: separation of concerns, typed boundaries, predictable state  

---

## 🌟 Bonus Enhancements

- In-place evolution navigation  
- Animated detail transitions  
- Infinite scroll + lazy loading  
- Custom loader, error states, and empty screens  
- Responsive card grid  

---

## 🚧 Status

Production-ready version for Firefly assignment.

---

## 👨🏾‍💻 Credits

Developed by **Chinedu Knight**  
https://chineduknight.com  

---

## 📄 License

MIT
