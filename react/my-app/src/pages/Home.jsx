import React from 'react'
import Main from '../components/section/Main'
import Today from "../components/contents/Today";
import Developer from "../components/contents/Developer";
import Webd from "../components/contents/Webd";
import Website from "../components/contents/Website";
import Gsap from "../components/contents/Gsap";
import Youtube from "../components/contents/Youtube";
import Portfolio from "../components/contents/Portfolio";


const Home = () => {
    return (
        <Main title="유튜브 리액트 따라하기" description="유튜브 채널 페이지입니다.">
            <Today/>
            <Developer/>
            <Webd/>
            <Website/>
            <Gsap/>
            <Portfolio/>
            <Youtube/>
        </Main>
    )
}

export default Home