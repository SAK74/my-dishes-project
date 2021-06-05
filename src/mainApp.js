import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { ConfirmPage } from "./dishesPages/confirmPage";
import { SelectPage } from "./dishesPages/selectPage";
import { SendPage } from "./dishesPages/sendPage";
import "./CSS/main.css";

export function MainApp(){
    return(
        <Router>
            <div className = "main">
                <h2>Welcome to our servise!</h2>
                    <Switch>
                        <Route exact path = "/" render = {() =>
                            <SelectPage/>
                        }/>
                        <Route path = "/confirm">
                            <ConfirmPage/>
                        </Route>
                        <Route path = "/send">
                            <SendPage/>
                        </Route>
                    </Switch>
            </div>
            
        </Router>
    )
}