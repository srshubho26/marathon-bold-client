import { TextInput } from 'flowbite-react';
import PropTypes from 'prop-types';

const Search = ({ loadData }) => {
    let timeout;
    const handleChange = e => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            loadData(e.target.value);
        }, 500);
    }

    return (<div className="w-64 ml-auto mb-4 border border-title rounded-md">
        <TextInput type="text" placeholder="Search Here" onChange={handleChange} required />
    </div>);
};

Search.propTypes = {
    loadData: PropTypes.func
}

export default Search;