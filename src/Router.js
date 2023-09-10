import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/HomePage';
import Courses from './pages/CoursePage';
import Quiz from './pages/QuizPage';
import Rank from './pages/Rank';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/rank" component={Rank} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
