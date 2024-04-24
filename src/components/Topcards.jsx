import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import axios from "axios";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { FaComputer } from "react-icons/fa6";
import { FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation } from "react-icons/fa";
import { FaAndroid } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";

const Topcards = () => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_RAWG_API_KEY;
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
        const apiKey = process.env.REACT_APP_RAWG_API_KEY;
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
        setGames(gamesData);
        setIsGamesLoading(false);
        setGamesError(null);
      }catch(error){
        setGamesError(error.message);
        setIsGamesLoading(false);
      }};
      fetchGames();
      }, [genres]);

  if (isLoading) return(<div><h1 style={{color:'white'}}>Loading Data</h1></div>);
  if (error) return (<div><h1 style={{color:'white'}}>Error fetching data {error.message}</h1></div>);
  if (isGamesLoading) return "Loading Games....";
  if (gamesError) return `Error fetching games: ${gamesError}`
  return (
    <>
      <div className="home-container">
        <div className="home-heading-container">
          {genres.map((genre) => (
            <div className="genre-container" id={genre.name}>
              <Typography.Title
                
                level={1}
                style={{ color: "orange", display: "block" }}
                className="home-title"
              >
                Top 6 {genre.name} Games
              </Typography.Title>
              <Row gutter={[32, 32]}>
                {genre.games.map((game) => (
                  <Col xs={24} md={12} lg={8} xl={8} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Link key={game.id} to={`/games/${game.id}`}>
                      {/* <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:'center', padding:"5px", border:"1px solid grey", borderRadius:'5px'}}> */}
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
                      <div style={{ display: 'flex', flexDirection: 'row', gap:'4px', marginTop:'10px' }}>
                      {games[game.id]?.parent_platforms.map((platform) => (
                       <React.Fragment key={platform.platform.id}>
                        {platform.platform.name.toLowerCase() === 'pc' && <FaComputer style={{color:'white', fontSize:'1.25rem'}} />}
                        {platform.platform.name.toLowerCase() === 'playstation' && <FaPlaystation style={{color:'white', fontSize:'1.25rem'}} />}
                        {platform.platform.name.toLowerCase() === 'nintendo' && <BsNintendoSwitch style={{color:'white', fontSize:'1.25rem'}} />}
                        {platform.platform.name.toLowerCase() === 'xbox' && <FaXbox style={{color:'white', fontSize:'1.25rem'}} />}
                        {platform.platform.name.toLowerCase() === 'android' && <FaAndroid style={{color:'white', fontSize:'1.25rem'}} />}
                        {platform.platform.name.toLowerCase() === 'apple macintosh' && <FaApple style={{color:'white', fontSize:'1.25rem'}} />}
                        {platform.platform.name.toLowerCase() === 'linux' && <FaLinux style={{color:'white', fontSize:'1.25rem'}} />}
                       </React.Fragment>
                      ))}
                          </div>
                      <Typography.Title
                        style={{
                          textShadow: "3px 3px 5px rgba(0, 0, 0, 1)",
                          color: "white",
                          fontWeight: "bolder",
                          marginTop:'15px',
                        }}
                        level={2}
                        >
                        {game.name}
                      </Typography.Title>

                      {/* </div> */}
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
