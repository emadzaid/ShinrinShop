import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({searchField, setSearchField}) => {
    const { keyword: urlKeyword } = useParams();
    const [keyword, setKeyword] = useState(urlKeyword || '');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
          navigate(`/search/${keyword.trim()}`);
          setKeyword('');
        } else {
          navigate('/');
        }
      };

  return (
    <div className={`w-full h-full absolute text-center z-10 flex items-center justify-between border-b sm:px-16 p-8 ${searchField ? 'block' : 'hidden'}`}>
        <div className="flex items-center sm:w-96 w-84 h-12">
        <form onSubmit={submitHandler} className="flex items-center gap-2">
            <button type="submit"><FaSearch className="text-neutral-400" /></button>
            <input  onChange={(e) => setKeyword(e.target.value)} value={keyword} name='q' placeholder="Search our store" className="bg-transparents outline-0 w-full text-xl" />
            {/* <button type="submit">submit</button> */}
        </form>
        </div>

        <button onClick={() => setSearchField(false)}> <svg className="h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> </button>
  </div>
  )
}

export default SearchBox;