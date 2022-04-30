import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Navigator } from "../components/Navigator";
import { loadUser } from "../util";
import { setUsers } from "../util/usersSlice";

export const UsersSearch = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [query, setQuery] = useState(params.get('q') || '');
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!query) return;

        axios.get(`https://api.github.com/search/users?q=${query}`).then(res => {
            dispatch(setUsers(res.data.items));
        });
    }, [query]);

    return <>
        <Navigator onSearch={setQuery}></Navigator>
        <Container>
            {users.length == 0 && <div style={{ textAlign: 'center', paddingTop: 15 }}>
                No results
            </div>}
            <Table>
                <tbody>
                    {users.map(user => <tr key={user.id}>
                        <td>
                            {user.login}
                        </td>
                        <td>
                            <img src={user.avatar_url} />
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </Container>
    </>;
};
