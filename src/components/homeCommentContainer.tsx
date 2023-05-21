import React, {FC} from 'react';
interface Props {
    focused:boolean
}

const HomeCommentContainer: FC<Props> = ({focused}) => {
    return (
        <div className={`${focused ? 'h-[200px] opacity-100 p-3' : 'opacity-0 h-0'}  flex flex-col bg-white shadow-2xl rounded-xl text-sm gap-3 ease-out duration-300 overflow-hidden`}>
            <div className={'flex'}>
                <div className={'w-8 h-8 bg-pink rounded-full mx-3'}></div>
                <div className={'flex flex-col'}>
                    <span>Selen Soydan</span>
                    <span className={'text-xs'}>Sfdhgfdgfdgfdgdfgdfhfghfghfghfhfgn</span>
                </div>
            </div>
            <div className={'flex'}>
                <div className={'w-8 h-8 bg-pink rounded-full mx-3'}></div>
                <div className={'flex flex-col'}>
                    <span>Selen Soydan</span>
                    <span className={'text-xs'}>Sfdhgfdgfdgfdgdfgdfhfghfghfghfhfgn</span>
                </div>
            </div>
            <div className={'flex'}>
                <div className={'w-8 h-8 bg-pink rounded-full mx-3'}></div>
                <div className={'flex flex-col'}>
                    <span>Selen Soydan</span>
                    <span className={'text-xs'}>Sfdhgfdgfdgfdgdfgdfhfghfghfghfhfgn</span>
                </div>
            </div>
            <span className={'text-xs m-3 text-red-500'}>See all comments</span>
        </div>
    );
}

export default HomeCommentContainer;