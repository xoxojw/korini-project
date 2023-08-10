import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import Studyboard from '../pages/Studyboard';
import Freeboard from '../pages/Freeboard';
import Write from '../pages/Write';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';

import { useAppDispatch, useAppSelector } from '../hooks';
import { RootState } from '../redux/config/configStore';
import { toggleChatBotState } from '../redux/module/chatBotUISlice';
import ChatBot from '../components/chatbot/ChatBot';
import ChatIcon from 'remixicon-react/QuestionAnswerFillIcon';

import { styled } from 'styled-components';

const Router = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const chatBotIsActive = useAppSelector((state: RootState) => state.chatBotUI.chatBotIsActive);
  const dispatch = useAppDispatch();
  const toggleChatBot = () => {
    dispatch(toggleChatBotState());
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          
          {/* PrivateRoute : 로그인 유저 없으면 main 페이지로 이동 */}
          <Route element={<PrivateRoute />}>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/study" element={<Studyboard />} />
            <Route path="/free" element={<Freeboard />} />
            <Route path="/write" element={<Write />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* user가 있을 때만 챗봇 버튼이 보이도록 */}
      {user && (
        <>
          <ChatBotButton onClick={toggleChatBot}>
            <ChatIcon color="#fff" size={20} />
          </ChatBotButton>
          {chatBotIsActive ? <ChatBot /> : null}
        </>
      )}
    </BrowserRouter>
  );
};
export default Router;

const ChatBotButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #1f3646;
  box-shadow: 5px 5px 13px rgba(154, 154, 154, 0.4);
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  z-index: 9999;
  right: 30px;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: #445e70;
  }
`;
