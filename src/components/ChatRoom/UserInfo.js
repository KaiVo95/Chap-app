import React from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

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
    // React.useEffect(() => {
    //     const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
    //         const data = snapshot.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         console.log({ data, snapshot, docs: snapshot.docs })
    //     });
    // }, [])
    const { user: {
        displayName,
        photoURL
    } } = React.useContext(AuthContext);
    return (
        <WeapperStyled>
            <div>
                {/* nếu không có photoURL thì lấy chữ cái VIẾT HOA-ĐẦU TIÊN trong displayName làm avatar  */}
                <Avatar src={photoURL}>{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}</Avatar> 
                <Typography.Text className='username'>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng Xuất</Button>
        </WeapperStyled>
    );
}
