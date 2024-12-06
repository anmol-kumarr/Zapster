import { useEffect } from "react";
import HomeImage from '../../assets/home.svg'
const Home = () => {
    
    return (
        <div className="h-full w-full">
            <div className="w-10/12 h-[calc(100%-10%)] mx-auto">
                <img className="w-full h-full" src={HomeImage} alt="" />
            </div>
            <h1 className="text-center font-inter text-2xl font-semibold text-textGrey">Welcome to Zapster!</h1>
        </div>
    )
}

export default Home