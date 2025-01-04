import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from "sweetalert";
import moment from "moment";
import Loading from "../../components/reusuable/Loading";
import StartCountdown from "./parts/StartCountdown";
import { Helmet } from "react-helmet-async"

const registerBtnCss = "bg-transparent border border-primary rounded-md font-medium text-lg text-primary hover:bg-primary hover:text-lite transition-colors px-5 py-2";

const Details = () => {
    const [details, setDetails] = useState(null);
    const { id } = useParams();
    const { user, logOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);
    const navigate = useNavigate();
    const today = new Date().getTime();

    useEffect(() => {
        axios.post('https://a11-server-weld.vercel.app/is-already-applied', { email: user.email, marathonId: id }, { withCredentials: true })
            .then(res => {
                if (res.data.registered) setIsApplied(true);
            })
    }, [user, id]);

    useEffect(() => {
        axios.post(`https://a11-server-weld.vercel.app/marathons/${id}`, { email: user.email }, { withCredentials: true })
            .then(res => {
                if (Object.keys(res.data).length < 1) {
                    return navigate('/');
                }
                setDetails(res.data);
                setLoading(false);
            })
            .catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    return logOut();
                }
                navigate('/');
                setLoading(false);
            })
    }, [id, user, logOut, navigate]);
// console.log(new Date(details?.regEnd))
    const showRegisterBtn = <>{(today > details?.regStart && details?.regEnd > today) ? <Link
        className={registerBtnCss}
        to={`/marathon/apply/${details._id}`}
    >
        Register
    </Link> : <span className="font-medium text-sm lg:text-base text-gray-500">
        Registration isn&apos;t available now
    </span>}</>

    return (<section className="py-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>{details ? details.title+" - " : ""} MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-lg min-h-52 relative mx-auto">
            <Loading loading={loading} />
            {details ? <div className="overflow-hidden rounded-xl shadow-lg border">
                <img src={details?.marathonImg} className="w-full" />

                <div className="text-gray-700 text-sm sm:text-lg dark:text-gray-400 py-6 px-2 sm:px-6">
                    <h5
                        className="flex flex-col-reverse sm:flex-row items-start gap-2 sm:items-center sm:justify-between text-lg mb-5 sm:text-2xl font-bold tracking-tight text-title dark:text-lite"
                    >
                        <span>{details?.title}</span>

                        {isApplied ? <span className="font-medium text-sm lg:text-base text-primary">
                            Registered
                        </span> : showRegisterBtn}

                    </h5>
                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Published: </span>
                        <span>{moment(details?.createdAt).format('MMM D, YYYY')}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Total Registered: </span>
                        <span>{details?.totalRegCount}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Distance: </span>
                        <span>{details?.distance}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Location: </span>
                        <span>{details?.location}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Registration Start:</span>
                        <span>{moment(details?.regStart).format('Do MMMM, YYYY')}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Registration End:</span>
                        <span>{moment(details?.regEnd).format('Do MMMM, YYYY')}</span>
                    </p>

                    <p className="mb-1 flex items-center gap-2">
                        <span className="font-semibold">Marathon Start:</span>
                        <span>{moment(details?.eventStart).format('Do MMMM, YYYY')}</span>
                    </p>

                    <p className="text-desc text-base mt-5">{details?.description}</p>

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