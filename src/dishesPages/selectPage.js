import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addOrder } from "./dishesSlice";

export const SelectPage = () => {

    const {name: storedName, prepTime: storedPrepTime, type: storedType, ...rest} = useSelector(state => state.order);
    const dispatch = useDispatch();

    const [name, setName] = useState(storedName);
    const [prepTime, setPrepTime] = useState(storedPrepTime);
    const [type, setType] = useState(storedType);
    const [extendsParam, setExtendsParam] = useState(rest);
    const history = useHistory();

    // checked or all required fields is fulled ---------
    const canSend = [name, type].every(Boolean) && prepTime.split(":").some(el => Boolean(parseInt(el))) && (type === "pizza" ? Number(extendsParam.diameter) : true);
        
    const handleChange = ev => {
        const target = ev.target;
        switch (target.id){
            case "name": setName(target.value); break;
            case "prepTime": setPrepTime(target.value); break;
            case "type": setType(target.value); 
              setExtendsParam(() => {
                  switch (target.value){
                      case "pizza": return {no_of_slices: 1, diameter: ""};
                      case "soup": return {spiciness_scale: 1};
                      case "sandwich": return {slices_of_bread: 1};
                      default: return null;
                  }
              }); break; 
            case "no_of_slices": setExtendsParam(prev => ({ ...prev, no_of_slices: Number(target.value)})); break;
            case "diameter": setExtendsParam(prev => ({ ...prev, diameter: target.value})); break;
            default: setExtendsParam(
                target.id === "spiciness_scale" ? {spiciness_scale: Number(target.value)} : {slices_of_bread: Number(target.value)}
            )
        }
    }

    const handleSubmit = () => {
        if (type === "pizza" && (!Number(extendsParam.diameter) || Number(extendsParam.diameter) < 0)) {
            alert("incorrect diameter value!");
            return;
        }
        dispatch(addOrder({ ...{name, prepTime, type}, ...extendsParam}));
        history.push("/confirm");
    }

    return(
        <section>
            <p className = "header">select dish</p>
            <form onSubmit = {ev => ev.preventDefault()}>
                <fieldset>
                    <label htmlFor = "name">dish name&nbsp;</label>
                    <input className = {name ? "selected" : "unselected"} id = "name" value = {name} onChange = {handleChange}/>
                    <sup className = {name ? "selected" : "unselected"}>&nbsp;*</sup>
                </fieldset>

                <fieldset>
                    <label htmlFor = "prepTime">preperation time&nbsp;</label>
                    <input className = {prepTime.split(":").some(el => Boolean(parseInt(el))) ? "selected" : "unselected"} 
                      id = "prepTime" type = "time" step = "1" value = {prepTime} onChange = {handleChange}/> 
                    <sup className = {prepTime.split(":").some(el => Boolean(parseInt(el))) ? "selected" : "unselected"}>&nbsp;*</sup>
                </fieldset>

                <fieldset>
                    <label htmlFor = "type">type&nbsp;</label>
                    <select className = {type ? "selected" : "unselected"} id = "type" value = {type} onChange = {handleChange}>
                        <option></option>
                        <option>pizza</option>
                        <option>soup</option>
                        <option>sandwich</option>
                    </select>
                    <sup className = {type ? "selected" : "unselected"}>&nbsp;*</sup>
                </fieldset>

                {/* ------------ showing extend fields ---------- */}
                <ExtendParam type = {type} extendsParam = {extendsParam} change = {handleChange}/>
                <div>
                    <sup>*</sup> required fields !
                </div>
                <div>
                   <button className = "nav-button" disabled = {!canSend} onClick = {handleSubmit}>select</button> 
                </div>
                
            </form>
        </section>
    )
}

function ExtendParam ({type, extendsParam, change}){
    switch (type){
        case "pizza": return (
            <fieldset>
                <label htmlFor = "no_of_slices">no of slices&nbsp;</label>
                <input className = {extendsParam.no_of_slices ? "selected" : "unselected"} id = "no_of_slices" 
                  type = "number" min = "1" value = {extendsParam.no_of_slices} onChange = {change}/>
                <sup className = {extendsParam.no_of_slices ? "selected" : "unselected"}>&nbsp;*</sup>

                <label htmlFor = "diameter">diameter&nbsp;</label>
                <input className = {extendsParam.diameter ? "selected" : "unselected"} id = "diameter" min = "0" 
                  value = {extendsParam.diameter} onChange = {change}/>
                <sup className = {extendsParam.diameter ? "selected" : "unselected"}>&nbsp;*</sup>

            </fieldset>
        );
        case "soup": return (
        <fieldset>
            <label htmlFor = "spiciness_scale">spiciness scale&nbsp;</label>
            <input id = "spiciness_scale" type = "range" min = "1" max = "10" value = {extendsParam.spiciness_scale} onChange = {change}/>
            &nbsp;{extendsParam.spiciness_scale}
        </fieldset>
        );
        case "sandwich": return (
        <fieldset>
            <label htmlFor = "slices_of_bread">slices of bread&nbsp;</label>
            <input className = {extendsParam.slices_of_bread ? "selected" : "unselected"} id = "slices_of_bread" type = "number" min = "1" 
              value = {extendsParam.slices_of_bread} onChange = {change}/>
            <sup className = {extendsParam.slices_of_bread ? "selected" : "unselected"}>&nbsp;*</sup>

        </fieldset>
        );
        default: return null;
    }
}