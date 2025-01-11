import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";
import NavItem from "./headerParts/NavItem";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { IoLogOutOutline } from "react-icons/io5";
import ThemeToggler from "./headerParts/ThemeToggler";
import { MdPlaylistAddCircle } from "react-icons/md";
import { RiFileList2Fill } from "react-icons/ri";
import { PiListPlusFill } from "react-icons/pi";

const custom = {
    "root": {
        "base": "px-2 py-2.5 bg-transparent gap-5 sm:px-4",
    },
    "collapse": {
        "base": "w-full lg:block lg:w-auto",
        "list": "mt-4 flex flex-col lg:mt-0 lg:flex-row lg:space-x-8 lg:text-sm lg:font-medium",
    },
    "toggle": {
        "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden border",
        "icon": "h-5 sm:h-6 w-5 dark:text-lite sm:w-6 shrink-0"
    },
}

const Header = () => {
    const { user, logOut, setDark } = useContext(AuthContext);
    const { photoURL, displayName, email } = user || {};
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

    return (<header ref={headerRef} className="px-3 fixed top-0 left-0 w-full z-30 bg-[#ffffffe2] border-b border-primary py-5 dark:bg-[#1f2937df]">
        <div className="max-w-screen-xl mx-auto">
            <Navbar fluid className="px-0" theme={custom}>
                <div className={"flex items-center grow gap-2 " + (user ? '' : 'py-[5px]')}>
                    <Link to="/home" className="uppercase font-bold text-base sm:text-2xl text-title dark:text-lite">
                        Marathon<span className="text-primary">Bold</span>
                    </Link>

                    <ThemeToggler setDark={setDark} />
                </div>

                <div className={"flex lg:order-1 items-center gap-2 " + (user ? 'lg:ml-5' : '')}>
                    <NavbarToggle />
                    {
                        user && <Dropdown
                            className="bg-white"
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" className="border rounded-full border-desc" img={photoURL} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <div className="flex items-center gap-2">
                                    <img src={photoURL} className="border border-desc w-10 h-10 object-cover rounded-full" />

                                    <div>
                                        <span className="block min-w-36 text-sm font-semibold">{displayName}</span>
                                        <span className="block truncate text-sm font-medium">
                                            {email}
                                        </span>
                                    </div>
                                </div>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <span className="text-2xl mr-2"><PiListPlusFill /></span>
                                <Link to="/dashboard/add-blog" className="text-left grow">Add Blog</Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <span className="text-2xl mr-2"><MdPlaylistAddCircle /></span>
                                <Link to="/dashboard/add-marathon" className="text-left grow">Add Marathon</Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                                <span className="text-2xl mr-2"><RiFileList2Fill /></span>
                                <Link to="/dashboard/my-marathons" className="text-left grow">My Marathons</Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <div onClick={logOut} className="text-red-500 font-semibold flex items-center gap-2 w-full">
                                    <span className="text-2xl"><IoLogOutOutline /></span>
                                    <span>Sign Out</span>
                                </div>
                            </Dropdown.Item>
                        </Dropdown>
                    }
                </div>

                <NavbarCollapse>
                    <NavItem name="Home" link="/home" />
                    <NavItem name="Marathons" link="/marathons" />
                    <NavItem name="Blogs" link="/blogs" />
                    <NavItem name="Contact" link="/contact" />
                    {user ? <NavItem name="Dashboard" link="/dashboard" /> : <>
                        <NavItem name="Login" link="/login" />
                        <NavItem name="Register" link="/register" />
                    </>}
                </NavbarCollapse>
            </Navbar>
        </div>
    </header>);
}

export default Header;