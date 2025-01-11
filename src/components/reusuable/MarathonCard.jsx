import PropTypes from 'prop-types';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { GrAnnounce } from 'react-icons/gr';

const MarathonCard = ({ marathon }) => {
    return (<Card imgSrc={marathon.marathonImg} className='relative marathon-card'>
        <span className="bg-primary text-sm text-lite rounded-full px-2 absolute top-7 left-1">
            {marathon.location}
        </span>

        <p className="flex gap-2 bg-primary text-sm text-lite rounded-full px-2 absolute top-1 left-1">
                <span>{moment(marathon.regStart).format('D MMM, YY')}</span>
                <span className="font-semibold">-</span>
                <span>{moment(marathon.regEnd).format('D MMM, YY')}</span>
            </p>

        <div className='relative grow'>
        <h5 className="text-xl font-bold tracking-tight text-title dark:text-lite">
            {marathon.title}
        </h5>

            <p className="absolute -top-14 -left-5 flex gap-1 items-center text-dark dark:text-lite bg-lite dark:bg-dark px-2 py-1 text-sm rounded-full">
                <span className="text-xl"><GrAnnounce /></span>
                <span>{moment(marathon.createdAt).format('MMM D, YYYY')}</span>
            </p>

            
<p className='text-desc dark:text-lite my-2'>{marathon.description.substr(0, 50)}...</p>
        </div>


            <Link
                to={`/marathons/${marathon._id}`}
                className="border border-primary rounded-md text-lg font-semibold uppercase py-2 block px-4 text-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
                See Details
            </Link>
    </Card>);
};

MarathonCard.propTypes = {
    marathon: PropTypes.object
};

export default MarathonCard;