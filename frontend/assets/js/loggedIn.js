import { getUserTeam, addUserToTeam, getTeams, createTeam, getLevels, getScoreboard, getLevel } from './api.js'; 

//
// LOGIN LOGIC
//


// Logout function
async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('expiration');
    localStorage.removeItem('id');

    window.location.href = '/login';
    console.log('Logout successful');
}

// Check if user is logged in
async function isLoggedIn() {
    try {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');

        if (!token || !expiration) {
            console.log('Token or expiration date not found');
            return false;
        }
        const expirationDate = new Date(Number(expiration));
        console.log('Expiration date:', expirationDate);
        if (isNaN(expirationDate.getTime())) {
            console.log('Invalid expiration date');
            return false;
        }

        if (Date.now() > expirationDate.getTime()) {
            console.log('Token expired');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking login status:', error);
        return false;
    }
}

// Check if user is member of a team
async function isMemberOfTeam() {
    try {
        const id = localStorage.getItem('id');
        const data = await getUserTeam(id);
        return data && data.members.length > 0;
    } catch (error) {
        console.error('Error checking team membership:', error);
        return false;
    }
}

//
// TEAM SELECTION
//

async function selectTeam(team) {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('team-container').style.display = 'block';
    document.getElementById('team-title').innerText = `Selected Team : ${team}`;
    localStorage.setItem('createTeamType', team);
    await displayTeamChoice(team);
  }

async function displayTeamChoice(selectedTeam) {
    try {
        const teams = await getTeams();
        const teamList = document.getElementById('team-list');
        teamList.innerHTML = '';

        teams.forEach(team => {
            if (selectedTeam && selectedTeam !== team.type) {
                return;
            }
            const li = document.createElement('li');
            console.log(team);
            
            // Team name
            const nameSpan = document.createElement('span');
            nameSpan.textContent = team.name;
            li.appendChild(nameSpan);
            
            // Members count
            const membersSpan = document.createElement('span');
            membersSpan.className = 'members';
            membersSpan.textContent = `${team.members.length}/${team.maxMembers || 4}`; // Assuming max 4 members
            li.appendChild(membersSpan);
            
            // Join button
            const joinButton = document.createElement('button');
            joinButton.className = 'btn';
            
            // Check if team is full
            const isFull = team.currentMembers >= (team.maxMembers || 4);
            if (isFull) {
                joinButton.textContent = 'Full';
                joinButton.disabled = true;
            } else {
                joinButton.textContent = 'Join';
                joinButton.addEventListener('click', async () => {
                    try {
                        await addUserToTeam(localStorage.getItem('id'), team._id);
                        window.location.href = '/';
                    } catch (error) {
                        console.error('Error joining team:', error);
                    }
                });
            }
            li.appendChild(joinButton);
            
            teamList.appendChild(li);
        });

        // Setup search functionality
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const listItems = teamList.getElementsByTagName('li');
            
            Array.from(listItems).forEach(item => {
                const teamName = item.firstElementChild.textContent.toLowerCase();
                item.style.display = teamName.includes(searchTerm) ? '' : 'none';
            });
        });

    } catch (error) {
        console.error('Error fetching teams:', error);
    }
}

// 
// HOMEPAGE
//

function displayPlanets(levels, planetPositions) {
    const planetsContainer = document.querySelector('.planets-container');
    
    // Clear existing planets
    planetsContainer.innerHTML = '';
    
    // Create and append planets
    levels.forEach((level, index) => {
        // Create planet div
        const planetDiv = document.createElement('div');
        planetDiv.className = `planet`;
        
        // Apply position from our positions array
        const position = planetPositions[index];
        planetDiv.style.top = position.top;
        planetDiv.style.left = position.left;
        
        // Add click handler
        planetDiv.onclick = () => goToPlanet(level._id);
        
        // Create planet image
        const img = document.createElement('img');
        img.src = `../assets/logo/levels/${level.hid}.png`;
        img.alt = level.name;
        
        // Create planet name div
        const nameDiv = document.createElement('div');
        nameDiv.className = 'planet-name';
        nameDiv.textContent = level.name;
        
        // Append elements
        planetDiv.appendChild(img);
        planetDiv.appendChild(nameDiv);
        planetsContainer.appendChild(planetDiv);
    });
}

async function goToPlanet(id) {
    localStorage.setItem('levelId', id);
    window.location.href = '/level';
}

//
// SCOREBOARD
//

// Function to update the scoreboard with new data
async function updateScoreboard() {
    try {
        const teams = await getScoreboard();
        const tbody = document.querySelector('.scoreboard tbody');
        tbody.innerHTML = '';

        // Loop through each team
        for (const team of teams) {
            // Add team header row
            const headerRow = document.createElement('tr');
            headerRow.className = 'team-header';
            headerRow.innerHTML = `
                <td colspan="6" class="team-name">${team.name} #${team.rank}</td>
            `;
            tbody.appendChild(headerRow);

            // Loop through each member asynchronously
            for (const member of team.members) {
                const memberRow = document.createElement('tr');
                const completionPercentage = await calculateCompletionPercentage(member.points);

                memberRow.innerHTML = `
                    <td>${member.username}</td>
                    <td class="rank">${getRankIcon(team.rank)}</td>
                    <td>${team.name}</td>
                    <td></td>
                    <td>
                      
                    </td>
                    <td>${member.points}</td>
                `;
                tbody.appendChild(memberRow);
            }

            // Add team total row
            const totalRow = document.createElement('tr');
            totalRow.className = 'team-total';
            const teamCompletionPercentage = await calculateCompletionPercentage(team.total_points);

            totalRow.innerHTML = `
                <td>Team Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <div class="completion">
                        <div class="completion-bar" style="width: ${teamCompletionPercentage}%"></div>
                        <div class="completion-text">${teamCompletionPercentage}%</div>
                    </div>
                </td>
                <td>${team.total_points}</td>
            `;
            tbody.appendChild(totalRow);
        }
    } catch (error) {
        console.error('Error updating scoreboard:', error);
    }
}


