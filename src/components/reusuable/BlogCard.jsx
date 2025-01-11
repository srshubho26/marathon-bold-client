import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (<article className='flex flex-col rounded-md overflow-hidden border border-desc relative'>

        <img src={blog.img} className='aspect-[3/2] object-cover w-full' />

        <div className='flex flex-col grow items-start p-3'>
            <div className=' flex items-center gap-2'>
                <img src={blog.author.thumb} className="w-10 h-10 object-cover border border-primary rounded-full" />
                <span className='text-primary font-semibold text-lg pr-5'>{blog.author.name}</span>
            </div>

            <h3 className='text-base sm:text-xl font-semibold text-title dark:text-lite'>{blog.title}</h3>
            <p className='grow mt-2 dark:text-lite'>{blog.description.substr(0, 60)}......</p>

            <Link to={`/blogs/${blog._id}`} className='text-primary font-semibold border text-lg uppercase px-5 py-2 rounded-md border-primary hover:bg-primary hover:text-lite mt-5'>Read More</Link>
        </div>
    </article>);
};

BlogCard.propTypes = {
    blog: PropTypes.object
};

export default BlogCard;