<h1 align="center">
    <img src="./images/logo.png" alt="MediaMTX / rtsp-simple-server" width='75%'>
</h1>

# Introduction

The application *SweetCam* is a honeypot for IP camera. It can simulate a real IP camera vividly, including the interaction with user for rotating and zooming.

# Components

The SweetCam honeypot application is composed by four parts:

1. The MySQL database service.
2. The RTSP service, this is used to provide the RTSP service for the attackers.
3. The Web service, this is used to provide the web service for the attackers, including viewing the camera page, logging etc.
4. The Cowrie service, this is used as the SSH hoenypot for providing the SSH service for the attackers.



# How to run the application
To run launch the application, just enter the root directory of the application and launch the application with the folloing command:

```shell
docker compose up -d
```

Thereafter, there should be four containers that are running as shown follows:

1. web_service
2. cowrie_service
3. rtsp_service
4. mysql_service

Once launching the four services, there are several configurations should be made within the rtsp_service:

1. Enter the rtsp_service container with the following command:

   ```
   docker exec -it rtsp_service /bin/sh
   ```

2. Revise the mediamtx.yml file to configure the logging function of the Mediamtx application.