import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loading from "../../components/reusuable/Loading";
import { GrSchedules } from "react-icons/gr";
import moment from "moment";
import useDetails from "../../hooks/useDetails";
import { useEffect } from "react";

const BlogDetails = () => {
    const { id } = useParams();
    const { details, loading } = useDetails(id, 'blogs');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (<section className="pt-10 pb-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>{details ? details.title + " - " : ""} MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-xl min-h-52 relative mx-auto">
            <Loading loading={loading} />
            {details ? <div className="relative">
                <img style={{ aspectRatio: '3/2' }} src={details?.img} className="w-full max-h-[calc(100vh-150px)] object-cover rounded-lg" />

                <div className="relative text-sm sm:text-lg py-6 text-desc dark:text-lite">
                    <div className=' flex items-center gap-2 mb-3'>
                        <img src={details?.author?.thumb} className="w-10 h-10 object-cover border border-primary rounded-full" />
                        <span className='text-primary font-semibold text-lg pr-5'>{details?.author?.name}</span>
                    </div>

                    <p className="flex gap-1 items-center text-dark dark:text-lite">
                        <span className="text-xl"><GrSchedules /></span>
                        <span>{moment(details?.date).format('MMM D, YYYY')}</span>
                    </p>

                    <h5
                        className="text-lg mb-5 sm:text-2xl font-bold tracking-tight text-title dark:text-lite"
                    >
                        {details?.title}
                    </h5>

                    <p>{details?.description}</p>
                </div>
            </div> : null}
        </div>
    </section>);
};

export default BlogDetails;