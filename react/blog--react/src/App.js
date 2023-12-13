/* eslint-disable */

import "./App.css";
import { useState } from "react";

function Header() {
    return (
        <div className="black-nav">
            <h4 style={{ color: "white", fontSize: "20px" }}>React Blog</h4>
        </div>
    );
}

// 메인페이지
function App() {
    let post = "강남 우동 맛집";

    // a가 "남자 코트 추천", b는 state 변경을 도와주는 함수
    // let [c, d] = [1, 2];  c-> 1, d-> 2
    // 즉, ["남자 코트 추천", 함수]; 이렇게 남는다.
    // 왜 쓰냐? -> 변수로 할당된 post는 변경 됐을 때 자동으로 html에 적용이 안됨.
    // state를 쓰면 html은 자동 재렌더링이 됨.
    let [top] = useState(["남자", "코트", "추천"]);
    let [likes, changeLikes] = useState(0);
    // document.querySelector("h4").innerHTML = post;

    return (
        <div className="App">
            <Header></Header>
            <div className="list">
                <h4>
                    {top[0]}{" "}
                    <span
                        onClick={() => {
                            changeLikes(likes + 1);
                        }}
                    >
                        👍
                    </span>{" "}
                    {likes}
                </h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{top[1]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className="list">
                <h4>{top[2]}</h4>
                <p>2월 17일 발행</p>
            </div>
        </div>
    );
}

export default App;
