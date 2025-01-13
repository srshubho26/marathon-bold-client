import { Fade } from "react-awesome-reveal";
import Title from "../../../components/reusuable/Title";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import BlogCard from '../../../components/reusuable/BlogCard';
import useData from "../../../hooks/useData";

const OurBlogs = () => {

    const [isVisible, setIsVisible] = useState(false);
    const { data: blogs, loading, err } = useData('blogs', 8, '', 1, isVisible);

    return (<section className="py-20 px-3">
        <Title title="Our Blogs" />

        <Fade delay={300} triggerOnce={true} onVisibilityChange={inview => inview && setIsVisible(true)}>
            {
                loading ? <div className="text-center py-20">
                    {err ? <h3 className="text-xl text-yellow-400">Oops! Something went wrong.</h3> : <Spinner />}
                </div> : <div className="max-w-sm sm:max-w-screen-xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-3 xl:gap-5 mt-10">
                    {blogs?.map(blog => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />))}
                </div>
            }
            <Link to="/blogs" className="bg-primary-lite hover:bg-primary rounded-md px-8 py-2 text-lite font-semibold text-lg uppercase mx-auto block w-fit mt-10">
                View All
            </Link>
        </Fade>
    </section>);
};

export default OurBlogs;