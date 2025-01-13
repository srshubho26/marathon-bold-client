import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Title from '../../../components/reusuable/Title';
import { useCallback, useEffect, useState } from 'react';

const StartCountdown = ({ eventStart, createdAt }) => {
    const [isOver, setIsOver] = useState(false);

    // Returns the time left to start marathon in second
    const getRemainingTimeInSecond = useCallback(() => (eventStart - Date.now()) / 1000, [eventStart]);

    useEffect(()=>{
        const timeLeft = getRemainingTimeInSecond();
        if(timeLeft<1){
            setIsOver(true);
        }
    }, [getRemainingTimeInSecond])

    // Returns the time left to start marathon in day
    const getRemainingTimeInDay = () => Math.trunc(getRemainingTimeInSecond() / 86400);

    // Returns the time to start marathon in hour
    const getRemainingTimeInHour = () => Math.trunc(getRemainingTimeInSecond() / 3600);

    // Returns the time to start marathon in minute
    const getRemainingTimeInMinute = () => Math.trunc(getRemainingTimeInSecond() / 60);

    // Return hours less than a day
    const hoursLeft = () => (getRemainingTimeInHour() - (getRemainingTimeInDay() * 24));

    // Returns minutes less than a hour
    const minutesLeft = () => (getRemainingTimeInMinute() - (getRemainingTimeInHour() * 60));

    // Returns seconds less than a minute
    const secondsLeft = () => Math.trunc(getRemainingTimeInSecond() - (getRemainingTimeInMinute() * 60))

    // Taking marathon sum of eventStart & createdAt as the duration for days
    const durationForDays = Math.trunc((eventStart - createdAt) / 1000);

    return (<div className='mt-16'>
    <Title title={isOver ? "Marathon passed the starting date" : "Marathon will start after"} />

        <div className='flex justify-center gap-5 flex-wrap text-xl font-semibold text-center text-primary my-5 uppercase max-w-md mx-auto lg:max-w-full'>
        <div className="flex justify-center">
            <CountdownCircleTimer
                isPlaying={getRemainingTimeInSecond()>1}
                duration={durationForDays}
                colors='#ce0395e9'
                onComplete={()=>setIsOver(true)}
                initialRemainingTime={getRemainingTimeInSecond()>1 ? Math.trunc(getRemainingTimeInSecond()) : 0}
            >
                {() => {
                    let time = getRemainingTimeInDay();
                    if (time < 10) time = '0' + time;

                    return <div>
                        <p className='text-4xl'>
                            {getRemainingTimeInSecond()<1 ? '00' : time}
                        </p>
                        <p>Day{time>1 ? 's' : ''}</p>
                    </div>
                }}
            </CountdownCircleTimer>
        </div>

        <div className="flex justify-center">
            <CountdownCircleTimer
                isPlaying={getRemainingTimeInSecond()>1}
                duration={86400}
                colors='#ce0395e9'
                initialRemainingTime={getRemainingTimeInSecond()<1 ? 0 : ((hoursLeft() * 3600) + ((minutesLeft() * 60) + secondsLeft()))}
                onComplete={() => ({
                    shouldRepeat: getRemainingTimeInSecond()>1,
                    newInitialRemainingTime: ((hoursLeft() * 3600) + ((minutesLeft() * 60) + secondsLeft())) || 86400
                })}
            >
                {() => {
                    let time = hoursLeft();
                    if (time < 10) time = '0' + time;

                    return <div>
                        <p className='text-4xl'>
                            {getRemainingTimeInSecond()<1 ? '00' : time}
                        </p>
                        <p>Hour{time>1 ? 's' : ''}</p>
                    </div>
                }}
            </CountdownCircleTimer>
        </div>

        <div className="flex justify-center">
            <CountdownCircleTimer
                isPlaying={getRemainingTimeInSecond()>1}
                duration={3600}
                colors='#ce0395e9'
                initialRemainingTime={getRemainingTimeInSecond()<1 ? 0 : ((minutesLeft() * 60) + secondsLeft())}
                onComplete={() => ({
                    shouldRepeat: getRemainingTimeInSecond()>1,
                    newInitialRemainingTime: ((minutesLeft() * 60) + secondsLeft()) || 3600
                })}
            >
                {() => {
                    let time = minutesLeft();
                    if (time < 10) time = '0' + time;

                    return <div>
                        <p className='text-4xl'>
                            {getRemainingTimeInSecond()<1 ? '00' : time}
                        </p>
                        <p>Minute{time>1 ? 's' : ''}</p>
                    </div>
                }}
            </CountdownCircleTimer>
        </div>

        <div className="flex justify-center">
            <CountdownCircleTimer
                isPlaying={getRemainingTimeInSecond()>1}
                duration={60}
                colors='#ce0395e9'
                initialRemainingTime={getRemainingTimeInSecond()<1 ? 0 : secondsLeft()}
                onComplete={() => ({
                    shouldRepeat: getRemainingTimeInSecond()>1,
                    newInitialRemainingTime: secondsLeft() || 60
                })
                }
            >
                {() => {
                    let time = secondsLeft();
                    if (time < 10) time = '0' + time;
                    return <div>
                        <p className='text-4xl'>
                            {getRemainingTimeInSecond()<1 ? '00' : time}
                        </p>
                        <p>Second{time>1 ? 's' : ''}</p>
                    </div>
                }}
            </CountdownCircleTimer>
        </div>
    </div>
    </div>);
};

StartCountdown.propTypes = {
    eventStart: PropTypes.number,
    createdAt: PropTypes.number
};

export default StartCountdown;