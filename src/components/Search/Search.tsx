import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { User } from '@/lib/types/types';
import Dropdown from '@/components/UI/Modals/Dropdown';
import FormInput from '../UI/Input';
import Image from 'next/image';
import ProfileImage from '../Profile/ProfileImage';
import { getImage } from '@/util/getImage';

interface Props {}

const Search: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue === '') {
      setUsers([]);
      setError(false);
      return;
    }

    const eventSource = new EventSource(
      `search?username=${encodeURIComponent(searchValue)}`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data);

      data.forEach((user: any) => {
        user.image = getImage(user.image!);
      });
      const dataUser: User[] = data;
      if (Array.isArray(data)) {
        setUsers(dataUser);
        setError(false);
      }

      eventSource.close();
    };

    eventSource.onerror = () => {
      setError(true);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [searchValue]);

  return (
    <div className='w-full   my-4'>
      <div className=' justify-center items-center'>
        <FormInput
          placeholder='Search'
          type='search'
          value={searchValue}
          onChange={handleSearchChange}
        />
        {/* <button>
          <FontAwesomeIcon icon={faSearch} />
        </button> */}
      </div>

      {error ? (
        <p>No users found or an error occurred.</p>
      ) : (
        <ul
          style={{
            zIndex: 100,
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.9), rgba(30, 30, 50, 0.9))',
          }}
          className='rounded-md max-h-[400px] overflow-y-scroll   w-full z-50  text-white  absolute  max-w-screen '
        >
          {users?.map((user) => (
            <li
              className='px-2 w-full py-2 rounded-md hover:bg-blackSwan transition-all'
              key={user.id}
            >
              <Link
                className=' '
                href={`/${user.username}`}
                onClick={() => {
                  setSearchValue('');
                }}
              >
                <div className='flex gap-2 w-full items-center'>
                  <div className='min-w-[40px] min-h-[40px] max-w-[40px]  max-h-[40px]'>
                    <ProfileImage
                      imageSrc={user.image!}
                      googleImage={user.imageUri!}
                    />
                  </div>
                  <div>@{user.username}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
