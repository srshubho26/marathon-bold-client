import { TextInput } from 'flowbite-react';
import swal from 'sweetalert';

const Newsletter = () => {
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        swal("Done", 'Thank you for joining our newsletter.', 'success')
            .then(() => {
                form.reset();
            })
    }

    return (<form onSubmit={handleSubmit} className="flex w-full gap-1 sm:gap-x-3">
        <TextInput id="email" className="grow" placeholder="Enter your email" required type="email" />

        <button type="submit"
            className="hover:bg-primary border border-primary transition-all rounded-md px-4 text-primary hover:text-lite font-semibold uppercase">
            Subscribe
        </button>
    </form>);
};

export default Newsletter;