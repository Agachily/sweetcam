FROM aler9/rtsp-simple-server

WORKDIR /app/rtsp

# Copy configuration
COPY mediamtx.yml /mediamtx.yml

EXPOSE 8554

# Set default command
CMD ["mediamtx"]