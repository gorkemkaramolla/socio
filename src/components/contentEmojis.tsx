import React, {FC, useState} from 'react';
import Button from "@/components/UI/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faFaceGrinStars,
    faFaceGrinTears,
    faFaceKissWinkHeart, faFaceSmile,
    faFaceSmileBeam, faFire, faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
interface Props {

}

const ContentEmojis: FC<Props> = ({}) => {
    const [show,setShow] = useState(false)
    const [emoji,setEmoji] = useState(null)
    // const handleClick = () => {
    //     setShow(true)
    // }
    return (
        <div className={
            `${show ? 'w-[260px] ' : 'w-[40px]'} flex h-[40px] absolute -bottom-2 -right-2 rounded-full border-2 border-gray bg-white ease-out duration-500 overflow-hidden`}>
            <Button
                variant={"ghost"}
                className={`${show ? 'text-purple-300' : 'text-stone-300'} w-9 h-9 rounded-full flex justify-center items-center text-xl  ease-out duration-500`}
                onClick={() => setShow(true)}
            ><FontAwesomeIcon icon={faFaceSmile} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-green-400 ease-out duration-500 `}
                // onClick={() => }
            ><FontAwesomeIcon icon={faFaceGrinTears} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-yellow-400 ease-out duration-500`}
                // onClick={handleClick}
            ><FontAwesomeIcon icon={faFaceGrinStars} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-red-400 ease-out duration-500`}
                // onClick={handleClick}
            ><FontAwesomeIcon icon={faFaceKissWinkHeart} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-orange-400 ease-out duration-500`}
                // onClick={handleClick}
            ><FontAwesomeIcon icon={faFire} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-blue-400 ease-out duration-500`}
                // onClick={handleClick}
            ><FontAwesomeIcon icon={faThumbsUp} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-red-500 ease-out duration-500`}
                onClick={() => setShow(false)}
            ><FontAwesomeIcon icon={faCircleXmark} /></Button>
        </div>
    );
}

export default ContentEmojis;