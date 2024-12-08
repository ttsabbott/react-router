import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";

// layouts
import RootLayout from './layouts/RootLayout.jsx';
import HelpLayout from './layouts/HelpLayout.jsx';
import CareersLayout from './layouts/CareersLayout.jsx';
import BlogLayout from './layouts/BlogLayout.jsx';

// pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Weather from './pages/weather/Weather.jsx';
import HackerStories from './pages/hackerstories/HackerStories.jsx';
import Faq from './pages/help/Faq.jsx';
import Contact, { contactAction } from './pages/help/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import Careers from './pages/careers/Careers.jsx';
//import CareerDetails from './pages/careers/CareerDetails.jsx';
//import Careers, { careersLoader } from './pages/careers/Careers.jsx';
//import CareerDetails, { careerDetailsLoader } from './pages/careers/CareerDetails.jsx';
import CareerDetails from './pages/careers/CareerDetails.jsx';
import CareersError from './pages/careers/CareersError.jsx';
import BlogHome from './pages/blogs/BlogHome.jsx';
import BlogCreate from './pages/blogs/BlogCreate.jsx';
import BlogDetails from './pages/blogs/BlogDetails.jsx';

const baseUrl = import.meta.env.BASE_URL; // Static replacement during build

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="blogs" element={<BlogLayout />}>
        <Route path="bloghome" element={<BlogHome />} />
        <Route path="blogcreate" element={<BlogCreate />} />
        <Route path=":id" element={<BlogDetails />} />
      </Route>
      <Route path="weather" element={<Weather />} />
      <Route path="hackerstories" element={<HackerStories />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} action={contactAction} />
      </Route>
      <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
        <Route index element={<Careers />} />
        {/*
        <Route path=":id" element={<CareerDetails />} />
        <Route index element={<Careers />} loader={careersLoader} />
        */}
        <Route path=":id" element={<CareerDetails />} /> {/*} loader={careerDetailsLoader} /> */}
        {/* Note: errorElement could also be put on the sub-routes */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  { basename: "/react-router", }
);

function App() {
  const [count, setCount] = useState(0);
  const imageUrl = "/The Road to React.png";
  return (
    <div id="appMain">
      <div className="center-me">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={import.meta.env.BASE_URL + "/vite.svg"} className="logo" alt="Vite logo #2" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo" alt="React logo" />
        </a>
        <a href="https://www.roadtoreact.com/" target="_blank">
          <img src={`${baseUrl}${imageUrl}`} className="logo" alt="The Road to React" />
        </a>
        <hr />
        <br />
      </div>
      <RouterProvider router={router} />
      {/* <BrowserRouter basename={import.meta.env.BASE_URL}>
        <header>
          <nav>
            <h1>React Router</h1>
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
      </BrowserRouter> */}
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
    </div>
  );
};

export default App;
