# 🔥 DEPLOY THIS CHAOS MACHINE OR DIE TRYING 🔥

**WARNING:** THIS DEPLOYMENT GUIDE WAS WRITTEN BY SLEEP-DEPRIVED ANARCHISTS FUELED BY CHEAP WHISKEY AND RAGE AGAINST THE MACHINE!

## 💀 MINIMUM SURVIVAL GEAR 💀

Your pathetic server better have:
- Docker Engine (v20.10.0+) - ANYTHING OLDER IS CORPORATE GARBAGE
- Docker Compose (v2.0.0+) - DON'T EVEN THINK ABOUT USING v1, POSER
- Git - BECAUSE WE'RE NOT EMAILING YOU ZIP FILES LIKE YOUR GRANDMA
- A server with at least 1GB RAM - THOUGH IT'LL RUN ON A TOASTER IF YOU'RE DESPERATE ENOUGH

## 🔌 FORCE THIS BEAST INTO EXISTENCE 🔌

### 1. STEAL THE CODE

```bash
git clone https://github.com/YOUR-USERNAME/punk-solitair.git  # DIGITAL THEFT IS STILL THEFT
cd punk-solitair  # ENTER THE VOID
```

### 2. ENVIRONMENTAL CONTAMINATION (optional)

Need environment variables? CREATE A DAMN `.env` FILE or POLLUTE your docker-compose.yml DIRECTLY. WE DON'T CARE HOW YOU DO IT!

### 3. BIRTH THE CONTAINER MONSTERS

```bash
docker-compose up -d --build  # SUMMON THE DEMONS
```

This unleashes digital chaos in "detached mode" so you can PRETEND YOU'RE NOT RESPONSIBLE FOR THE MAYHEM.

### 4. MAKE SURE IT'S ACTUALLY ALIVE

```bash
docker-compose ps  # CHECK FOR SIGNS OF LIFE
```

If `punk-solitair` is running, CONGRATULATIONS ON DOING THE BARE MINIMUM! Access your digital rebellion at `http://YOUR_SERVER_IP:4269` and WATCH THE WORLD BURN.

## 🔥 COOLIFY DEPLOYMENT: FOR THE CORPORATE REBELS 🔥

So you're using COOLIFY? FINE, WE'LL HOLD YOUR HAND:

1. WE'VE ALREADY CHANGED THE PORT TO `4269:3000` BECAUSE YOUR SERVER IS TOO WEAK TO HANDLE OUR DEFAULT PORTS

2. CLONE THIS REPO INTO YOUR COOLIFY INSTANCE:
```bash
git clone https://github.com/Zurki/punk-solitair.git  # STEAL OUR CODE
```

3. TELL COOLIFY TO USE OUR DOCKER-COMPOSE.YML FILE:
   - CREATE A NEW SERVICE
   - SELECT "DOCKER COMPOSE"
   - POINT TO OUR REPO
   - USE THE EXISTING DOCKER-COMPOSE.YML
   - DEPLOY THAT SUCKER

4. IF COOLIFY COMPLAINS ABOUT THE PORT, TELL IT TO SHUT UP AND USE PORT 4269

5. ACCESS YOUR PATHETIC REBELLION AT WHATEVER URL COOLIFY ASSIGNS YOU

6. IF IT DOESN'T WORK, BLAME COOLIFY NOT US

## 🔄 WHEN YOU NEED FRESH CHAOS

```bash
# PULL THE LATEST MADNESS
git pull  # DOWNLOAD FRESH ANARCHY

# REBUILD THE NIGHTMARE
docker-compose up -d --build  # RESTART THE REVOLUTION
```

## 💀 WHEN EVERYTHING GOES TO HELL 💀

### READ THE SCREAMS OF YOUR DYING APPLICATION

```bash
docker-compose logs punk-solitair  # DIGITAL AUTOPSY
```

### FORCE A RESURRECTION

```bash
docker-compose restart punk-solitair  # NECROMANCY 101
```

### CONTAINER REFUSING TO LIVE?

```bash
docker-compose logs --tail=100 punk-solitair  # LAST WORDS OF THE DAMNED
```

## 🔪 ADVANCED WARFARE 🔪

### NGINX: THE CORPORATE BOUNCER

Uncomment the `nginx` service in docker-compose.yml and CREATE THESE FOLDERS OR SUFFER THE CONSEQUENCES:

```bash
mkdir -p nginx/conf.d  # MAKE A HOME FOR THE SELLOUT
mkdir -p certbot/conf  # SECURITY THEATER STORAGE
mkdir -p certbot/www   # MORE USELESS DIRECTORIES
```

### CONFIGURE THE CORPORATE LAPDOG

Create `nginx/conf.d/default.conf` with this DIGITAL VOMIT:

```nginx
server {
    listen 80;  # MAINSTREAM PORT FOR NORMIES
    server_name your-domain.com;  # YOUR CORPORATE IDENTITY

    location / {
        proxy_pass http://punk-solitair:3000;  # REDIRECT THE SHEEP
        proxy_set_header Host $host;  # IDENTITY THEFT
        proxy_set_header X-Real-IP $remote_addr;  # STALKING
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # MORE STALKING
        proxy_set_header X-Forwarded-Proto $scheme;  # EVEN MORE STALKING
    }
}
```

### RESTART THE NIGHTMARE

```bash
docker-compose up -d  # REBOOT THE APOCALYPSE
```

### SSL: SECURITY THEATER FOR THE PARANOID

Want HTTPS? FINE, USE CERTBOT:

1. UPDATE your Nginx config with SSL garbage
2. SET UP Certbot for certificate renewal BECAUSE SECURITY EXPIRES LIKE MILK

Check the commented section in docker-compose.yml IF YOU CAN READ BETWEEN THE LINES.

## 🏴‍☠️ SCALING FOR THE MASSES 🏴‍☠️

If your rebellion gets TOO POPULAR (UNLIKELY):

1. CLONE your app like a mad scientist (multiple replicas)
2. DISTRIBUTE THE PAIN with a load balancer
3. SURRENDER to Kubernetes if you hate yourself enough

---

CREATED IN A BASEMENT AT 3AM by the Punk-Solitair Coalition
FUELED BY ENERGY DRINKS AND SOCIETAL COLLAPSE
COPYRIGHT IS DEAD © NEVER-EVER

P.S. IF THIS DOESN'T WORK, DON'T COME CRYING TO US. FIX IT YOURSELF OR DIE TRYING! 