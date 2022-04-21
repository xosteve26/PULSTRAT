from dotenv import load_dotenv
import os
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    # SESSION_REDIS=redis.from_url('redis://localhost:6379')
