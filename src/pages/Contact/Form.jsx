import { Label, Textarea, TextInput } from "flowbite-react";
import swal from "sweetalert";
import useAuth from "../../Provider/useAuth";

const Form = () => {
    const {email} = useAuth() || {};

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        swal("Done", 'Thank you for your message. We will contact your asap.', 'success')
            .then(() => {
                form.reset();
            })
    }

    return (<form onSubmit={handleSubmit} className="w-full border border-desc px-4 rounded-md">
        <div className="mb-6 mt-3">
            <Label htmlFor="email" className="mb-2 text-lg block">
                Your Email
            </Label>
            <TextInput id="email" defaultValue={email ? email : ''} name="email" placeholder="Enter your email" type="email" required />
        </div>

        <div className="mb-6">
            <Label htmlFor="subject" className="mb-2 text-lg block">
                Subject
            </Label>
            <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" required />
        </div>

        <div className="mb-6">
            <Label htmlFor="message" className="mb-2 text-lg block">
                Your Message
            </Label>
            <Textarea id="message" name="message" placeholder="Tell us what ever on your mind" rows={8} required />
        </div>
        <div className="mb-6">
            <button className=" text-primary border border-primary bg-transparent hover:bg-primary-lite font-semibold text-lg rounded-md px-6 py-2 hover:text-lite uppercase">
                Send message
            </button>
        </div>
    </form>);
};

export default Form;