import { useEffect, useState } from "react";
import fetcher from "../helper/fetcher";


function Home2() {
  const [users, setUsers] = useState();

// console.log(users)

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await fetcher.get("account", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }      
    }
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user?.email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
      <br/>
    </article>
  );
}

export default Home2;
