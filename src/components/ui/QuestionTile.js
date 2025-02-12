import { useRouter } from "next/navigation";

const QuestionTile = ({ question }) => {
  const router = useRouter();

  const handleTileClick = () => {
    const title = question.description
      ? question.description.slice(0, 50) // Take the first 50 characters of the question as the title
      : "Untitled Question";
  
    const candidateId = sessionStorage.getItem("candidateId"); // Retrieve candidateId from session storage
  
    router.push(
      `/editor?questionId=${question.id}` +
        `&title=${encodeURIComponent(title)}` +
        `&description=${encodeURIComponent(question.description || "No description available.")}` +
        `&referenceSolution=${encodeURIComponent(question.reference_solution || "")}` +
        `&candidateId=${encodeURIComponent(candidateId || "")}` // Include candidateId in the URL
    );
  };

  return (
    <div
      className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 shadow-lg hover:border-teal-400/30 transition-all cursor-pointer"
      onClick={handleTileClick} // Navigate to the editor on click
    >
      <h2 className="text-xl font-semibold text-teal-400">
        {"Question"+ question.id}
      </h2>
      <p className="text-gray-300 mt-2">
        {question.question ? question.question.slice(0, 40) : "No description available."}
      </p>
    </div>
  );
};

export default QuestionTile;
