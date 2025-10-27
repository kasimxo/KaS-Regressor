import numpy as np
import random

def Calculate_linear_regression(dataPoints):
    """
    Calculates the parameters (a, b) of a linear regression:
    y = a + bx

    dataPoints: array of points for the linear regression
    """
    DATA_LENGTH = len(dataPoints)
    
    if DATA_LENGTH == 1:
        return [dataPoints[0][1], 0]

    # Calculate avg
    arr = np.array(dataPoints)
    avgX, avgY = np.mean(arr, axis=0)

    # Avg distance
    distances = arr - np.array([avgX, avgY])

    distance_product_calculated = np.prod(distances, 1)
    distance_product_sum = np.sum(distance_product_calculated)

    # Calculate squared error
    squared_error_calculated = distances[:, 0] ** 2
    squared_error_sum = np.sum(squared_error_calculated)

    b_value = distance_product_sum/squared_error_sum
    a_value = avgY - b_value*avgX

    return [round(a_value.item(), 5), round(b_value.item(), 5)]