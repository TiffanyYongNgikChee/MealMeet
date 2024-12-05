import UserList from "./userList";

const User = (props)=>{
    return props.myUsers.map(
        (user)=>{
            return <UserList myuser={user} key={user.imdbID} />
        }
    );
}

export default User;