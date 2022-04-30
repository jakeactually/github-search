import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Navigator } from "../components/Navigator";
import { loadUser } from "../util";
import { setRepos } from "../util/reposSlice";
import { setUsers } from "../util/usersSlice";

export const ReposSearch = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [query, setQuery] = useState(params.get('q') || '');
    const repositories = useSelector(state => state.repos.repos);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!query) return;

        axios.get(`https://api.github.com/search/repositories?q=${query}`).then(res => {
            dispatch(setRepos(res.data.items));
        });
    }, [query]);

    return <>
        <Navigator onSearch={setQuery}></Navigator>
        <Container>
            {repositories.length == 0 && <div style={{ textAlign: 'center', paddingTop: 15 }}>
                No results
            </div>}
            {repositories.length > 0 && <Table className="repos">
                <thead>
                    <tr>
                        <th>
                            name
                        </th>
                        <th>
                            onwer
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {repositories.map(repo => <tr key={repo.id}>
                        <td>
                            {repo.name}
                        </td>
                        <td>
                            {repo.owner.login}
                        </td>
                    </tr>)}
                </tbody>
            </Table>}
        </Container>
    </>;
};
