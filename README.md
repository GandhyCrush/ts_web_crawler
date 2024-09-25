# Web Crawler Exercise

This is a code exercise made by Gandhy García for Stack Builders.

This code is structured as a mini app with a frontend and backend components.

This app crawls the "https://news.ycombinator.com/" website and shows the relevant information of a certain number of entries. It also allows the user to filter the results.

## Built With

### Frontend
- React
- Typescript
- Vite

### Backend
- FastAPI
- Python
- Selenium

### 📋 Requirements
-   Node.js
-   Python 3.11

## 🔧 Prepare and launch the environment

- **Clone the repo**
    ```
      git clone https://github.com/GandhyCrush/ts_web_crawler.git
    ```

### Backend
1. **Create and activate virtual environment**

   ```
   cd backend

   python -m venv .venv

   source .venv/Scripts/activate
   ```

2. **Install the dependencies**

   ```
   pip install -r requirements.txt
   ```

3. **Run the server (with fastapi)**

   ```
   fastapi dev main.py
   ```

### Frontend

1. **Install the dependencies**

   ```
   cd frontend
   npm install
   ```

2. **Run the server (with vite)**

   ```
   npm run dev
   ```

## Author
- Gandhy García