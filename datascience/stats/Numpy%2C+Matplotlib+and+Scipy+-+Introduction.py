
# coding: utf-8

# # Numpy and Scipy
# 
# [Numpy](http://numpy.org) is the **fundamental package for scientific computing with Python**. It contains among other things:
# 
# * a powerful N-dimensional array object
# * sophisticated (**broadcasting**) functions [what is *broadcasting*?]
# * tools for integrating C/C++ and Fortran code
# * useful linear algebra, Fourier transform, and random number capabilities
# 
# [Scipy](http://scipy) contains additional routines for optimization, special functions, and so on. Both contain modules written in C and Fortran so that they're as fast as possible. Together, they give Python roughly the same capability that the [Matlab](http://www.mathworks.com/products/matlab/) program offers. (In fact, if you're an experienced Matlab user, there a [guide to Numpy for Matlab users](http://www.scipy.org/NumPy_for_Matlab_Users) just for you.)
# 
# In IPython, the easiest way to import the numpy package is to call **%pylab inline**. A frequent alternative is to call **import numpy as np**.
# 
# ## Making vectors and matrices
# Fundamental to both Numpy and Scipy is the ability to work with vectors and matrices. You can create vectors from lists using the **array** command:

# In[1]:

get_ipython().magic(u'pylab inline')


# In[2]:

random.seed(1)


# In[3]:

array([-2,0,1,2,3,4,5,6])


# **remember:** a [python list](https://docs.python.org/2/tutorial/datastructures.html) and a [numpy array](https://docs.scipy.org/doc/numpy/reference/generated/numpy.array.html) are different! E.g.

# In[4]:

[1,2,3]+[4,5,8]


# In[5]:

array([1,2,3])+array([4,5,8])


# What is the type of the array?

# In[6]:

array([-2,0,1,2,3,4,5,6]).dtype


# You can pass in a second argument to **array** that gives the numeric type. There are a number of types [listed here](http://docs.scipy.org/doc/numpy/user/basics.types.html) that your array can be. The most common ones are float64 (double precision floating point number), and int64.

# In[7]:

array([-2,0,1,2,3,4,5,6],float64)


# Other examples

# In[8]:

array([-2,0,1,2,3,4,5,6],bool)


# An array with different types:

# In[9]:

array([1.,2,'a',True])


# numpy try to infer the most exhaustive type, this could be useful or not. As an alternative, you could force the type to be an **object** so that everything keep its original type.

# In[10]:

array([1.,2,'a',True],object)


# To build matrices, you can either use the array command with lists of lists:

# In[11]:

array([[0,1], [1,0]], float64)


# You can create arrays with any number of dimensions using lists of lists of .... of lists:

# In[13]:

array([[[0,1],[0,1]], [[1,0],[1,0]]],float64)


# ### Array creation routines

# You can also form empty (zero) matrices of arbitrary shape (including vectors, which Numpy treats as vectors with one row), using the **[zeros](https://docs.scipy.org/doc/numpy/reference/generated/numpy.zeros.html)** command:

# In[14]:

zeros((3,3), float64)


# The first argument is a tuple containing the **shape** of the matrix, and the second is the data type (**dtype**) argument, which follows the same conventions as in the array command. The default dtype is float32. Thus, you can make row vectors:

# In[15]:

zeros(3)


# In[16]:

zeros((1, 3))


# or column vectors:

# In[17]:

zeros((3, 1))


# The **[identity](https://docs.scipy.org/doc/numpy/reference/generated/numpy.identity.html)** function creates an identity matrix:

# In[18]:

identity(4)


# And the **[ones](https://docs.scipy.org/doc/numpy/reference/generated/numpy.identity.html)** funciton creates an array of ones:

# In[19]:

ones((3, 3))


# In[20]:

help(identity)


# You can create arrays with any number of dimensions by adding dimensions to the **shape** argument:

# In[21]:

ones((6, 3, 5))


# In[22]:

get_ipython().magic(u'pinfo identity')


# Other array creation routines are:

# **[empty](https://docs.scipy.org/doc/numpy/reference/generated/numpy.empty.html)**

# In[23]:

empty((2, 2))


# In[ ]:

# identity - shift + tab


# **[eye](https://docs.scipy.org/doc/numpy/reference/generated/numpy.eye.html)**

# In[24]:

eye(3, 4, 1)


# In[ ]:

# 3 righe, 4 colonne e la prima diagonale di 1


# **[arange](https://docs.scipy.org/doc/numpy/reference/generated/numpy.arange.html)**

