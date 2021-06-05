import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export function ConfirmPage(){
    const state = useSelector(state => state.order);
    console.log("state confirm: ", state);
    const arr = Object.entries(state);
    console.log(arr);
    const renderArr = arr.map(elem => (
        <li key = {elem[0]}>{elem[0]} : {elem[1]}</li>
    ))
    return (
        <section>
            <p className = "header">confirm you choice</p>
            <div className = "ul-container">
               <ul>
                    {renderArr} 
                </ul> 
            </div>
            <div>
                <button className = "nav-button left">
                    <Link className = "inherited" to = "/">back to select</Link>
                </button>
                <button className = "nav-button">
                    <Link className = "inherited" to = "/send">send order</Link>
                </button>
            </div>
        </section>
    )
}