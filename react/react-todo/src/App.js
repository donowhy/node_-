import React, {Suspense, lazy} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/section/Main';
const TodoList  = lazy(() => import ("./pages/TodoList"));
const MyPage  = lazy(() => import ("./pages/MyPage"));
const Member  = lazy(() => import ("./pages/Member"));
const Post  = lazy(() => import ("./pages/Post"));

const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Not = lazy(() => import('./pages/Not'));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Main />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/post' element={<Post />} />
                    <Route path='/to-do' element={<TodoList/>} />
                    <Route path='/search/:searchId' element={<Search />} />
                    <Route path="*" element={<Not />} />
                    <Route path="/member/my-page" element={<MyPage />} />
                    <Route path="/member" element={<Member />} />
                </Routes>
            </Suspense>
        </BrowserRouter>

        
    );
}

export default App;