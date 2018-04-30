
# coding: utf-8

# In[1]:




from __future__ import print_function
from gmplot import gmplot
from datetime import date, datetime, timedelta
import mysql.connector
import pandas as pd
from mysql.connector import errorcode
from mysql.connector import errorcode
import mapboxgl
from mapboxgl.utils import *
from mapboxgl.viz import * 
import os
import html



# this will set up the connection with the MySql server. 
cnx = mysql.connector.connect(user='proj', password='password.',
                              host='den1.mysql6.gear.host',
                              database='proj')

try:
  cnx = mysql.connector.connect(user='proj',
                                database='proj')
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


# In[ ]:


help(mapboxgl)
# dir(mapboxgl)


# In[2]:


df=pd.read_sql("SELECT * FROM fake_sensorInfo;",cnx)
# this is the number of rows of data. 
# print(len(df.index))
df.head()


# In[3]:


demo=pd.read_sql("SELECT * FROM sensorinfo ORDER BY testTime ASC LIMIT 1;",cnx)
# this is the number of rows of data. 
print(len(demo.index))
demo.head()


# In[23]:


demo['latitude'] = 40.0092
demo['longitude'] = -105.26683


# In[24]:


demo


# In[39]:


df = df.append(demo, ignore_index=True)


# In[40]:


df.tail()


# In[26]:


print('Last Temp is: ',demo.iat[0,3])
print('Last Humidy is ' ,demo.iat[0,4])


# In[41]:


# The MySQLCursor class instantiates objects that can execute operations such as SQL statements. Cursor objects interact with the MySQL server using a MySQLConnection object.
cursor = cnx.cursor()

cnx.close()


# In[57]:


#color_stops1 = [[4.2, 'green']]
#color_stops2 = [[4.2, 'red']]

breaks = [10,15,20,25,30,35,40,45,50]
color_stops = create_color_stops(breaks, colors='YlOrRd')


# In[29]:


# data = df_to_geojson(df, filename="lat_lng_plot.geojson",
#              properties=['userID','temp','humidity'],
#              lat='latitude',lon='longitude', precision=50)


# In[55]:


Fake = df_to_geojson(df, filename="Fake_data.geojson",
             properties=['userID','temp','humidity','sensorID'],
             lat='latitude',lon='longitude', precision=8)


# In[31]:



# Real = df_to_geojson(demo, filename="Real_data.geojson",
#              properties=['userID','temp','humidity'],
#              lat='latitude',lon='longitude', precision=50)


# In[32]:


# this will set the center of the map from the Real data. 
center_lat_Real = demo.iat[0,6]
center_lng_Real = demo.iat[0,7]
print(center_lat_Real,center_lng_Real)


# In[33]:


# this will set the center of the map from the Fake data. 
center_lat_fake = df.iat[0,6]
center_lng_fake = df.iat[0,7]
print(center_lat_fake,center_lng_fake)


# In[34]:


os.environ['MAPBOX_ACCESS_TOKEN']="pk.eyJ1IjoiY29vcGVydDkyNSIsImEiOiJjamdmd3l6ZjIwOHFkMzNwNHc5MjRtbTd6In0.GdxOVpiAfQ2WgZgfF_FUbg"
token = os.getenv('MAPBOX_ACCESS_TOKEN')
      


# In[35]:


# viz = CircleViz('Real_data.geojson',
#                 access_token=token,
#                 height='400px',
#                 radius=5,
#                 color_property='userID',
#                 color_stops = color_stops1,
#                 center=[-105, 40],
#                 stroke_width=0.0,
#                 zoom=9,
#                 below_layer = 'waterway-label')
# #                 style = 'mapbox://styles/mapbox/satellite-v9')
# viz.show()


# In[58]:


viz_2 = CircleViz('Fake_data.geojson',
                access_token=token,
                height='400px',
                radius=5,
                color_property='sensorID',
                color_stops = color_stops,
                color_function_type='interpolate',
                center=[-105, 40],
                stroke_width=0.0,
                zoom=9,
                below_layer = 'waterway-label'
                 
                 )
#                 style = 'mapbox://styles/mapbox/satellite-v9')
viz_2.show()


# In[59]:


with open('viz_2.html', 'w') as f:
    f.write(viz_2.create_html())

