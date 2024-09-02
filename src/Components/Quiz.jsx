import { initialResult } from '../App';
import './Quiz.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

Swal.fire({
    title: "Hello!",
    text: "Starting this quiz",
    icon: false,
    timer: 1500,
    showConfirmButton: false
});
  

const Quiz = ({ questions }) => {

    let [currentQuestion, setCurrentQuestion] = useState(0);
    const { question, choices, correctAnswer } = questions[currentQuestion];
    const [answerId, setAnswerId] = useState(null);
    const [answer, setAnswer] = useState(' ');
    const [result, setResult] = useState(initialResult)
    const [showResult, setShowResult] = useState(false);

    const onAnswerClick = (choice, index) => {
        setAnswerId(index);
        setAnswer(choice === correctAnswer);
    }
    
    const onClickNext = () => {
        if (answer) {
            setResult(prev => ({
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1
            }));
            Swal.fire({
                icon: 'success',
                title: 'Correct!',
                confirmButtonText: 'OK'
            });
        } else {
            setResult(prev => ({
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1
            }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong answer!',
                confirmButtonText: 'OK'
            });
        }
    
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
    
        setAnswerId(null);
        setAnswer(false);
    }
    

   const onTryAgain = () => {
     setResult(initialResult);
     setShowResult(false);
   }

    return (
        <div className="Quiz-Container">
            {!showResult ? (<>
                <span className='active-question-no'>{currentQuestion + 1}</span>
                <span className='total-no-question'>/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {
                        choices.map((choice, index) => (
                            <li
                                onClick={() => onAnswerClick(choice, index)}
                                key={choice}
                                className={answerId === index ? "selected-answer" : null}
                            >
                                {choice}
                            </li>
                        ))
                    }
                </ul>
                <div className='footer'>
                    <button onClick={onClickNext} disabled={answerId === null} >
                        {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                    </button>
                </div>
            </>) : (<div className='Result'>
                <h3>Result</h3>
                <p>
                    Total Questions: <span>{questions.length}</span>
                </p>
                <p>
                   Total Score: <span>{result.score}</span>
                </p>
                <p>
                    Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>
                <p>
                   Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Try Again</button>

            </div>)}
        </div>
    );
}

export default Quiz;