// Helper function to get rank icon
function getRankIcon(rank) {
    switch (rank) {
        case 1:
            return '<i class="fas fa-crown"></i>';
        case 2:
            return '<i class="fas fa-medal"></i>2';
        case 3:
            return '<i class="fas fa-award"></i>3';
        default:
            return 'N/A';
    }
}

// Helper function to calculate completion percentage
async function calculateCompletionPercentage(points) {
    const levels = await getLevels();
    let maxPoints = 0; 

    for (const level of levels) {
        maxPoints += level.points;
    }

    return Math.round((points / maxPoints) * 100);
}
// 
// MAIN
//

async function main() {

    // Check if user is logged in
    if (!await isLoggedIn()) {
        logout();
    }
    // Handle logout button
    $('#logout').click(async function () {
        await logout();
    });

    const isUserMemberOfTeam = await isMemberOfTeam();

    // Display username
    $('#profileUsername').text(localStorage.getItem('username'));

    // Check if user is member of a team
    if (!isUserMemberOfTeam && (window.location.pathname !== '/teamSelection' && window.location.pathname !== '/teamCreation' && window.location.pathname !== '/intro')) {
        window.location.href = '/intro';
    }

    // Team selection page
    if (window.location.pathname === '/teamSelection') {
        if (isUserMemberOfTeam) {
            window.location.href = '/';
        }

        $('#jediSelector').click(async function () {
            await selectTeam('jedi');
        });
    
        $('#sithSelector').click(async function () {
            await selectTeam('sith');
        });
        $('#createTeamButton').click(async function () {
            if (localStorage.getItem('createTeamType')) {
                window.location.href = '/teamCreation';
            } else {
                alert('Please select a team first');
            }
        });

        await displayTeamChoice();
    }

    // Team creation page
    if (window.location.pathname === '/teamCreation') {

        if (isUserMemberOfTeam) {
            window.location.href = '/';
        }
        if (!localStorage.getItem('createTeamType')) {
            window.location.href = '/teamSelection';
        }

        $('#backToTeamList').click(async function () {
            window.location.href = '/teamSelection';
        });

        $('#teamForm').submit(async function (event) {
            event.preventDefault();
            const name = $('#teamName').val();
            const type = localStorage.getItem('createTeamType');
            if (type !== 'jedi' && type !== 'sith') {
                console.error('Invalid team type:', type);
                return;
            }
            
            try {
                const team = await createTeam(name, type);
                await addUserToTeam(localStorage.getItem('id'), team._id);
                window.location.href = '/';
            } catch (error) {
                console.error('Error creating team:', error);
            }
        });
        
    }
    // Home page
    if (window.location.pathname === '/') {
        
        const planetPositions = [
            { top: '30%', left: '-70%' },
            { top: '80%', left: '-80%' },
            { top: '50%', left: '-10%' },
            { top: '70%', left: '15%' },
            { top: '20%', left: '-30%' },
            { top: '60%', left: '-40%' },
            { top: '35%', left: '45%' },
            { top: '78%', left: '75%' },
            { top: '50%', left: '85%' },
            { top: '90%', left: '95%' }
        ];

        let levels = await getLevels();
        displayPlanets(levels, planetPositions);
    }

    // Intro page
    if (window.location.pathname === '/intro') {
        if (isUserMemberOfTeam) {
            window.location.href = '/';
        }

        const titleContent = document.querySelector('.star-wars-intro .title-content');
        const startButton = document.querySelector('.star-wars-intro .space-button');
        let pauseTimeout;
    
        new IntersectionObserver(([entry]) => {
          clearTimeout(pauseTimeout);
          if (entry.isIntersecting) {
            pauseTimeout = setTimeout(() => titleContent.style.animationPlayState = 'paused', 2000);
          } else {
            titleContent.style.animationPlayState = 'running';
          }
        }, { threshold: 0.5 }).observe(startButton);
    }

    // Scoreboard page
    if (window.location.pathname === '/scoreboard') {
        await updateScoreboard();
    }

    // Level page
    if (window.location.pathname === '/level') {
        const level = await getLevel(localStorage.getItem('levelId'));
        if (!level || level.error) {
            console.error('Level not found:', levelId);
            window.location.href = '/';
        }

        $('#levelName').text(level.name);
        $('#levelDescription').text(level.description);
        $('#levelPoints').text(level.points);


        $('#startButton').click(() => {
            window.open(level.url, '_blank');
        });
        $('#backButton').click(() => {
            window.location.href = '/';
        });
    }
    
}

$(document).ready(function () {
    main();
})
