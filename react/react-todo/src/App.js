import React, {Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';
import Signup from "./pages/sign/Signup";
import Login from "./pages/sign/Login";
import TodayTodoList from "./pages/TodayTodoList";
import TodoRegister from "./pages/TodoRegister";
import PostRegister from "./pages/posts/PostRegister";
import PostDetail from "./pages/posts/PostDetail";
import Chatapi from "./components/chat/Chatapi";
const TodoList  = lazy(() => import ("./pages/TodoList"));
const MyPage  = lazy(() => import ("./pages/MyPage"));
const Member  = lazy(() => import ("./pages/Member"));
const Post  = lazy(() => import ("./pages/posts/Post"));

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Not = lazy(() => import('./pages/Not'));

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
                    <Route path="/member" element={<Member />} />
                    <Route path="/to-do/today" element={<TodayTodoList />} />
                    <Route path="/create-todo" element={<TodoRegister />} />
                    <Route path="/kafka" element={<Chatapi />} />
                </Routes>
            </Suspense>
        </BrowserRouter>

        
    );
}

export default App;