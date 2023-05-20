import React, {FC} from 'react';
interface Props {
    header: string,
    content: string
}

const ContentContainer: FC<Props> = ({header, content}) => {
    return (
        <div className={'flex flex-col bg-white h-fit min-h-[50px] my-4 shadow-2xl rounded-xl'}>
            <div className={'header h-fit px-4 w-full p-2 border-b-[1px] border-b-red-500 font-bold'}>{header}</div>
            <div className={'content p-4 w-'}>{content}</div>
        </div>
    );
}

export default ContentContainer;