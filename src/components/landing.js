import React from "react";
import "../landing.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing({ setLandingVisible, setQuizVisible, setQuizAnswersVisible, landingVisible, quizVisible, quizAnswersVisible }) {

    function StartGame() {
            setLandingVisible(false);
            setQuizVisible(true);
    }

    return (
        <div className="mainPage">
            <svg
                className="yellow--svg"
                width="200"
                height="200"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M50,100 
                        C20,40 200,20 200,130 
                        S120,190 80,180 
                        S90,180 50,100 
                        Z"
                    stroke="#FFFAD1" strokeWidth="2" fill="#FFFAD1" />
            </svg>
                    <div
                        className="child--div"
                    >
                        <motion.p
                            className="quizzical--title"
                            initial={{ x: "100px", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 150, bounce: 0.25 }}
                            exit={{ x: "-100px", opacity: 0, transition: { duration: 0.5 } }}
                        >
                            Quizzical
                        </motion.p>
                        <motion.p
                            className="description"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            exit={{ x: "-100px", opacity: 0, transition: { duration: 0.5 } }}
                        >
                            Test Your General Knowledge is an
                            engaging trivia game designed for
                            all ages, challenging your understanding
                            across various topics and subjects.
                        </motion.p>
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
                            exit={{ x: "-100px", opacity: 0, transition: { duration: 0.5 } }}
                            type="button"
                            className="start--quiz"
                            onClick={StartGame}
                        >
                            Start Quiz
                        </motion.button>
                    </div>



            <svg className="blue--svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,100 
                        C20,40 200,20 200,130 
                        S120,190 80,180 
                        S90,180 50,100 
                        Z"
                    stroke="#DEEBF8" strokeWidth="2" fill="#DEEBF8" />
            </svg>
        </div>
    );
}
