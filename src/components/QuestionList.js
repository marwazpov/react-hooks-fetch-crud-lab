import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions]= useState([]);

 // fetching and setting data once page loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDelete (id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    })
  }

  function handleAnswerChange (id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"correctIndex": correctIndex})
    })
    .then ((resp) => resp.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if(question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions);
    })
  }

  const questionItems = questions.map((question) => (
    <QuestionItem
      key = {question.id}
      question = {question}
      onDelete = {handleDelete}
      onChangeAnswer = {handleAnswerChange}
    />

  ))


  return (
    <section>
      <h1>Quiz Questions </h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
