import { Button, TextField } from '@material-ui/core';
import React from 'react'

 const AddQuestion = () => {
    const [choiceList, addChoiceList] = React.useState([]);
    const [question, setQuestion] = React.useState('');
    const [choice, setChoice] = React.useState('');
    const handleChange = (event) => {
        setQuestion(event.target.value);
      };

    const savePoll = () => {
        console.log('q', question, 'choice', choiceList);
    }

    return (
        <div>
        <h1>Add new question</h1>
            <TextField id="filled-basic" label="question" variant="filled" value={question} onChange={handleChange}></TextField>
            <h1>Add new choices for your question</h1>
            <TextField id="filled-basic" label="choices" variant="filled" value={choice} onChange={(event) => setChoice(event.target.value)}></TextField>
            <Button onClick={() => {addChoiceList(prev => [...prev, choice])}}>add choice</Button>
            {choiceList.map(choice => {
                return <div>{choice}</div>
            })}
            <Button onClick={savePoll}><h1>Save Poll</h1></Button>
        </div>
    )
}

export default AddQuestion;