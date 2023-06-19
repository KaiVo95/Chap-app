import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { auth, provider } from '../../firebase/config';
import { signInWithPopup } from 'firebase/auth';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;
export default function Login() {
    const handleFbLogin = async () => {
        // Đăng nhập bằng facebook
        const { _tokenResponse, user } = await signInWithPopup(auth, provider);
        if (_tokenResponse?.isNewUser) {
            // Insert to firestore
            addDocument('users', {
                displayName: user.displayName,
                email: user?.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: _tokenResponse.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };
    return (
        <div>
            <Row justify='center' style={{ height: 800 }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Fun Chat
                    </Title>
                    <Button style={{ width: '100%', marginBottom: 5 }}>Đăng nhập bằng Google</Button>
                    <Button style={{ width: '100%' }} onClick={handleFbLogin}>Đăng nhập bằng FaceBook</Button>
                </Col>
            </Row>
        </div >
    );
}

