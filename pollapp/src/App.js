import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";


function App() {
  const [showDetails, setShowDetails] = useState(false);
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

  // let history = useHistory()

  // useEffect(() => {
  //   console.log(showDetails)
  //   if(showDetails) {
  //     history.push("/details")
  //   }
  // }, [showDetails, history])
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <Dashboard setShowDetails={setShowDetails}/> */}
  //       {/*TODO: need to use router-dom for navigation*/}
  //       {showDetails ? (
  //         <Details setShowDetails={setShowDetails} questionId={questionId} />
  //       ) : (
  //         <Dashboard
  //           pollList={pollList}
  //           setShowDetails={setShowDetails}
  //           setQuestionId={setQuestionId}
  //         />
  //       )}
  //     </header>
  //   </div>
  // );
  return(
    <Router>
      <Switch>
        <Route exact path="/">
        <Dashboard
            pollList={pollList}
            setShowDetails={setShowDetails}
            setQuestionId={setQuestionId}
          />
        </Route>
        <Route path="/details">
           <Details setShowDetails={setShowDetails} questionId={questionId} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
