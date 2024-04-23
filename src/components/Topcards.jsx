import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Card } from "antd";
import axios from "axios";
import { Typography } from "antd";
import { Link } from "react-router-dom";
const Topcards = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "82c3422d7fd04a1cadc9e01091822154";
        const url = `https://api.rawg.io/api/genres?key=${apiKey}`;
        const response = await axios.get(url);
        setGenres(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [games, setGames] = useState([]);
  const [isGamesLoading, setIsGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState(null);

  useEffect(()=>{
    const fetchGames = async () => {
      try{
        const apiKey = "82c3422d7fd04a1cadc9e01091822154";
        // gamesids have ids of the 6 games in each of genre.
        const gamesIds = genres.reduce((acc, genre)=>{
          acc.push(...genre?.games.map((game)=>(game.id)));
          return acc;
        }, []);
        const gamesData = {};
        await Promise.all(gamesIds.map(async (id)=>{
          const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
          const response = await axios.get(url);
          gamesData[id] = response.data;
        }));
        console.log(gamesData);
        setGames(gamesData);
        setIsGamesLoading(false);
        setGamesError(null);
      }catch(error){
        setGamesError(error.message);
        setIsGamesLoading(false);
      }};
      fetchGames();
      }, [genres]);

  if (isLoading) return "Loading Genres....";
  if (error) return `Error fetching genres: ${error}`;
  if (isGamesLoading) return "Loading Games....";
  if (gamesError) return `Error fetching games: ${gamesError}`
  return (
    <>
      <div className="home-container">
        <div className="home-heading-container">
          {genres.map((genre) => (
            <div className="genre-container">
              <Typography.Title
                level={2}
                style={{ color: "white", display: "block" }}
                className="home-title"
              >
                Top 6 {genre.name} Games
              </Typography.Title>
              <Row gutter={[32, 32]}>
                {genre.games.map((game) => (
                  <Col xs={24} md={12} lg={8} xl={8}>
                    <Link key={game.id} to={`/games/${game.id}`}>
                    <Card
                      height="50px"
                      key={game.id}
                      style={{
                        height: "200px",
                        width: "400px",
                        backgroundImage: `url(${games[game.id]?.background_image})`,
                        backgroundSize: "cover",
                      }}
                      hoverable
                      className="game-card"
                    >
                    </Card>
                    </Link>
                      <Typography.Title
                        style={{
                          textShadow: "3px 3px 5px rgba(0, 0, 0, 1)",
                          color: "white",
                          fontWeight: "bolder",
                        }}
                        level={2}
                      >
                        {game.name}
                      </Typography.Title>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topcards;
