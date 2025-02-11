import { Button, Label, Textarea, TextInput } from "flowbite-react";
import Title from "../../components/reusuable/Title";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";
import Loading from "../../components/reusuable/Loading";
import { Helmet } from "react-helmet-async";

const Apply = () => {
    const [marathonData, setMarathonData] = useState(null);
    const { id } = useParams();
    const { user, logOut } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const asyncEffect = async () => {
            axios.post(`https://a11-server-weld.vercel.app/marathons/${id}`, { email: user.email }, { withCredentials: true })
                .then(res => {
                    const data = res.data;
                    const today = new Date().getTime();
                    if (today < data.regStart || data.regEnd < today) {
                        return navigate("/home");
                    }
                    setMarathonData(data);
                    setLoading(false);
                })
                .catch(err => {
                    swal("Oops!", "Something went wrong!", "error")
                        .then(() => {
                            if (err.status === 401 || err.status === 403) {
                                logOut();
                            } else {
                                navigate("/home");
                            }
                        })
                    setLoading(false);
                })

        }
        asyncEffect();
    }, [id, user, navigate, logOut]);

    const handleApply = e => {
        setLoading(true);
        e.preventDefault();
        const form = e.target;
        const fname = form.fname.value;
        const lname = form.lname.value;
        const contact = form.contact.value;
        const additionalInfo = form.additionalInfo.value;

        const applyData = {
            fname,
            lname,
            contact,
            additionalInfo,
            email: user.email,
            marathonTitle: marathonData.title,
            marathonStart: marathonData.eventStart
        };

        const forMarathonUpdate = { totalReg: marathonData.totalRegCount, id: marathonData._id }

        axios.post("https://a11-server-weld.vercel.app/marathon-apply", { applyData, forMarathonUpdate }, { withCredentials: true })
            .then(res => {
                if (res.data.acknowledged) {
                    swal("Done", "Your registration is completed.", "success")
                        .then(() => navigate("/dashboard/my-applies"))
                }
                setLoading(false);
            })
            .catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    logOut();
                }
                setLoading(false);
            })
    }


    return (<section className="py-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>Register in Marathon - MarathonBold</title>
        </Helmet>

        <Title title="Register for marathon" />

        <div className="max-w-screen-md mx-auto border relative min-h-52 border-gray-400 rounded-md p-2 sm:p-5 mt-10">
            <Loading loading={loading} />

            {marathonData && <form className="grid sm:grid-cols-2 gap-5" onSubmit={handleApply}>

                <div>
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="Marathon Title" />
                    </div>
                    <TextInput className="opacity-70" type="text" defaultValue={marathonData.title} readOnly required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="Marathon Start Date" />
                    </div>
                    <TextInput className="opacity-70" type="text" defaultValue={moment(marathonData.eventStart).format('MMM D, YYYY')} readOnly required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="First Name" />
                    </div>
                    <TextInput name="fname" type="text" placeholder="Enter your first name" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="Last Name" />
                    </div>
                    <TextInput name="lname" type="text" placeholder="Enter your last name" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="Email" />
                    </div>
                    <TextInput className="opacity-70" type="email" defaultValue={user.email} readOnly required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="Contact Number" />
                    </div>
                    <TextInput name="contact" type="number" placeholder="Enter your contact number" required />
                </div>

                <div className="col-span-full">
                    <div className="mb-2 block">
                        <Label className="lg:text-lg" value="Additional Information" />
                    </div>
                    <Textarea name="additionalInfo" placeholder="Optional" rows={6} />
                </div>

                <Button className="col-span-full" type="submit">Register</Button>
            </form>}
        </div>
    </section>);
};

export default Apply;