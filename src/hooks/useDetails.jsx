import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const useDetails = (id, type = 'marathons') => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios(`https://a11-server-weld.vercel.app/${type}/${id}`)
            .then(res => {
                if (Object.keys(res.data).length < 1) {
                    return navigate('/');
                }
                setDetails(res.data);
                setLoading(false);
            })
            .catch(() => {
                swal("Oops!", "Something went wrong!", "error");

                navigate('/');
                setLoading(false);
            })
    }, [id, navigate, type]);

    return { details, loading };
};

useDetails.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string
};

export default useDetails;