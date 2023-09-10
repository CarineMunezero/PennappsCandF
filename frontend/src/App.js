import React from "react";
import "./App.css"; // Import the CSS file
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import QuizPage from "./pages/QuizPage";
import RankPage from "./pages/Rank";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Topimage from "./images/courses.jpg"

const App = () => {
  const containerStyle = {
    backgroundColor: '#F2E9DC',
    padding: '20px',
  };
  const textStyle = {
    fontSize: "24px", // Adjust the font size as needed
  };
  return (
      <Router>
        <div className="app-container" style={textStyle}>
        <Navbar bg="light" expand="lg">
          <Container fluid style={ containerStyle }>
            <Navbar.Brand as={Link} to="/">
              Your Logo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <div class="buttons">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                </div>
                <Nav.Link as={Link} to="/course">
                Course 
                </Nav.Link>
                <Nav.Link as={Link} to="/quiz">
                  Quiz
                </Nav.Link>
                <Nav.Link as={Link} to="/rank">
                  Rank
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <p style={textStyle}>CashEd is dedicated to fostering financial empowerment and 
        literacy among individuals in low-income villages. We are committed to
         equipping you with the knowledge and tools needed to manage your finances effectively,
          make informed decisions, and build a secure financial future. </p>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/course" component={CoursePage} />
            <Route path="/course" component={() => < CoursePage style={textStyle} />} />
            <Route path="/quiz" component={QuizPage} />
            <Route path="/rank" component={RankPage} />
          </Switch>
        </div>
      </Router>
    );
};
export default App;
