import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Provider/useAuth";
import swal from "sweetalert";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../components/reusuable/Loading";
import { Helmet } from "react-helmet-async";
import ImageInput from '../../components/reusuable/ImageInput';
import ImgPreview from "../../components/reusuable/ImgPreview";
import { uploadImg } from "../../assets/utils";

const datePickerStyle = "block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg cursor-pointer cursor-pointer";

const AddMarathon = () => {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [marathonStart, setMarathonStart] = useState(new Date());
    const { email } = useAuth();
    const { logOut } = useContext(AuthContext);
    const [previewImg, setPreviewImg] = useState('');
    const photoInputRef = useRef();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const imgPrevVals = {
        photoInputRef,
        previewImg,
        setPreviewImg,
        className: 'max-w-96 aspect-[3/2]'
    }

    const imgInputVals = {
        wrapperClass: `col-span-full ${previewImg ? 'hidden' : ''}`,
        labelClass: 'lg:text-lg',
        label: 'Marathon Image',
        name: 'marathonImg',
        photoInputRef,
        setPreviewImg
    }

    const handleAdd = async e => {
        e.preventDefault();
        const form = e.target;
        const regStart = startDate.getTime();
        const regEnd = endDate.getTime();
        const eventStart = marathonStart.getTime();

        if (regStart < new Date().getTime()) {
            swal("Warning!", "Please select a registration starting date greater than today.", "warning");
            return;
        }

        if (regStart >= regEnd) {
            swal("Warning!", "Registration ending date can't be less than or equal to registration starting date.", "warning");
            return;
        }

        if (eventStart <= regStart || eventStart <= regEnd) {
            swal("Warning!", "Marathon starting date should be greater than both registration starting & ending date.", "warning");
            return;
        }

        setLoading(true);

        const title = form.title.value;
        const location = form.location.value;
        const distance = form.distance.value;
        const description = form.description.value;

        const res = await uploadImg(form.marathonImg.files[0]);
        if (!res.success) {
            swal("Oops!", res.message, "error");
            setLoading(false);
            return;
        }
        const marathonImg = res.imgUrl;

        const data = { title, regStart, regEnd, eventStart, location, marathonImg, distance, description, creatorEmail: email, createdAt: new Date().getTime() };
        axios.post("https://a11-server-weld.vercel.app/add-marathon", data, { withCredentials: true })
            .then(res => {
                if (res.data.acknowledged) {
                    swal("Done", "Your marathon is added successfully.", "success");
                }
                setLoading(false);
                form.reset();
                setStartDate(new Date());
                setEndDate(new Date());
                setMarathonStart(new Date());
            })
            .catch(err => {
                swal("Oops!", "Something went wrong!", "error");
                if (err.status === 401 || err.status === 403) {
                    logOut();
                }
                setLoading(false);
            })
    }

    return (<section>
        <Helmet>
            <title>Add New Marathon - MarathonBold</title>
        </Helmet>

        <form className="grid sm:grid-cols-2 gap-5 lg:gap-10 relative p-2 sm:p-5 lg:p-10" onSubmit={handleAdd}>
            <Loading loading={loading} />

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Marathon Title" />
                </div>
                <TextInput type="text" name="title" placeholder="Enter Marathon Title" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Start Registration Date" />
                </div>
                <DatePicker
                    className={datePickerStyle}
                    selected={startDate}
                    onChange={date => {
                        date.setHours(0);
                        date.setMinutes(0);
                        date.setSeconds(0);
                        setStartDate(date);
                    }}
                    dateFormat="dd-MM-yyyy"
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="End Registration Date" />
                </div>
                <DatePicker
                    className={datePickerStyle}
                    selected={endDate}
                    onChange={(date) => {
                        date.setHours(23);
                        date.setMinutes(59);
                        date.setSeconds(59);
                        setEndDate(date);
                    }}
                    dateFormat="dd-MM-yyyy"
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Marathon Start Date" />
                </div>
                <DatePicker
                    className={datePickerStyle}
                    selected={marathonStart}
                    onChange={(date) => {
                        date.setHours(0);
                        date.setMinutes(0);
                        date.setSeconds(0);
                        setMarathonStart(date);
                    }}
                    dateFormat="dd-MM-yyyy"
                />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Location" />
                </div>
                <TextInput name="location" type="text" placeholder="Enter Marathon Location" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label value="Running distance" />
                </div>
                <Select name="distance">
                    <option>3k</option>
                    <option>10k</option>
                    <option>25k</option>
                    <option>30k</option>
                </Select>
            </div>

            <ImageInput {...imgInputVals} />
            <ImgPreview {...imgPrevVals} />

            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Description" />
                </div>
                <Textarea name="description" placeholder="Description of Marathon" required rows={8} />
            </div>

            <div className="col-span-full">
                <button className="px-8 text-lite font-semibold text-xl bg-primary hover:bg-primary-lite rounded-md py-2" type="submit">Add</button>
            </div>
        </form>
    </section>);
};

export default AddMarathon;