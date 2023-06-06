import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Props {}

const Search: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [users, setUsers] = useState<User[] | null>(null);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    if (searchValue === '') {
      setUsers(null);
    }
    if (searchValue) {
      const fetchData = async () => {
        try {
          const response = await axios.get('/search', {
            params: { username: searchValue },
          });
          setUsers(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [searchValue]);
  // useEffect(() => {}, [users]);

  return (
    <div className={'h-full w-full'}>
      <div className='flex h-10 '>
        <FormInput
          type='search'
          value={searchValue}
          onChange={handleSearchChange}
        ></FormInput>
        <Button>{<FontAwesomeIcon icon={faSearch} />}</Button>
      </div>

      <ul className='red min-h-[90px]   w-full'>
        {users &&
          users.map((user, i) => (
            <li className=' p-3 border-[1px] border-pink-400' key={i}>
              <Link href={`/${user.username}`}>
                <div>@{user.username}</div>
                <div>{user.email}</div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
