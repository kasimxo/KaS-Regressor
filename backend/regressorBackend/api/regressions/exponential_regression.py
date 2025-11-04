from utils import calculate_mean, calculate_r2
import math

def calculate_exponential_regression(dataPoints):
    """
    Calculates the parameters a (intercept), b (slope) of a exponential regression:
    
    y = a + e ^ (b * x)

    dataPoints: array of points for the linear regression
    """
    DATA_LENGTH = len(dataPoints)

    if DATA_LENGTH == 1:
        return [dataPoints[0][1], 0]

    x_values, y_values = zip(*dataPoints)

    # Calculate cuadratic value of x
    y_log_values = [ math.log(y) for y in y_values] # x > 0 or Error

    # Calculate mean
    mean_x = calculate_mean(x_values)
    mean_log_y = calculate_mean(y_log_values)
    
    # Covariance numerator
    covariance_sum = sum((x_value-mean_x) * (y_log_value-mean_log_y) for x_value, y_log_value in zip(x_values, y_log_values))
    
    # Variance denominator
    variance_sum = sum((x_value-mean_x) ** 2 for x_value in x_values)
    
    if variance_sum == 0:
        raise ValueError("No se pudo calcular una regresión válida")

    # Calculate final coefficients
    b_value = covariance_sum / variance_sum 
    a_value = mean_log_y - b_value * mean_x
    a_value = math.exp(a_value)

    # Predict y values
    y_predicted = [ a_value + math.exp(b_value * x_value) for x_value in x_values]

    # Calculate r2 
    r2 = calculate_r2(y_values, y_predicted)

    print("r2 value is:", r2)
    
    return {"params":[round(a_value, 5), round(b_value, 5)],"r2":r2}
