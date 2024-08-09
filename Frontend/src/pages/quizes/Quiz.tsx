import React, { useEffect, useRef, useState } from "react";
import PaginationHoc, { PropsType } from "../../components/hoc/PaginationHoc";
import { pagination } from "../../utilis/main";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useFetch from "../../hooks/useFetch";
import { failed, start, success } from "../../slices/quizSlice";
import { Quiz as Quizz } from "../../slices/quizSlice";
import { addScore } from "../../utilis/apiCalls";
import MainLoader from "../../components/loaders/MainLoader";


const Quiz = ({ currentPage, setCurrentPage }: PropsType) => {
  const [result, setResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(5);

  let option1 = useRef<HTMLLIElement>(null);
  let option2 = useRef<HTMLLIElement>(null);
  let option3 = useRef<HTMLLIElement>(null);
  let option4 = useRef<HTMLLIElement>(null);

  let option_array = [option1, option2, option3, option4];
  const { level } = useParams();
  let navigate = useNavigate();
  let dispatch = useAppDispatch();
   const {token} = useAppSelector(data => data.user)
  const { datas, loading, error } = useFetch<Quizz>(`/quiz/${level}`,token); //fetching data

  useEffect(() => {
    dispatch(start());
    if (loading) return;
    if (error) {
      dispatch(failed("Something went wrong"));
    } else {
      dispatch(success(datas));
    }
  }, [loading, error, datas, dispatch]); //getting quiz

  const { quizes } = useAppSelector((data) => data.quizes);

  if(!quizes){
    return <MainLoader />;
  }

  const { currentQuiz, totalPages } = pagination(quizes, currentPage); //pagination

  // next page handeler
  const handleNextPage = () => {
    if (currentPage < totalPages && isClicked) {
      option_array.forEach((option) => {
        option.current?.classList.remove("green", "red");
      });
      setCurrentPage(currentPage + 1);
      setLock(false);
      setIsClicked(false);
      setIsDisabled(false);
      setCounter(5);
    } else if (currentPage >= totalPages) {
      setResult(true);
      return 0;
    }
  }; 

  //index of correct answer
  const res = currentQuiz.map((item) => {
    return item.answers.findIndex((ans) => String(ans.right) === "true");
  });
  let index = res[0];

  //correct answer
  const correctAnswer = currentQuiz.map((item) => {
    return item.answers.find((ans) => String(ans.right) === "true");
  });

  let correct = correctAnswer[0]?.answerText;

  //answer click handler
  const handleAnswerClick = (
    e: React.MouseEvent<HTMLLIElement>,
    isCorrect: string
  ) => {
    let target = e.target as HTMLLIElement;

    setIsClicked(true);
   
    if (!lock) {
      if (isCorrect === "true") {
        target.classList.add("green");
        setScore((prev) => prev + 1);
        setIsDisabled(false);
      } else {
        target.classList.add("red");
        if (index >= 0) {
          option_array[index].current?.classList.add("green");
        }
        let count = 0;
        setIsDisabled(true);
        let timer = setInterval(() => {
          count++;
          if (count === 5) {
            setIsDisabled(false);
            clearInterval(timer);
          }
        }, 1000); // locking for 5 second
      }
      setLock(true);
    }
  };

  //timer
  useEffect(() => {
    let timer: any;
    if (!isClicked) {
      timer = setInterval(() => {
        setCounter((prev) => {
          if (prev === 0) {
            clearInterval(timer);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    } else clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [isClicked]);

  //timer
  useEffect(() => {
    let newTimer: any;
    if (counter === 0) {
      setIsDisabled(true);
      if (index >= 0) {
        option_array[index].current?.classList.add("green");
      }
      setLock(true);
      let newCount = 0;
      newTimer = setInterval(() => {
        newCount++;
        if (newCount === 5) {
          setIsDisabled(false);
          setIsClicked(true)
          console.log(isDisabled)
          clearInterval(newTimer);
        }
      }, 1000);
    } 
    return () => {
      clearInterval(newTimer);
    };
  }, [counter]);

 //score 
  useEffect(() => {
    if (result === true) {
      addScore(`/score`, score, level,token);
    }
  }, [result]);

  return (
    <section className="container  mx-auto px-[40px] py-[30px] bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-4 text-center">Quiz Time</h1>
      <hr className="h-1 border-0 bg-[#707070] mb-8" />
      {result ? (
        <></>
      ) : (
        <>
          {currentQuiz.map((item, index) => (
            <div key={index} className="mb-6">
              <div className="flex justify-between mb-4 lg:ml-12 lg:mr-12">
                <h2 className="text-2xl font-semibold ">
                  {currentPage}.{item.question}
                </h2>
                <span
                  className={
                    counter === 0 ? `text-red-500` : `text-primaryColor`
                  }
                >
                  {counter === 0
                    ? "TimeOut"
                    : isClicked
                    ? ""
                    : `Time up's in : ${counter}`}
                </span>
              </div>
              <ul className="space-y-4 lg:px-[50px]">
                {item.answers.map((answer, answerIndex) => (
                  <li
                    className="flex items-center text-2xl h-16 px-4 pl-5 border border-gray-300 rounded-lg cursor-pointer transition duration-200 ease-in-out transform hover:scale-105"
                    key={answerIndex}
                    ref={option_array[answerIndex]}
                    onClick={(e) => handleAnswerClick(e, String(answer.right))}
                  >
                    {answer.answerText}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="lg:ml-12 text-blue-900">{isClicked || counter === 0 ? `Correct answer :- ${correct}` : ""}</p>
          <div className="text-center">
            <button
              className="mt-5 px-8 py-3 w-32 bg-purple-600 text-white text-xl font-medium rounded-full transition duration-200 ease-in-out transform hover:scale-105"
              onClick={handleNextPage}
              disabled={isDisabled}
            >
              {isDisabled ? '🚫' : 'Next'}
            </button>
            <div className="mt-4 text-lg">
              {currentPage} of {totalPages}
            </div>
          </div>
        </>
      )}
      {!result ? (
        <></>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            You Scored {score} out of {totalPages}
          </h2>
          <button
            className="mt-4 px-8 py-3 bg-purple-600 text-white text-xl font-medium rounded-full transition duration-200 ease-in-out transform hover:scale-105"
            onClick={() => {
              setCurrentPage(1);
              setScore(0);
              setResult(false);
              setIsClicked(false);
              setIsDisabled(false);
              setLock(false);
              setCounter(5);
              navigate(`/quiz/${level}`);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </section>
  );
};

export default PaginationHoc(Quiz);
