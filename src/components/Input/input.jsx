import { useState } from 'react';
import './input.scss';
import Search from "../../assets/search.png"

const Input = (props) => {

    const [searchText, setSearchText] = useState("");

    function handleKeyPress(event){
        if(event.key === "Enter"){
            props.receivedFunction(searchText)
            setSearchText("")
        }
    }

    function handleChange(event){
        setSearchText(event.target.value)
    }


    return(
        <div className='search'>
            <img className="search__img" src={Search} alt="search"/>
            <input value={searchText} onChange={handleChange} onKeyPress={(e)=>handleKeyPress(e)} type="text" placeholder="Search for a movie"></input>
        </div>)
}

export default Input;