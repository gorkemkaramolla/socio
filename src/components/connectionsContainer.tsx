import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import Contacts from '@/components/contacts';
import Heading from '@/components/UI/Heading';
import { Poppins } from '@next/font/google';
const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});
interface Props {}

const ConnectionsContainer: React.FC<Props> = () => {
  return (
    <div
      className={
        'connectionsContainer px-5 w-full max-w-[425px] h-5/6 rounded-2xl flex-col gap-2 min-w-max md:flex hidden'
      }
    >
      <div
        className={
          'contactContainer w-full h-full flex flex-col items-center rounded-2xl bg-white dark:bg-blackSwan p-2 gap-2'
        }
      >
        <div
          className={'search w-full h-[6%] bg-grey dark:bg-black rounded-2xl'}
        >
          <form action='' className={'w-full h-full flex'}>
            <div
              className={
                'w-2/12 h-full text-xl flex items-center justify-center text-ash'
              }
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              type='text'
              className={`w-10/12 h-full bg-transparent px-1 placeholder:text-ash ${poppins.className}`}
              placeholder={'Search Contact'}
            />
          </form>
        </div>
        <div
          className={
            'contacts w-full h-[89%] max-h-[89%] bg-grey dark:bg-black rounded-2xl flex flex-col overflow-auto'
          }
        >
          <Contacts />
          <Contacts />
          <Contacts />
          <Contacts />
        </div>
        <div className={'buttons w-full h-[5%] flex gap-2'}>
          <div
            className={
              'meeting w-2/5 h-full rounded-2xl bg-lavender flex justify-center items-center  font-bold text-white cursor-pointer'
            }
          >
            <span>Meeting</span>
          </div>
          <div
            className={
              'schedule w-1/5 h-full rounded-2xl bg-grey dark:bg-black flex justify-center items-center text-sm  cursor-pointer'
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div
            className={
              'schedule w-2/5 h-full rounded-2xl bg-grey dark:bg-black flex justify-center items-center text-sm font-bold cursor-pointer'
            }
          >
            <span>Schedule</span>
          </div>
        </div>
      </div>
      {/*<div className={'groups w-full h-1/5 rounded-2xl bg-white dark:bg-blackSwan'}>*/}
      {/*    <Heading heading='h6' size='md' className='font-bold'>*/}
      {/*        /!*Groups (3)*!/*/}
      {/*    </Heading>*/}
      {/*</div>*/}
    </div>
  );
};

export default ConnectionsContainer;
