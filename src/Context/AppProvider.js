import React, { useState } from 'react'
import { AuthContext } from './AuthProvider';
import useFirestore from '../hooks/useFirestore';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
    const { user: { uid }, } = React.useContext(AuthContext);

    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition);
    const selectedRoom = React.useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);
    const members = useFirestore('users', usersCondition);

    //
    const currentUserCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: '==',
            compareValue: uid,
        };

    }, [uid]);
    const currentUser = useFirestore('users', currentUserCondition);
    //
    return (
        <AppContext.Provider value={{
            rooms,
            members,
            isAddRoomVisible,
            setIsAddRoomVisible,
            selectedRoom,
            selectedRoomId,
            setSelectedRoomId,
            isInviteMemberVisible,
            setIsInviteMemberVisible,
            isEditProfileVisible,
            setIsEditProfileVisible,
            currentUser
        }}>
            {children}
        </AppContext.Provider>
    );
}
