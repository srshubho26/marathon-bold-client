import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import swal from "sweetalert";
import Loading from "../../components/reusuable/Loading";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import UpdateApplication from "./parts/UpdateApplication";
import moment from "moment";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Search from "./parts/Search";

const MyApplies = () => {
    const { user, logOut, dark } = useContext(AuthContext);
    const [applications, setApplications] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [toUpdate, setToUpdate] = useState(null);

    const loadMyApplies = useCallback((search = "") => {
        setLoading(true);
        axios(`http://localhost:5000/my-applies?email=${user.email}&search=${search}`, { withCredentials: true })
            .then(res => {
                setApplications(res.data);
                setLoading(false);

            }).catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    logOut();
                }
                setLoading(false);
            })
    }, [user, logOut]);

    useEffect(loadMyApplies, [loadMyApplies]);


    const handleDelete = (id, author, marathonId) => {
        swal({
            title: "Are you sure?",
            text: "You woun't be able to recover it.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(isConfirmend => {
                if (!isConfirmend) return;
                setLoading(true);
                axios.delete(`http://localhost:5000/my-applies/delete?id=${id}&creatorEmail=${author}&marathonId=${marathonId}`, { withCredentials: true })
                    .then(res => {
                        if (res.data.acknowledged) {
                            swal("Deleted!", "Your marathon has been deleted!", "success")
                                .then(()=>loadMyApplies(''))
                        }
                    })
                    .catch(() => {
                        swal("Oops!", "Something went wrong!", "error");
                        setLoading(false);
                    })
            })
    }

    return (<section className="relative h-full py-3 px-2 md:px-4">
        <Helmet>
            <title>My Applies - MarathonBold</title>
        </Helmet>

        <Loading loading={loading} />

        {applications ? <Search loadData={loadMyApplies} /> : null}

        {(applications && !applications?.length) ? <h3 className="text-center text-2xl font-semibold text-title dark:text-lite mt-10">Empty!</h3> : null}

        {applications?.length > 0 ? <div className="overflow-x-auto">
            <Table striped>
                <TableHead>
                    <TableHeadCell>Title</TableHeadCell>
                    <TableHeadCell>Marathon Start</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {applications.map(application => <TableRow
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={application._id}>
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Link
                                to={`/marathons/${application.marathonId}`}
                                className="hover:text-primary"
                            >
                                {application.marathonTitle}
                            </Link>
                        </TableCell>

                        <TableCell>
                            {moment(application.marathonStart).format('Do MMMM, YYYY')}
                        </TableCell>

                        <TableCell>
                            <button
                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5 uppercase"
                                onClick={() => {
                                    setOpenModal(true);
                                    setToUpdate(application);
                                }}>
                                Update
                            </button>

                            <button
                                className="font-medium text-red-600 hover:underline uppercase"
                                onClick={() => handleDelete(application._id, application.email, application.marathonId)}
                            >
                                Delete
                            </button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
                {toUpdate && <UpdateApplication dark={dark} openModal={openModal} logOut={logOut} toUpdate={toUpdate} setOpenModal={setOpenModal} loadMyApplies={()=>loadMyApplies("")} />}
            </Table>
        </div> : null}
    </section>);
};

export default MyApplies;