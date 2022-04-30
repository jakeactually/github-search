import { useCallback, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Navigate, useLocation, useParams } from "react-router";
import _ from 'lodash';

export const Navigator = ({ onSearch = () => {} }) => {
    const [toUsers, setToUsers] = useState();
    const [toRepos, setToRepos] = useState();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [query, setQuery] = useState(params.get('q') || '');
    const route = location.pathname.split('/').pop();    
    const search = useCallback(_.debounce(onSearch, 1000), []);

    if (toUsers) {
        return <Navigate to={`/users?q=${query}`}></Navigate>;
    }

    if (toRepos) {
        return <Navigate to={`/repositories?q=${query}`}></Navigate>;
    }

    const navigate = ev => {
        if (ev.target.value == 'users') {
            setToUsers(true);
        } else {
            setToRepos(true);
        }
    };

    return <Container className="navigator">
        <Form style={{ marginTop: 15 }}>
            <Form.Group controlId="formBasicEmail" style={{ marginBottom: 5 }}>
                <Form.Control
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={ev => setQuery(ev.target.value) || search(ev.target.value)} />
            </Form.Group>
            <div key={`inline-radio`} className="mb-3">
                <Form.Check
                    inline
                    label="users"
                    name="group1"
                    type="radio"
                    id={`inline-radio-1`}
                    value="users"
                    checked={route == "users"}
                    onChange={navigate}
                />
                <Form.Check
                    inline
                    label="repos"
                    name="group1"
                    type="radio"
                    id={`inline-radio-2`}
                    value="repositories"
                    checked={route == "repositories"}
                    onChange={navigate}
                />
            </div>
        </Form>
    </Container>;
};
