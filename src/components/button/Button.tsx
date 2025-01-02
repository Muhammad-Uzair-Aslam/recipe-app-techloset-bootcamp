import React from 'react'
interface buttonProps{
    ButtonText:string
}
export default function Button({ButtonText}:buttonProps) {
  return (
    <div>
      <button className="px-6 my-4 bg-[#FFDB63] rounded-full py-1">{ButtonText}</button>
    </div>
  )
}
