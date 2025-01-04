import { Spinner } from 'flowbite-react';
import PropTypes from 'prop-types';

const Loading = ({ loading }) => {
    return (<div className={"flex bg-[#1c001461] justify-center items-center left-0 top-0 z-20 absolute w-full h-full " + (loading ? "" : "hidden")}>
        <Spinner />
    </div>
    );
};

Loading.propTypes = {
    loading: PropTypes.bool
}

export default Loading;