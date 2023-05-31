import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
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

interface Props {
  setBgColor: Dispatch<SetStateAction<string>>; // Update the type here
}

interface Emoji {
  name: string;
  emoji: IconDefinition; // FontAwesomeIcons tipi
  defaultColor: string;
  color: string;
  selected: boolean;
}

const ContentEmojis: FC<Props> = ({ setBgColor }) => {
  const [show, setShow] = useState(false);
  const [currentEmojiArr, setCurrentEmojiArr] = useState<Emoji[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<Emoji>();

  useEffect(() => {
    setCurrentEmojiArr(currentEmojis);
  }, []);

  useEffect(() => {
    if (!selectedEmoji) {
      setCurrentEmojiArr(currentEmojis);
    }
  }, [selectedEmoji]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (show) {
      const target = e.currentTarget;
      const { id, classList } = target;
      const selectedEmoji = currentEmojiArr.find((x) => x.name === id);
      setSelectedEmoji(selectedEmoji);

      if (selectedEmoji) {
        setCurrentEmojiArr((prevEmojiArr) => {
          const updatedEmojiArr = prevEmojiArr.map((emoji) => {
            if (emoji.name === id) {
              emoji.selected = !emoji.selected;
              emoji.defaultColor = emoji.selected
                ? emoji.color
                : 'text-gray-400 dark:text-grey';

              if (emoji.selected) {
                classList.add('emoji-selected');
                setBgColor(emoji.color);
                setSelectedEmoji(selectedEmoji);
              } else {
                classList.remove('emoji-selected');
                setBgColor('bg-white dark:bg-blackSwan');
                setSelectedEmoji(undefined);
              }
            } else {
              emoji.selected = false;
              emoji.defaultColor = 'text-gray-400 dark:text-grey';
              const emojiElement = document.getElementById(emoji.name);
              if (emojiElement) {
                emojiElement.classList.remove('emoji-selected');
              }
            }

            return emoji;
          });

          // Move the selected emoji to the beginning of the array
          const selectedIndex = updatedEmojiArr.findIndex(
            (emoji) => emoji.name === id
          );
          if (selectedIndex !== -1) {
            const selectedEmoji = updatedEmojiArr.splice(selectedIndex, 1)[0];
            updatedEmojiArr.unshift(selectedEmoji);
          } else {
            // If no selected emoji, revert to original array order
            updatedEmojiArr.sort((a, b) => a.name.localeCompare(b.name));
          }

          setShow(false);

          return updatedEmojiArr;
        });
      } else {
        setCurrentEmojiArr((prevEmojiArr) => {
          // Revert to the original array order
          const originalOrderArr = [...prevEmojiArr].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setShow(false);
          return originalOrderArr;
        });
      }
    }
  };

  return (
    <div>
      <div
        className={`${
          show ? 'w-[220px]' : 'w-[40px]'
        } flex h-[40px] absolute -bottom-2 -right-2 rounded-full border-2 border-gray dark:border-gray-500 dark:bg-black bg-white ease-out duration-500 overflow-hidden z-40`}
        onClick={() => setShow(true)}
      >
        {currentEmojiArr.map((x, i) => {
          return (
            <Button
              key={i}
              id={x.name}
              variant={'ghost'}
              className={`${show ? 'opacity-100' : 'opacity-100'} ${
                x.defaultColor
              } w-9 h-9 rounded-full flex justify-center items-center text-xl ease-out duration-500 ${
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
        } w-9 h-9 rounded-full flex justify-center items-center text-xl text-red-500 ease-out duration-500 absolute bottom-8 -right-4`}
        onClick={() => setShow(false)}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </Button>
      <div
        className={`${
          selectedEmoji ? 'scale-75' : 'scale-0'
        } ease-out duration-300 absolute -top-1 right-5 rotate-45`}
      >
        <Button
          variant={'ghost'}
          className={` -rotate-12 w-9 h-9 rounded-full flex justify-center items-center text-xl ${selectedEmoji?.color} opacity-75 ease-out duration-500 absolute bottom-4 right-2`}
          onClick={() => setShow(false)}
        >
          {selectedEmoji && <FontAwesomeIcon icon={selectedEmoji.emoji} />}
        </Button>

        <Button
          variant={'ghost'}
          className={`scale-75 rotate-12 w-9 h-9 rounded-full flex justify-center items-center text-xl ${selectedEmoji?.color} opacity-50 ease-out duration-500 absolute bottom-4 -right-6`}
          onClick={() => setShow(false)}
        >
          {selectedEmoji && <FontAwesomeIcon icon={selectedEmoji.emoji} />}
        </Button>
        <Button
          variant={'ghost'}
          className={`scale-110 w-9 h-9 rounded-full flex justify-center items-center text-xl ${selectedEmoji?.color} ease-out duration-500 absolute bottom-6 -right-2`}
          onClick={() => {
            setShow(false);
          }}
        >
          {selectedEmoji && <FontAwesomeIcon icon={selectedEmoji.emoji} />}
        </Button>
      </div>
    </div>
  );
};

export default ContentEmojis;
const currentEmojis = [
  {
    name: 'face-smile',
    emoji: faFaceSmile,
    defaultColor: 'text-gray-400 dark:text-grey',
    color: 'bg-violet-300 dark:text-black font-semibold',
    selected: false,
  },
  {
    name: 'face-grin-tears',
    emoji: faFaceGrinTears,
    defaultColor: 'text-gray-400 dark:text-grey',
    color: 'bg-teal-300 dark:text-black font-semibold',
    selected: false,
  },
  {
    name: 'face-grin-stars',
    emoji: faFaceGrinStars,
    defaultColor: 'text-gray-400 dark:text-grey',
    color: 'bg-yellow-300 dark:text-black font-semibold',
    selected: false,
  },
  {
    name: 'face-kiss-wink-heart',
    emoji: faFaceKissWinkHeart,
    defaultColor: 'text-gray-400 dark:text-grey',
    color: 'bg-pink-300 dark:text-black font-semibold',
    selected: false,
  },
  {
    name: 'fire',
    emoji: faFire,
    defaultColor: 'text-gray-400 dark:text-grey',
    color: 'bg-orange-400 dark:text-black font-semibold',
    selected: false,
  },
  {
    name: 'thumbs-up',
    emoji: faThumbsUp,
    defaultColor: 'text-gray-400 dark:text-grey',
    color: 'bg-blue-300 dark:text-black font-semibold',
    selected: false,
  },
];
