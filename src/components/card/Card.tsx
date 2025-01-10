import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
}

const Card = ({ id, imageUrl, title, description, buttonText }: CardProps) => {
  return (
    <div className="   mx-auto md:mx-2 max-w-[365px] xl:max-w-[450px] 2xl:max-w-[600px] h-[500px] rounded-3xl bg-[#F5F2F2] flex flex-col justify-between pb-[40px] w-full">
      <img src={imageUrl} alt={title} className="w-full h-48  rounded-t-3xl" />
      <div className="px-4 w-full flex flex-col  justify-center gap-[18px]">
        <h2 className="text-[28px]  font-[700]">{title}</h2>
        <p className="text-[19px]  text-gray-700 font-[400]">
          {description}
        </p>
        
      </div>
      <div className="mx-4 pb-[">
          <Link
            to={`/recipes/${id}`}
            className="px-6 py-1 w-40 bg-[#FFDB63] rounded-full text-center"
          >
            {buttonText}
          </Link>
        </div>
    </div>
  );
};

export default Card;
