import { useState } from "react";
import Banner from "./Banner";
import FlexLayoutGrid from "./FlexLayoutGrid";
import "./Home.css";
import "./Banner.css";

interface Data {
  [prop: string]: any;
}

interface ErrorObj {
  message: string;
  [prop: string]: any;
}

const Home: React.FC = () => {
  const [allQuestions, setAllQuestions] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      setApiError("");
      const response = await fetch(
        `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&key=${process.env.REACT_APP_STACKOVERFLOW_KEY}`
      );

      const data = await response.json();
      setIsLoading(false);

      if (data.items) {
        return data.items;
      } else {
        setApiError("Could not fetch qustions");
        return [];
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log({ error });

      setApiError(error?.message ?? "Network Error");
    }
  };

  const handleOnClick = async () => {
    const result = await getQuestions();
    if (Array.isArray(result)) {
      setAllQuestions(result);
    }
  };

  const handleReset = () => {
    setAllQuestions([]);
  };

  return (
    <div className="container">
      <div className="main"></div>
      <Banner
        handleOnClick={handleOnClick}
        isLoading={isLoading}
        isDisabled={
          isLoading === false && allQuestions.length > 0 ? true : false
        }
      />

      {apiError && <p>Something went wrong: {apiError}</p>}

      {allQuestions.length > 0 && <FlexLayoutGrid questions={allQuestions} />}

      {allQuestions.length > 0 && (
        <div className="buttonWrapper">
          <button className="button" onClick={handleReset}>
            RESET
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
