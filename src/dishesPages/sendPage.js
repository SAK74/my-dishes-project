// import { unwrapResult } from "@reduxjs/toolkit";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { sendRequest } from "./dishesSlice";

export function SendPage(){
    const dispatch = useDispatch();
    let content;
    const status = useSelector(state => state.status);
    const error = useSelector(state => state.error);
    const order = useSelector(state => state.order) ;
    const ordered = useSelector(state => state.ordered[state.ordered.length - 1]);
    const ordered1 = useSelector(state => state.ordered);
    console.log('ordered: ', ordered1);

    useEffect(() => {

        if (status === "iddle") {
            dispatch(sendRequest(order));
        }
        console.log("check 1: ", error, status);

    }, [status, dispatch]);

    console.log(error, status);
    if (status === "sending") content = "please wait ..."
    else if (status === "failed") content = error
    else if (status === "complete") {
        console.log("status: ", status);
                content = (
                    <section>
                        <p>successful, your order id: {ordered.id}</p>
                        <p>(stored in "state.ordered")</p> 
                    </section>
                );
    } else return null;
    
    return(
        <>
            {content}
        </>
    )
}