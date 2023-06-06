import React from 'react';
import Heading from "@/components/UI/Heading";
import ConnectionsContainer from "@/components/connectionsContainer";
import useChatToggle from "@/lib/zustand/useChatToggle";
import Search from "@/components/Search/Search";
interface Props {}

const RightBar: React.FC<Props> = () => {
    const chatStatus = useChatToggle(state => state.show);
    return (
        <>

            {
                chatStatus ?
                <>
                    <div className={'chatText w-full h-[70px] md:flex items-end mb-3 hidden mx-5'}>
                        <Heading heading='h6' size='lg' className='font-bold'>
                            Contacts
                        </Heading>
                    </div>
                    <ConnectionsContainer/>
                </>
                    :  <Search />
            }

        </>
    );
}

export default RightBar;