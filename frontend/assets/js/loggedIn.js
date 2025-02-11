import { getUserTeam, addUserToTeam, getTeams, createTeam, getLevels } from './api.js'; 

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
        planetDiv.onclick = () => goToPlanet(level.hid);
        
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

function startHyperspace(duration = 3000, url) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Setup canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const stars = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add more stars per frame
      for(let i = 0; i < 3; i++) { 
        if (stars.length < 300) {
          const angle = Math.random() * Math.PI * 2;
          stars.push({
            x: centerX,
            y: centerY,
            speed: 3 + Math.random() * 1,
            angle: angle,
            size: 1 + Math.random() * 2,
            alpha: Math.random()
          });
        }
      }
      
      // Update and draw stars
      stars.forEach((star, index) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.speed *= 1.03; 
        star.size *= 1.02;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.lineWidth = star.size;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.speed,
          star.y - Math.sin(star.angle) * star.speed
        );
        ctx.stroke();
        
        // Remove stars that are off screen
        if (star.x < 0 || star.x > canvas.width || 
            star.y < 0 || star.y > canvas.height) {
          stars.splice(index, 1);
        }
      });
    }
    
    const animation = setInterval(animate, 1000 / 60);
    
    // Clean up after duration
    setTimeout(() => {
        window.location.href = url;
    }, duration);
  }

async function goToPlanet(id) {
    startHyperspace(1000, `/admin`);
    console.log('Going to planet:', id);
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
    if (!isUserMemberOfTeam && (window.location.pathname !== '/teamSelection' && window.location.pathname !== '/teamCreation')) {
        window.location.href = '/teamSelection';
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
    
}

$(document).ready(function () {
    main();
})
