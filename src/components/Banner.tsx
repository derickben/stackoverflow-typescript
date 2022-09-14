import "./Banner.css";

interface Props {
  handleOnClick(): void;
  isDisabled: boolean;
  isLoading: boolean;
}

const Banner: React.FC<Props> = ({ handleOnClick, isDisabled, isLoading }) => {
  return (
    <div className="container__banner">
      <h1 className="title">
        <span className="title1">Stack</span>
        <span className="title2">Overflow</span>
      </h1>
      <p className="subTitle">Get questions from Stackoverflow!</p>
      <div className="buttonWrapper">
        <button
          className="button"
          onClick={handleOnClick}
          disabled={isDisabled}
        >
          {isLoading ? "LOADING ..." : "GET QUESTIONS"}
        </button>
      </div>
    </div>
  );
};

export default Banner;
