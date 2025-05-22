import React from "react";

const RightSectionTimer = ({
    questions,
    timeLeft,
    submitted,
    currentIndex,
    markedForReview,
    selectedAnswers,
    visitedQuestions,
    setCurrentIndex,
}) => {
    const formatTime = (secs) => {
        const h = String(Math.floor(secs / 3600)).padStart(2, "0");
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        const s = String(secs % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };

    const getQuestionColor = (questionId) => {
        if (questions[currentIndex].id === questionId) return "bg-blue-500 text-white";
        if (markedForReview.includes(questionId)) return "bg-yellow-400";
        if (selectedAnswers[questionId]) return "bg-green-500 text-white";
        if (visitedQuestions.has(questionId)) return "bg-red-500 text-white";
        return "bg-gray-300";
    };

    return (
        <div className="w-full md:w-64 bg-gray-100 p-4 border-t md:border-t-0 md:border-l">
            <div className="text-center mb-6">
                <h3 className="font-semibold text-black text-sm md:text-base">Time Left</h3>
                <p className="text-xl font-bold mt-2 text-gray-600">
                    {formatTime(timeLeft)}
                </p>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm md:text-base">Navigator</h4>
                <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, idx) => (
                        <button
                            key={q.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`rounded text-xs md:text-sm px-2 py-1 font-bold ${getQuestionColor(
                                q.id
                            )}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            {submitted && (
                <div className="mt-6 text-green-700 font-semibold text-center text-sm">
                    Test submitted. Thank you!
                </div>
            )}
        </div>
    );
};

export default RightSectionTimer;
