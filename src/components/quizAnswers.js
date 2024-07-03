import React, { useEffect, useState } from "react";
import "../quizAnswers.css"
import { motion } from "framer-motion"

export default function QuizAnswers(
    {   
        setLandingVisible,
        setQuizVisible,
        setQuizAnswersVisible,
        // allData,
        setAllData,
        currentScore,
        setCurrentScore,
        quiz,
        setQuiz,
        correctArray,
        // setCorrectArray,
        attemptedOption,
        // setAttemptedOption
    }
){

    function StartOver(){
        setQuizAnswersVisible(false);
        setQuizVisible(true); 
        setQuiz([]);
        setAllData([]);
    }

    function ToHome(){
        setLandingVisible(true);
        setQuizVisible(false);
        setQuiz([]);
        setAllData([]);
    }

    //comparing the two arrays: 
    useEffect(() => {
        let score = 0;
        for (let i = 0; i < correctArray.length; i++) {
            if (quiz[i] && correctArray[i] === attemptedOption[i]) {
                quiz[i].isCorrect = true;
                score++
                console.log(true);
            } else {
                console.log(false);
            }
        }
        console.log(quiz);
        setCurrentScore(score);
    }, [correctArray, attemptedOption, quiz]);

    const style1 = {
        backgroundColor : '#06940657',
        color : 'green',
        border : '2px solid green'
    }

    const style2 = {
        backgroundColor : '#da453a47',
        color : '#ED4337',
        border : '2px solid #ED4337'
    }

    return(
        <div className="outer--div">
            <div className="BackToHome--div">
                <motion.button 
                    type="button" 
                    className="BackToHome"
                    initial={{x:"-100px",opacity:0}}
                    animate={{x:0,opacity:1}}
                    transition={{delay:0.2,stiffness:150,type:'spring'}}
                    onClick={()=>ToHome()}
                >
                    Back To Home
                </motion.button>
            </div>
            <svg className="right--top--svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,100 
                        C20,40 200,20 200,130 
                        S120,190 80,180 
                        S90,180 50,100 
                        Z" 
                        stroke="#FFFAD1" stroke-width="2" fill="#FFFAD1"/>
            </svg>
            <div className="allQuestions">
            {quiz && quiz.length>0 ?(
                    quiz.map((data, index) => (
                        <motion.div 
                            key={index}
                            className="inner--div"
                            initial={{x:'1rem' ,opacity: 0 }}
                            animate={{ x:'1rem' ,opacity: 1 }}
                            transition={{ duration:0.2, delay: index * 0.1  }}
                        >
                            <div className="question--difficulty--div">
                                <h2 className="question--quizAnswers">{data.question}</h2>
                            </div>
                            <div className="difficulty--div">
                                <p style={data.style} className="difficulty">{data.level}</p>
                            </div>
                            <div className="options--quiz--div">
                                {
                                    data.optionsArray.map((option,index)=>(
                                        <p 
                                            style={
                                                option.option === data.correct
                                                ? style1
                                                : option.isSelected===true
                                                    ? style2
                                                    : {}
                                            }
                      
                                            key={index} 
                                            className="option"
                                        >
                                            {option.option}
                                        </p>
                                    ))
                                }
                            </div>
                            <div className="underline--below--question" ></div>
                        </motion.div>
                    ))
                )
                : (
                    <motion.p
                        className="message"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{ loop: Infinity, duration: 0.5, repeatDelay: 0.5 }}
                    >
                    </motion.p>
                )
            }
                <div className="score--submit--div">
                    <motion.p 
                        className="score"
                        initial={{y:"10px",opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{type:"spring",stiffness:'120'}}
                    >
                        You Scored {currentScore}/5 correct Answers
                    </motion.p>
                    <button type="button" className="playAgain" onClick={()=>StartOver()}>Play Again</button>
                </div>
            </div>
            
            <svg className="bottom--left--svg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,100 
                        C20,40 200,20 200,130 
                        S120,190 80,180 
                        S90,180 50,100 
                        Z" 
                    stroke="#DEEBF8" stroke-width="2" fill="#DEEBF8"/>
            </svg>
        </div>
    )
}