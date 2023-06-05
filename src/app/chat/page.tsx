'use client';
import React, {useRef, useState} from 'react';
import Heading from "@/components/UI/Heading";
import {faEllipsisVertical, faMagnifyingGlass, faPhoneVolume, faVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Poppins} from '@next/font/google'
import {Message} from "@mui/icons-material";
import Messages from "@/components/message";
const poppins = Poppins({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
});
interface Props {}

const Page: React.FC<Props> = () => {
    const [message, setMessage] = useState<string>('')
    const [messageList, setMessageList] = useState<string[]>(['buraya mesaj yazabilirsin :)'])
    const input = useRef(null)

    // @ts-ignore
    const handleSubmit = (e) => {
        e.preventDefault()
        setMessageList((prev) => [...prev, message]);
        setMessage('')
        // @ts-ignore
        input.current.value = ''
    }
    return (
            <div className={`${poppins.className} chatPage w-full h-full flex flex-col justify-center`}>
                <div className={'chatText w-full h-[70px] flex items-end mb-3'}>
                    <Heading heading='h6' size='xl' className='font-bold'>
                        Chat
                    </Heading>
                </div>
                <div className={'chatContainer w-full h-5/6 flex gap-3'}>
                    <div className={'connectionsContainer w-1/4 h-full rounded-2xl flex flex-col gap-3 min-w-max'}>
                        <div className={'contactContainer w-full h-3/5 flex flex-col items-center rounded-2xl bg-white dark:bg-blackSwan py-3 gap-3 '}>
                            <div className={'search w-11/12 h-[10%] bg-grey dark:bg-black rounded-2xl'}>
                                <form action="" className={'w-full h-full flex'}>
                                    <div className={'w-2/12 h-full text-xl flex items-center justify-center text-ash'}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </div>
                                    <input type="text" className={'w-10/12 h-full bg-transparent px-1 placeholder:text-ash'} placeholder={'Search Contact'}/>
                                </form>
                            </div>
                            <div className={'contacts w-11/12 h-[80%] bg-grey dark:bg-black rounded-2xl flex flex-col'}>
                                <div className={'w-full h-[50px] bg-red-500'}></div>
                            </div>
                            <div className={'buttons w-11/12 h-[10%] flex gap-3'}>
                                <div className={'meeting w-1/2 h-full rounded-2xl bg-lavender flex justify-center items-center font-semibold text-white cursor-pointer'}>
                                    <span>Meeting</span>
                                </div>
                                <div className={'schedule w-1/2 h-full rounded-2xl bg-grey dark:bg-black flex justify-center items-center font-semibold cursor-pointer'}>
                                    <span>Schedule</span>
                                </div>
                            </div>
                        </div>
                        <div className={'groups w-full h-2/5 rounded-2xl bg-white dark:bg-blackSwan'}>
                            <Heading heading='h6' size='md' className='font-bold'>
                                Groups (3)
                            </Heading>
                        </div>
                    </div>
                    <div className={'chatArea w-3/4 h-full bg-white dark:bg-blackSwan rounded-2xl mr-3'}>
                        <div className={'chatHeader w-full h-[10%] min-h-[70px] border-ash dark:border-black border-b-2 rounded-t-2xl flex justify-between'}>
                            <div className={'contact w-fit h-full flex items-center gap-3 px-3'}>
                                <div className={'w-[55px] h-[55px] rounded-full border-2 border-ash'}></div>
                                <div className={'w-fit h-full flex flex-col justify-center'}>
                                    <span>Gözde Gül</span>
                                    <span className={'text-sm text-ash'}>Junior Developer</span>
                                </div>
                            </div>
                            <div className={'chatOptions w-[170px] h-full flex items-center justify-evenly'}>
                                <div className={'w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'}>
                                    <FontAwesomeIcon icon={faPhoneVolume} />
                                </div>
                                <div className={'w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'}>
                                    <FontAwesomeIcon icon={faVideo} />
                                </div>
                                <div className={'w-[35px] h-[35px] rounded-full border-2 border-ash flex justify-center items-center text-ash cursor-pointer'}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </div>
                            </div>
                        </div>
                        <div className={'chats w-full h-[81%] border-b-2 border-ash dark:border-black overflow-auto pb-3'}>
                            <div className={'w-full flex justify-start px-3'}>
                                <div className={'max-w-[40%] h-fit bg-grey dark:bg-black dark:text-white rounded-2xl rounded-tl-none break-all py-2 px-4 mt-3 text-black'}>
                                    denemeeeeeeeeeee
                                </div>
                            </div>
                            {
                                messageList.map((x, index) => {
                                    return <Messages key={index} message={x}/>
                                })
                            }
                        </div>
                        <div className={'chatFooter w-full h-[9%] min-h-[60px] bg-ash dark:bg-blackSwan rounded-b-2xl px-3 flex items-center'}>
                            <form action="" className={'w-full h-full flex items-center gap-3'} onSubmit={handleSubmit}>
                                <div className={'w-10/12 h-[60%] rounded-full bg-white dark:bg-black px-6 '}>
                                    <input className={'w-full h-full bg-transparent'} type="text" placeholder={'Mesaj yazın...'}
                                           onChange={(e) => {setMessage(e.target.value)}} ref={input}/>
                                </div>
                                <div className={'w-2/12 h-[60%] rounded-full bg-lavender text-white flex justify-center items-center cursor-pointer'}
                                onClick={handleSubmit}>
                                    Gönder
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Page;