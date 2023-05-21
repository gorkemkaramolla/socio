import React, {FC, useState} from 'react';
import Button from "@/components/UI/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFaceGrinStars,
    faFaceGrinTears,
    faFaceKissWinkHeart, faFaceSmile,
    faFaceSmileBeam, faFire, faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
interface Props {

}

const ContentEmojis: FC<Props> = ({}) => {
    const [show,setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    return (
        <div className={
            `${show ? 'w-[230px] ' : 'w-[40px]'} flex h-[40px] absolute -bottom-2 -right-2 rounded-full border-2 border-gray bg-white ease-out duration-500 overflow-hidden`}>
            <Button
                variant={"ghost"}
                className={`${show && ''} w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300 ease-out duration-500`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFaceSmile} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300 ease-out duration-500 `}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFaceGrinTears} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300 ease-out duration-500`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFaceGrinStars} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300 ease-out duration-500`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFaceKissWinkHeart} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300 ease-out duration-500`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faFire} /></Button>
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-stone-300 ease-out duration-500`}
                onClick={handleClick}
            ><FontAwesomeIcon icon={faThumbsUp} /></Button>
        </div>
    );
}

export default ContentEmojis;