import PropTypes from 'prop-types';

const Title = ({title, color="text-title dark:text-lite"}) => {
    return (<h2 className={"text-2xl sm:text-4xl uppercase font-bold text-center "+ color}>
        {title}
        </h2>
    );
};

Title.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string
};

export default Title;