import React from 'react';
import { Button, Avatar, Typography, Tooltip } from 'antd';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
// import { AuthContext } from '../../Context/AuthProvider';
import { AppContext } from '../../Context/AppProvider';

const WeapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: white;
        margin-left: 5
    }
  `;
export default function UserInfo() {
    const { setIsEditProfileVisible, currentUser } = React.useContext(AppContext);

    // Get currentUser thây vì user để snapshop user
    // const { user: {
    //     displayName,
    //     photoURL
    // } } = React.useContext(AuthContext);

    const handleEditProfile = () => {
        setIsEditProfileVisible(true);
    }
    return (
        <WeapperStyled>
            <div>
                {/* nếu không có photoURL thì lấy chữ cái VIẾT HOA-ĐẦU TIÊN trong displayName làm avatar  */}
                <Tooltip title='Chỉnh sửa hồ sơ' onClick={handleEditProfile}>
                    <Avatar src={currentUser[0]?.photoURL}>{currentUser[0]?.photoURL ? '' : currentUser[0]?.displayName?.charAt(0)?.toUpperCase()}</Avatar>
                    <Typography.Text className='username'> {currentUser[0]?.displayName} </Typography.Text>
                </Tooltip>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng Xuất</Button>
        </WeapperStyled>
    );
}
