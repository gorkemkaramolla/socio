import React, {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from "@/components/UI/Button";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
interface Props  {
    icon: IconDefinition,
    title: string
    show: boolean
}


const SideNavbarIcons: FC<Props> = ({icon, title,show}) => {
    return (
        <div className={
            'flex items-center cursor-pointer hover:bg-white rounded ease-out duration-200 hover:text-red-500'}>
            <Button className={' ease-out duration-200 '}
                    variant={"nav"}
                    size={'nav'}
            ><FontAwesomeIcon icon={icon} />
            </Button>
            <div className={ show
                ? 'flex w-[100px] ease-out duration-200 cursor-pointer'
                : 'flex w-0  overflow-hidden' }>
                {title}
            </div>
        </div>
    );
}

export default SideNavbarIcons;