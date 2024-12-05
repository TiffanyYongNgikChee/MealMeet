import { useEffect } from "react";
import Card from 'react-bootstrap/Card';

const UserList = (props)=> {
  useEffect(() => {
    console.log("User List:", props.myuser);
  }, [props.myuser]); // Only run this effect when the mymovie prop changes

  return (
    <div>
      
    </div>
  );
}

export default UserList;