import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import RestaurantItemCategory from "./RestaurantItemCategory";


const RestaurantNestedItemCategory = ({ nestedCategory }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleView = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="RestaurantNestedItemCategory p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg cursor-pointer" onClick={toggleView}>
          {nestedCategory.title}
        </h3>
        {isVisible ? (
          <SlArrowUp onClick={toggleView} className="cursor-pointer" />
        ) : (
          <SlArrowDown onClick={toggleView} className="cursor-pointer" />
        )}
      </div>
      {isVisible && (
        <div className="">
          {nestedCategory.categories.map((category, index) => (
            <div key={index}>
              <RestaurantItemCategory itemCategory={category} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantNestedItemCategory