Install dependencies: npm install
Build for production: npm run build
Run (development): npm run start


# DOCKER

**Replace *cm-client* tag to your needs. Each project is under a tag**
**On DockerHub only 1 repository can be private with free plan so we use tags as a repository**
Login: `docker login` Username: `ipar4` PSW: `Kiskacsa123`

Build image: `sudo docker build -t cm-client .` On mac: `sudo docker buildx build --platform linux/amd64 -t cm-client .`
**Make sure you include the models and .env file!**

Run image (to test it): `sudo docker run -p 3215:3215 cm-client`

Create tag: `sudo docker tag cm-client ipar4/ipar4-tk:cm-client`
Push to hub: `sudo docker push ipar4/ipar4-tk:cm-client` (Server will pull from there)
Recreate container on portainer (Pull latest image = True)

Notes: .env REACT_APP_BACKEND variable must be the public IP/Domain

