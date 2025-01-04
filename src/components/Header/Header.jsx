import { Link } from "react-router-dom";
import { Navbar, NavbarCollapse, NavbarToggle, Tooltip } from "flowbite-react";
import NavItem from "./headerParts/NavItem";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoLogOutOutline } from "react-icons/io5";
import ThemeToggler from "./headerParts/ThemeToggler";

const Header = () => {
    const { user, logOut, setDark } = useContext(AuthContext);
    const { photoURL, displayName } = user || {};
    const headerRef = useRef();

    useEffect(() => {
        let prev;
        window.onscroll = () => {
            if (prev > window.scrollY) {
                headerRef.current.style.top = "0";
            } else {
                headerRef.current.style.top = "-200px"
            }

            prev = window.scrollY;
        }
    }, []);

    return (<header ref={headerRef} className="fixed top-0 left-0 w-full z-30 bg-white border-b border-primary py-5 dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto">
            <Navbar>
                <div className="flex items-center gap-2">
                    <Link to="/home" className="uppercase font-bold text-xl sm:text-2xl text-title dark:text-lite">
                        Marathon<span className="text-primary">Bold</span>
                    </Link>

                    <ThemeToggler setDark={setDark} />
                </div>

                <NavbarToggle />

                <NavbarCollapse>
                    <NavItem name="Home" link="/home" />
                    <NavItem name="Marathons" link="/marathons" />
                    {user ? <>
                        <NavItem name="Dashboard" link="/dashboard" />

                        <li className="flex items-center gap-2">
                            <Tooltip content={displayName}>
                                <img src={photoURL} className="w-10 h-10 rounded-full" />
                            </Tooltip>

                            <Tooltip content="Logout">
                                <button onClick={logOut} className="text-4xl text-red-500">
                                    <IoLogOutOutline />
                                </button>
                            </Tooltip>

                        </li>
                    </> : <>
                        <NavItem name="Login" link="/login" />
                        <NavItem name="Register" link="/register" />
                    </>}
                </NavbarCollapse>
            </Navbar>
        </div>
    </header>);
}

export default Header;