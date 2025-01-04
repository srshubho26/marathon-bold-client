import PropTypes from "prop-types";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

const iconCommonClass = 'absolute dark:text-white dark:left-9 left-1 text-sec_title bottom-1 text-sm ';
const ThemeToggler = ({ setDark }) => {
    return (
        <button
            className="relative w-14 h-6 border border-desc rounded-full border-sec_title dark:border-white bg-banner_bg dark:bg-post_title"
            onClick={() => setDark(dark => {
                localStorage.setItem('dark', !dark);
                return !dark;
            })}>
            <BsFillMoonStarsFill className={iconCommonClass + 'dark:opacity-100 opacity-0'} />
            <MdSunny className={iconCommonClass + 'dark:opacity-0 opacity-100'} />
        </button>
    );
};

ThemeToggler.propTypes = {
    setDark: PropTypes.func
}

export default ThemeToggler;