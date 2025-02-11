import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import Loading from '../../../components/reusuable/Loading';
import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import moment from 'moment';

const UpdateApplication = ({ loadMyApplies, openModal, setOpenModal, toUpdate, logOut, dark }) => {
    const [loading, setLoading] = useState(false);

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;

        setLoading(true);

        const fname = form.fname.value;
        const lname = form.lname.value;
        const contact = form.contact.value;
        const additionalInfo = form.additionalInfo.value;

        const doc = { fname, lname, contact, additionalInfo};
        const ownerVerify = { id: toUpdate._id, creatorEmail: toUpdate.email };

        axios.put("http://localhost:5000/update-application", { doc, ownerVerify }, { withCredentials: true })
            .then(res => {
                if (res.data.acknowledged) {
                    swal("Success", "Your application is updated successfully.", "success")
                        .then(loadMyApplies)
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
            <Modal.Header>Update Your Apply</Modal.Header>
            <Loading loading={loading} />

            <Modal.Body>
                <form className="grid sm:grid-cols-2 gap-5 relative mt-5" onSubmit={handleUpdate}>
                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Marathon Title" />
                        </div>
                        <TextInput
                            type="text"
                            name="title"
                            placeholder="Enter Marathon Title"
                            defaultValue={toUpdate.marathonTitle}
                            readOnly
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Marathon Start" />
                        </div>
                        <TextInput
                            name="location"
                            type="text"
                            placeholder="Enter Marathon Location"
                            defaultValue={moment(toUpdate.marathonStart).format('Do MMMM, YYYY')}
                            readOnly />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="First Name" />
                        </div>
                        <TextInput
                            name="fname"
                            type="text"
                            placeholder="Enter your first name"
                            defaultValue={toUpdate.fname}
                            required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Last Name" />
                        </div>
                        <TextInput
                            name="lname"
                            type="text"
                            placeholder="Enter your last name"
                            defaultValue={toUpdate.lname}
                            required />
                    </div>

<div>
    <div className="mb-2 block">
        <Label className="lg:text-lg" value="Email" />
    </div>
    <TextInput
        type="email"
        defaultValue={toUpdate.email}
        readOnly />
</div>

<div>
    <div className="mb-2 block">
        <Label className="lg:text-lg" value="Phone Number" />
    </div>
    <TextInput
        name="contact"
        type="number"
        placeholder="Enter your phone number"
        defaultValue={toUpdate.contact}
        required />
</div>

                    <div className="col-span-full">
                        <div className="mb-2 block">
                            <Label className="lg:text-lg" value="Additional Information" />
                        </div>
                        <Textarea
                            name="additionalInfo"
                            placeholder="Optional"
                            defaultValue={toUpdate.additionalInfo}
                            rows={5} />
                    </div>

                    <Button className="col-span-full" type="submit">Update</Button>
                </form>
            </Modal.Body>
        </Modal>}</>);
};

UpdateApplication.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    toUpdate: PropTypes.object,
    loadMyApplies: PropTypes.func,
    logOut: PropTypes.func,
    dark: PropTypes.bool
}

export default UpdateApplication;