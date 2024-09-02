import './App.css';
import { jsQuiz } from './Components/Data';
import Quiz from './Components/Quiz';

const App = () => {
    return <Quiz questions={jsQuiz.questions} />;
}

export default App;

export const initialResult = {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0, 
}
