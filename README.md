# Orbital

### Running frontend app

1. Install dependencies for the project by entering this command:

```bash
cd Frontend
```

```bash
npm install
```

2. Run the app in development mode by entering this command:

```bash
npx expo start
```

### Running backend app

1. Start virtual environment:

```bash
cd Backend/OrbitalBackend
```

```bash
python3 -m venv .venv
```

```bash
source .venv/bin/activate
```

2. Install dependencies for the project:

```bash
python3 -m pip install -r requirements.txt
```

3. Set environment variables for connection to database:

```bash
export USERNAME='[USERNAME]'
```

```bash
export PASSWORD='[PASSWORD]'
```

4. Run the app in development mode by entering this command:

```bash
python3 manage.py runserver
```

