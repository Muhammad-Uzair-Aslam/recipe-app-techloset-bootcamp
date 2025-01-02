import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  buttonText: string;
}

export default function HorizontalCard({ id, title, description, imgUrl, buttonText }: CardProps) {
  return (
    <div>
      <div className="mx-auto overflow-hidden max-w-sm md:max-w-full flex flex-col md:flex-row my-8 w-3/4 md:w-[70%] rounded-[34px] bg-[#F5F2F2]">
        <div className="md:w-1/3 w-full mx-auto md:mx-0">
          <img
            className="w-full h-52 object-cover rounded-t-[34px] md:rounded-l-[34px] md:rounded-t-none" // Ensures image stays same size
            src={imgUrl}
            alt={title}
          />
        </div>
        <div className="md:w-2/3 w-full md:p-7 p-4 flex flex-col">
          <h1 className="text-2xl font-[700]">{title}</h1>
          <p className="font-[500] my-2 md:my-3 text-gray-700">{description}</p>
          <Link to={`/recipes/${id}`} className="px-6 py-1 w-40 bg-[#FFDB63] rounded-full text-center mt-4">
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
