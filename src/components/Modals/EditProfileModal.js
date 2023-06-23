import React, { useContext } from 'react'
import { Form, Input, Modal } from 'antd'
import { AppContext } from '../../Context/AppProvider'
// import { AuthContext } from '../../Context/AuthProvider';
import { generateKeywords } from '../../firebase/services';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export default function EditProfileModal() {
    const { isEditProfileVisible, setIsEditProfileVisible, currentUser } = useContext(AppContext);
    // const { user: { email, displayName, photoURL }, } = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () => {

        // React: Update to firebase
        const userRef = doc(db, 'users', currentUser[0]?.id);
        updateDoc(userRef, {
            displayName: form.getFieldValue('displayName') ?? currentUser[0]?.displayName,
            email: form.getFieldValue('email') ?? currentUser[0]?.email,
            photoURL: form.getFieldValue('photoURL') ?? currentUser[0]?.photoURL,
            keywords: generateKeywords(form.getFieldValue('displayName') ?? currentUser[0]?.displayName)
        })

        // reset form value
        form.resetFields();

        setIsEditProfileVisible(false);
    }
    const handleCancel = () => {
        // reset form value
        form.resetFields();

        setIsEditProfileVisible(false);
    }
    return (
        <div>
            <Modal title='Chỉnh sửa hồ sơ' visible={isEditProfileVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Nhập email' defaultValue={currentUser[0]?.email} />
                    </Form.Item>
                    <Form.Item label='Display name' name='displayName'>
                        <Input placeholder='Nhập họ và tên' defaultValue={currentUser[0]?.displayName} />
                    </Form.Item>
                    <Form.Item label='Profile photo URL' name='photoURL'>
                        <Input placeholder='Nhập đường dẫn avatar' defaultValue={currentUser[0]?.photoURL} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
