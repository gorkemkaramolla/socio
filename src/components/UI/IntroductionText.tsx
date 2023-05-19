import React, {FC, useState} from 'react';
interface Props  {
    title:string
}
const IntroductionText: FC<Props> = ({title}) => {
    const [blur,setBlur] = useState(true)

    return (


             <div className={`h-auto bg-rose-500 text-lg text-center text-rose-50 rounded p-3  ease-out duration-700 hover:shadow-2xl hover:scale-125 ${blur && 'blur-sm'}`}
                  onMouseOver={() => setBlur(false)}>
                 <p>{title}</p>
             </div>



    );
}

export default IntroductionText;