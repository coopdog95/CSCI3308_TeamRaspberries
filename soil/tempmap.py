
# coding: utf-8

# In[1]:

from __future__ import print_function
from datetime import date, datetime, timedelta
import mysql.connector
import pandas as pd
from mysql.connector import errorcode
from mapboxgl.utils import *
from mapboxgl.viz import * 
import os
import html
import folium

popup = 'Must be on top of the choropleth'

folium.CircleMarker(
    location=[48, -102],
    radius=10,
    fill=True,
    popup=popup,
    weight=1,
).add_to(m)


time=datetime.now()
# this will set up the connection with the MySql server. 
cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1',
                              database='Raspberries')

try:
  cnx = mysql.connector.connect(user='root',
                                database='Raspberries')
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with your user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
    print("something is messed up")
else:
  print("its working and can except MySQL quarry's")
  # cnx.close()


df=pd.read_sql("SELECT * FROM sensorInfo;",cnx)

print(df)

cnx.close()


# In[2]:


os.environ['MAPBOX_ACCESS_TOKEN']="pk.eyJ1IjoiY29vcGVydDkyNSIsImEiOiJjamdmd3l6ZjIwOHFkMzNwNHc5MjRtbTd6In0.GdxOVpiAfQ2WgZgfF_FUbg"
token = os.getenv('MAPBOX_ACCESS_TOKEN')


# In[3]:


color_stops2 = [[4.2, 'red']]
df
data = df_to_geojson(df, filename="lat_lng_plot.geojson",
             properties=['userID','temp','humidity',],
             lat='latitude',lon='longitude', precision=50)


# In[4]:


center_lat=df.iat[0,6]
center_lng=df.iat[0,7]
print(center_lat,center_lng)


# In[5]:


df.iat[1,1]
df.sort_index()


# In[8]:


viz = CircleViz('lat_lng_plot.geojson',
                access_token=token,
                height='400px',
                radius=5,
                color_property='userID',
                color_stops = color_stops2,
                center=[-105, 40],
                stroke_width=0.0,
                zoom=9,
                below_layer = 'waterway-label')
#                 style = 'mapbox://styles/mapbox/satellite-v9')
viz.show()


# In[10]:


with open('viz.php', 'w') as f:
    f.write(viz.create_html())

