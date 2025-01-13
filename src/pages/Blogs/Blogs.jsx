import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Title from "../../components/reusuable/Title";
import { Dropdown, Pagination } from "flowbite-react";
import Loading from "../../components/reusuable/Loading";
import BlogCard from "../../components/reusuable/BlogCard";
import useData from "../../hooks/useData";

const Blogs = () => {
    const [sort, setSort] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(8);
    const onPageChange = page => setCurrentPage(page);
    const sizes = [8, 12, 16, 20];

    const { data: blogs, loading, totalData: totalBlogs } = useData('blogs', size, sort, currentPage);

    return (<section className="py-20 px-2">
        <Helmet>
            <title>Blogs - MarathonBold</title>
        </Helmet>

        <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
                <Title title="Blogs" />

                <div className="flex gap-1 sm:gap-2 filter-marathons">
                    <Dropdown className="" label={`Marathons Per Page (${size})`}>
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

            <div className="relative min-h-[calc(100vh-300px)]">
                <Loading loading={loading} />

                <div className="max-w-sm sm:max-w-screen-xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-3 xl:gap-5 mt-10">

                    {blogs?.map(blog => (<BlogCard key={blog._id} blog={blog} />))}
                </div>
            </div>

            {totalBlogs > size ? <div className="mt-16 relative flex justify-center marathon-pagination">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalBlogs / size)}
                    onPageChange={onPageChange}
                />
                {loading ? <div className="absolute top-0 left-0 w-full h-full bg-transparent z-30">
                </div> : null}
            </div> : null}
        </div>
    </section>);
};

export default Blogs;