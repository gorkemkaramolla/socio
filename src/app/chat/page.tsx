'use client';
import React, {useEffect, useRef, useState} from 'react';
import Heading from "@/components/UI/Heading";
import {
    faEllipsisVertical,
    faMagnifyingGlass,
    faPaperPlane,
    faPhoneVolume,
    faVideo
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Messages from "@/components/messages";
import Contacts from "@/components/contacts";
import ConnectionsContainer from "@/components/connectionsContainer";
import useChatToggle from "@/lib/zustand/useChatToggle";
import {Poppins} from "@next/font/google";
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
    const chat = useRef(null)
    // @ts-ignore
    const setChatStatus = useChatToggle(state => state.setShow);

    useEffect(() => {
        // @ts-ignore
        chat.current.scrollTop = chat.current.scrollHeight;
    },[messageList])

    // @ts-ignore
    const handleSubmit = (e) => {
        if (message.length > 0) {
            e.preventDefault()
            setMessageList((prev) => [...prev, message]);
            setMessage('')
            // @ts-ignore
            input.current.value = ''
        }
    }
    return (
            <div className={`chatPage w-full h-full flex flex-col justify-center`}>
                <div className={'chatText w-full h-[70px] md:flex items-end mb-3 hidden'}>
                    <Heading heading='h6' size='xl' className='font-bold'>
                        Chat
                    </Heading>
                </div>
                <div className={'chatContainer w-full md:h-5/6 h-full flex'}>
                    <div className={'chatArea w-full h-full bg-white dark:bg-blackSwan md:rounded-2xl md:mr-3 xl:mr-0'}>
                        <div className={'chatHeader w-full h-[10%] min-h-[70px] border-ash dark:border-black border-b-2 md:rounded-t-2xl flex justify-between'}>
                            <div className={'contact w-fit h-full flex items-center gap-2 px-3'}>
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
                        <div className={'chats w-full h-[82%] border-b-2 border-ash dark:border-black overflow-auto pb-3'} ref={chat}>
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
                        <div className={'chatFooter w-full h-[8%] min-h-[50px] bg-ash dark:bg-blackSwan md:rounded-b-2xl px-3 flex items-center'}>
                            <form action="" className={'w-full h-full flex items-center gap-2'} onSubmit={handleSubmit}>
                                <div className={'w-10/12 h-[60%] rounded-full bg-white dark:bg-black px-6 '}>
                                    <input className={`w-full h-full bg-transparent  ${poppins.className}`} type="text" placeholder={'Mesaj yazın...'}
                                           onChange={(e) => {setMessage(e.target.value)}} ref={input}/>
                                </div>
                                <div className={'w-2/12 h-[60%] rounded-full bg-lavender text-white md:flex hidden justify-center items-center cursor-pointer'}
                                onClick={handleSubmit}>
                                    Send
                                </div>
                                <div className={'w-2/12 h-[60%] rounded-full bg-lavender text-white flex md:hidden justify-center items-center cursor-pointer'}
                                     onClick={handleSubmit}>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Page;