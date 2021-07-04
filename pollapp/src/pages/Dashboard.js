import React, { useState } from "react";
import { GridList, GridListTile, Popover, makeStyles } from "@material-ui/core";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
// const baseURL = "https://polls.apiblueprint.org";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
}));

const Dashboard = ({ setShowDetails, pollList, setQuestionId }) => {
  let history = useHistory();
  const [openedPopover, setOpenedPopover] = useState(false);
  const [id, setId] = useState(false);
  const popoverAnchor = React.useRef(null);

  const classes = useStyles();

  const popoverEnter = (e) => {
    console.log(e.target);
    setId(e.target.id);
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };

  console.log(popoverAnchor.current, 'popoverAnchor', document.getElementById(id) !== null ? document.getElementById(id).getBoundingClientRect() : '');


  return (
    <div>
      <h1>Questions</h1>
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
            history.push("/details");
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
                style={{ backgroundColor: "gray" }}
                // ref={anchorEl}
                // ref={popoverAnchor}
                aria-owns="mouse-over-popover"
                aria-haspopup="true"
                onMouseEnter={popoverEnter}
                onMouseLeave={popoverLeave}
                id={question.url}
              >
                <Link id={question.url} to="/details">
                  {question.question}
                </Link>
                <Popover
                  // id="mouse-over-popover"
                  style={{
                    position: 'absolute',
                    top:0,
                    left: -1000
                    }}
                  id={question.question}
                  className={classes.popover}
                  classes={{
                    paper: classes.popoverContent,
                  }}
                  // open={openedPopover}
                  open={id === question.url}
                  anchorEl={popoverAnchor.current}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  PaperProps={{
                    onMouseEnter: popoverEnter,
                    onMouseLeave: popoverLeave,
                  }}
                >
                  <div  style={{
                    // top:document.getElementById(id) !== null && document.getElementById(id).getBoundingClientRect().top,
                    // left: document.getElementById(id) !== null && document.getElementById(id).getBoundingClientRect().left
                    top: 10,
                    left: 10,

    }}>
                    <div>{question.url}</div>
                    <div>{question.url}</div>
                  </div>
                </Popover>
              </div>
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};

export default Dashboard;
