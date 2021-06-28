import React, { useEffect, useState } from "react";
import { GridList, GridListTile, Button } from "@material-ui/core";
import "../App.css";

// const baseURL = "https://polls.apiblueprint.org";

const Dashboard = ({ setShowDetails, pollList, setQuestionId }) => {
  // const [pollList, setPollList] = useState([]);
  const [hoverOn, setHoverOn] = useState(false);
  // using 

  return (
    <div>
      <h1>Questions</h1>
      {/* {hoverOn && <div>showing</div>} */}

      <GridList
        cellHeight={160}
        className="gridList"
        cols={3}
        onClick={(e) => {
          const selQuestion = e.target.id;
          try {
            const id = selQuestion.replace('/questions/', '')
            setQuestionId(Number(id));
            setShowDetails(true);
          } catch (error){
            console.log(error);
          }
          console.log(e.target.id);
        }}
      >
        {pollList && pollList.map((question) => (
          <GridListTile id={question.url} key={question.url} cols={1}>
          
            <div id={question.url}
              onMouseLeave={() => setHoverOn(false)}
              onMouseEnter={() => setHoverOn(true)}
            >
              {question.question}
            </div>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Dashboard;
