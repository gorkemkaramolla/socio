'use client';
import React, {FC, useState} from 'react';
import Button from "@/components/UI/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faMagnifyingGlass, faUser, faBars, faCube, faComments, faGear,faFireFlameCurved, faBarsStaggered}
    from '@fortawesome/free-solid-svg-icons'

import NavbarIcons from "@/components/NavbarIcons";
interface Props  {

}

const Navbar: FC<Props> = () => {
    const [show, setShow] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    return (
       <div className={''}>
           <div  className={'w-fit h-screen gap-12 flex flex-col justify-center items-start text-rose-50 bg-slate-950 pr-2 pl-5'}>
               <div className={' flex items-center justify-between cursor-pointer ease-out duration-200 '}>
                   {

                       <div className={!show
                           ? 'w-0 flex justify-center items-center ease-out duration-200 overflow-hidden opacity-0'
                           : 'w-[100px] flex justify-center items-center  ease-out duration-200  overflow-hidden'}
                            onClick={(e) => {
                                e.preventDefault()
                                setShow(!show)
                                setShowSearch(false)
                            }}>
                           <span className={'text-xl'}>socio</span>
                       </div>
                   }
                   <Button variant={"nav"} size={'nav'} className={ 'ease-out duration-300 '}
                           onClick={(e) => {
                               e.preventDefault()
                               setShow(!show)
                               setShowSearch(false)
                           }}>
                       {
                           show ? <FontAwesomeIcon icon={faBarsStaggered} /> : <FontAwesomeIcon icon={faBars} />
                       }
                   </Button>

               </div>
               <div className={'search flex items-center gap-2 cursor-pointer ease-out duration-200'}>
                   <Button variant={"nav"} size={'nav'} className={!showSearch
                       ? 'text-rose-50  ease-out duration-300 bg-rose-500 hover:text-rose-50 '
                       : 'text-rose-50 rotate-180 rounded-3xl ease-out duration-300 bg-rose-500 hover:text-rose-50'}
                           onClick={(e) => {
                               e.preventDefault()
                               setShow(true)
                               setShowSearch(!showSearch)
                           }}>
                       {
                           showSearch ? '✕' : <FontAwesomeIcon icon={faMagnifyingGlass} />
                       }
                   </Button>


                       <form action="" className={!showSearch
                           ? 'w-0 flex justify-center items-center rounded ease-out duration-300 text-rose-50 h-full'
                           : 'flex justify-center items-center bg-rose-500 rounded w-[220px] ease-out duration-300 text-rose-50 ml-2 h-full '}>
                                   <div className={' text-sm text-center w-10/12 '}>
                                   <input className={'bg-transparent w-full focus:outline-none placeholder:text-rose-50'}
                                          type="text"
                                          placeholder={'Search'}/>  </div>

                       </form>
                            <div className={show && !showSearch
                               ? 'flex w-[100px]  ease-out duration-200 overflow-hidden'
                               : 'flex w-0  overflow-hidden'}>Search</div>

               </div>


                <NavbarIcons icon={faUser} title={'User'} show={show}/>
                <NavbarIcons icon={faEye} title={'Friends'} show={show}/>
                <NavbarIcons icon={faComments} title={'Message'} show={show}/>
                <NavbarIcons icon={faFireFlameCurved} title={'Trends'} show={show}/>
                <NavbarIcons icon={faCube} title={'Dashboard'} show={show}/>
                <NavbarIcons icon={faGear} title={'Settings'} show={show}/>


           </div>
       </div>
    );
};

export default Navbar;