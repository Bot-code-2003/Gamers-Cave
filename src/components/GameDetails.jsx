import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {Row, Col, Typography, Card, Flex} from 'antd';
import axios from 'axios';
import {Divider} from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { BarChart } from '@mui/x-charts/BarChart';
import { FaComputer } from "react-icons/fa6";
import { FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation } from "react-icons/fa";
import { FaAndroid } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import Footer from './Footer';

const GameDetails = () => {
    const {gameId} = useParams();
    const [gameDetails, setGameDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const apiKey = process.env.REACT_APP_RAWG_API_KEY;
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
    if (isLoading) return(<div><h1 style={{color:'white'}}>Loading Data</h1></div>);
    if (error) return (<div><h1 style={{color:'white'}}>Error fetching data {error.message}</h1></div>);
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
                Play time: <span style={{color:"gold"}}>{gameDetails.playtime}</span> hours.
                </Typography.Title>
            </Col>
            <Col span={14} style={{padding: "10px 45px 10px 10px",display:"flex", flexDirection:'column', justifyContent:"center", alignItems:'flex-start'}}>
                <Typography.Title style={{color:"white", textAlign:"left", marginTop:'0px'}} level={4}>
                {ReactHtmlParser(gameDetails.description)}
                </Typography.Title>
                    <p style={{color:'white'}}>Publishers</p>
                <div style={{display:'flex', gap:'20px'}}>
                {gameDetails.publishers.map((publisher)=>(
                <div style={{display:'flex', gap:'10px'}}>
            <img src={publisher.image_background} height='40px' width='40px' style={{borderRadius:'10px'}} />
            <p style={{color:'white'}}>{publisher.name}</p>
        </div>
                ))}
                </div>
            </Col>
        </Row>
        <Divider />
        <Typography.Title level={2} style={{color:"white"}}>Reactions</Typography.Title>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='bar' style={{backgroundColor:"grey",padding:'20px', borderRadius:"10px", display: 'flex', justifyContent:' center', width:"60%"}}>
        <BarChart
            xAxis={[{ scaleType: 'band', data: gameDetails?.ratings.map(rating => rating.title) }]}
            series={[{ data: gameDetails?.ratings.map(rating => (rating.count)) }]}
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
            {gameDetails?.parent_platforms.map(platform => (
        <Col span={4}>
            <Card
            hoverable>
                <div>
                  {platform.platform.name.toLowerCase() === 'pc' && <FaComputer style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'playstation' && <FaPlaystation style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'nintendo' && <BsNintendoSwitch style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'xbox' && <FaXbox style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'android' && <FaAndroid style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'apple macintosh' && <FaApple style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'linux' && <FaLinux style={{fontSize:'2rem'}} />}
                  {platform.platform.name.toLowerCase() === 'ios' && <FaApple style={{fontSize:'2rem'}} />}
                </div>
                 <p key={platform.platform.id}>{platform.platform.name}</p>
                 </Card>
        </Col>
            ))}
        </Row>
        <Divider />
        <Footer />
    </div>
  )
}

export default GameDetails