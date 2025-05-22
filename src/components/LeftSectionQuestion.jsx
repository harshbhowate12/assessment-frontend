import React from "react";

const LeftSectionQuestion = ({
    currentQ,
    currentIndex,
    questionsLength,
    selectedAnswers,
    markedForReview,
    submitted,
    handleOptionSelect,
    toggleMarkForReview,
    setCurrentIndex,
    handleSubmit,
}) => {
    return (
        <div className="flex-1 bg-white p-4 md:p-6">
            <h2 className="text-center text-black text-base md:text-lg font-semibold mb-4">
                Online Assessment Test - CAT Preparation
            </h2>

            <h3 className="text-black font-semibold mb-2 text-sm md:text-base">
                Question {currentIndex + 1}
            </h3>
            <p className="mb-4 text-gray-800 text-sm">{currentQ.question}</p>

            <div className="mb-4 space-y-2">
                {currentQ.options.map((opt, idx) => (
                    <label
                        key={idx}
                        className="block cursor-pointer text-black text-sm md:text-base"
                    >
                        <input
                            type="radio"
                            name={`q-${currentQ.id}`}
                            value={opt}
                            checked={selectedAnswers[currentQ.id] === opt}
                            onChange={() => handleOptionSelect(currentQ.id, opt)}
                            className="mr-2"
                            disabled={submitted}
                        />
                        {opt}
                    </label>
                ))}
            </div>

            <div className="flex flex-wrap justify-between items-center mt-6 gap-2">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={toggleMarkForReview}
                        className="bg-red-700 text-white text-xs px-4 py-2 rounded-full"
                        disabled={submitted}
                    >
                        {markedForReview.includes(currentQ.id)
                            ? "Unmark Review"
                            : "Mark for review"}
                    </button>

                    <button
                        onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={currentIndex === 0 || submitted}
                        className="bg-blue-500 text-white text-xs px-4 py-2 rounded-full"
                    >
                        Previous
                    </button>

                    <button
                        onClick={() =>
                            setCurrentIndex((prev) => Math.min(prev + 1, questionsLength - 1))
                        }
                        disabled={currentIndex === questionsLength - 1 || submitted}
                        className="bg-blue-500 text-white text-xs px-4 py-2 rounded-full"
                    >
                        Next
                    </button>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white text-xs px-5 py-2 rounded-full mt-2 md:mt-0"
                    disabled={submitted}
                >
                    Submit Test
                </button>
            </div>

            {/* Legend */}
            <div className="mt-6 text-xs md:text-sm flex flex-wrap gap-3">
                <div className="flex items-center gap-1 text-black">
                    <span className="w-4 h-4 bg-blue-500 inline-block rounded-sm"></span>
                    Current
                </div>
                <div className="flex items-center gap-1 text-black">
                    <span className="w-4 h-4 bg-gray-300 inline-block rounded-sm"></span>
                    Not Visited
                </div>
                <div className="flex items-center gap-1 text-black">
                    <span className="w-4 h-4 bg-green-500 inline-block rounded-sm"></span>
                    Answered
                </div>
                <div className="flex items-center gap-1 text-black">
                    <span className="w-4 h-4 bg-red-500 inline-block rounded-sm"></span>
                    Not Answered
                </div>
                <div className="flex items-center gap-1 text-black">
                    <span className="w-4 h-4 bg-yellow-400 inline-block rounded-sm"></span>
                    Review
                </div>
            </div>
        </div>
    );
};

export default LeftSectionQuestion;
