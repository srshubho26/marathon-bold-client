import { useEffect } from "react";
import Banner from "./homeParts/Banner";
import FAQ from "./homeParts/FAQ";
import Marathons from "./homeParts/Marathons";
import OurBlogs from "./homeParts/OurBlogs";
import Statistics from "./homeParts/Statistics";
import UpcomingMarathons from "./homeParts/UpcomingMarathons";
import { Helmet } from "react-helmet-async";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (<>
        <Helmet>
            <title>Home - MarathonBold</title>
        </Helmet>

        <Banner />
        <Marathons />
        <UpcomingMarathons />
        <Statistics />
        <OurBlogs />
        <FAQ />
    </>);
};

export default Home;