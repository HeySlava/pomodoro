## Web Server for pomodoro technique

### Why?
- easy to add i3block/ i3status/ polybar
- REST api service
- manageable by `curl`
- You can reboot your laptop and don't lose your session progress


### How to run?
```bash
git clone https://github.com/HeySlava/pomodoro

# App first looks for .env then settings.py to specify port
# You can configure it as docker ENV as well

cp example.env .env
docker-compose up -d
```


### i3 config example
```bash
# POMODORO
bindsym $mod+shift+n exec curl http://localhost:9999/new       # start new session
bindsym $mod+t exec curl http://localhost:9999/toggle          # start/stop
bindsym $mod+n exec curl http://localhost:9999/next            # skip current step
bindsym $mod+shift+d exec curl http://localhost:9999/stop      # stop current session
bindsym $mod+shift+m exec curl http://localhost:9999/previous  # pomodoro number - 1
```


### i3block example
```bash
[POMODORO]
command=curl http://localhost:9999/time
interval=1
color=#C9E3DB
```

That's all!

![alter text](https://kapitonov.tech/img/f00e57e9271e3a0.png)
![alter text](https://kapitonov.tech/img/dd31562c824ff6f.png)
![alter text](https://kapitonov.tech/img/8aebe326e28331a.png)


### TODO
- [x] add docker-compose
- [ ] share session over machines
- [ ] save history of sessions
