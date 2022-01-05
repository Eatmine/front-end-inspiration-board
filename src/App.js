import "./App.css";
import axios from "axios";
import Boards from "./components/Boards";
// import CardsForSelectedBoard from "./components/CardsForSelectedBoard";
import CreateANewBoard from "./components/CreateANewBoard";
import CreateANewCard from "./components/CreateANewCard";
import Logo from "./components/Logo";
import SelectedBoard from "./components/SelectedBoard";
import { useState, useEffect } from "react";
import CardsForPickMeUpQuotes from "./components/CardsForSelectedBoard";

function App() {
  const [boardsData, setBoards] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeBoard, setActiveBoard] = useState(2);

  const [selectedBoard, setSelectedBoard] = useState({
    title: "",
    owner: "",
  });

  const getBoards = () => {
    axios
      .get("https://trm2-inspiration-board.herokuapp.com/boards")
      .then((response) => {
        setBoards(response.data);
        // setErrorMessage('');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(<section>{error.message}</section>);
      });
  };

  useEffect(() => {
    getBoards();
    getCardsfromBoard();
    console.log("changes were made");
  }, []);

  //Create a new Card
  const postANewCardForm = (cardsData) => {
    console.log(cardsData);
    const cards = { message: cardsData };
    axios
      .post(
        `https://trm2-inspiration-board.herokuapp.com/boards/${activeBoard}/cards`,
        cards
      )
      .then((response) => {
        console.log(response, "response");
        getCardsfromBoard();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // SelectedBoard feature
  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const boardsElements = boardsData.map((board) => {
    return (
      <li>
        <Boards board={board} onBoardSelect={selectBoard} />
      </li>
    );
  });

  //Get cards from Board
  const [cardListData, setCards] = useState([{}]);
  const getCardsfromBoard = () => {
    axios
      .get(
        `https://trm2-inspiration-board.herokuapp.com/boards/${activeBoard}/cards`
      )
      .then((response) => {
        setCards(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // axios
  //     .post("https://trm2-inspiration-board.herokuapp.com/boards/3/cards",cards)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // setErrorMessage
  //     });

  const addBoardData = (newBoard) => {
    const newBoardList = [...boardsData];

    newBoardList.push({
      owner: newBoard.owner,
      title: newBoard.title,
    });

    setBoards(newBoardList);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Logo />
        </div>
        <div className="col">
          <Boards boardsData={boardsData} />
          {errorMessage}
        </div>
        <div className="col">
          <SelectedBoard />
          <p>
            {selectedBoard.title ? (
              `${selectedBoard.title} - ${selectedBoard.owner}`
            ) : (
              <em>"Select a Board from the Board List!"</em>
            )}
          </p>
        </div>
        <div className="col">
          <CreateANewBoard
            boards={boardsData}
            addBoardCallback={addBoardData}
          />
        </div>

        <div className="row">
          <div className="col">
            <CardsForPickMeUpQuotes cardListData={cardListData} />
            {/* <Card  /> */}
          </div>
          <div className="col">
            <CreateANewCard postANewCard={postANewCardForm} />{" "}
          </div>
        </div>
      </div>
      <div className="footer">
        <p></p>
        <footer className="container text-center">©TRM2 2022</footer>
        <p></p>
      </div>
    </div>
  );
}

export default App;
