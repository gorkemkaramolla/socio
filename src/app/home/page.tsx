import React, {FC} from 'react';
import ContentContainer from "@/components/contentContainer";
import Stories from "@/components/Stories";
import Heading from "@/components/UI/Heading";
interface Props {}

const Home: FC<Props> = () => {
    return (
        <div className={'h-full w-3/5 flex flex-col items-center'}>
            <div className={'flex items-center gap-6 bg-white w-full min-h-[110px] my-4 shadow-2xl p-3 overflow-y-hidden overflow-x-auto rounded-xl'}>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
                <Stories/>
            </div>
            <div className={'w-full'}>
                <Heading
                    heading='h6'
                    size={'md'}
                    className={'mt-4 mb-0'}
                >
                    NewsFeed
                </Heading>
            </div>
            <div className={'h-full w-full gap-4 flex justify-center '}>
                <div className={' w-4/6'}>
                    <ContentContainer header={'loremlormem'} content={'fgfdgfdghfdhdfh'}/>
                    <ContentContainer header={'loremlormem'} content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'}/>
                    <ContentContainer header={'loremlormem'} content={'fgfdgfdghfdhdfh'}/>
                    <ContentContainer header={'loremlormem'} content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'}/>
                    <ContentContainer header={'Lorem ipsum dolor sit amet'} content={'perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'}/>
                    <ContentContainer header={'loremlormem'} content={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis corporis dolores enim et facilis fugit impedit ipsum iusto neque optio, perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'}/>
                    <ContentContainer header={'Lorem ipsum dolor sit amet'} content={'perferendis ratione recusandae reprehenderit sapiente sed soluta tenetur veritatis!\n'}/>
                </div>
                <div className={'w-2/6'}>
                    <div className={'flex bg-white min-h-[350px] my-4 shadow-2xl rounded-xl'}>
                        2222
                    </div>
                    <div className={'flex bg-white min-h-[150px] my-4 shadow-2xl rounded-xl'}>
                        3333
                    </div>

                </div>
            </div>
        </div>

    );
}

export default Home;