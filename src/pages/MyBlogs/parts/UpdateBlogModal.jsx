import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import Loading from '../../../components/reusuable/Loading';
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import ImgPreview from '../../../components/reusuable/ImgPreview';
import ImageInput from '../../../components/reusuable/ImageInput';
import { uploadImg } from '../../../assets/utils';

const UpdateBlogModal = ({ loadMyBlogs, openModal, setOpenModal, toUpdate, logOut, dark }) => {
    const [loading, setLoading] = useState(false);
    const [previewImg, setPreviewImg] = useState('');
    const photoInputRef = useRef();

    useEffect(() => {
        setPreviewImg('')
    }, [openModal])

    const imgPrevVals = { photoInputRef, previewImg, setPreviewImg, className: 'max-w-60 aspect-[3/2] mt-5' }
    const imgInputVals = {
        label: 'Thumbnail',
        name: 'thumbnail',
        photoInputRef,
        setPreviewImg
    }

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;
        setLoading(true);

        const title = form.title.value;
        const description = form.description.value;
        const doc = { title, description };

        const image = form.thumbnail.files[0];
        if (image) {
            const res = await uploadImg(form.thumbnail.files[0]);
            if (res?.success) {
                doc.img = res?.imgUrl;
            } else {
                swal("Oops!", res.message, "error");
                setLoading(false);
                return;
            }

        }

        const ownerVerify = { id: toUpdate._id, creatorEmail: toUpdate.author.email };

        axios.put("https://a11-server-weld.vercel.app/my-blogs/update", { doc, ownerVerify }, { withCredentials: true })
            .then(res => {
                if (res.data.acknowledged) {
                    swal("Success", "Your blog is updated successfully.", "success")
                        .then(() => {
                            loadMyBlogs();
                            setOpenModal(false);
                        })
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
            <Modal.Header>Update Blog</Modal.Header>
            <Loading loading={loading} />

            <Modal.Body>
                <img src={toUpdate.img} className={(previewImg ? 'hidden' : '') + " aspect-[3/2] w-full max-w-60 object-cover mt-5"} />

                <ImgPreview {...imgPrevVals} />

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

                    <ImageInput {...imgInputVals} />

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

UpdateBlogModal.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    toUpdate: PropTypes.object,
    loadMyBlogs: PropTypes.func,
    logOut: PropTypes.func,
    dark: PropTypes.bool
}

export default UpdateBlogModal;