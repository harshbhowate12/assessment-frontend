import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LeftSectionQuestion from "../components/LeftSectionQuestion.jsx";
import RightSectionTimer from "../components/RightSectionTimer.jsx";

const Assessment = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedForReview, setMarkedForReview] = useState([]);
    const [visitedQuestions, setVisitedQuestions] = useState(new Set());
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 mins
    const [submitted, setSubmitted] = useState(false);
    const timerRef = useRef(null);

    const userId = "testuser123";

    useEffect(() => {
        axios.get("http://localhost:5001/api/questions")
            .then((res) => setQuestions(res.data))
            .catch(() => alert("Failed to load questions."));
    }, []);

    useEffect(() => {
        if (!questions.length || submitted) return;

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [questions, submitted]);

    useEffect(() => {
        if (questions.length && !submitted) {
            setVisitedQuestions((prev) => new Set(prev).add(questions[currentIndex].id));
        }
    }, [currentIndex, questions, submitted]);

    const handleOptionSelect = (qid, option) => {
        if (submitted) return;
        setSelectedAnswers({ ...selectedAnswers, [qid]: option });
    };

    const handleSubmit = () => {
        if (submitted) return;
        clearInterval(timerRef.current);
        setSubmitted(true);

        const answers = questions.map((q) => ({
            questionId: q.id,
            selectedOption: selectedAnswers[q.id] || "",
        }));

        axios.post("http://localhost:5001/api/responses/submit", { userId, answers })
            .then((res) => alert(res.data.message))
            .catch((err) => alert(err.response?.data?.error || "Submission failed"));
    };

    const formatTime = (secs) => {
        const h = String(Math.floor(secs / 3600)).padStart(2, "0");
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        const s = String(secs % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    const toggleMarkForReview = () => {
        const qid = questions[currentIndex].id;
        setMarkedForReview((prev) =>
            prev.includes(qid) ? prev.filter((id) => id !== qid) : [...prev, qid]
        );
    };

    const getQuestionColor = (questionId) => {
        if (questions[currentIndex].id === questionId) return "bg-blue-500 text-white"; // Current
        if (markedForReview.includes(questionId)) return "bg-yellow-400";
        if (selectedAnswers[questionId]) return "bg-green-500 text-white"; // Answered
        if (visitedQuestions.has(questionId)) return "bg-red-500 text-white"; // Not Answered
        return "bg-gray-300"; // Not Visited
    };

    if (!questions.length) return <p className="text-center p-4">Loading...</p>;

    const currentQ = questions[currentIndex];

    return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-4 md:mt-6 shadow-md border rounded-lg overflow-hidden">
        <LeftSectionQuestion
            currentQ={currentQ}
            currentIndex={currentIndex}
            questionsLength={questions.length}
            selectedAnswers={selectedAnswers}
            markedForReview={markedForReview}
            submitted={submitted}
            handleOptionSelect={handleOptionSelect}
            toggleMarkForReview={toggleMarkForReview}
            setCurrentIndex={setCurrentIndex}
            handleSubmit={handleSubmit}
        />
        <RightSectionTimer
            questions={questions}
            timeLeft={timeLeft}
            submitted={submitted}
            currentIndex={currentIndex}
            markedForReview={markedForReview}
            selectedAnswers={selectedAnswers}
            visitedQuestions={visitedQuestions}
            setCurrentIndex={setCurrentIndex}
        />
    </div>
);

};

export default Assessment;