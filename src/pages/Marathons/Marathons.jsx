import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Title from "../../components/reusuable/Title";
import Loading from "../../components/reusuable/Loading";
import { Dropdown, Pagination } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import MarathonCard from "./parts/MarathonCard";

const Marathons = () => {
    const [marathons, setMarathons] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("");

    const [totalMarathons, setTotalMarathons] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(6);
    const onPageChange = page => setCurrentPage(page);
    const sizes = [6, 9, 12, 15];

    useEffect(() => {
        const loadWithTotalNumber = async () => {
            setLoading(true);

            if (totalMarathons < 1) {
                const total = await axios("https://a11-server-weld.vercel.app/total-marathons");
                setTotalMarathons(total.data.count);
            }

            axios(`https://a11-server-weld.vercel.app/marathons?sort=${sort}&page=${currentPage - 1}&size=${size}`)
                .then(res => {
                    setMarathons(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err.message)
                    swal("Oops!", "Something went wrong!", "error");
                    setLoading(false);
                })
        }
        loadWithTotalNumber();
    }, [totalMarathons, sort, currentPage, size]);

    return (<section className="py-20 px-2">
        <Helmet>
            <title>All Marathons - MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
                <Title title="All Marathons" />

                <div className="flex gap-1 sm:gap-2 filter-marathons">
                    <Dropdown label={`Marathons Per Page (${size})`}>
                        {sizes.map(el => (
                            <Dropdown.Item key={el} disabled={el === size}
                                onClick={() => {
                                    setSize(el);
                                    setCurrentPage(1);
                                }}>
                                <span className={el === size ? "text-red-400" : ""}>
                                    {el}
                                </span>
                            </Dropdown.Item>))}
                    </Dropdown>

                    <Dropdown label={(sort === 'asc' && 'Old To New') || (sort === 'desc' && 'New To Old') || 'SORT'}>
                        <Dropdown.Item onClick={() => {
                            if (sort === 'desc') return;
                            setSort('desc');
                            setCurrentPage(1);
                        }}>
                            <span className={sort === 'desc' ? 'text-red-400' : ''}>
                                New To Old
                            </span>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => {
                            if (sort === 'asc') return;
                            setSort('asc');
                            setCurrentPage(1);
                        }}>
                            <span className={sort === 'asc' ? 'text-red-400' : ''}>
                                Old To New
                            </span>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>

            <div className="relative">
                <Loading loading={loading} />

                <div className="mt-10 min-h-52 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {marathons?.map(marathon => (
                        <MarathonCard
                            key={marathon._id}
                            marathon={marathon}
                        />))}
                </div>
            </div>

            {totalMarathons > size ? <div className="mt-16 relative flex justify-center marathon-pagination">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalMarathons / size)}
                    onPageChange={onPageChange}
                />
                {loading ? <div className="absolute top-0 left-0 w-full h-full bg-transparent z-30">
                </div> : null}
            </div> : null}
        </div>
    </section>);
};

export default Marathons;