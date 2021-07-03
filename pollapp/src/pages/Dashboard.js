import React, { useEffect, useState } from "react";
import { GridList, GridListTile, Button, Tooltip } from "@material-ui/core";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
// const baseURL = "https://polls.apiblueprint.org";

const Dashboard = ({ setShowDetails, pollList, setQuestionId }) => {
  // const [pollList, setPollList] = useState([]);
  const [hoverOn, setHoverOn] = useState(false);
  // using
  let history = useHistory()

  return (
    <div>
      <h1>Questions</h1>
      {/* {hoverOn && <div>showing</div>} */}

      <GridList
        cellHeight={50}
        className="gridList"
        cols={3}
        onClick={(e) => {
          const selQuestion = e.target.id;
          try {
            const id = selQuestion.replace("/questions/", "");
            setQuestionId(Number(id));
            setShowDetails(true);
            history.push("/details")
          } catch (error) {
            console.log(error);
          }
          console.log(e.target.id);
        }}
      >
        {pollList &&
          pollList.map((question) => (
            <GridListTile id={question.url} key={question.url} cols={1}>
              <div
                id={question.url}
                // onMouseLeave={() => setHoverOn(false)}
                // onMouseEnter={() => setHoverOn(true)}
              >
                {question.question}
              </div>
              <Link to="/details">{question.url}</Link>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default Dashboard;
