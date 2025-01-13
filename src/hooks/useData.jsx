import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

const useData = (type, size, sort='', currentPage=0, shouldLoad=true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [totalData, setTotalData] = useState(0);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if(!shouldLoad)return;
        setErr(false);
        const loadWithTotalNumber = async () => {
            setLoading(true);

            if (totalData < 1) {
                const total = await axios(`https://a11-server-weld.vercel.app/total-${type}`);
                setTotalData(total.data.count);
            }

            axios(`https://a11-server-weld.vercel.app/${type}?sort=${sort}&page=${currentPage - 1}&size=${size}`)
                .then(res => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    swal("Oops!", "Something went wrong!", "error");
                    setLoading(false);
                    setErr(true);
                })
        }
        loadWithTotalNumber();
    }, [totalData, sort, currentPage, size, type, shouldLoad]);

    return {data, loading, totalData, err}
};

useData.propTypes = {
    size: PropTypes.number,
    type: PropTypes.string,
    sort: PropTypes.string,
    currentPage: PropTypes.number,
    shouldLoad: PropTypes.bool
};

export default useData;