# In[25]:

arange(4)


# In[26]:

help(arange)


# In[27]:

arange(2,6)


# In[28]:

arange(-10,4)


# In[29]:

arange(4,-10,-2)
# partenza 4, fine -10, passo 2...la fine non viene mai data


# **[diag](https://docs.scipy.org/doc/numpy/reference/generated/numpy.diag.html)**

# In[31]:

diag(arange(4))
diag(diag(arange(4))) #mi restituisce la diagonale


# The **[linspace](https://docs.scipy.org/doc/numpy/reference/generated/numpy.linspace.html)** command makes a linear array of points from a starting to an ending value.

# In[32]:

linspace(0, 2, 5)
# da 0 a 2, ed ha 5 elementi


# Same command in log, [logspace](https://docs.scipy.org/doc/numpy/reference/generated/numpy.logspace.html)

# In[33]:

logspace(0, 2, 9)
#10^0, 10^2......fino ad arrivare a 9 elementi


# ### [reshape](https://docs.scipy.org/doc/numpy/reference/generated/numpy.reshape.html)

# In[34]:

a = arange(64)
a


# In[35]:

a.reshape(8,8)


# ### [transpose](https://docs.scipy.org/doc/numpy/reference/generated/numpy.transpose.html)

# In[36]:

a.reshape(8,8).T


# ### [Indexing/Slicing](https://docs.scipy.org/doc/numpy/reference/arrays.indexing.html)
# 
# You can index and slice numpy arrays in the same way you index/slice lists.

# In[37]:

a3 = arange(30) 
a3


# In[40]:

a3[0]
a3[-1]


# In[39]:

a3[::-1]
# mi dà l'array di prima con ordinamento inverso, con passo -1
a3[::-2] #con passo 2


# In[41]:

a3[2:5]


# ### [Boolean array indexing](https://docs.scipy.org/doc/numpy/reference/arrays.indexing.html): a very **useful** recipe

# In[42]:

a3[a3>20]


# In[43]:

x = array([[1., 2.], [nan, 3.], [nan, nan]])


# In[44]:

x


# In[46]:

isnan(x)
# mi dà gli elementi NaN


# In[ ]:




# #### 2d, 3d slicing

# In[ ]:

a = arange(64).reshape(8,8)
a


# In[ ]:

a[0,:]
#prima riga


# In[ ]:

a[:,0]
#prima colonna


# In[ ]:

a[:2,:2]


# In[ ]:

a[::2,::2]


# In[ ]:

b = arange(27).reshape(3,3,3)
b


# In[ ]:

b[0,0,0]
#elemento in posizione (0,0,0)


# In[ ]:

b[0,:,:]


# In[ ]:

b[:,0,:]


# In[ ]:

b[:,:,0]


# ### NumPy Functions
# 
# http://docs.scipy.org/doc/numpy/reference/routines.math.html

# #### [randint](https://docs.scipy.org/doc/numpy/reference/generated/numpy.random.randint.html)

# In[ ]:

a=random.randint(0,10,100)
#100 numeri random tra 0 e 10


# In[ ]:

a


# #### [min](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.min.html)

# In[ ]:

a.min()


# #### [max](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.max.html)

# In[ ]:

a.max()


# #### [mean](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.mean.html)

# In[ ]:

a.mean()


# #### [std](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.std.html)

# In[ ]:

a.std()#standard deviation


# #### [sum](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.sum.html)

# In[ ]:

a.sum()


# In[ ]:

b=random.randint(0,10,(10,5))
# serve per creare una matrice


# In[ ]:

b


# In[ ]:

b.shape


# In[ ]:

b.T


# In[ ]:

b.T.shape


# #### [trace](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.trace.html)

# In[ ]:

b.trace()
#somma elementi sulla diagonale = traccia


# #### [diag](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.diag.html)

# In[ ]:

diag(b)


# In[ ]:

b.min()
# min di tutta la matrice


# In[ ]:

b.min(axis=0)
# min di tutte le colonne


# In[ ]:

b.min(axis=1)
# min di tutte le righe (asse 1)


# #### [ravel](https://docs.scipy.org/doc/numpy/reference/generated/numpy.ndarray.ravel.html)

# In[ ]:

b.ravel()
#trasforma da una matrice ad un array


# # Matplotlib
# 
# [Matplotlib](http://matplotlib.org/) is the **fundamental package for scientific plotting with Python**. We suggest to visit the [gallery](http://matplotlib.org/gallery.html) to get an idea of the different kind of plots that it could be made with matplotlib

