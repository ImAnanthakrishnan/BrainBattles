import Lottie from "lottie-react";
import  { useState } from "react";
import animationData from "../../assets/lotties/Animation - 1717768499295.json";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import LevelModal from "../../components/modals/levelModal";

const Home = () => {
  const [modal,setModal] = useState<boolean>(false);
  
  const {currentUser} = useAppSelector(data => data.user);
  
  const navigate = useNavigate();
  
  const closeModal = () =>{
    setModal(false);
  } 

  return (
    <section className="container flex justify-center items-center min-h-screen ">
      
      <div className="w-[700px] h-[450px] m-auto bg-purple-300 rounded-lg border border-r-[15px] shadow-custom-shadow flex justify-between">
        
        <div className="p-5 ">
        <h1 className="font-bold ">{currentUser && `Welcome, ${currentUser?.name}`}</h1>
          <h1 className="font-bold text-[2rem] mt-10">
            Learn new concepts for each question
          </h1>
          <button
            onClick={
              currentUser ? () => setModal(true) : () => navigate("/auth")
            }
            className="w-[150px] mt-10 border-[3px] border-primaryColor text-center font-semibold hover:shadow-custom-blueviolet p-6 rounded-md"
          >
            Start Quiz
          </button>
        </div>
        <div className="block">
          <Lottie
            animationData={animationData}
            loop={true}
            height={300}
            width={300}
          />
        </div>
      </div>
      {modal && <LevelModal isOpen={modal}  closeModal={closeModal}/>}
    </section>
  );
};

export default Home;
