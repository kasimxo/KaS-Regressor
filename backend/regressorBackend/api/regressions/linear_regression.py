from utils import calculate_mean, calculate_r2

def calculate_linear_regression(dataPoints):
    """
    Calculates the parameters a (intercept), b (slope) of a linear regression:
    
    y = a + b * x

    dataPoints: array of points for the linear regression
    """
    DATA_LENGTH = len(dataPoints)

    if DATA_LENGTH == 1:
        return [dataPoints[0][1], 0]

    x_values, y_values = zip(*dataPoints)

    # Calculate mean
    mean_x = calculate_mean(x_values)
    mean_y = calculate_mean(y_values)

    # Covariance numerator
    covariance_sum = sum((x_value-mean_x) * (y_value-mean_y) for x_value, y_value in dataPoints)
    
    # Variance denominator
    variance_sum = sum((x_value-mean_x) ** 2 for x_value, _ in dataPoints)

    if variance_sum == 0:
        raise ValueError("No se pudo calcular una regresión válida")

    # Calculate final coefficients
    b_value = covariance_sum / variance_sum 
    a_value = mean_y - b_value * mean_x

    # Predict y values
    y_predicted = [ a_value + b_value * x_value for x_value in x_values]

    # Calculate r2 
    r2 = calculate_r2(y_values, y_predicted)

    print("r2 value is:", r2)

    return [round(a_value, 5), round(b_value, 5)]
