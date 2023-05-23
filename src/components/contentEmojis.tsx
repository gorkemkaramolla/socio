import React, {FC, useEffect, useState} from 'react';
import Button from "@/components/UI/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faFaceGrinStars,
    faFaceGrinTears,
    faFaceKissWinkHeart, faFaceSmile,
    faFaceSmileBeam, faFire, faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import button from "@/components/UI/Button";
import {array} from "prop-types";
interface Props {

}

const ContentEmojis: FC<Props> = ({}) => {
    const [show,setShow] = useState(false)
    const [currentEmojiArr,setCurrentEmojiArr] = useState([])

    useEffect(() => {
        const emojiArr = [
            {
                emoji: faFaceGrinTears,
                color: 'text-teal-500'
            },
            {
                emoji: faFaceGrinStars,
                color: 'text-yellow-500'
            },
            {
                emoji: faFaceKissWinkHeart,
                color: 'text-pink-500'
            },
            {
                emoji: faFire,
                color: 'text-orange-500'
            },
            {
                emoji: faThumbsUp,
                color: 'text-blue-500'
            }
        ]
        setCurrentEmojiArr(emojiArr)
    },[])
    const [emoji,setEmoji] = useState({
        selectedEmoji: null,
        status: false
    })
    const handleClick = (e:any) => {
        alert(e.currentTarget.innerHTML)
        // alert(e.currentTarget.classList.)
        if (e.currentTarget.classList.contains('emoji-selected')) {
            e.currentTarget.classList.remove('emoji-selected')
        }
        else e.currentTarget.classList.add('emoji-selected')
        setTimeout(() => {
            setEmoji({
                selectedEmoji: e.currentTarget.innerHTML,
                status: true
            })
            setShow(false)
        },1000)
    }
    return (
        <div className={
            `${show ? 'w-[260px] ' : 'w-[40px]'} flex h-[40px] absolute -bottom-2 -right-2 rounded-full border-2 border-gray dark:border-gray-500 bg-black ease-out duration-500 overflow-hidden z-40`}>
            { emoji.status &&
                <Button
                    variant={"ghost"}
                    className={`${show ? 'text-white' : 'text-stone-300'}  w-9 h-9 rounded-full flex justify-center items-center text-xl  ease-out duration-500`}
                    onClick={() => setShow(true)}
                ><FontAwesomeIcon icon={faFaceGrinStars} /></Button>
            }
            <Button
                variant={"ghost"}
                className={`${show ? 'text-violet-500' : 'text-stone-300'}  w-9 h-9 rounded-full flex justify-center items-center text-xl  ease-out duration-500`}
                onClick={() => setShow(true)}
            ><FontAwesomeIcon icon={faFaceSmile} /></Button>

            {currentEmojiArr.map((x,i) => {
                return (
                    <Button
                        key={i}
                        id = {x.emoji.iconName}
                        variant={"ghost"}
                        className={`${show ? 'opacity-100' : 'opacity-0'} ${x.color} w-9 h-9 rounded-full flex justify-center items-center text-xl ease-out duration-500 `}
                        onClick={handleClick}
                    ><FontAwesomeIcon icon={x.emoji} /></Button>
                )
            } )
            }
            <Button
                variant={"ghost"}
                className={`${show ? 'opacity-100' : 'opacity-0'} w-9 h-9 rounded-full flex justify-center items-center text-xl text-red-500 ease-out duration-500`}
                onClick={() => setShow(false)}
            ><FontAwesomeIcon icon={faCircleXmark} /></Button>

        </div>
    );
}

export default ContentEmojis;