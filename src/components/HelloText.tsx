import React, { FC, useEffect, useState } from 'react';
import GorkemTypeWriter from "@/util/GorkemTypeWriter";
import Heading from "@/components/UI/Heading";
import IntroductionText from "@/components/UI/IntroductionText";
import arrowGif from '@assets/giphy.gif';

const HelloText: FC = () => {
    const [show, setShow] = useState(0);

    useEffect(() => {

            setTimeout(() => setShow(1), 4000)
            setTimeout(() => setShow(2), 4600)
            setTimeout(() => setShow(3), 5200)
            setTimeout(() => setShow(4), 5800)

    }, []);

    return (
        <div className={'flex flex-col items-center p-12'}>
            <GorkemTypeWriter
                durationTime={1000}
                afterDelete={false}
                afterDeleteDuration={1000}
                infinite={false}
            >
                <div>
                    <Heading
                        heading='h6'
                        className={`typewriter caret-thick text-rose-500 p-2 ${show >= 1 ? '' : 'opacity-0'}`}
                        size={'xl'}
                    >
                        Hello, Welcome to Socio!
                    </Heading>
                </div>
            </GorkemTypeWriter>
            <GorkemTypeWriter
                durationTime={3000}
                afterDelete={false}
                afterDeleteDuration={1000}
                infinite={false}
            >
                <div>
                    <Heading
                        heading='h6'
                        className={`typewriter text-slate-900 p-2 ${show >= 2 ? '' : 'opacity-0'}`}
                        size={'md'}
                    >
                        Discover the advantages of socio
                    </Heading>
                </div>
            </GorkemTypeWriter>

            <div className={'flex flex-col gap-8 justify-center items-center ease-out duration-300 '}>
                <div className={`w-2/3 mt-3 ease-out duration-300 ${show >= 1 ? '' : 'opacity-0'}`}>
                    <IntroductionText
                        title={'Socio is an innovative social media platform that allows you to make connections, interact with communities and express yourself.'}
                    />
                </div>
                <div className={`w-2/3 mt-3 ease-out duration-300 ${show >= 2 ? '' : 'opacity-0'}`}>
                    <IntroductionText
                        title={'Filled with content based on your interests, Socio aims to add value to your social life.'}
                    />
                </div>
                <div className={`w-2/3 mt-3 ease-out duration-300 ${show >= 3 ? '' : 'opacity-0'}`}>
                    <IntroductionText
                        title={'You can share your ideas, join communities related to your interests.'}
                    />
                </div>
                <div className={`w-2/3 mt-3 ease-out duration-300 ${show >= 4 ? '' : 'opacity-0'}`}>
                    <IntroductionText
                        title={'Connect more with Socio, discover more and expand your social network.'}
                    />
                </div>
            </div>

            {/* <img src={arrowGif} alt="" /> */}
        </div>
    );
};

export default HelloText;
