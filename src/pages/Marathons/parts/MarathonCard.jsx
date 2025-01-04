import PropTypes from 'prop-types';
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MarathonCard = ({ marathon }) => {
    return (<Card imgSrc={marathon.marathonImg}>
        <h5 className="text-lg xl:text-2xl font-bold tracking-tight text-title dark:text-lite">
            {marathon.title}
        </h5>

        <div className="text-gray-700 text-base xl:text-lg dark:text-gray-400">
            <p className="mb-1">
                <span className="font-semibold">Published: </span>
                <span>{moment(marathon.createdAt).format('MMM D, YYYY')}</span>
            </p>

            <p className="mb-1">
                <span className="font-semibold">Location: </span>
                <span>{marathon.location}</span>
            </p>

            <p className="font-semibold">Registration: </p>
            <p className="flex justify-between">
                <span>{moment(marathon.regStart).format('MMM D, YYYY')}</span>
                <span className="font-semibold">To</span>
                <span>{moment(marathon.regEnd).format('MMM D, YYYY')}</span>
            </p>

            <Link
                to={`/marathons/${marathon._id}`}
                className="border border-title rounded-md text-lg font-semibold uppercase py-2 block px-4 mt-8 text-center hover:bg-primary hover:text-white transition-colors"
            >
                See Details
            </Link>
        </div>
    </Card>);
};

MarathonCard.propTypes = {
    marathon: PropTypes.object
};

export default MarathonCard;