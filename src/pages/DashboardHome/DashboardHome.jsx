import { Card } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { BiRun } from "react-icons/bi";
import { Link } from "react-router-dom";
import { VscDiffAdded } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../components/reusuable/Loading";
import { GoChecklist } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { GrArticle } from "react-icons/gr";
import CountUp from "react-countup";
import { MdFormatListBulletedAdd } from "react-icons/md";

const linkClasses = "uppercase text-primary hover:text-lite text-sm xl:text-lg inline-flex items-center gap-2 border border-primary rounded-md px-3 py-1 hover:bg-primary";

const DashboardHome = () => {
    const { logOut, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [marathonCount, setMarathonCount] = useState(0);
    const [applyCount, setApplyCount] = useState(0);
    const [blogCount, setBlogCount] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios.post("https://a11-server-weld.vercel.app/entries-count", { email: user.email }, { withCredentials: true })
            .then(res => {
                setMarathonCount(res.data.marathonCount);
                setApplyCount(res.data.applyCount);
                setBlogCount(res.data.blogsCount)
                setLoading(false);
            }).catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    logOut();
                }
                setLoading(false);
            })
    }, [user, logOut])

    return (<section className="py-10 pb-24 px-2 xl:px-10">
        <Helmet>
            <title>Dashboard - MarathonBold</title>
        </Helmet>

        <h2 className="text-2xl text-title dark:text-lite">Welcome <span className="font-semibold text-primary">{user.displayName}</span></h2>
        <p className="text-lg text-desc dark:text-lite mb-10">Here you can browse your created marathons, create and modify them. You can view your registrations as well. So explore as your wish and do something new and productive.</p>

        <h3 className="text-title dark:text-lite pb-1 border-b border-desc text-xl font-semibold mb-5">Overview</h3>
        <div className="grid justify-center sm:grid-cols-2 gap-3 relative min-h-52">
            <Loading loading={loading} />

            {!loading && <>
                <Card className="max-w-sm" horizontal>
                    <div className="flex flex-col lg:flex-row gap-5 items-center">
                        <div className="border border-primary text-primary rounded-full p-8 xl:p-10 text-5xl xl:text-6xl">
                            <BiRun />
                        </div>

                        <div className="text-center lg:text-left">
                            <h5 className="text-xl xl:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {marathonCount > 0 ? <>
                                    <span className="text-primary">
                                        <CountUp duration={2} end={marathonCount} />
                                    </span> Marathon{marathonCount > 1 ? 's' : ''}</> : "No Marathon"}
                            </h5>
                            <p className="font-normal text-gray-700 mb-5 dark:text-gray-400">
                                {marathonCount > 0 ? `You have added ${marathonCount} Marathon${marathonCount > 1 ? 's' : ''} still now. Keep it up.` : "Start creating maraton from today to try someting new."}
                            </p>

                            <Link
                                className={linkClasses}
                                to={marathonCount > 0 ? '/dashboard/my-marathons' : '/dashboard/add-marathon'}
                            >
                                {marathonCount > 0 ? <>
                                    <span className="text-2xl"><CiViewList /></span>
                                    <span>My Marathons</span>
                                </> : <>
                                    <span className="text-2xl"><VscDiffAdded /></span>
                                    <span>Add New</span>
                                </>}

                            </Link>
                        </div>
                    </div>
                </Card>

                <Card className="max-w-sm" horizontal>
                    <div className="flex flex-col lg:flex-row gap-5 items-center">
                        <div className="border border-primary text-primary rounded-full p-8 xl:p-10 text-5xl xl:text-6xl">
                            <GoChecklist />
                        </div>

                        <div className="text-center lg:text-left">
                            <h5 className="text-xl xl:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {applyCount > 0 ? <>
                                    <span className="text-primary">
                                        <CountUp duration={2} end={applyCount} />
                                    </span> Registration{applyCount > 1 ? 's' : ''}
                                </> : "No Registration"}

                            </h5>
                            <p className="font-normal text-gray-700 mb-5 dark:text-gray-400">
                                {applyCount > 0 ? "Browse your registrations to view and modify them." : "Browse some marathons to run for your sound health."}
                            </p>

                            <Link
                                className={linkClasses}
                                to={applyCount > 0 ? '/dashboard/my-applies' : '/marathons'}
                            >
                                {applyCount > 0 ? <>
                                    <span className="text-2xl"><GoChecklist /></span>
                                    <span>View Applies</span>
                                </> : <>
                                    <span className="text-2xl"><BiRun /></span>
                                    <span>Marathons</span>
                                </>}

                            </Link>
                        </div>
                    </div>
                </Card>

                <Card className="max-w-sm" horizontal>
                    <div className="flex flex-col lg:flex-row gap-5 items-center">
                        <div className="border border-primary text-primary rounded-full p-8 xl:p-10 text-5xl xl:text-6xl">
                            <GrArticle />
                        </div>

                        <div className="text-center lg:text-left">
                            <h5 className="text-xl xl:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {blogCount > 0 ? <>
                                    <span className="text-primary">
                                        <CountUp duration={2} end={blogCount} />
                                    </span> Blog{blogCount > 1 ? 's' : ''}
                                </> : "No Blog"}

                            </h5>
                            <p className="font-normal text-gray-700 mb-5 dark:text-gray-400">
                                {blogCount > 0 ? "Browse your blogs to view and modify them." : "Add some blogs to create your impact on people"}
                            </p>

                            <Link
                                className={linkClasses}
                                to={blogCount > 0 ? '/dashboard/my-blogs' : '/add-blog'}
                            >
                                {blogCount > 0 ? <>
                                    <span className="text-2xl"><GrArticle /></span>
                                    <span>View Blogs</span>
                                </> : <>
                                    <span className="text-2xl"><MdFormatListBulletedAdd /></span>
                                    <span>Add Blog</span>
                                </>}

                            </Link>
                        </div>
                    </div>
                </Card>
            </>}
        </div>
    </section>);
};

export default DashboardHome;