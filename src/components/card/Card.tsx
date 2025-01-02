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
    <div className="my-3 mx-auto lg:mx-5 max-w-[365px] xl:max-w-[450px] rounded-3xl overflow-hidden bg-[#F5F2F2]">
      <img src={imageUrl} alt={title} className="w-full h-48" />
      <div className="p-6">
        <h2 className="text-[28px] py-1 font-[700]">{title}</h2>
        <p className="text-[19px] py-3 text-gray-700 font-[400]">
          {description}
        </p>
        <div className="my-2">
          <Link
            to={`/recipes/${id}`}
            className="px-6 py-1 w-40 bg-[#FFDB63] rounded-full text-center"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
