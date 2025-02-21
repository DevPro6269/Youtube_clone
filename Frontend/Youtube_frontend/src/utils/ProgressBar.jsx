import Loader from "../Loader";

const ProgressBar = ({ show }) => {

    return (
      <div className={`p-3 flex  ${show} right-1 bg-white fixed top-3 z-50 justify-center items-center`}>
        <h1 className="text-orange-400 flex gap-5 font-semibold">Video Uploading... <Loader/></h1>
      </div>
    );
  };
  
  export default ProgressBar;
  