import CountUp from "react-countup";
import Title from "../../../components/reusuable/Title";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { FaCity } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { BiCalendarEvent } from "react-icons/bi";
import { FaPeopleGroup } from "react-icons/fa6";
import bgImg from '../../../assets/img/countup_bg.jpg';

const Statistics = () => {
    const [isVisible, setIsVisible] = useState(false);
    let timeout;
    const handleVisiblility = (inview)=>{
        if(timeout)clearTimeout(timeout);
        timeout = setTimeout(()=>{
            inview && setIsVisible(true)
        }, 50);
    }
    return (<section
    className="px-2 py-20"
            style={{background: `linear-gradient(#1c0014c9, #1c0014f0), url(${bgImg}) no-repeat`, backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
    backgroundSize: 'cover'}}
    >
        <Title title="Summary of our short journey" color="text-lite" />

        <Fade delay={80} triggerOnce={true} onVisibilityChange={handleVisiblility}>
            <div
            className="max-w-screen-xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center uppercase text-2xl text-lite font-semibold"
            >
                {isVisible ? <>
                    <div className="border border-lite rounded-md py-4">
                        <p className="w-fit mx-auto text-7xl mb-4"><FaCity /></p>
                        <span><CountUp duration={2} end={1327} /></span>
                        <h3 className="text-primary">Cities</h3>
                    </div>

                    <div className="border border-lite rounded-md py-4">
                        <p className="w-fit mx-auto text-7xl mb-4"><MdManageAccounts /></p>
                        <span><CountUp duration={2} end={729} /></span>
                        <h3 className="text-primary">Organizers</h3>
                    </div>

                    <div className="border border-lite rounded-md py-4">
                        <p className="w-fit mx-auto text-7xl mb-4"><BiCalendarEvent /></p>
                        <span><CountUp duration={2} end={1298} /></span>
                        <h3 className="text-primary">Events</h3>
                    </div>

                    <div className="border border-lite rounded-md py-4">
                        <p className="w-fit mx-auto text-7xl mb-4"><FaPeopleGroup /></p>
                        <span><CountUp duration={2} end={53967} /></span>
                        <h3 className="text-primary">Participants</h3>
                    </div>
                </> : null}
            </div>
        </Fade>
    </section>);
};

export default Statistics;