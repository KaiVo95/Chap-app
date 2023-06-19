import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModel from './components/Modals/InviteMemberModel';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route Component={Login} path='/login' />
            <Route Component={ChatRoom} path='/' />
          </Routes>
          <AddRoomModal />
          <InviteMemberModel/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
