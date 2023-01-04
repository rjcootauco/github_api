import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState();
  const [githubName, setName] = useState();
  const [repoData, setRepoData] = useState();

  async function repoDataURL() {
    //Get repo data about github user
    await fetch("https://api.github.com/users/rjcootauco/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(36, result);
          const list = result.map((item) => (
            <div className="text-center">
              <a target="_blank" href={item.svn_url}>
                {item.name}
              </a>
            </div>
          ));
          setRepoData(list);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    fetch("https://api.github.com/users/rjcootauco")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setAvatarURL(result.avatar_url);
          setGitHubUsername(result.login);
          setName(result.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    <div className="App w-100 min-vh-100 justify-content-center align-items-center d-flex flex-column">
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatarURL} />
      <Card.Body>
        <Card.Title>{githubUsername} ({githubName})</Card.Title>
        <Card.Text>
          IT Support Technician w/ in interest in Web Development 🤓
        </Card.Text>
        <DropdownButton id="dropdown-basic-button" title="My Public Repositories" onClick = {repoDataURL}>
      <Dropdown.Item href="#/action-1">{repoData}</Dropdown.Item>
    </DropdownButton>
      {/*<Button variant="primary" onClick = {repoDataURL}>GitHub Repositories</Button>   */} 
      </Card.Body>
    </Card>
    </div>
  );
}

export default App;
