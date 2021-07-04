import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  List,
  ListItem,
  ListItemText,
  Button,
  Checkbox,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Details = ({ setShowDetails, questionId }) => {
  console.log("questionId", questionId);
  const [questionDetails, setquestionDetails] = useState({});
  const classes = useStyles();
  const [checked, setChecked] = React.useState({ id: null, checked: false });

  const handleChange = (event) => {
    console.log(event.target);
    setChecked({ id: event.target.id, checked: event.target.checked });
  };

  const calPercentage = (vote) => {
    let result = 0;
    let totalVotes = 0;;
    try {
      questionDetails.choices.forEach((choice) => {
        totalVotes += choice["votes"] ?? 0;
      });
      result = (vote / totalVotes) * 100;
      return result.toFixed(2);
    } catch (error) {
      console.log('calPercentage error', error);
    }
  };

  const postVote = async () => {
    try {
      console.log(checked.id);
      const response = await axios.post(`https://polls.apiblueprint.org${checked.id}`)
      console.log(response.data);
    } catch (error) {
      console.log('postVote error', error);
    }
  }

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
    <div>
      <div>Questions Details</div>
      <div>Question - {questionDetails.question}</div>
      <Button onClick={() => postVote()}> Save Vote </Button>
      {questionDetails !== undefined ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Choices</TableCell>
                <TableCell align="right" maxWidth={50}>
                  Votes
                </TableCell>
                <TableCell align="right" maxWidth={50}>
                  Percentage
                </TableCell>
                <TableCell align="right" maxWidth={50}>
                  Select
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionDetails &&
                questionDetails.choices &&
                Array.isArray(questionDetails.choices) &&
                questionDetails.choices.map((choice) => (
                  <TableRow key={choice.choice}>
                    <TableCell component="th" scope="row" maxWidth={50}>
                      {choice.choice}
                    </TableCell>
                    <TableCell component="th" scope="row" maxWidth={50}>
                      {choice.votes}
                    </TableCell>
                    <TableCell component="th" scope="row" maxWidth={50}>
                      {calPercentage(choice.votes)}
                      %
                    </TableCell>
                    <TableCell component="th" scope="row" maxWidth={50}>
                      <Checkbox
                        id={choice.url}
                        checked={choice.url === checked.id}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};

export default Details;
