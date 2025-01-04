import { Helmet } from 'react-helmet-async';
import { PiMaskSadLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (<section className='h-screen flex flex-col justify-center font-bold gap-5 items-center bg-lite'>
        <Helmet>
            <title>404 Not Found</title>
        </Helmet>
        <span className='text-9xl text-desc'><PiMaskSadLight/></span>
        <h2 className='uppercase text-primary text-3xl sm:text-6xl'>404 Not found</h2>
        <div className='text-xl text-center text-title dark:text-lite font font-semibold'>
            <p>The page you are trying to visit does not exist.</p>
            <p>Go to <Link to="/home" className='text-desc'>Home</Link></p>
        </div>
    </section>);
};

export default Error404;