import axios from "axios";
import { Spinner } from "flowbite-react";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../../components/reusuable/Title";
import { RxStopwatch } from "react-icons/rx";
import { IoTimerOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { Fade } from "react-awesome-reveal";

const Marathons = () => {
    const [marathons, setMarathons] = useState(null);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isVisible) return;
        setErr(false);
        axios("https://a11-server-weld.vercel.app")
            .then(({ data }) => {
                setMarathons(data)
                setLoading(false)
            })
            .catch(() => setErr(true))
    }, [isVisible]);

    return (<section className="py-20 px-2">
        <Title title="Our Marathons" />

        <Fade delay={300} triggerOnce={true} onVisibilityChange={inview => inview && setIsVisible(true)}>
            {
                loading ? <div className="text-center py-20">
                    {err ? <h3 className="text-xl text-yellow-400">Oops! Something went wrong.</h3> : <Spinner />}
                </div> : <div className="max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                    {
                        marathons?.map(marathon => <article className="border flex flex-col justify-between border-primary rounded-md overflow-hidden" key={marathon._id}>
                            <h3 className="text-2xl uppercase font-semibold text-primary p-5 pb-0">{marathon.title}</h3>
                            <div className="text-base text-title dark:text-lite p-5 pt-0">
                                <div className="flex items-center gap-4 mb-8">
                                    <p className="flex items-center">
                                        <span className="text-xl"><CiLocationOn /></span>
                                        <span>Location:</span>
                                    </p>
                                    <p>{marathon.location}</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold uppercase mb-2 text-xl">Registration</h4>
                                    <div className="flex items-center gap-4 mb-2">
                                        <p className="flex items-center">
                                            <span className="text-xl"><RxStopwatch /></span>
                                            <span>Starts:</span>
                                        </p>

                                        <p>{moment(marathon.regStart).format('Do MMMM, YYYY')}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <p className="flex items-center">
                                            <span className="text-xl"><IoTimerOutline /></span>
                                            <span>Ends:</span>
                                        </p>

                                        <p>{moment(marathon.regEnd).format('Do MMMM, YYYY')}</p>
                                    </div>
                                </div>
                            </div>

                            <Link to={`/marathons/${marathon._id}`} className="border-t border-primary text-lg font-semibold uppercase py-2 block px-4 mt-5 text-center hover:bg-primary text-desc hover:text-white transition-colors">See Details</Link>
                        </article>)
                    }
                </div>
            }
        </Fade>
    </section>);
};

export default Marathons;