import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Card } from "antd";
import axios from "axios";
import { Typography } from "antd";
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
  if (isLoading) return "Loading Genres....";
  if (error) return `Error fetching genres: ${error}`;
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
                    <Card
                      height="50px"
                      key={game.id}
                      style={{
                        height: "200px",
                        width: "400px",
                        backgroundImage: `url(${genre.image_background})`,
                        backgroundSize: "cover",
                      }}
                      hoverable
                      className="game-card"
                    >
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
                    </Card>
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
