import { Sidebar } from "flowbite-react";
import { GoChecklist, GoTriangleRight } from "react-icons/go";

import { MdDashboard, MdFormatListBulletedAdd, MdOutlineArticle } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";
import SidebarItem from "./dashboardParts/SidebarItem";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (<section className="max-w-screen-xl mx-auto flex">
        <div className={`w-64 fixed bg-gray-50 md:static transition-all border-r md:border-0 border-title dark:border-lite top-0 z-40 md:z-20 h-screen md:h-auto ${isOpen ? "left-0" : "-left-64"}`}>
            <button
                className="absolute md:hidden -right-6 top-56 w-6 h-14 bg-lite dark:bg-gray-800 border border-l-0 border-title dark:border-lite text-title dark:text-lite text-5xl flex items-center rounded-r-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                <GoTriangleRight className={isOpen ? "rotate-180" : ""} />
            </button>

            <Sidebar className="dark:bg-gray-800">
                <Sidebar.Items>
                    <h3 className="text-title dark:text-lite uppercase text-2xl font-semibold flex items-center gap-2">
                        <span className="text-4xl text-primary"><MdDashboard /></span>
                        <span>Dashboard</span>
                    </h3>

                    <Sidebar.ItemGroup className="pt-10 text-lg uppercase">
                        <SidebarItem icon={IoHomeOutline} name="Home" to="/dashboard" />

                        <SidebarItem icon={VscDiffAdded} name="Add Marathon" to="/dashboard/add-marathon" />

                        <SidebarItem icon={MdFormatListBulletedAdd} name="Add Blog" to="/dashboard/add-blog" />

                        <SidebarItem icon={MdOutlineArticle} name="My Marathons" to="/dashboard/my-marathons" />

                        <SidebarItem icon={GrArticle} name="My Blogs" to="/dashboard/my-blogs" />

                        <SidebarItem icon={GoChecklist} name="My Applies" to="/dashboard/my-applies" />
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>

        <div className="grow max-w-full min-h-screen md:max-w-[calc(100%-256px)] bg-lite dark:bg-gray-900">
            <Outlet />
        </div>
    </section>);
};

export default Dashboard;