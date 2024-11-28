import { NavLink, Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>React Router</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="about">About</NavLink>
                    <NavLink to="weather">Weather</NavLink>
                    <NavLink to="hackerstories">Hacker Stories</NavLink>
                    <NavLink to="contactus">Contact Us</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}
