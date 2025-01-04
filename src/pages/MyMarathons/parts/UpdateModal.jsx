import { Button, Label, Modal, Select, Textarea, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Loading from '../../../components/reusuable/Loading';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

const datePickerStyle = "block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg cursor-pointer";

const UpdateModal = ({ loadMyMarathons, openModal, setOpenModal, toUpdate, logOut, dark }) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [marathonStart, setMarathonStart] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setStartDate(new Date(toUpdate.regStart));
        setEndDate(new Date(toUpdate.regEnd));
        setMarathonStart(new Date(toUpdate.eventStart));
    }, [toUpdate]);

    const handleUpdate = e => {
        e.preventDefault();

        const form = e.target;
        const regStart = startDate.getTime();
        const regEnd = endDate.getTime();
        const eventStart = marathonStart.getTime();

        if (regStart !== toUpdate.regStart || regEnd !== toUpdate.regEnd || eventStart !== toUpdate.eventStart) {
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
        }

        setLoading(true);

        const title = form.title.value;
        const location = form.location.value;
        const marathonImg = form.marathonImg.value;
        const distance = form.distance.value;
        const description = form.description.value;

        const doc = { title, regStart, regEnd, eventStart, location, marathonImg, distance, description };
        const ownerVerify = { id: toUpdate._id, creatorEmail: toUpdate.creatorEmail };

        axios.put("https://a11-server-weld.vercel.app/my-marathons/update", { doc, ownerVerify }, { withCredentials: true })
            .then(res => {
                if (res.data.acknowledged) {
                    swal("Success", "Your marathon is updated successfully.", "success")
                        .then(loadMyMarathons)
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

    return (<>{toUpdate &&
        <Modal className={'relative overflow-hidden ' + (dark ? 'dark' : '')} show={openModal} onClose={() => setOpenModal(false)} size="4xl" popup>
            <Modal.Header>Update Marathon</Modal.Header>
            <Loading loading={loading} />

            <Modal.Body className=''>
                <form className="grid sm:grid-cols-2 gap-5 relative mt-5" onSubmit={handleUpdate}>
                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Marathon Title" />
                        </div>
                        <TextInput
                            type="text"
                            name="title"
                            placeholder="Enter Marathon Title"
                            defaultValue={toUpdate.title}
                            required
                        />
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
                            onChange={(date) => {
                                date.setHours(0);
                                date.setMinutes(0);
                                date.setSeconds(0);
                                setMarathonStart(date);
                            }}
                            selected={marathonStart}
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Location" />
                        </div>
                        <TextInput
                            name="location"
                            type="text"
                            placeholder="Enter Marathon Location"
                            defaultValue={toUpdate.location}
                            required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Marathon Image" />
                        </div>
                        <TextInput
                            name="marathonImg"
                            type="text"
                            placeholder="Enter Marathon Image Link"
                            defaultValue={toUpdate.marathonImg}
                            required />
                    </div>

                    <div className="col-span-full">
                        <div className="mb-2 block">
                            <Label value="Running distance" />
                        </div>
                        <Select name="distance" defaultValue={toUpdate.distance}>
                            <option>3k</option>
                            <option>10k</option>
                            <option>25k</option>
                            <option>30k</option>
                        </Select>
                    </div>

                    <div className="col-span-full">
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Description" />
                        </div>
                        <Textarea
                            name="description"
                            placeholder="Description of Marathon"
                            defaultValue={toUpdate.description}
                            required
                            rows={5} />
                    </div>

                    <Button className="col-span-full" type="submit">Update</Button>
                </form>
            </Modal.Body>
        </Modal>}</>);
};

UpdateModal.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    toUpdate: PropTypes.object,
    loadMyMarathons: PropTypes.func,
    logOut: PropTypes.func,
    dark: PropTypes.bool
}

export default UpdateModal;