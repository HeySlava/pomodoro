## Web Server for pomodoro technique

### Why?
- easy to add i3block/ i3status/ polybar
- REST api service
- manageable by `curl`
- You can reboot your laptop and don't lose your session progress


### How to run?
```bash
git clone https://github.com/HeySlava/pomodoro
# App first look for .env then settings.py to specify port
# You can configure as docker ENV as well
# .env
POMODORO_PORT=<your port>
docker build -t <image_name> .
docker run --name --name pomodoro -p <HOST_PORT>:<SERVICE_PORT> -d --restart=always <image_name>
```

##### Setup example
```bash
git clone https://github.com/HeySlava/pomodoro

# .env
# App first looks for .env then settings.py to specify port
POMODORO_PORT=8080

docker build -t pomodoro .
docker run --name pomodoro -p 8080:8080 -d --restart=always pomodoro
```

### i3 config example
```bash
# POMODORO
bindsym $mod+shift+n exec curl http://localhost:8080/new    # start new session
bindsym $mod+t exec curl http://localhost:8080/toggle       # start/stop
bindsym $mod+n exec curl http://localhost:8080/next         # skip current step
bindsym $mod+shift+d exec curl http://localhost:8080/stop   # stop current session
```


### i3block example
```bash
[POMODORO]
command=curl http://localhost:8080/time
interval=1
color=#C9E3DB
```

That's all!

![alter text](https://kapitonov.tech/img/f00e57e9271e3a0.png)  
![alter text](https://kapitonov.tech/img/dd31562c824ff6f.png)  
![alter text](https://kapitonov.tech/img/8aebe326e28331a.png)  


### TODO
- [ ] share session over machines
- [ ] save history of sessions
