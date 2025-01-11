import { useContext, useState } from "react";
import useAuth from "../../Provider/useAuth";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/reusuable/Loading";
import { FileInput, Label, Textarea, TextInput } from "flowbite-react";

const imageHostingLink = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_API}`;

const AddBlog = () => {
    const [loading, setLoading] = useState(false);
    const { email, photoURL, displayName } = useAuth();
    const { logOut } = useContext(AuthContext);

    const handleAdd = async e => {
        e.preventDefault();
        const form = e.target;
        try {
            setLoading(true);

            const imgFile = { image: form.thumbnail.files[0] }
            const res = await axios.post(imageHostingLink, imgFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (res?.data?.success) {
                const title = form.title.value;
                const description = form.description.value;
                const author = {
                    name: displayName,
                    thumb: photoURL,
                    email
                }
                const img = res.data.data.display_url

                const data = { title, img, description, author, date: new Date().getTime() };
                axios.post("https://a11-server-weld.vercel.app/add-blog", data, { withCredentials: true })
                    .then(res => {
                        if (res.data.acknowledged) {
                            swal("Done", "Your blog is added successfully.", "success");
                        }
                        setLoading(false);
                        form.reset();
                    })
                    .catch(err => {
                        swal("Oops!", "Something went wrong!", "error");
                        if (err.status === 401 || err.status === 403) {
                            logOut();
                        }
                        setLoading(false);
                    })

            }
        } catch {
            swal("Oops!", "Something went wrong!", "error");
        }
    }

    return (<section>
        <Helmet>
            <title>Add New Blog - MarathonBold</title>
        </Helmet>

        <form className="grid sm:grid-cols-2 gap-5 lg:gap-10 relative p-2 sm:p-5 lg:p-10" onSubmit={handleAdd}>
            <Loading loading={loading} />

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Title" />
                </div>
                <TextInput type="text" name="title" placeholder="Enter Blog Title" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label className="lg:text-lg" value="Thumbnail" />
                </div>

                <FileInput name="thumbnail" required />
            </div>

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