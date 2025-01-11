import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import { GrSchedules } from "react-icons/gr";
import moment from "moment";

const BlogDetails = () => {
    const [details, setDetails] = useState(null);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios(`https://a11-server-weld.vercel.app/blogs/${id}`)
            .then(res => {
                if (Object.keys(res.data).length < 1) {
                    return navigate('/');
                }
                setDetails(res.data);
                setLoading(false);
            })
            .catch(() => {
                swal("Oops!", "Something went wrong!", "error");
                navigate('/');
                setLoading(false);
            })
    }, [id, navigate]);

    return (<section className="pt-10 pb-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>{details ? details.title + " - " : ""} MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-xl min-h-52 relative mx-auto">
            <Loading loading={loading} />
            {details ? <div className="overflow-hidden rounded-xl shadow-lg border relative">
                <img style={{ aspectRatio: '3/2' }} src={details?.img} className="w-full max-h-[calc(100vh-150px)] object-cover" />

                <div className="relative text-sm sm:text-lg py-6 px-2 sm:px-6 text-desc dark:text-lite ">
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