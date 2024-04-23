import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Row, Col, Typography, Card, Flex} from 'antd';
import axios from 'axios';
import {Divider} from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { BarChart } from '@mui/x-charts/BarChart';

const GameDetails = () => {
    const {gameId} = useParams();
    const [gameDetails, setGameDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const apiKey = "82c3422d7fd04a1cadc9e01091822154";
                const url = `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`;
                const response = await axios.get(url);
                setGameDetails(response.data);
                setIsLoading(false);
            }catch(error){
                setIsLoading(false);
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    if (isLoading) return "Loading game details...";
    if(error) return `Error loading game details: ${error}` 
  return (
    <div>
        <Typography.Title level={1} style={{color:"gold", margin:"0px 0px 20px 0px", padding: "20px 0px"}}>{gameDetails.name}</Typography.Title>
        <Row>
            <Col span={10}>
                <img src={gameDetails.background_image} height="450px" width='450px' style={{borderRadius: "10px"}} />
                <Typography.Title style={{color:"white"}} level={4}>
                {gameDetails.rating}/{gameDetails.rating_top}
                </Typography.Title>
        <Typography.Title style={{color:"white"}} level={5}>
                Play time <span style={{color:"gold"}}>{gameDetails.playtime}</span>
        </Typography.Title>
            </Col>
            <Col span={14} style={{padding: "10px 30px",display:"flex", justifyContent:"center", alignItems:'flex-start'}}>
                <Typography.Title style={{color:"white", textAlign:"left"}} level={5}>
                {ReactHtmlParser(gameDetails.description)}
                </Typography.Title>
            </Col>
        </Row>
        <Divider />
        <Typography.Title level={2} style={{color:"white"}}>Reactions</Typography.Title>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='bar' style={{backgroundColor:"grey",padding:'20px', borderRadius:"10px", display: 'flex', justifyContent:' center', width:"60%"}}>
        <BarChart
            xAxis={[{ scaleType: 'band', data: gameDetails.ratings.map(rating => rating.title) }]}
            series={[{ data: gameDetails.ratings.map(rating => (rating.count)) }]}
            width={500}
            height={400}
        />
        </div>
        </div>
        {/* {gameDetails.ratings.map((rating) => (
            <Typography.Title level={5}>{rating.title} = {rating.percent}</Typography.Title>
        ))} */}
        <Divider />
        <Typography.Title level={2} style={{color: "white"}}>Available on</Typography.Title>
        <Row gutter={[32, 32]} style={{display:"flex",padding:"15px", justifyContent:"center"}}>
            {gameDetails.parent_platforms.map(platform => (
        <Col span={6}>
            <Card
            hoverable>
                 <p key={platform.platform.id}>{platform.platform.name}</p>
                 </Card>
        </Col>
            ))}
        </Row>

    </div>
  )
}

export default GameDetails