import React from 'react';
interface Props {
    message: string;
}

const Messages: React.FC<Props> = ({message}) => {
    return (
       <>
           <div className={'w-full flex justify-end px-3'}>
               <div className={'max-w-[40%] h-fit bg-lavender rounded-2xl rounded-tr-none break-all py-2 px-4 mt-3 text-white'}>
                   {message}
               </div>
           </div>
       </>
    );
}

export default Messages;