# In[ ]:

x=array([1,2,4,10])
y=array([-2,6,7,2])


# #### [plot](http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.plot)

# In[ ]:

plot(x,y)
#plot(x,y, 'o')   #non mi dà la linea ma i punti
#plot(x,y, 'x')   #non mi dà la linea ma delle x
#plot(x,y, ':x')   #linee tratteggiate


# In[ ]:

plot(x,2+3*x,label='a line')
plot(linspace(1,10,100),10*sin(linspace(1,10,100)),label='sin(x)')
# se do sin(x) non funziona perchè lui non sa cosa è x, quindi devo prima definire x in un array
xlabel('x')
ylabel('y')
legend()


# In[ ]:

r=random.rand(100)


# #### [hist](http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.hist)

# In[ ]:

hist(r)
# hist(r, 20) #con 20 barrette e non 10 di default
#show()
# hist(r, [0, .4, .6, 1])
#show()


# In[ ]:

rn=random.randn(1000)
# numeri aleatori distribuiti normalmente, media = 0, stand dev =1


# In[ ]:

rn.mean()
# rn.std()


# In[ ]:

hist(rn,bins=linspace(-4,4,10))


# be aware also of the command [histogram](https://docs.scipy.org/doc/numpy/reference/generated/numpy.histogram.html) of numpy. For istance the previous plot could also be obtained in the following way:

# In[ ]:

x_bin=linspace(-4,4,10)


# In[47]:

h=histogram(rn,bins=x_bin)
h # fa l'istogramma ma non lo rappresenta, uso il comando histogram
# il primo array sono le x, il secondo array l'altezza degli istogrammi


# In[ ]:

plot(h[1][:-1],h[0],'-o')


# or using the [bar](http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.bar) command:

# In[ ]:

bar(h[1][:-1],h[0])


# #### [imshow](http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.imshow)

# In[ ]:

r_matrix=random.rand(100,100)


# In[ ]:

imshow(r_matrix,interpolation='None')
colorbar()


# # Scipy

# [Scipy](http://scipy.org) contains additional routines for optimization, special functions, and so on.
# 
# Some examples:
# * [do you want to maximize/minimize a function?](https://docs.scipy.org/doc/scipy/reference/tutorial/optimize.html)
# * [some linear algebra (eigenvalues, matrix inversion, etc.)?](https://docs.scipy.org/doc/scipy/reference/tutorial/linalg.html)
# * [integrate a function?](https://docs.scipy.org/doc/scipy/reference/tutorial/integrate.html)
# * [some useful statistical funciton?](https://docs.scipy.org/doc/scipy/reference/tutorial/stats.html)
# * [further examples](https://docs.scipy.org/doc/scipy/reference/)
# 

# Consider the following example: we want to know if the sample $r1$ and the sample $r2$ come from the same distribution?

# In[ ]:

r1=random.randn(2453)*3

# il primo array non ha var 1, ma più alta perchè lo moltiplico per 3
# se voglio cambiare la media faccio (la media diventa 2):
#r1=random.randn(2453)*3 +2

r2=random.randn(5718)


# In[ ]:

cumsum() #distribuz cumulata


# In[ ]:

h1=histogram(r1,linspace(-10,10,100))
h2=histogram(r2,linspace(-10,10,100))


# In[ ]:

plot(h1[1][:-1],h1[0]*1./sum(h1[0]),label='line1')
plot(h1[1][:-1],h2[0]*1./sum(h2[0]),label='line2')
legend()


# In[ ]:

plot(h1[1][:-1],cumsum(h1[0]*1./sum(h1[0])),label='line1')
plot(h1[1][:-1],cumsum(h2[0]*1./sum(h2[0])),label='line2')
legend()


# ## [Statistical Functions](https://docs.scipy.org/doc/scipy/reference/stats.html#) in Scipy

# In[ ]:

from scipy import stats


# #### [Two-samples Kolmogorov-Smirnov test](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ks_2samp.html#scipy.stats.ks_2samp)

# In[ ]:

r,p=stats.ks_2samp(r1,r2)


# the **Kolmogorov-Smirnov** statistic

# In[ ]:

r
#r = 0.26 = distanza massima tra le due distribuzioni


# the **p-value**

# In[ ]:

p


# In[ ]:

help(stats.ks_2samp)


# # Further Readings

# In[ ]:

import this


# In[ ]:




# In[ ]:



