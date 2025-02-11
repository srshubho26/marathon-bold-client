import { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../Provider/useAuth";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/reusuable/Loading";
import { Label, Textarea, TextInput } from "flowbite-react";
import ImgPreview from "../../components/reusuable/ImgPreview";
import ImageInput from "../../components/reusuable/ImageInput";
import { uploadImg } from "../../assets/utils";

const AddBlog = () => {
    const [loading, setLoading] = useState(false);
    const { email, photoURL, displayName } = useAuth();
    const { logOut } = useContext(AuthContext);
    const [previewImg, setPreviewImg] = useState('');
    const photoInputRef = useRef();
    const imgPrevVals = { photoInputRef, previewImg, setPreviewImg, className: 'max-w-96 aspect-[3/2]' }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const imgInputVals = {
        label: 'Thumbnail',
        name: 'thumbnail',
        photoInputRef,
        setPreviewImg
    }

    const handleAdd = async e => {
        e.preventDefault();
        const form = e.target;
        setLoading(true);

        const res = await uploadImg(form.thumbnail.files[0]);
        if (res?.success) {
            const title = form.title.value;
            const description = form.description.value;
            const author = {
                name: displayName,
                thumb: photoURL,
                email
            }
            const img = res.imgUrl

            const data = { title, img, description, author, date: new Date().getTime() };
            axios.post("https://a11-server-weld.vercel.app/add-blog", data, { withCredentials: true })
                .then(res => {
                    if (res.data.acknowledged) {
                        swal("Done", "Your blog is added successfully.", "success");
                    }
                    setLoading(false);
                    form.reset();
                    setPreviewImg('');
                })
                .catch(err => {
                    swal("Oops!", "Something went wrong!", "error");
                    if (err.status === 401 || err.status === 403) {
                        logOut();
                    }
                    setLoading(false);
                })

        } else {
            swal("Oops!", res.message, "error");
            setLoading(false);
        }
    }

    return (<section>
        <Helmet>
            <title>Add New Blog - MarathonBold</title>
        </Helmet>

        <form className="grid sm:grid-cols-2 gap-5 lg:gap-10 relative px-2 sm:p-5 lg:p-10" onSubmit={handleAdd}>
            <Loading loading={loading} />

            <div className='col-span-full mt-5 sm:m-0'>
                <ImgPreview {...imgPrevVals} />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Title" />
                </div>
                <TextInput type="text" name="title" placeholder="Enter Blog Title" required />
            </div>

            <ImageInput {...imgInputVals} />

            <div className="col-span-full">
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Description" />
                </div>
                <Textarea name="description" placeholder="Description of Blog" required rows={10} />
            </div>

            <div className="col-span-full">
                <button className="px-8 text-lite font-semibold text-xl bg-primary hover:bg-primary-lite rounded-md py-2" type="submit">Publish</button>
            </div>
        </form>
    </section>);
};

export default AddBlog;