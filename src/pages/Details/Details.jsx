import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import moment from "moment";
import Loading from "../../components/reusuable/Loading";
import StartCountdown from "./parts/StartCountdown";
import { Helmet } from "react-helmet-async"
import { GrAnnounce } from "react-icons/gr";
import useDetails from "../../hooks/useDetails";

const registerBtnCss = "bg-transparent border border-primary rounded-md font-medium text-lg text-primary hover:bg-primary hover:text-lite transition-colors px-5 py-2";

const Details = () => {
    const { id } = useParams();
    const {details, loading} = useDetails(id);
    const { user } = useContext(AuthContext);
    const [isApplied, setIsApplied] = useState(false);
    const today = new Date().getTime();
    const {pathname} = useLocation();

    useEffect(() => {
        if (!user) return;
        axios.post('http://localhost:5000/is-already-applied', { email: user.email, marathonId: id }, { withCredentials: true })
            .then(res => {
                if (res.data.registered) setIsApplied(true);
            })
    }, [user, id]);

    const showRegisterBtn = <>{(today > details?.regStart && details?.regEnd > today) ? <Link
        className={registerBtnCss}
        to={`/marathon/apply/${details._id}`}
    >
        Register
    </Link> : <span className="font-medium text-sm lg:text-base text-gray-500">
        Registration isn&apos;t available now
    </span>}</>

    return (<section className="pt-10 pb-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>{details ? details.title + " - " : ""} MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-xl min-h-52 relative mx-auto">
            <Loading loading={loading} />
            {details ? <div className="relative">
                <span className="bg-primary text-lite rounded-full px-2 absolute top-1 sm:top-5 left-1 sm:left-5 text-sm sm:text-base">
                    {details?.location}
                </span>

                <p className="flex gap-2 bg-primary text-lite rounded-full px-2 absolute top-7 sm:top-5 left-1 sm:right-5 sm:left-auto text-sm sm:text-base">
                    <span>{moment(details?.regStart).format('D MMM, YY')}</span>
                    <span className="font-semibold">-</span>
                    <span>{moment(details?.regEnd).format('D MMM, YY')}</span>
                </p>

                <img style={{ aspectRatio: '3/2' }} src={details?.marathonImg} className="w-full max-h-[calc(100vh-150px)] object-cover rounded-lg" />

                <div className="relative text-sm sm:text-lg py-6 text-desc dark:text-lite">
                    <p className="absolute -top-9 sm:-top-14 left-1 sm:left-5 flex gap-1 items-center text-dark dark:text-lite bg-lite dark:bg-dark px-5 border border-lite py-1 rounded-full">
                        <span className="text-xl"><GrAnnounce /></span>
                        <span>{moment(details?.createdAt).format('MMM D, YYYY')}</span>
                    </p>

                    <h5
                        className="flex flex-col-reverse sm:flex-row items-start gap-2 sm:items-center sm:justify-between text-lg mb-5 sm:text-2xl font-bold tracking-tight text-title dark:text-lite"
                    >
                        <span>{details?.title}</span>

                        <>{
                            user ? <>{isApplied ? <span className="font-medium text-sm lg:text-base text-primary">
                                Registered
                            </span> : showRegisterBtn}</> : <Link 
                            className="font-medium text-sm lg:text-base text-primary"
                            to="/login" state={pathname}>
                                Login to see your registration status
                            </Link>
                        }</>
                    </h5>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Total Registered: </span>
                        <span>{details?.totalRegCount}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Distance: </span>
                        <span>{details?.distance}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Marathon Start:</span>
                        <span>{moment(details?.eventStart).format('Do MMMM, YYYY')}</span>
                    </p>

                    <p className="mt-5">{details?.description}</p>

                    <StartCountdown
                        createdAt={details?.createdAt}
                        eventStart={details?.eventStart}
                    />
                </div>
            </div> : null}
        </div>
    </section>);
};

export default Details;