# Orbital

### Running frontend app

1. Install dependencies for the project by entering this command:
```bash
cd Frontend
```
```bash
npm install
```
```bash
yarn add expo
```


2. Run the app in development mode by entering this command:

```bash
npx expo start
```

### Running backend app

1. Start virtual environment
```bash
cd Backend
```
```bash
rm .venv
```
```bash
python3 -m venv .venv
```
```bash
source .venv/bin/activate
```

2. Install dependencies for the project by entering this command:
```bash
pip install Django Djongo pymongo==3.12.3 pytz djangorestframework djangorestframework_simplejwt django_cors_headers
```

3. Run the app in development mode by entering this command:
```bash
cd OrbitalBackend
```
```bash
python manage.py runserver
```
