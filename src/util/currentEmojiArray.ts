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
export { currentEmojis };
