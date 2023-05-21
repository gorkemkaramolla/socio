'use client';
import React, {FC, useState} from 'react';
import Button from "@/components/UI/Button";
import {faCommentDots, faEllipsis, faFaceKissWinkHeart, faHeart, faIcons} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
interface Props {
    header: {
        name: string,
        username: string
    },
    content: string
}

const ContentContainer: FC<Props> = ({header, content}) => {
    const [liked,setLiked] = useState(false)


    const handleClick = () => {
        setLiked(!liked)
    }

    return (
        <div className={'flex flex-col bg-white h-fit min-h-[50px] my-4 shadow-2xl rounded-xl relative'}>
            <div className={' flex items-center justify-between header h-fit px-4 w-full p-2 border-b-[1px] border-b-red-500 font-bold'}>
                <div className={'w-[40px] h-[40px] absolute -top-2 -left-2 rounded-full border-2 border-gray'}>
                    <img className={'rounded-full'} src="https://i.ibb.co/MV0c2sD/avatar6.jpg" alt=""/>
                </div>
                <div className={'ml-6 flex items-center'}>
                    <span>{header.name}</span>
                    <span className={'text-sm text-red-400 mx-2.5'}>{header.username}</span>
                </div>
                {/*<div className={'w-6 h-6 bg-red-500'}></div>*/}
                <div className={'flex'}>
                    <Button
                        variant={"ghost"}
                        size={"smSquare"}
                        className={liked ? ' text-red-500 ease-out duration-300' :'heart text-stone-300 ease-out duration-300'}
                        onClick={handleClick}
                    ><FontAwesomeIcon icon={faHeart} /></Button>
                    <Button
                        variant={"ghost"}
                        size={"smSquare"}
                        className={'text-slate-500'}
                    ><FontAwesomeIcon icon={faCommentDots} /></Button>
                    <Button
                        variant={"ghost"}
                        size={"smSquare"}
                        className={'text-slate-900'}
                    ><FontAwesomeIcon icon={faEllipsis} /></Button>
                </div>
            </div>
            <div className={'px-4 py-2 relative'}>
                <div className={'content w-fit'}>{content}</div>
                <div className={'flex gap-5 items-center'}>
                    <div className={'content pt-2 text-xs text-red-500 font-bold flex items-center cursor-pointer'}>
                            <div className={`${liked ? 'scale-100' : 'scale-0'} w-5 h-5 bg-red-100 absolute z-0 left-2 bottom-3 rounded-full ease-out duration-300`}>
                                <img className={'rounded-full'} src="https://i.ibb.co/VxNv13V/avatar12.jpg" alt=""/>
                            </div>
                        <Button
                            variant={"ghost"}
                            size={"smSquare"}
                            className={'text-red-500 flex justify-center items-center z-10'}
                        ><FontAwesomeIcon icon={faHeart} /></Button>
                        3.653 likes
                    </div>

                    <div className={'content pt-2 text-xs text-slate-500 font-bold flex items-center cursor-pointer'}>
                        <Button
                            variant={"ghost"}
                            size={"smSquare"}
                            className={'text-slate-500 flex justify-center items-center'}
                        ><FontAwesomeIcon icon={faCommentDots} /></Button>
                        50 comments
                    </div>
                    {/*<div className={'content pt-2 text-xs text-red-500 font-bold flex gap-2 items-center cursor-pointer'}>*/}
                    {/*    <Button*/}
                    {/*        variant={"ghost"}*/}
                    {/*        size={"smSquare"}*/}
                    {/*        className={'text-slate-500'}*/}
                    {/*    ><FontAwesomeIcon icon={faEllipsis} /></Button>*/}
                    {/*    5fgdf*/}
                    {/*</div>*/}
                </div>
                <div className={'w-[40px] h-[40px] absolute -bottom-2 -right-2 rounded-full border-2 border-gray bg-white'}>
                    <Button
                        variant={"ghost"}
                        className={'w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300'}
                    ><FontAwesomeIcon icon={faFaceKissWinkHeart} /></Button>
                </div>
            </div>
        </div>
    );
}

export default ContentContainer;