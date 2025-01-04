import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({icon, name, to}) => {
    const {pathname} = useLocation();

    return (
        <Link className={(pathname===to ? "text-primary dark:text-primary" : "") + " hover:text-primary dark:text-lite dark:hover:text-primary flex items-center gap-2"} to={to}>
            <span className="text-2xl">{icon()}</span>
        <span className=" tracking-wide">{name}</span>
        </Link>
    );
};

SidebarItem.propTypes = {
    icon: PropTypes.func,
    name: PropTypes.string,
    to: PropTypes.string
};

export default SidebarItem;