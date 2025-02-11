import { Helmet } from "react-helmet-async";
import Title from "../../components/reusuable/Title";
import Form from "./Form";
import contact from '../../assets/img/contact.svg';
import { useEffect } from "react";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (<section className="py-20 px-2">
        <Helmet>
            <title>Contact Us - MarathonBold</title>
        </Helmet>

        <div className="max-w-md md:max-w-screen-xl min-h-[calc(100vh-250px)] mx-auto">
            <Title title="Contact Us" />

            <div className="flex flex-col-reverse md:flex-row items-center gap-5 mt-5">
                <div className="w-full md:w-1/2">
                    <Form />
                </div>

                <div className="w-full md:w-1/2">
                    <img className="h-full" src={contact} alt="" />
                </div>
            </div>

        </div>
    </section>);
};

export default Contact;