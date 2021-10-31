import logo from "./logo.svg";
import "./App.css";
import Country from './components/Country/Country'
import DrawerPage from "./components/DrawerPage/DrawerPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserDetails from "./components/UserDetails/UserDetails";
import TransitionMui from "./components/TransitionMui/TransitionMui";
import MealData from "./components/MealData/MealData";
import FindMeal from "./components/FindMeal/FindMeal";
import LoginPage from "./components/LoginPage/LoginPage";


function App() {
  return (
    <div>
      <Router>
      <DrawerPage></DrawerPage>
      <MealData></MealData>
      <FindMeal></FindMeal>
      <TransitionMui />
      
      <Switch>
      <Route exact path="/user">
             <Country></Country>
        </Route>
        <Route path="/users/:id">
          <UserDetails></UserDetails>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
      </Switch>
      </Router>
      
         
    </div>
  );
}

export default App;
