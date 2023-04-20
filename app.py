from flask import Flask, render_template, jsonify,request,session
import csv
from algo import *

app = Flask(__name__)

app.secret_key = "harish"
Data = []
MovieMap = {}
f = open("data.csv","r",encoding='utf-8')
reader = csv.reader(f)
L = []
i = 0
for row in reader:
    if i == 0:
        i=1 
        continue
    try:
        L.append([row[9],row[11],row[25]])
    except:
        continue

genres = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family',
            'Fantasy', 'Film-Noir', 'Game-Show', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'News',
            'Reality-TV', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller', 'War', 'Western']
L1 = []
ind = 0
for i in L:
    t1 = i[0].split("|")
    temp = [1 if j in t1 else 0 for j in genres ]
    L1.append([temp,i[1],i[2],ind])
    MovieMap[ind] = [temp,i[1],i[2],ind]
    Data.append([i[1],ind])
    ind+=1
dim = 26
points = L1
kd_tree = KDTree(points, dim)

def getMovie(id):
    return MovieMap[id]

@app.route("/")
def home():
    global kd_tree, MovieMap
    
    if session.get("user") is None:
        session["user"] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    
    data = []
    for i in sorted(kd_tree.get_knn(session['user'],15),key = lambda x : float(x[1][2]) - x[0]*10, reverse=True):
        data.append([i[1][1], i[0],i[1][2],i[1][3]])
        print(i[1][1],i[0])
    
    return render_template("home.html", data = data)


@app.route('/addWatched', methods = ["GET","POST"])
def addWatched():
    t = request.form['id']
    t2 = getMovie(int(t))
    t3 = session.get("user")
    for i in range(len(t2)):
        t2[0][i] = (t2[0][i] + t3[i])/2

    session["user"] = t2[0]
    print(session["user"])
    return jsonify({'data' : 'asdsf'})


@app.route("/search", methods = ['GET','POST'])
def search():
    global L1
    search  = request.form.get("search")
    #dummy
    movies = []
    for i in L1:
        if search.lower() in i[1].lower():
            movies.append([i[1],i[0],i[2]])
    return render_template('home.html',data = movies)

@app.route("/tag")
def tag():
    return render_template("tag.html")

@app.route("/userTag", methods = ["GET","POST"])
def userTag():
    global kd_tree
    print(request.form)
    userTag = request.form.getlist("tag[]")
    for i in range(len(userTag)):
        userTag[i] = float(userTag[i])
    print(userTag)
    data = []
    for i in sorted(kd_tree.get_knn(userTag,15),key = lambda x : float(x[1][2]) - float(x[0]*10), reverse=True):
        data.append([i[1][1], i[0],i[1][2],i[1][3]])
        print(i[1][1],i[0])
    return jsonify({"data" : data})

    return jsonify({"data" : "dummy"})

if __name__ == "__main__":
    app.run(debug = True)