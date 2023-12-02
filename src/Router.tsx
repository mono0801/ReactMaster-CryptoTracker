import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {}

function Router({}: IRouterProps) {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                {/* /[:coinId] => URL에 파라미터를 가진다는 것을 알려주는 표시 */}
                <Route path={"/:coinId"}>
                    <Coin />
                </Route>
                <Route path={"/"}>
                    <Coins />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
