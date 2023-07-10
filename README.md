<h1 align="center">
    <img src="./images/logo.png" alt="MediaMTX / rtsp-simple-server" width='75%'>
</h1>

# Introduction

The application *SweetCam* is a honeypot for IP camera. It can simulate a real IP camera vividly, including the interaction with user for rotating and zooming.

# Components

The SweetCam honeypot application is composed by four parts:

1. The MySQL service for data storage.
2. The RTSP service, this is used to provide the RTSP service for the attackers.
3. The Web service, this is used to provide the web service for the attackers, including viewing the camera page, logging etc.
4. The Cowrie service, this is used as the SSH honeypot for providing the SSH service for the attackers.



# How to run the application
To run launch the application, just enter the root directory of the application and launch the application with the following command (remember to add a .env file with required environment variables):

```shell
docker compose up -d
```

Thereafter, there should be four containers that are running as shown follows:

1. web_service
2. cowrie_service
3. rtsp_service
4. mysql_service

Once the four services are lunched, there are several configurations should be made within the rtsp_service:

1. Enter the rtsp_service container with the following command:

   ```
   docker exec -it rtsp_service /bin/sh
   ```

2. Revise the mediamtx.yml file to configure the logging function of the Mediamtx application.

3. Then use the FFmpeg tool to push the video to mediamtx server (RTSP server)

# Deploy on cloud
Take Azure Cloud as example.
## Configure SSH
First we need to change the used SSH port since the default one 22 should be used by Cowrie honeypot.
1. sudo vim /etc/ssh/sshd_config.
2. Change the port to another one, 2404 for example.
3. Restart ssh service: sudo service ssh restart
4. Reconnect with new port: ssh -i ./sweetcam_key.pem azureuser@20.197.231.249 -p 2404
5. Revise the virtual machine network policy to allow 2404 traffic.

## Install Docker tool chain
1. sudo apt-get -y update
2. sudo apt-get -y install ca-certificates curl gnupg
3. sudo install -m 0755 -d /etc/apt/keyrings 
4. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg 
5. sudo chmod a+r /etc/apt/keyrings/docker.gpg
6. echo \
   "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
7. sudo apt-get update
8. sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

Or to use the script `./install-docker.sh`, before using it change its permission with `sudo chmod 776 install-docker.sh`

## Deploy application
The procedures are as follows:
1. Revise the virtual machine network policy to allow 80, 554, 2404 (customized port for SSH), 22 traffic.
2. git clone https://github.com/Agachily/sweetcam.git
3. Create and populate the .env file 
4. Run the application in the background: `docker compose up -d` (stop with `docker compose down -v`)
5. Enter the container of rtsp service: docker exec -it rtsp_service /bin/sh and configure the logging function
6. Use FFmpeg to push to video to RTSP server. ffmpeg -nostdin -re -stream_loop -1 -i ./videos/fake-video.mp4 -c copy -f rtsp rtsp://localhost:8554/mystream
7. View it at rtsp://public_ip:554/mystream
8. Check the volumes: docker volume ls
9. Inspect volume: docker volume inspect  sweetcam_rtsp-resource
10. Get the logs from the volume

## Example of getting the logs from remote honeypot
```shell
scp -r -i ./key.pem -P 2404 azureuser@public_ip:/home/azureuser/logs/sweetcam_cowrie-log ./attack-logs/machine-a/
```