import React from 'react'
import { BsCupHot } from "react-icons/bs";
import twitter from '../../assets/images/TwitterIcon.png'
import browser from '../../assets/images/browserIcon.png'
import youtube from '../../assets/images/YoutubeIcon.png'
import Pinterest from '../../assets/images/PinterestIcon.png'
export default function Footer() {
  return (
    <div className="h-[330px] w-full md:h-[273px] bg-[#FFDB63] content-center">
      <div className="flex flex-col lg:flex-row items-center px-10 md:px-20">
        <div className="text-[47px] font-[600]"><BsCupHot/></div>
        <div><h1 className="text-[47px] px-3 font-[600]">Delícias à Mesa</h1></div>
        <div className="px-5 lg:px-36">
           <h1 className="text-[26px] font-[600]">Redes sociais:</h1>
           <div className="space-x-3 flex flex-row py-5">
           <img src={youtube} alt="Youtube Icon" />
           <img src={twitter} alt="Twitter Icon" />
           <img src={browser} alt="Browser Icon" />
           <img src={Pinterest} alt="Pinterest Icon" />

           </div>
        </div>
      </div>
    </div>
  )
}
