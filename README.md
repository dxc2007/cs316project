# Blueberry <cs316project>

Frontend:
cd frontend/
npm ci
npm start

Backend:
backend is live on http://67.159.88.90:8000/api/

Please ensure that you have the following software
Docker version 19.03.2
docker-compose version 1.24.1

sudo usermod -aG docker $USER
sudo chmod 755 -R .

docker build .
docker container ls -a
docker info

docker-compose run web python /cs316code/backend/manage.py migrate --noinput

docker-compose run web python /cs316code/backend/manage.py collectstatic

docker-compose run web python /cs316code/backend/manage.py createsuperuser

docker exec -i cs316project_db_1 psql -U postgres postgres < insert_entries.sql

to stop
docker-compose stop

to restart 
docker-compose up -d

list active containers
docker container ls

