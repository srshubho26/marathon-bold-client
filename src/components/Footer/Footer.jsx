import {
    Button,
    Footer as FooterCont,
    FooterDivider,
    FooterIcon,
    FooterLinkGroup,
    TextInput
} from "flowbite-react";
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import useAuth from "../../Provider/useAuth";

const Footer = () => {
    const user = useAuth();

    return (
        <FooterCont className="rounded-none border-t border-desc" container>
            <div className="max-w-screen-xl mx-auto w-full">
                <div className="flex flex-wrap xl:flex-nowrap justify-between gap-8 sm:mt-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-6 py-10">
                    <div className="max-w-lg">
                        <h3 className="uppercase font-bold text-2xl sm:text-3xl text-title dark:text-lite">
                            Marathon<span className="text-primary">Bold</span>
                        </h3>

                        <p className="text-desc text-base mt-5">Marathon Bold is a platform for the people who are passionate about running. We organize different running events every year all over the world.</p>
                    </div>

                    <div className="w-full max-w-48">
                        <h3 className="text-title dark:text-lite font-semibold text-2xl mb-5">Useful Links</h3>

                        <FooterLinkGroup col>
                            <Link to="/home">Home</Link>
                            <Link to="/marathons">Marathons</Link>
                            {user ? <>
                                <Link to="/dashboard/my-applies">My Applies</Link>
                                <Link to="/dashboard/my-marathons">My Marathons</Link>
                            </> : <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                            </>}
                        </FooterLinkGroup>
                    </div>

                    <div className="grow xl:max-w-sm">
                        <h3 className="text-title dark:text-lite font-semibold text-2xl mb-5">Join Our Newsletter</h3>

                        <form action="#" className="flex w-full items-center gap-1 sm:gap-x-3">
                            <TextInput id="email" className="grow" placeholder="Enter your email" required type="email" />
                            <Button type="submit" className="bg-primary uppercase">Subscribe</Button>
                        </form>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full text-center sm:text-left sm:flex sm:items-center sm:justify-between">
                    <p className="dark:text-lite">
                    <span className="inline-block">&copy; All Rights Reserved By</span>
                    <Link className="uppercase font-bold text-sm text-title dark:text-lite ml-2">
                    Marathon
                        <span className="text-primary">Bold</span>
                    </Link>
                    </p>
                    <div className="mt-4 flex space-x-6 sm:mt-0 justify-center">
                        <FooterIcon href="#" icon={BsFacebook} />
                        <FooterIcon href="#" icon={BsInstagram} />
                        <FooterIcon href="#" icon={BsTwitter} />
                        <FooterIcon href="#" icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </FooterCont>
    );
}
export default Footer;