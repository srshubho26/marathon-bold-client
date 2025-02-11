import { Card, Label, TextInput } from "flowbite-react";
import Title from "../../components/reusuable/Title";
import { Link, useNavigate } from "react-router-dom";
import GoogleBtn from "../../components/reusuable/GoogleBtn";
import swal from "sweetalert";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../components/reusuable/Loading";
import { Helmet } from "react-helmet-async";
import signup from '../../assets/img/signup.svg';
import ImgPreview from "../../components/reusuable/ImgPreview";
import ImageInput from "../../components/reusuable/ImageInput";
import { uploadImg } from "../../assets/utils";
import { FiUserPlus } from "react-icons/fi";

const Register = () => {
    const { createNewUser, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formProcessing, setFormProcessing] = useState(false);
    const [previewImg, setPreviewImg] = useState('');
    const photoInputRef = useRef();
    const imgPrevVals = { photoInputRef, previewImg, setPreviewImg, className: 'max-w-60 aspect-[1/1]' }
    const imgInputVals = {
        wrapperClass: previewImg ? 'hidden' : '',
        label: 'Profile Picture',
        name: 'profilePic',
        photoInputRef,
        setPreviewImg
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (formProcessing) return;
        if (user) navigate('/');
    }, [user, navigate, formProcessing])

    const handleRegister = async e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const pass = formData.get("pass");
        const passRequirement = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passRequirement.test(pass)) {
            swal('Error!', 'Password must have an uppercase & a lowercase character, a digit & length should be at least 6 characters', 'error');
            return;
        }

        const name = formData.get("name");
        const email = formData.get("email");
        const profilePic = formData.get("profilePic");

        setLoading(true);
        setFormProcessing(true);

        const res = await uploadImg(profilePic)

        if (!res?.success) {
            setLoading(false);
            setFormProcessing(false);
            swal('Error!', res.message, 'error');
            return;
        }

        createNewUser(email, pass, name, res?.imgUrl)
            .then(() => {
                setLoading(false);
                swal('Success', 'Your are a registered user now.', 'success')
                    .then(() => {
                        navigate('/');
                    })

            }).catch(({ code }) => {
                let errMsg = 'Something went wrong. Please check your internet connection & try again.';
                code === 'auth/email-already-in-use' && (errMsg = 'Email already exists.');

                swal('Error!', errMsg, 'error');
                setLoading(false);
            })
    }

    return (<section className="py-20 px-2 bg-lite dark:bg-gray-900">
        <Helmet>
            <title>Register - MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-xl flex-col-reverse md:flex-row gap-5 justify-between items-center mx-auto flex">
            <Card className="max-w-sm md:max-w-md w-full relative overflow-hidden">
                <Loading loading={loading} />

                <div className="flex">
                    <Title title="Register" />
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Name" />
                        </div>
                        <TextInput name="name" type="text" placeholder="Enter your name" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label value="Email" />
                        </div>
                        <TextInput name="email" type="email" placeholder="Enter your email" required />
                    </div>

                    <ImageInput {...imgInputVals} />
                    <ImgPreview {...imgPrevVals} />

                    <div>
                        <div className="mb-2 block">
                            <Label value="Password" />
                        </div>
                        <TextInput name="pass" type="password" placeholder="Enter your password" required />
                    </div>

                    <button className="w-fit text-primary border border-primary bg-transparent hover:bg-primary-lite font-semibold text-lg rounded-lg px-5 py-2 hover:text-lite uppercase flex gap-3 items-center">
                        <span>Register</span>
                        <FiUserPlus className="text-3xl" />
                    </button>
                </form>
                <Label className="text-desc text-sm sm:text-base">
                    Already have an account?
                    <Link to="/login" className="ml-2 text-title dark:text-lite">Login</Link>
                </Label>

                <h3 className="text-center dark:text-lite text-lg font-semibold">OR</h3>

                <GoogleBtn setLoading={setLoading} setFormProcessing={setFormProcessing} to="/home" />
            </Card>

            <div className="w-full max-w-sm md:max-w-xl">
                <img src={signup} />
            </div>
        </div>

    </section>);
};

export default Register;