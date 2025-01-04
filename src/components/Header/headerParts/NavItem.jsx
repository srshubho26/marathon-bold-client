import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({name, link}) => {
    return (<li className="text-base font-semibold text-title dark:text-lite uppercase flex items-center">
        <NavLink className={({isActive})=>`${isActive ? 'text-primary' : ''} hover:text-primary`} to={link}>
            {name}
        </NavLink>
    </li>);
};

NavItem.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string
}

export default NavItem;