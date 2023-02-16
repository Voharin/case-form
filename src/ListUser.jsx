import React, {useState, useEffect} from 'react'
import instance from './AxiosInstance'

const ListUser = () => {

    const [registeredUsers, setRegisteredUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await instance.get("/query.php");
          console.log("response", response.data);
          setRegisteredUsers(response.data);
        }
        fetchData();
      }, []);

  return (
<div className="registered-users">

<h1>Registered Users</h1>
{registeredUsers.map((user) => (
  <div className="user">
    <p>First Name: {user.first_name}</p>
    <p>Last Name: {user.last_name}</p>
    <p>Email: {user.email}</p>
    <p>Phone: {user.phone}</p>
    <p>Address: {user.address}</p>
    <hr />
    </div>
))}
</div>

  )
}

export default ListUser