import Title from "../../../components/reusuable/Title";

const UpcomingMarathons = () => {
    const upcomingMarathons = [
        {
            title: "Survive the cold",
            overview: "We are going to arrange a different type of marathon in a cold environment. We hope you do not want to miss it.",
            availableFrom: "January 5, 2025"
        },
        {
            title: "Stony road challange",
            overview: "This marathon will be so much exciting. We are gonna arrange a marathon where you will find so many large stones under your feet.",
            availableFrom: "January 21, 2025"
        },
        {
            title: "Conquery the jungle",
            overview: "Do you love advanture? Then get ready to experience one. This time we are going to run inside a jungle with new excitements.",
            availableFrom: "February 3, 2025"
        },
        {
            title: "Enjoy the sand",
            overview: "If you are strong and fit enough then get ready to run in the sand of the Middle East. It will be so much exciting and full of fun.",
            availableFrom: "February 15, 2025"
        },
        {
            title: "Dhaka Marathon",
            overview: "We know dhaka as a polluted city. So let's take a chance to wash away the pollution with our speed.",
            availableFrom: "March 2, 2025"
        },
        {
            title: "Thailand Marathon",
            overview: "Do you like Thai foods? Then get ready to run on the busy road of thailand and have some Thai soup.",
            availableFrom: "March 18, 2025"
        }
    ]

    return (<section className="py-20 bg-lite dark:bg-gray-900 px-2">
        <Title title="Upcoming Marathons" />
        <div className="max-w-screen-xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {upcomingMarathons.map((marathon, i)=><article key={i} className="bg-white dark:bg-[#0f1523] border flex flex-col justify-between shadow rounded-md overflow-hidden">
                <h3 className="text-2xl uppercase font-semibold text-primary p-5 pb-0">{marathon.title}</h3>

                <div className="text-base text-title dark:text-lite p-5 pt-0">
                    <p className="my-4 text-desc">{marathon.overview}</p>
                    

                    <p className="flex items-center gap-2">
                        <strong>Available From:</strong>
                        <span>{marathon.availableFrom}</span>
                    </p>
                </div>
            </article>)}
            
        </div>
    </section>);
};

export default UpcomingMarathons;