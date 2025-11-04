from utils import calculate_mean, calculate_r2
import math

def calculate_cuadratic_regression(dataPoints):
    """
    Calculates the parameters a (intercept), b (slope) of a cuadratic regression:
    
    y = a + b * x^2

    dataPoints: array of points for the linear regression
    """
    DATA_LENGTH = len(dataPoints)

    if DATA_LENGTH == 1:
        return [dataPoints[0][1], 0]

    x_values, y_values = zip(*dataPoints)

    # Calculate cuadratic value of x
    x_cuadratic_values = [ x ** 2 for x in x_values] # x > 0 or Error

    # Calculate mean
    mean_cuadratic_x = calculate_mean(x_cuadratic_values)
    mean_y = calculate_mean(y_values)

    # Covariance numerator
    covariance_sum = sum((x_cuadratic_value-mean_cuadratic_x) * (y_value-mean_y) for x_cuadratic_value, y_value in zip(x_cuadratic_values, y_values))

    # Variance denominator
    variance_sum = sum((x_cuadratic_value-mean_cuadratic_x) ** 2 for x_cuadratic_value in x_cuadratic_values)

    if variance_sum == 0:
        raise ValueError("No se pudo calcular una regresión válida")

    # Calculate final coefficients
    b_value = covariance_sum / variance_sum 
    a_value = mean_y - b_value * mean_cuadratic_x

    # Predict y values
    y_predicted = [ a_value + b_value * (x_value ** 2) for x_value in x_values]

    # Calculate r2 
    r2 = calculate_r2(y_values, y_predicted)

    print("r2 value is:", r2)

    return {"params":[round(a_value, 5), round(b_value, 5)],"r2":r2}
