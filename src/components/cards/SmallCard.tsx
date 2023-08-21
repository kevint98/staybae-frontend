import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useFavourite from "src/hooks/useFavourite";
interface SmallCardProps {
  id: string;
  city: string;
  country: string;
  heroImg: string;
  setIsShowFavourites: (val: boolean) => void;
}
const SmallCard = ({
  id,
  city,
  country,
  heroImg,
  setIsShowFavourites,
}: SmallCardProps) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    setIsShowFavourites(false);
    navigate(`/property/${id}`);
  };

  const { removeFavourite } = useFavourite();

  const removeFromFavourites = (e: React.MouseEvent) => {
    removeFavourite(id!);
    e.stopPropagation();
  };

  return (
    <div className="hover:shadow-md p-4">
      <div
        className="relative flex flex-row space-x-4 items-center cursor-pointer "
        key={id}
        onClick={onClickHandler}
      >
        <div className="overflow-hidden rounded-lg w-32">
          <img
            src={heroImg}
            className="object-cover relative w-full h-32"
            alt={`${city}, ${country}`}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {city}, {country}
          </span>
        </div>
        <div className="absolute right-0 top-0 mx-4 items-center ">
          <XCircleIcon
            className="h-6 cursor-pointer hover:scale-105"
            title="Remove from favourites"
            onClick={removeFromFavourites}
          />
        </div>
      </div>
    </div>
  );
};
export default SmallCard;
