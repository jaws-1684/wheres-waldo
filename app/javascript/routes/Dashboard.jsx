import React, { useState, useEffect } from "react";
import { useFetch } from "../components/App";
export default function Dashboard() {
    const [users, setUsers] = useState()
    useEffect(() => {
        let ignore = false;
        useFetch("/users").then((res) => {
            if (!ignore) {
                setUsers(res);
            }
        });
        
        return () => {
            ignore = true;
        }
    }, []);
    return <div className="leader-board">
         <h1>
            Leader Board
        </h1>
        <table>
        <thead>
            <tr>
            <th scope="col">Username</th>
            <th scope="col">Time</th>
            </tr>
        </thead>
        <tbody>
            {users && users.users.map((user) => <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.best_time.best_time}</td>
            </tr>)}
        </tbody>
        </table> 
    </div>
    
    
}