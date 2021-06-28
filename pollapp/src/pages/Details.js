import React, { useEffect, useState } from "react";
import axios from "axios";
import { GridList, GridListTile, Button } from "@material-ui/core";

const Details = ({ setShowDetails, questionId }) => {
  console.log("questionId", questionId);
  const [questionDetails, setquestionDetails] = useState({});

  useEffect(() => {
    if (questionId) {
      // const url = ``
      async function getQuestionDetails() {
        try {
          const response = await axios.get(
            `https://polls.apiblueprint.org/questions/${questionId}`
          );
          console.log(response.data);
          setquestionDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      getQuestionDetails();
    }
  }, [questionId]);
  return (
    <>
      <div>Questions Details</div>
      <div>{questionDetails.question}</div>
      {questionDetails !== undefined ?
      <GridList
        cellHeight={160}
        className="gridList"
        cols={3}
        onClick={(e) => {}}
      >
        {questionDetails && questionDetails.choices && Array.isArray(questionDetails.choices) &&
          questionDetails.choices.map((choice) => (
            <GridListTile
              id={questionDetails.choice}
              key={choice.choice}
              cols={1}
            >
              <div id={choice.url}>{choice.choice}</div>
            </GridListTile>
          ))}
      </GridList> : null}
      <div onClick={() => setShowDetails(false)}>Go to Questions</div>
    </>
  );
};

export default Details;
