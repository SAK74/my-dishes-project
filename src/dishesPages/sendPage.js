import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { resetOrder, sendRequest } from "./dishesSlice";

export function SendPage(){
    const dispatch = useDispatch();
    const {status, error, order} = useSelector(state => state);
    const ordered = useSelector(state => state.ordered[state.ordered.length - 1]);
    

    useEffect(() => {
        if (status === "iddle") dispatch(sendRequest(order));
    }, [status, dispatch]);

    const history = useHistory();
    let content;

    const handleClick = () => {
        dispatch(resetOrder());
        history.push("/");
    }

    if (status === "sending") content = "please wait ..."
    else if (status === "failed") content = (
        <section>
            <p>{error}</p>
            <button className = "nav-button" onClick = {handleClick}>retry again</button>
        </section>
    )
    else if (status === "complete") {
                content = (
                    <section>
                        <p>successful, your order id: {ordered.id}</p>
                        <p>(stored in "state.ordered")</p> 
                        <button className = "nav-button" onClick = {handleClick}>ordered again</button>
                    </section>
                );
    } else return null;
    
    return(
        <>
            {content}
        </>
    )
}