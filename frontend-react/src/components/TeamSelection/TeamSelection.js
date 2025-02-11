import React, { useEffect, useState } from "react";
import ApiController from '../../controllers/apiController';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("Loading");
  const [isTeamView, setIsTeamView] = useState(false);

  // Fetch teams from API
  useEffect(() => {
    ApiController.getTeams().then((data) => {
      setTeams(data || []);
    });

    setUsername(localStorage.getItem('username'));

  }, []);
  const handleJoinTeam = function (teamId) {
    console.log("Joining team with id: " + teamId);
    console.log("User id: " + localStorage.getItem("id"));
        ApiController.addUserToTeam(localStorage.getItem("id"), teamId).then(() => {
            window.location.href = '/';
        });
    }

  // Filtered teams based on search input
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle team selection
  const selectTeam = (team) => {
    setSelectedTeam(team);
    setIsTeamView(true);
  };

  return (
    <div className="team-selection-body">
      <nav className="navbar">
        <div className="logo">
          <a href="#">
            <img src="logo/starwars.png" alt="Star Wars Logo" />
          </a>
        </div>
        <div className="profile">
          <FontAwesomeIcon icon={faUser} />
          <span id="profileUsername" className="user-name">{username}</span>
          <button className="disconnect-btn" id="logout">
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="space-background">
        {!isTeamView ? (
          <div className="container-selected">
            <h1 className="titlebox">Select your team</h1>
            <div className="choices">
              <div className="choice" onClick={() => selectTeam("Sith")}>
                <img src="logo/sith.png" alt="Sith Logo" />
                <p>Sith</p>
              </div>
              <div className="choice" onClick={() => selectTeam("Jedi")}>
                <img src="logo/jedi.png" alt="Jedi Logo" />
                <p>Jedi</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="container-for-list" style={{ width: 800, height: 600, marginTop: 90 }}>
            <h1>{selectedTeam} Team</h1>

            <div className="inputboxSelect">
              <input
                type="search"
                placeholder="Search for a team"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="team-header">
              <span className="team-name-header">Name</span>
              <span className="team-members-header">Members</span>
              <span className="team-actions-header">Actions</span>
            </div>

            <div className="team-list-container">
              <ul className="team-list">
                {filteredTeams.map((team) => (
                  <li key={team._id} className="team-item">
                    <span>{team.name}</span>
                    <span>{team.members.length} Members</span>
                    <button className="btn" onClick={() => handleJoinTeam(team._id)}>
                      Join
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="team-buttons">
              <button className="btn" onClick={() => setIsTeamView(false)}>
                Retour
              </button>
              <button id="createTeamButton" className="btn" style={{ marginLeft: "70%", width: 200 }}>
                Create Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSelection;
