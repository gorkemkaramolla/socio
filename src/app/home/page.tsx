import React, { FC } from 'react';
import ContentContainer from '@/components/contentContainer';
import Stories from '@/components/Stories';
import Heading from '@/components/UI/Heading';
import Button from '@/components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
interface Props {}

const Home: FC<Props> = () => {
  return (
    <div className={'flex justify-center gap-10'}>
      <div className={'h-full w-3/5 flex flex-col'}>
        <div
          className={
            'flex items-center gap-3 bg-white w-full  min-h-[110px] my-4 shadow-2xl px-10 overflow-y-hidden overflow-x-auto rounded-xl'
          }
        >
          <Stories />
          <Stories />
          <Stories />
          <Stories />
          <Stories />
          {/*<Stories/>*/}
          {/*<Stories/>*/}
          {/*<Stories/>*/}
          {/*<Stories/>*/}
          {/*<Stories/>*/}
          {/*<Stories/>*/}
          {/*<Stories/>*/}
          {/*<Stories/>*/}
        </div>
        <div className={'w-full'}>
          <Heading heading='h6' size={'md'} className={'mt-4 mb-0'}>
            NewsFeed
          </Heading>
        </div>
        <div className={'h-fit w-full gap-4 flex justify-center'}>
          <div className={' w-4/6'}>
            <ContentContainer
              header={{
                name: 'Kübra Yılmaz',
                username: '@kubraylmzz'
              }}
              content={'fgfdgfdghfdhdfh'}
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'
              }
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={'fgfdgfdghfdhdfh'}
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'
              }
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={
                'perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'
              }
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'
              }
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={
                'perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'
              }
            />
            <ContentContainer
                header={{
                  name: 'Kübra Yılmaz',
                  username: '@kubraylmzz'
                }}
              content={'perfersoluta tenetur veritatisaaaaaa'}
            />
          </div>
          <div className={'w-2/6'}>
            <div
              className={
                'flex bg-white min-h-[350px] my-4 shadow-2xl rounded-xl'
              }
            >
              2222
            </div>
            <div
              className={
                'flex bg-white min-h-[150px] my-4 shadow-2xl rounded-xl'
              }
            >
              3333
            </div>
            <div
              className={
                'flex bg-white min-h-[350px] my-4 shadow-2xl rounded-xl'
              }
            >
              4444
            </div>
          </div>
        </div>
        <div className={'w-full flex justify-center'}>
          <Button variant={'ghost'} size={'lg'} isLoading={true}>
            Loading
          </Button>
        </div>
      </div>
      <div className={'h-full w-1/5 flex flex-col items-center'}>
        <div className={'w-full'}>
          <Heading heading='h6' size={'md'} className={'mt-4 mb-0'}>
            My Profile
          </Heading>
        </div>
        <div
          className={
            'w-full flex bg-red-500 text-white min-h-[350px] my-4 shadow-2xl rounded-xl'
          }
        >
          search butonuna blur yaptım emin olamadım  bakarsın dshglaga
        </div>
        <div className={'w-full'}>
          <Heading heading='h6' size={'md'} className={'mt-4 mb-0'}>
            Latest Connections
          </Heading>
        </div>
        <div
          className={
            'w-full flex bg-red-500 text-white min-h-[250px] my-4 shadow-2xl rounded-xl'
          }
        >
          2222
        </div>
      </div>
    </div>
  );
};

export default Home;
