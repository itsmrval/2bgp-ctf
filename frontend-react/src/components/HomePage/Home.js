import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiController from "../../controllers/apiController";

const Home = () => {
    const [levels, setLevels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLevels = async () => {
            const levelsData = await ApiController.getLevels();
            console.log(levelsData);
            setLevels(levelsData);
        };

        fetchLevels();
    }, []);

    const planetPositions = [
        { top: "30%", left: "-70%" },
        { top: "80%", left: "-80%" },
        { top: "50%", left: "-10%" },
        { top: "70%", left: "15%" },
        { top: "20%", left: "-30%" },
        { top: "60%", left: "-40%" },
        { top: "35%", left: "45%" },
        { top: "78%", left: "75%" },
        { top: "50%", left: "85%" },
        { top: "90%", left: "95%" }
    ];

    const startHyperspace = (duration = 3000, url) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.zIndex = "-1";
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const stars = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        function animate() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 3; i++) {
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

                if (
                    star.x < 0 ||
                    star.x > canvas.width ||
                    star.y < 0 ||
                    star.y > canvas.height
                ) {
                    stars.splice(index, 1);
                }
            });
        }

        const animation = setInterval(animate, 1000 / 60);

        setTimeout(() => {
            clearInterval(animation);
            document.body.removeChild(canvas);
            navigate(url);
        }, duration);
    };

    const goToPlanet = (id) => {
        startHyperspace(2000, `/admin`);
        console.log("Going to planet:", id);
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <a href="#">
                        <img src="logo/starwars.png" alt="Star Wars Logo" />
                    </a>
                </div>
                <div className="profile">
                    <i className="fa-solid fa-user"></i>
                    <span id="profileUsername" className="user-name">Loading</span>
                    <button className="disconnect-btn" id="logout">Déconnexion</button>
                </div>
            </nav>

            <div className="space-background"></div>
            <div className="planets-container">
                {levels.map((level, index) => (
                    console.log("position:",planetPositions[index]?.top),
                    <div
                        key={level.hid}
                        className="planet"
                        style={{
                            top: planetPositions[index]?.top || "50%",
                            left: planetPositions[index]?.left || "50%"
                        }}
                        onClick={() => goToPlanet(level.hid)}
                    >
                        <img src={`logo/levels/${level.hid}.png`} alt={level.name} />
                        <div className="planet-name">{level.name}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
