
<div id="readme-top" align="center">
  <a href="https://github.com/itsmrval/2bgp-ctf">
    <img src="https://github.com/itsmrval/2bgp-ctf/blob/main/frontend/assets/logo/b2gp.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">2bgp-ctf</h3>

  <p align="center">
    A school project Capture The Flag (CTF) platform for learning and practicing cybersecurity skills.
    <br />
    <br />
    <a href="https://github.com/itsmrval/2bgp-ctf/issues">Report Bug</a>
    ·
    <a href="https://github.com/itsmrval/2bgp-ctf/pulls">Pull request</a>
  </p>
</div>

<details>
  <summary>Table of contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

## About the Project

2bgp-ctf is a Capture The Flag (CTF) platform designed to help users learn and practice cybersecurity skills through a series of challenges. The platform is can be self-hosted and can be customized to fit your needs.
This project was carried out for educational purposes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

Follow these instructions to set up the 2bgp-ctf platform on your local machine or server.

### Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose
- Curl
- Git

### Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/itsmrval/2bgp-ctf
   cd 2bgp-ctf
   ```

2. **Build the Docker Images**
   Run the build script to create the necessary Docker images for the levels and frontend/backend:
   ```sh
   bash build.sh
   ```

3. **Verify Docker Images**
   Check that all required images are built successfully:
   ```sh
   docker images
   ```
   You should see a list of images similar to:
   ```
   2bgp-ctf_level10    latest       97c23908ce72   2 seconds ago    586MB
   2bgp-ctf_level4     latest       11d730a5631c   10 seconds ago   526MB
   2bgp-ctf_level8     latest       cd097699aa08   10 seconds ago   517MB
   2bgp-ctf_level6     latest       203b7a2e68d7   10 seconds ago   538MB
   2bgp-ctf_level7     latest       ee21fa815f5d   10 seconds ago   517MB
   2bgp-ctf_level5     latest       fbd92b290638   10 seconds ago   513MB
   2bgp-ctf_level9     latest       01540d18db8a   10 seconds ago   516MB
   2bgp-ctf_level3     latest       34a45762f452   11 seconds ago   513MB
   2bgp-ctf_level2     latest       77878bb6128d   12 seconds ago   519MB
   2bgp-ctf_level1     latest       8278a9cf3f5e   12 seconds ago   513MB
   2bgp-ctf_backend    latest       9241d8460298   18 seconds ago   1.16GB
   2bgp-ctf_frontend   latest       f0e0a7d519ab   21 seconds ago   67.3MB
   ```

4. **Modify Configuration**
   - Navigate to the `dist` directory:
     ```sh
     cd dist
     ```
   - Edit the `ADMIN_SYSTEM_TOKEN` in `config/backend.env`.
   - Optionally, modify MongoDB credentials in `config/backend.env` and `config/mongodb.env`.

5. **Modify Hosts File**
   - Add `2bgp-ctf.vpws.eu` to `127.0.0.1` in your `/etc/hosts` file.
   - For Windows, edit `C:\Windows\System32\drivers\etc\hosts`.

6. **Start Docker Containers**
   ```sh
   docker compose up -d
   ```

7. **Access the Platform**
   - Once all containers are running and the backend is healthy, access the platform at [https://2bgp-ctf.vpws.eu](https://2bgp-ctf.vpws.eu).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

