import { getUserTeam, addUserToTeam, getTeams, createTeam, getLevels, getScoreboard, getLevel, awardUserPoints } from './api.js'; 

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
    
    // S'assurer que le conteneur est en position relative
    planetsContainer.style.position = 'relative';
    
    // Vider le conteneur
    planetsContainer.innerHTML = '';
    
    // Récupérer les dimensions du conteneur
    const containerRect = planetsContainer.getBoundingClientRect();
    
    // Calculer les positions en pixels pour chaque planète
    const computedPositions = planetPositions.map(pos => ({
        x: parseFloat(pos.left) / 100 * containerRect.width,
        y: parseFloat(pos.top) / 100 * containerRect.height
    }));
    
    // Déterminer les coordonnées minimales et maximales
    const allX = computedPositions.map(p => p.x);
    const allY = computedPositions.map(p => p.y);
    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    
    // Calculer la largeur et la hauteur nécessaires pour le SVG
    const svgWidth = maxX - minX;
    const svgHeight = maxY - minY;
    
    // Créer l'élément SVG qui servira à tracer les lignes
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "planet-lines");
    svg.style.position = "absolute";
    // Positionner le SVG pour couvrir la zone englobante de toutes les planètes, même celles avec des positions négatives
    svg.style.left = `${minX}px`;
    svg.style.top = `${minY}px`;
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    svg.style.pointerEvents = "none"; // Pour ne pas interférer avec les clics sur les planètes
    
    // Ajouter le SVG en premier pour qu'il soit derrière les planètes
    planetsContainer.appendChild(svg);
    
    // Créer et ajouter les planètes, et tracer les lignes entre elles
    levels.forEach((level, index) => {
        // Créer la div pour la planète
        const planetDiv = document.createElement('div');
        planetDiv.className = 'planet';
        planetDiv.style.position = 'absolute';
        
        // Position d'après le tableau (en pourcentages)
        const pos = planetPositions[index];
        planetDiv.style.top = pos.top;
        planetDiv.style.left = pos.left;
        
        // Ajout du gestionnaire de clic
        planetDiv.onclick = () => goToPlanet(level._id);
        
        // Créer l'image de la planète
        const img = document.createElement('img');
        img.src = `../assets/logo/levels/${level.hid}.png`;
        img.alt = level.name;
        
        // Créer la div pour le nom de la planète
        const nameDiv = document.createElement('div');
        nameDiv.className = 'planet-name';
        nameDiv.textContent = level.name;
        
        // Assembler et ajouter la planète au conteneur
        planetDiv.appendChild(img);
        planetDiv.appendChild(nameDiv);
        planetsContainer.appendChild(planetDiv);
        
        // Tracer une ligne reliant la planète précédente (sauf pour la première)
        if (index > 0) {
            const prevPos = computedPositions[index - 1];
            const currPos = computedPositions[index];
            
            // Ajuster les coordonnées pour le SVG en soustrayant minX et minY
            const x1 = prevPos.x - minX;
            const y1 = prevPos.y - minY;
            const x2 = currPos.x - minX;
            const y2 = currPos.y - minY;
            
            // Créer l'élément ligne SVG
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("stroke", "#808080"); // Couleu grise
            line.setAttribute("stroke-width", "2");
            // Ajout d'un effet de pointillé
            line.setAttribute("stroke-dasharray", "5,5");
            
            svg.appendChild(line);
        }
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

// Function to load the navbar from a file
function loadNavbar() {
    fetch('/structure/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.querySelector('.navbar') || document.querySelector('.navbar-mission') || document.querySelector('.navbar-s');
            navbarContainer.innerHTML = data;

            document.getElementById('profileUsername').textContent = localStorage.getItem('username');
            document.getElementById('logout').addEventListener('click', logout);

        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

async function displayContent() {
    setTimeout(() => {
        const content = document.getElementById('loadingContainer');
        content.style.display = 'none';
    }, 1);
}


async function main() {

    // Check if user is logged in
    if (!await isLoggedIn()) {
        logout();
    }
    loadNavbar();
    const isUserMemberOfTeam = await isMemberOfTeam();

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
            { top: '30%', left: '-85%' },
            { top: '80%', left: '-70%' },
            { top: '50%', left: '-50%' },
            { top: '70%', left: '-15%' },
            { top: '20%', left: '0%' },
            { top: '60%', left: '35%' },
            { top: '30%', left: '55%' },
            { top: '78%', left: '65%' },
            { top: '50%', left: '85%' },
            { top: '90%', left: '95%' }
        ];
        

        let levels = await getLevels();
        await displayPlanets(levels, planetPositions);
        displayContent();

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

        document.getElementById('levelName').innerText = level.name;
        document.getElementById('levelDescription').innerText = level.description;
        document.getElementById('levelPoints').innerText = level.points;


        $('#startButton').click(() => {
            window.open(level.url, '_blank');
        });
        $('#backButton').click(() => {
            window.location.href = '/';
        });
        $('#flagForm').submit(async function (event) {
            event.preventDefault();
            const flag = $('#flagInput').val();
            if (!flag) {
                alert('Please enter a flag');
                return;
            }
            try {
                await awardUserPoints(localStorage.getItem('id'), level._id);
                alert('Flag submitted successfully');
                window.location.href = '/';
            } catch (error) {
                console.error('Error submitting flag:', error);
                alert('Error submitting flag');
            }
        });
            
    }
    
}

$(document).ready(function () {
    main();
})
