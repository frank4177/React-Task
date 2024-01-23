import React, { useCallback, useEffect, useState, useRef } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import MainContainer from "./mainContainer";
import Button from "./button";
import LeaderBoardCard from "./LeaderBoardCard";
import MkdSDK from "../utils/MkdSDK";
import { ArrowDownIcon } from "../assets/Icons";


const LeaderboardSection = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);
  const renderCard = useCallback((card, index) => {
    return (
      <LeaderBoardCard
        key={card.id}
        index={index}
        id={card.id}
        data={card}
        moveCard={moveCard}
      />
    );
  }, []);

  const paginateNext = ()=>{
    if (totalPages <= totalPages) {
    setCurrentPage(prev=> prev +1)
      
    }
  }

  const paginatePrev = ()=>{
    if (currentPage > 1) {
    setCurrentPage(prev=> prev -1)
    }
  }

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      let sdk = new MkdSDK();
      let payload = {
        payload: {},
        page: currentPage,
        limit: 10,
      };
      let method = "PAGINATE";

      try {
        const res = await sdk.callRestAPI(payload, method);
        console.log(res)
        setCards(res.list)
        setTotalPages(res.total)
      } catch (error) {
        console.log(error)
      }
    };
    fetchVideos()
  }, [currentPage]);

  return (
    <MainContainer>
      {/* Title bar */}
      <DndProvider backend={HTML5Backend}>
        <section className="flex flex-row items-center justify-between">
          <span className="text-[40px] text-white">Today's leaderboard</span>
          <div>
            <div className="bg-[#1D1D1D] px-5 py-3 rounded-[10px] space-x-5 flex flex-row items-center text-white">
              <span>30 May 2022</span> <span>•</span>{" "}
              <span className="bg-lime-400 rounded-[5px] text-black text-[14px] px-2">
                SUBMISSIONS OPEN
              </span>{" "}
              <span>•</span>
              <span>11:34</span>
            </div>
          </div>
        </section>

        {/* Table */}
        <div className="flex flex-row justify-between items-center mt-4 px-3 text-gray-500">
          <div className="flex flex-row gap-5 max-w-[400px] w-full">
            <div className="w-3">#</div>
            <div className="w-3">Title</div>
          </div>

          <div className="max-w-[200px] w-full ">Author</div>
          <div className="max-w-[200px] w-full text-end space-x-1 flex flex-row justify-end">
            <span>Most Liked</span>
            <img src={ArrowDownIcon} alt="" />
          </div>
        </div>

        {/*Card Rows */}

        <>
        {cards.map((card, i) => renderCard(card, i))}
        </>

        {cards.length > 0 && <div className="flex flex-row justify-end items-center mt-6 gap-3">
          <Button title="Prev" handleClick={paginatePrev}/>
          <Button title="Next" handleClick={paginateNext}/>
        </div>}
      </DndProvider>
    </MainContainer>
  );
};

export default LeaderboardSection;
