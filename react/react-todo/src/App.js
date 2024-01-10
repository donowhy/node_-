import React, {Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';
import Signup from "./pages/sign/Signup";
import Login from "./pages/sign/Login";
import TodayTodoList from "./pages/todo/TodayTodoList";
import TodoRegister from "./pages/todo/TodoRegister";
import PostRegister from "./pages/posts/PostRegister";
import PostDetail from "./pages/posts/PostDetail";
import LogOut from "./pages/sign/LogOut";
import MemberPage from "./pages/member/MemberPage";
import Chat_Node from "./components/chat/Chat_Node";
const TodoList  = lazy(() => import ("./pages/todo/TodoList"));
const MyPage  = lazy(() => import ("./pages/member/MyPage"));
const Member  = lazy(() => import ("./pages/member/Member"));
const Post  = lazy(() => import ("./pages/posts/Post"));

const Home = lazy(() => import('./pages/basic/Home'));
const Search = lazy(() => import('./pages/basic/Search'));
const Not = lazy(() => import('./pages/basic/Not'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Main />}>
                <Routes>
                    <Route path='/sign-up' element={<Signup/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/' element={<Home />} />
                    <Route path='/post' element={<Post />} />
                    <Route path='/post/register' element={<PostRegister />} />
                    <Route path='/post/:id' element={<PostDetail />} />
                    <Route path='/to-do' element={<TodoList/>} />
                    <Route path='/search/:searchId' element={<Search />} />
                    <Route path="*" element={<Not />} />
                    <Route path="/member/my-page" element={<MyPage />} />
                    <Route path="/members/detail/:id" element={<MemberPage/>}/>
                    <Route path="/member" element={<Member />} />
                    <Route path="/to-do/today" element={<TodayTodoList />} />
                    <Route path="/create-todo" element={<TodoRegister />} />
                    <Route path="/kafka/:roomId" element={<Chat_Node />} />
                    <Route path="/logout" element={<LogOut />} />
                </Routes>
            </Suspense>
        </BrowserRouter>

        
    );
}

export default App;