import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"
const Rating = ({value, text, className=""}) => {
  return (
    <div className={`flex items-center ${className}`}>
        <span> {value >= 1 ? <FaStar /> : value >=0.5 ? <FaStarHalfAlt /> : <FaRegStar />} </span>
        <span> {value >= 2 ? <FaStar /> : value >=1.5 ? <FaStarHalfAlt /> : <FaRegStar />} </span>
        <span> {value >= 3 ? <FaStar /> : value >=2.5 ? <FaStarHalfAlt /> : <FaRegStar />} </span>
        <span> {value >= 4 ? <FaStar /> : value >=3.5 ? <FaStarHalfAlt /> : <FaRegStar />} </span>
        <span> {value >= 5 ? <FaStar /> : value >=4.5 ? <FaStarHalfAlt /> : <FaRegStar />} </span>
        <span className="px-2 text-sm">{text && text}</span>
    </div>
  )
}

export default Rating;
