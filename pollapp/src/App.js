import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import AddQuestion from "./pages/AddQuestion";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";


function App() {
  const [pollList, setPollList] = useState([]);
  const [questionId, setQuestionId] = useState(undefined);
  // business logic can be moved separate
  useEffect(() => {
    async function getPollQuestions() {
      try {
        const response = await axios.get(
          "https://polls.apiblueprint.org/questions?page=1"
        );
        console.log(response.data);
        setPollList(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getPollQuestions();
  }, []);

  return(
    <Router>
      <Switch>
        <Route exact path="/">
        <Dashboard
            pollList={pollList}
            setQuestionId={setQuestionId}
          />
        </Route>
        <Route path="/details">
           <Details questionId={questionId} />
        </Route>
        <Route path="/add">
           <AddQuestion />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
