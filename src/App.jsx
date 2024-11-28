import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Weather from './pages/Weather.jsx';
import HackerStories from './pages/HackerStories.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Router</h1>
      <BrowserRouter basename="/react-router/">
        <header>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="about">About</NavLink>
            <NavLink to="weather">Weather</NavLink>
            <NavLink to="hackerstories">HackerStories</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="weather" element={<Weather />} />
            <Route path="hackerstories" element={<HackerStories />} />
          </Routes>
        </main>
      </BrowserRouter>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App