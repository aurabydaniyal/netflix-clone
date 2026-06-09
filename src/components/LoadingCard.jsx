const LoadingCard = () => {
  return (
    <div className="min-w-[150px] md:min-w-[200px] animate-pulse">
      {/* Gray rectangle for poster */}
      <div className="bg-gray-800 rounded-md h-[225px] md:h-[300px] w-full"></div>
      
      {/* Gray rectangle for title */}
      <div className="h-4 bg-gray-800 rounded mt-2 w-3/4"></div>
    </div>
  );
};

export default LoadingCard;