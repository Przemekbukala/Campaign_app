Check out the deployed application:

- **Frontend:** https://campaign-app-dlry.onrender.com/
- **Backend:** https://campaign-app-1.onrender.com/api/campaigns

*( The backend is hosted on a free Render instance. It may take about 30-60 seconds to wake up upon the first request.)*


## Tech Stack

### Backend
- **Java 21** 
- **Spring Boot 3.4.0** 
- **H2 Database**
- **JPA**
- **Docker** 

### Frontend
- **React**
- **TypeScript** 
- **Material UI** 
- **Axios**


##  How to Run Locally

### 1. Backend and Frontend Setup

### Clone the repository
```bash
git clone https://github.com/Przemekbukala/Campaign_app.git
```
### Go to the project root
```bash
cd Campaign_app
```
### Run the Spring Boot application
```bash
./mvnw spring-boot:run
```
### Go to the frontend directory
```bash
cd frontend
```
### Install dependencies
```bash
npm install
```
### Important Configuration:

Before starting the frontend locally, you need to point it to your local backend instead of the production one.

Open frontend/src/App.tsx and frontend/src/components/CampaignForm.tsx.

Change the API_URL variable:
```bash
// To this:
const API_URL = "http://localhost:8080";
```

### Start the React app
```bash
npm start
```
