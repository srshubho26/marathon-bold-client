import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Title from "../../../components/reusuable/Title";
import faq from '../../../assets/img/faq.svg';

const FAQ = () => {
    return (<section className="py-20 px-2 bg-lite dark:bg-gray-900">
        <Title title="Frequently Asked Questions" />

        <div className="flex flex-col-reverse md:flex-row gap-5 md:items-center max-w-screen-xl mx-auto mt-10">
            <Accordion className="basis-1/2 bg-white dark:bg-dark">
                <AccordionPanel>
                    <AccordionTitle className="text-primary">What is MarathonBold?</AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            MarathonBold is a Marathon organizing platform where people from different country can participate in Marathon race all over the world.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            If you are passionate about running, you are most welcome to MarathonBold.
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel>
                    <AccordionTitle className="text-primary">Where do you arrange Marathon?</AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            There is no fixed place for us to arrange Marathon. We visit different cities all over the world every year to select a perfect place for Marathon. We want to provide a diversive experience to our participance.
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel>
                    <AccordionTitle className="text-primary">Can I participate in Marathon?</AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Definitely. You just need to be at least 18 and physically fit for running.
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel>
                    <AccordionTitle className="text-primary">Is there any limitation for elderly people?</AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Absolutely not. Age is just a number. You just need to maintain a healthy lifestyle so that you become physically fit for running.
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel>
                    <AccordionTitle className="text-primary">How can I participate?</AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Just view one of our Marathons from the page and there is a button to apply. Click the button before the application deadline is over and provide the credentials.
                        </p>
                    </AccordionContent>
                </AccordionPanel>

                <AccordionPanel>
                    <AccordionTitle className="text-primary">Can I participate in more than one Marathon?</AccordionTitle>
                    <AccordionContent>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Sure. It doesn&apos;t matter how many times you participated as long as you are able to happy and fit for running.
                        </p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>

            <div className="w-full md:basis-1/2 max-w-md md:max-w-full mx-auto">
                <img src={faq} className="rounded-md" alt="Running" />
            </div>
        </div>
    </section>);
};

export default FAQ;