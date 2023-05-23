import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import {
    faFaceGrinStars,
    faFaceGrinTears,
    faFaceKissWinkHeart, faFaceSmile,
    faFire,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

interface Emoji {
    name: string;
    emoji: IconDefinition;
    color: string;
}

interface EmojiStore {
    currentEmojiArr: Emoji[];
    setCurrentEmojiArr: (emojis: Emoji[]) => void;
    sortCurrentEmojiArr: (emoji: Emoji) => void;
}

// @ts-ignore
const useEmoji = create<EmojiStore>(devtools((set) => ({
    currentEmojiArr: [
        {
            name: 'face-smile',
            emoji: faFaceSmile,
            color: 'text-violet-500'
        },
        {
            name: 'face-grin-tears',
            emoji: faFaceGrinTears,
            color: 'text-teal-500'
        },
        {
            name: 'face-grin-stars',
            emoji: faFaceGrinStars,
            color: 'text-yellow-500'
        },
        {
            name: 'face-kiss-wink-heart',
            emoji: faFaceKissWinkHeart,
            color: 'text-pink-500'
        },
        {
            name: 'fire',
            emoji: faFire,
            color: 'text-orange-500'
        },
        {
            name: 'thumbs-up',
            emoji: faThumbsUp,
            color: 'text-blue-500'
        }
    ],
    setCurrentEmojiArr: (emojis: Emoji[]): void => {
        set(() => ({
            currentEmojiArr: [...emojis]
        }));
    },
    sortCurrentEmojiArr: (emoji: Emoji): void => {
        set((state: EmojiStore) => ({
            currentEmojiArr: [emoji, ...(state.currentEmojiArr.filter((item: Emoji) => item !== emoji))]
        }));
    }
})));

export default useEmoji;
