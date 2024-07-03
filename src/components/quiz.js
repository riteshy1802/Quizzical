import React, { useState, useEffect } from "react";
import "../quiz.css";
import { motion } from "framer-motion";
import axios from "axios";
import he from "he";
import { nanoid } from "nanoid";

export default function Quiz(
    {
        setLandingVisible,
        setQuizVisible,
        setQuizAnswersVisible,
        allData,
        setAllData,
        currentScore,
        setCurrentScore,
        quiz,
        setQuiz,
        correctArray,
        setCorrectArray,
        attemptedOption,
        setAttemptedOption
    }) {

        function checkAnswers() {
            setQuizVisible(false);
            setQuizAnswersVisible(true);
            const userResponses = quiz.map(item => {
                const selectedOption = item.optionsArray.find(option => option.isSelected);
                return selectedOption ? selectedOption.option : null;
            });
            setAttemptedOption(userResponses);
            const RightAnswers = quiz.map((item)=>{
                return item.correct
            })
            setCorrectArray(RightAnswers);
        }

    let problem_styling = ""

    const styleForSlection = {
        backgroundColor: "#D6DBF5",
        border: "1px solid #293264"
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=5&type=multiple');
                const fetchedData = response.data.results;

                const decodedData = fetchedData.map(item => {
                    const opt = []
                    // Pushing the incorrect options into the array : opt
                    const DecodeIncorrectAnswers = item.incorrect_answers.map(answer => {
                        const optionAndIdObject = {
                            id: nanoid(),
                            option: he.decode(answer),
                            isSelected: false
                        }
                        opt.push(optionAndIdObject);
                        return he.decode(answer)
                    });

                    // Pushing the Correct Answer Object into the array : opt
                    const correctOptionAndIdObject = {
                        id: nanoid(),
                        option: he.decode(item.correct_answer),
                        isSelected: false
                    }
                    opt.push(correctOptionAndIdObject);

                    // Shuffle the options array
                    for (let i = opt.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [opt[i], opt[j]] = [opt[j], opt[i]];
                    }

                    // Set problem styling based on difficulty
                    if (item.difficulty === "easy") {
                        problem_styling = {
                            border: '1px solid green',
                            color: 'green'
                        }
                    } else if (item.difficulty === "medium") {
                        problem_styling = {
                            border: '1px solid #d5b01b',
                            color: '#d5b01b'
                        }
                    } else {
                        problem_styling = {
                            border: '1px solid red',
                            color: 'red'
                        }
                    }

                    return {
                        question: he.decode(item.question),
                        incorrect: DecodeIncorrectAnswers,
                        correct: he.decode(item.correct_answer),
                        level: item.difficulty,
                        style: problem_styling,
                        optionsArray: opt,
                        selectedOption: '',
                        id: nanoid(),
                        isCorrect : false
                    };
                });

                setAllData(fetchedData);
                setQuiz(decodedData);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    function selectOption(questionId, optionText) {
        setQuiz(prevQuiz =>
            prevQuiz.map(question => {
                if (question.id === questionId) {
                    const updatedOptionsArray = question.optionsArray.map(option => {
                        return {
                            ...option,
                            isSelected: option.option === optionText
                        };
                    });

                    return {
                        ...question,
                        selectedOption: optionText,
                        optionsArray: updatedOptionsArray
                    };
                }
                return question;
            })
        );
    }

    return (
        <div className="outer--div">
            <svg className="top--right--svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,100 
                        C20,40 200,20 200,130 
                        S120,190 80,180 
                        S90,180 50,100 
                        Z" 
                    stroke="#FFFAD1" strokeWidth="2" fill="#FFFAD1" />
            </svg>
            <div className="allQuestions--quiz">
                {quiz && quiz.length > 0 ? (
                    quiz.map((data, index) => (
                        <motion.div
                            key={data.id}
                            className="inner--div"
                            initial={{ x: "100px", opacity: 0 }}
                            animate={{ x: "1rem", opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 120, delay: index * 0.1 }}
                        >
                            <div className="question--quiz--div">
                                <h2 className="question--quiz">{data.question}</h2>
                            </div>
                            <div className="options--quiz--div">
                                {
                                    data.optionsArray.map((item) => (
                                        <p
                                            onClick={() => selectOption(data.id, item.option)}
                                            key={item.id}
                                            className="option"
                                            style={item.isSelected ? styleForSlection : {}}
                                        >
                                            {item.option}
                                        </p>
                                    ))
                                }
                            </div>
                            <div className="underline--below--question" ></div>
                        </motion.div>
                    ))
                )
                    : (
                        <div>
                            <motion.p
                                className="message"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ loop: Infinity, duration: 1, repeatDelay: 1 }}
                            >
                                Hang Tight Preparing your questions...
                            </motion.p>
                        </div>
                    )
                }
                <div className="submit--div">
                    <motion.button
                        type="button"
                        className="submitQuiz"
                        onClick={() => checkAnswers()}
                        initial={{ x: '-100px', opacity: 0 }}
                        animate={{ x: "1rem", opacity: 1 }}
                        transition={{ delay: 1, stiffness: 100 }}
                    >
                        Check Answers
                    </motion.button>
                </div>
            </div>

            <svg className="left--bottom--svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,100 
                        C20,40 200,20 200,130 
                        S120,190 80,180 
                        S90,180 50,100 
                        Z" 
                    stroke="#DEEBF8" strokeWidth="2" fill="#DEEBF8" />
            </svg>
        </div>
    )
}
