import { Button, FileInput, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';
import Loading from '../../../components/reusuable/Loading';
import { useRef, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { LiaTimesSolid } from 'react-icons/lia';

const imageHostingLink = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_API}`;

const UpdateBlogModal = ({ loadMyBlogs, openModal, setOpenModal, toUpdate, logOut, dark }) => {
    const [loading, setLoading] = useState(false);
    const [previewImg, setPreviewImg] = useState(null);
    const photoInputRef = useRef();

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;
        setLoading(true);

        const title = form.title.value;
        const description = form.description.value;
        const doc = { title, description };
        const image = form.thumbnail.files[0];
        if (image) {
            const imgFile = { image }
            const res = await axios.post(imageHostingLink, imgFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            doc.img = res.data.data.display_url;
        }

        const ownerVerify = { id: toUpdate._id, creatorEmail: toUpdate.author.email };

        axios.put("https://a11-server-weld.vercel.app/my-blogs/update", { doc, ownerVerify }, { withCredentials: true })
            .then(res => {
                if (res.data.acknowledged) {
                    swal("Success", "Your blog is updated successfully.", "success")
                        .then(() => {
                            loadMyBlogs();
                            setOpenModal(false);
                            setPreviewImg(null);
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

    const handleFileInput = e => {
        const img = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => setPreviewImg(reader.result);
        img && reader.readAsDataURL(img);
    }

    return (<>{toUpdate &&
        <Modal className={'relative overflow-hidden ' + (dark ? 'dark' : '')} show={openModal} onClose={() => setOpenModal(false)} size="4xl" popup>
            <Modal.Header>Update Blog</Modal.Header>
            <Loading loading={loading} />

            <Modal.Body>
                <img src={toUpdate.img} className={(previewImg ? 'hidden' : '') + " aspect-[3/2] w-full max-w-60 object-cover mt-5"} />

                {previewImg && <div className='w-full max-w-60 aspect-[3/2] relative mt-5'>
                    <button className="absolute -top-2 -right-2 border rounded-full p-1 text-lite bg-red-600 text-base" onClick={() => {
                        photoInputRef.current.value = '';
                        setPreviewImg(null);
                    }}>
                        <LiaTimesSolid />
                    </button>

                    <img src={previewImg} className="w-full h-full object-cover" />
                </div>}

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
                            <Label className="lg:text-lg" value="Thumbnail" />
                        </div>

                        <FileInput name="thumbnail" ref={photoInputRef} onChange={handleFileInput} />
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

UpdateBlogModal.propTypes = {
    openModal: PropTypes.bool,
    setOpenModal: PropTypes.func,
    toUpdate: PropTypes.object,
    loadMyBlogs: PropTypes.func,
    logOut: PropTypes.func,
    dark: PropTypes.bool
}

export default UpdateBlogModal;