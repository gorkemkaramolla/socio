import React, {FC} from 'react';
interface Props {
    focused:boolean
}

const HomeCommentContainer: FC<Props> = ({focused}) => {
    return (
        <div className={`${focused ? 'h-[255px] opacity-100 p-3' : 'opacity-0 h-0'} text-sm font-light flex flex-col bg-white dark:bg-blackSwan shadow-2xl rounded-xl gap-3  duration-300 `}>
            <div className={' flex flex-col gap-3'}>
                <div className={'flex'}>
                    <div className={'min-w-[35px] min-h-[35px] w-[35px] h-[35px] bg-pink rounded-full mx-3'}></div>
                    <div className={'flex flex-col'}>
                        <span className={'font-semibold'}>Selen Soydan</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, quidem?</span>
                    </div>
                </div>
                <div className={'flex'}>
                    <div className={'min-w-[35px] min-h-[35px] w-[35px] h-[35px] bg-pink rounded-full mx-3'}></div>
                    <div className={'flex flex-col'}>
                        <span className={'font-semibold'}>Selen Soydan</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur ducimus ex hic modi nulla odio quam quidem, sunt voluptates.</span>
                    </div>
                </div>
                <div className={'flex'}>
                    <div className={'min-w-[35px] min-h-[35px] w-[35px] h-[35px] bg-pink rounded-full mx-3'}></div>
                    <div className={'flex flex-col'}>
                        <span className={'font-semibold'}>Selen Soydan</span>
                        <span>Sfdhgfdgfdgfdgdfgdfhfghfghfghfhfgn</span>
                    </div>
                </div>
            </div>
            <span className={'text-xs mx-3 text-red-500'}>See all comments</span>
        </div>
    );
}

export default HomeCommentContainer;