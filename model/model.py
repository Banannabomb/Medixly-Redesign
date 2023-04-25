from keras.layers import * #Import layers from Keras module in order to create all layers that will go into the Sequential model.
from keras.models import * # Import models from Keras module in order to set up a Sequential model. 
from keras.callbacks import * #Import callbacks from Keras module to enable early stopping, with the intention of preventing overfitting of the data while training.
from keras.preprocessing import image #Import image from Keras preprocessing module to use ImageDataGenerator to rescale data.
import matplotlib.pyplot as plt #Import matplotlib to visualize the model by creating accuracy per epoch and loss per epoch graphs.
import tensorflowjs as tfjs #Importing tensorflowjs module to be able to convert Keras model to a model that can be incorporated into React Native

#Data preparation
#For both training and testing data generators, rescale the RGB values of the data by a factor of 1/255 to prevent RGB values from being higher than 255.
train_datagen = image.ImageDataGenerator(
    rescale = 1./255,
    shear_range = 0.2,
    zoom_range = 0.2,
    horizontal_flip = True,
)
test_datagen = image.ImageDataGenerator(rescale=1./255)

#For both training and testing data generators, fetch the data from their respective directories, using a target size of 224x224, a batch size of 32, and a class mode of binary.
#For training dataset, fetch from "data/train" directory
train = train_datagen.flow_from_directory(
    "data/train_sep",
    target_size = (224, 224),
    batch_size = 32,
    class_mode = 'binary'
)
#For testing dataset, fetch from "data/val" directory
test = test_datagen.flow_from_directory(
    "data/valid",
    target_size = (224, 224),
    batch_size = 32,
    class_mode = 'binary'
)

print(train.class_indices)

#Build the Sequential model and add its corresponding layers to build a fully-connected network.
model = Sequential()
model.add(Conv2D(32, kernel_size=(3,3), activation='relu',input_shape=(224, 224, 3)))
model.add(Conv2D(64, (3,3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Conv2D(64, (3,3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Conv2D(128, (3,3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.25))

model.add(Flatten())
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(1, activation='sigmoid'))

#Compiling the sequential model using Adam as our optimizer, use a loss function of binary_crossentropy to evalulate set of weights for binary classification.
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

#Declare es as the EarlyStopping function, which monitors the validation loss of the model when fitting/training. Attempt to prevent model from overfitting.
es = EarlyStopping(monitor = 'val_loss', mode='min', patience=5, restore_best_weights='true')

#Start fitting/training the model. Using the training data, the validation data and the early stopping function defined above to prevent model from overfitting, train the model over a total of 10 epochs.
history = model.fit(
    train,
    epochs = 10,
    validation_data = test,
    callbacks=[es]
)

#Use matplotlib to visualize the model accuracy and model loss graphs
#Plot the model accuracy per epoch, using both curves from the accuracy and validation accuracy
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model Accuracy')
plt.ylabel('Accuracy')
plt.xlabel('Epoch')
plt.legend(['Train', 'Test'], loc='upper left')
plt.show()

#Plot the model loss per epoch, using both curves from the loss and validation loss
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('Loss')
plt.xlabel('Epoch')
plt.legend(['Train', 'Test'], loc = 'upper left')
plt.show()

#Use the tensorflowjs module to convert the Keras model to a compatible model.json file and weights.bin file, in the directory "src/model". These files will be used in the React Native application.
tfjs.converters.save_keras_model(model, 'src')


# import csv
# import numpy as np
# import matplotlib.pyplot as plt
# import tensorflow as tf
# import tensorflowjs as tfjs
# from keras.callbacks import *
# from keras.layers import *
# from keras.models import *
# from keras.preprocessing import image
# import math
# from keras.optimizers import Adam

# #data prep
# x_train = []
# y_train = []
# with open('train.csv') as file:
#   data = csv.reader(file, delimiter=',')
#   i = -1
#   for row in data:
#     i += 1
#     if i > 2000:
#       break
#     if row[0] == "image_name":
#       continue
#     x_train.append(row[0])
#     y_train.append(int(row[7]))

# x_train_images = []
# for i in range(len(x_train)):
#   if i > 2000: 
#     break
#   img = tf.keras.utils.load_img('data/train/' + x_train[i] + ".jpg", target_size=(96,96,1))
#   img = tf.keras.utils.img_to_array(img)
#   img = img/255

#   x_train_images.append(img)

# x_train = np.array(x_train_images)
# y_train = np.array(y_train)

# model = Sequential()
# model.add(Conv2D(32,3,padding="same", activation="relu", input_shape=(96,96,3)))
# model.add(MaxPool2D())

# model.add(Conv2D(32, 3, padding="same", activation="relu"))
# model.add(MaxPool2D())

# model.add(Conv2D(64, 3, padding="same", activation="relu"))
# model.add(MaxPool2D())
# model.add(Dropout(0.4))

# model.add(Flatten())
# model.add(Dense(128,activation="relu"))
# model.add(Dense(2, activation="softmax"))

# model.summary()

# opt = Adam(lr=0.000001)
# model.compile(optimizer = opt, loss='binary_crossentropy', metrics = ['accuracy'])
# es = EarlyStopping(monitor = 'val_loss', mode='min', patience=5, restore_best_weights='true', verbose=1)

# history = model.fit(
#     x_train,
#     y_train,
#     epochs = 5,
#     validation_split=0.33,
#     callbacks=[es]
# )

# plt.plot(history.history['accuracy'])
# plt.plot(history.history['val_accuracy'])
# plt.title('Model Accuracy')
# plt.ylabel('accuracy')
# plt.xlabel('epoch')
# plt.legend(['train', 'test'], loc='upper left')
# plt.show() 

# #summarize history for loss
# plt.plot(history.history['loss'])
# plt.plot(history.history['val_loss'])
# plt.title('Model Loss')
# plt.ylabel('loss')
# plt.xlabel('epoch')
# plt.legend(['train', 'test'], loc = 'upper left')
# plt.show()

# tfjs.converters.save_keras_model(model, 'src')