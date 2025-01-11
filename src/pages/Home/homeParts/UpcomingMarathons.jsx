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
            {upcomingMarathons.map((marathon, i) => <article key={i}
                className="border flex flex-col justify-between border-primary rounded-md overflow-hidden relative">
                <p className="absolute top-5 left-5 px-3 py-1 bg-primary rounded-full text-lite text-sm">{marathon.availableFrom}</p>

                <h3 className="text-2xl uppercase font-semibold text-primary pt-16 px-5 pb-2">{marathon.title}</h3>

                <p className="text-base text-title dark:text-lite p-5 pt-0">{marathon.overview}</p>

            </article>)}

        </div>
    </section>);
};

export default UpcomingMarathons;