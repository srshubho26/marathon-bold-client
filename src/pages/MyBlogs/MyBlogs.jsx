import { useCallback, useContext, useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from "sweetalert";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";
import Loading from "../../components/reusuable/Loading";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import UpdateBlogModal from "./parts/UpdateBlogModal";
import moment from "moment";

const MyBlogs = () => {
    const { email } = useAuth();
    const { logOut, dark } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [toUpdate, setToUpdate] = useState(null);

    const loadMyBlogs = useCallback(()=>{
        axios(`http://localhost:5000/my-blogs?email=${email}`, { withCredentials: true })
            .then(res => {
                setBlogs(res.data);
                setLoading(false);
            }).catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    logOut();
                }
                setLoading(false);
            })
    }, [email, logOut]);

    useEffect(loadMyBlogs, [loadMyBlogs]);

    const handleDelete = (id, author)=>{
        swal({
            title: "Are you sure?",
            text: "You woun't be able to recover it.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(isConfirmed => {
            if(!isConfirmed)return;
            setLoading(true);
            axios.delete(`http://localhost:5000/my-blogs/delete?id=${id}&creatorEmail=${author}`, {withCredentials: true})
            .then(res=>{
                if(res.data.acknowledged){
                    swal("Deleted!", "Your blog has been deleted!", "success")
                    .then(loadMyBlogs)
                }
            })
            .catch(() => {
                swal("Oops!", "Something went wrong!", "error");
                setLoading(false);
            })
          })
    }

    return (<section className="relative h-full p-5">
        <Helmet>
            <title>My Blogs - MarathonBold</title>
        </Helmet>

        <Loading loading={loading} />

        {(blogs && !blogs?.length) ? <h3 className="text-center text-2xl font-semibold text-title dark:text-lite mt-10">Empty!</h3> : null}

        {blogs?.length ? <div className="overflow-x-auto">
            <Table striped>
                <TableHead>
                    <TableHeadCell>Title</TableHeadCell>
                    <TableHeadCell>Date</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {blogs.map(blog => <TableRow
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={blog._id}>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Link
                                to={`/blogs/${blog._id}`}
                                className="hover:text-primary"
                            >
                                {blog.title}
                            </Link>
                        </TableCell>
                        <TableCell>{moment(blog.date).format('DD MMM, YYYY')}</TableCell>
                        <TableCell>
                            <button
                                className="font-medium text-cyan-600 hover:underline mr-5 uppercase"
                                onClick={() => {
                                    setOpenModal(true);
                                    setToUpdate(blog);
                                    }}>
                                Update
                            </button>

                            <button
                            className="font-medium text-red-600 hover:underline uppercase"
                            onClick={()=>handleDelete(blog._id, blog.author.email)}
                            >
                                Delete
                            </button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
            {toUpdate && <UpdateBlogModal openModal={openModal} logOut={logOut} toUpdate={toUpdate} setOpenModal={setOpenModal} dark={dark} loadMyBlogs={loadMyBlogs} />}
        </div> : null}
    </section>);
};

export default MyBlogs;