import React, { FC, useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faGrinStars as faFaceGrinStars,
    faLaughSquint as faFaceGrinTears,
    faKissWinkHeart as faFaceKissWinkHeart,
    faSmile as faFaceSmile,
    faGrinBeam as faFaceSmileBeam,
    faFire,
    faThumbsUp,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface Props {}

interface Emoji {
    name: string;
    emoji: IconDefinition; // FontAwesomeIcons tipi
    defaultColor: string;
    color: string;
    selected: boolean;
}

const ContentEmojis: FC<Props> = ({}) => {
    const [show, setShow] = useState(false);
    const [currentEmojiArr, setCurrentEmojiArr] = useState<Emoji[]>([]);

    useEffect(() => {
        setCurrentEmojiArr([
            {
                name: 'face-smile',
                emoji: faFaceSmile,
                defaultColor: 'text-grey',
                color: 'text-violet-500',
                selected: false,
            },
            {
                name: 'face-grin-tears',
                emoji: faFaceGrinTears,
                defaultColor: 'text-grey',
                color: 'text-teal-500',
                selected: false,
            },
            {
                name: 'face-grin-stars',
                emoji: faFaceGrinStars,
                defaultColor: 'text-grey',
                color: 'text-yellow-500',
                selected: false,
            },
            {
                name: 'face-kiss-wink-heart',
                emoji: faFaceKissWinkHeart,
                defaultColor: 'text-grey',
                color: 'text-pink-500',
                selected: false,
            },
            {
                name: 'fire',
                emoji: faFire,
                defaultColor: 'text-grey',
                color: 'text-orange-500',
                selected: false,
            },
            {
                name: 'thumbs-up',
                emoji: faThumbsUp,
                defaultColor: 'text-grey',
                color: 'text-blue-500',
                selected: false,
            },
        ]);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (show) {
            const target = e.currentTarget;
            const { id, classList } = target;
            const selectedEmoji = currentEmojiArr.find((x) => x.name === id);

            if (selectedEmoji) {
                setCurrentEmojiArr((prevEmojiArr) => {
                    const updatedEmojiArr = prevEmojiArr.map((emoji) => {
                        if (emoji.name === id) {
                            emoji.selected = !emoji.selected;
                            emoji.defaultColor = emoji.selected ? emoji.color : 'text-grey';

                            if (emoji.selected) {
                                classList.add('emoji-selected');
                            } else {
                                classList.remove('emoji-selected');
                            }
                        } else {
                            emoji.selected = false;
                            emoji.defaultColor = 'text-grey';
                            const emojiElement = document.getElementById(emoji.name);
                            if (emojiElement) {
                                emojiElement.classList.remove('emoji-selected');
                            }
                        }

                        return emoji;
                    });

                    setShow(false);
                    return updatedEmojiArr;
                });
            }
        }
    };



    return (
        <div>
            <div
                className={`${
                    show ? 'w-[220px]' : 'w-[40px]'
                } flex h-[40px] absolute -bottom-2 -right-2 rounded-full border-2 border-gray dark:border-gray-500 bg-black ease-out duration-500 overflow-hidden z-40`}
                onClick={() => setShow(true)}
            >
                {currentEmojiArr.map((x, i) => {
                    return (
                        <Button
                            key={i}
                            id={x.name}
                            variant={'ghost'}
                            className={`${
                                show ? 'opacity-100' : 'opacity-100'
                            } ${x.defaultColor} w-9 h-9 rounded-full flex justify-center items-center text-xl ease-out duration-500 ${
                                x.selected ? 'emoji-selected' : ''
                            }`}
                            onClick={handleClick}
                        >
                            <FontAwesomeIcon icon={x.emoji} />
                        </Button>
                    );
                })}
            </div>
            <Button
                variant={'ghost'}
                className={` ${
                    show ? 'scale-125 rotate-180 ' : 'scale-0'
                } w-9 h-9 rounded-full flex justify-center items-center text-xl text-red-500 ease-out duration-500 absolute bottom-5 -right-10`}
                onClick={() => setShow(false)}
            >
                <FontAwesomeIcon icon={faCircleXmark} />
            </Button>
        </div>
    );
};

export default ContentEmojis;
