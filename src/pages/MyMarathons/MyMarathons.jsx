import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useCallback, useContext, useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import UpdateModal from "./parts/UpdateModal";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyMarathons = () => {
    const { email } = useAuth();
    const { logOut, dark } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [marathons, setMarathons] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [toUpdate, setToUpdate] = useState(null);

    const loadMyMarathons = useCallback(()=>{
        axios(`http://localhost:5000/my-marathons?email=${email}`, { withCredentials: true })
            .then(res => {
                setMarathons(res.data);
                setLoading(false);
            }).catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    logOut();
                }
                setLoading(false);
            })
    }, [email, logOut]);

    useEffect(loadMyMarathons, [loadMyMarathons]);

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
            axios.delete(`http://localhost:5000/my-marathons/delete?id=${id}&creatorEmail=${author}`, {withCredentials: true})
            .then(res=>{
                if(res.data.acknowledged){
                    swal("Deleted!", "Your marathon has been deleted!", "success")
                    .then(loadMyMarathons)
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
            <title>My Marathons - MarathonBold</title>
        </Helmet>

        <Loading loading={loading} />

        {(marathons && !marathons?.length) ? <h3 className="text-center text-2xl font-semibold text-title dark:text-lite mt-10">Empty!</h3> : null}

        {marathons?.length ? <div className="overflow-x-auto">
            <Table striped>
                <TableHead>
                    <TableHeadCell>Title</TableHeadCell>
                    <TableHeadCell>Distance</TableHeadCell>
                    <TableHeadCell>Location</TableHeadCell>
                    <TableHeadCell>Applications</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {marathons.map(marathon => <TableRow
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={marathon._id}>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Link
                                to={`/marathons/${marathon._id}`}
                                className="hover:text-primary"
                            >
                                {marathon.title}
                            </Link>
                        </TableCell>
                        <TableCell>{marathon.distance}</TableCell>
                        <TableCell>{marathon.location}</TableCell>
                        <TableCell>{marathon.totalRegCount}</TableCell>
                        <TableCell>
                            <button
                                className="font-medium text-cyan-600 hover:underline mr-5 uppercase"
                                onClick={() => {
                                    setOpenModal(true);
                                    setToUpdate(marathon);
                                    }}>
                                Update
                            </button>

                            <button
                            className="font-medium text-red-600 hover:underline uppercase"
                            onClick={()=>handleDelete(marathon._id, marathon.creatorEmail)}
                            >
                                Delete
                            </button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
            {toUpdate && <UpdateModal openModal={openModal} logOut={logOut} toUpdate={toUpdate} setOpenModal={setOpenModal} dark={dark} loadMyMarathons={loadMyMarathons} />}
        </div> : null}
    </section>);
};

export default MyMarathons;