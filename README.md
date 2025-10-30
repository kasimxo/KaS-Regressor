# KaS-Regressor

Este proyecto es una implementación sin librerías externas (sin uso de numpy o funciones como math.cov) de varios tipos de regresiones.

Puedes desarrollar tu propia implementación tanto de la parte del cliente como de la parte del servidor en el lenguaje que prefieras, ya que el proyecto presenta una estructura de cliente - servidor.

### Cliente

El cliente utiliza javascript vanilla y permite al usuario crear un conjunto de datos sobre un gráfico para realizar y visualizar las regresiones.

Por defecto, realiza las peticiones a la dirección 'localhost:8080/regressor' enviando el conjunto de datos y recibiendo los parámertos de las regresiones. Puedes leer más sobre esta interacción en la sección API.

### Servidor

El servidor utiliza python con Django, recibe un array de datos sobre el que aplica las regresiones y devuelve un JSON con los parámetros de cada una de las regresiones. Puedes leer más sobre esta interacción en la sección API.

### API

POST /regressor

Request body: 

[[x0, y0], ..., [xn, yn]]

En el cuerpo de la petición se envía un array de puntos, donde cada punto es un array x, y.

X e Y deben ser enteros positivos.

Response body:

{
    "linear_regression": [a, b],
    "exponential_regression": [a, b],
    "cuadratic_regression": [a, b],
    "logarithmic_regression": [a, b]    
}

El cuerpo de la respuesta es un JSON con los distintos parámetros de cada una de las regresiones. A y B son Float de hasta 5 decimales.

Las fórmulas de cada una de las regresiones son las siguientes:

Regresión lineal: y = a + b * x

Regresión exponencial: y = a + e ^ (b * x)

Regresión cuadrática: y = a + b * x ^ 2

Regresión logarítmica: y = a + b * log(x)