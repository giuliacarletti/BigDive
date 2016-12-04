import tweepy
import time
from datetime import datetime as dt
from pymongo import MongoClient

class IntesaTweets(object):
    def __init__(self, auth):
        self.auth = auth
        self.api = tweepy.API(self.auth)
        self.intesa_cursor = tweepy.Cursor(self.api.user_timeline, screen_name='intesasanpaolo')

    def get_tweets(self):
        while True:
            try:
                yield self.intesa_cursor.pages().next()
            except tweepy.RateLimitError:
                print "[LOG %s] Timeout reached.. I'm going to sleep for 15 minutes.." % dt.now()
                time.sleep(15 * 60)
                print "[LOG %s] Try Again!" % dt.now()
            except StopIteration as st:
                print "[LOG %s] Stop Iteration " % dt.now()
                break
            except Exception as e:
                # Generic Exception
                print "[LOG %s] Generic error " % dt.now()
                print "[LOG %s] Wait 60 seconds..." % dt.now()
                time.sleep(60)


print "[LOG %s] STARTING" % dt.now()

# SETUP TWITTER
CONSUMER_KEY = "GaOW7ZLn8pQgITC0EH5qEaRnq"
SECRET_KEY = "FGG1KkUB6DE5ScLk6rluRToDX2Wk99odoUz0fcCPyj0n2rDzQz"
ACCESS_TOKEN = "775822357-JMIjKZAAqPGahbfH1mZStlkS4KrESDsVNVA4D1xz"
SECRET_ACCESS_TOKEN = "VjP6b42NOBhGbrh4MsfxvqX7LTXga76t9fNqvXaJpibDu"

auth = tweepy.OAuthHandler(CONSUMER_KEY, SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, SECRET_ACCESS_TOKEN)

intesa = IntesaTweets(auth)

print "[LOG] Twitter Setup Complete"

# SETUP PYMONGO
client = MongoClient('mongodb://localhost:27017/')
db = client.intesa

counter = 0
for page in intesa.get_tweets():
    counter += 1
    print "[LOG %s ] Page: %s With %s Elements" % (dt.now(), counter, len(page))
    for tweet in page:
        db.tweets.insert({'created_at': tweet.created_at,
                          'favorite_count': tweet.favorite_count,
                          'geo': tweet.geo,
                          'id': tweet.id,
                          'in_reply_to_screen_name': tweet.in_reply_to_screen_name,
                          'in_reply_to_status_id': tweet.in_reply_to_status_id,
                          'in_reply_to_user_id': tweet.in_reply_to_user_id,
                          'retweet_count': tweet.retweet_count,
                          'retweeted': tweet.retweeted,
                          'text': tweet.text,
                          'entities': tweet.entities
                          })

print "[LOG %s] Script Completed!" % dt.now()