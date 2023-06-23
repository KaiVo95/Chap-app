import { Avatar, Form, Modal, Select, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { debounce } from 'lodash';
import { collection, limit, orderBy, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeOut = 300, curMembers, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, debounceTimeOut);
    }, [debounceTimeOut, fetchOptions, curMembers]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    )
}

async function fetchUserList(search, curMembers) {
    let collectionRef = query(collection(db, 'users'),
        where('keywords', 'array-contains', search?.toLowerCase()),
        orderBy('displayName'),
        limit(20)
    );

    const querySnapshot = await getDocs(collectionRef);
    const result = [];
    querySnapshot.forEach((doc) => {
        result.push({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL,
        });
    });
    return result.filter((opt) => !curMembers.includes(opt.value));
}

export default function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();
    const handleOk = () => {
        // reset form value
        form.resetFields();
        setIsInviteMemberVisible(false);

        // React: Update to firebase (update member in current room)
        const roomRef = doc(db, 'rooms', selectedRoomId);

        updateDoc(roomRef, {
            members: [...selectedRoom.members, ...value.map((val) => val.value)],
        })
    }
    const handleCancel = () => {
        // reset form value
        form.resetFields();
        setIsInviteMemberVisible(false);
    }
    return (
        <div>
            <Modal title='Mời thêm thành viên' visible={isInviteMemberVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <DebounceSelect
                        mode='multiple'
                        label='Tên các thành viên'
                        value={value}
                        placeholder='Nhập tên thành viên'
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}
