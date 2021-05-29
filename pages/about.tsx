import {useEffect, useState} from 'react';

import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchData = async () => {
        await axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setError(false);
                setUsers(prevState => [...prevState, ...res.data]);
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    return (
        <section>
            <header>
                <h1>List of users</h1>
            </header>
            {!error && loading && <div>Loading data...</div>}
            {error && <div>There was an error.</div>}
            {!error && users && (
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default Users;
