import numpy as np
import random

def Calculate_linear_regression(input_data):
    """
    Calculates the parameters (a, b) of a linear regression:
    y = a + bx

    dataPoints: array of points for the linear regression
    """
    DATA_LENGTH = len(input_data)
    
    # Parseo de data
    dataPoints = [list(map(int, pair.split(','))) for pair in input_data]
    #dataPoints = [[0,0],[1,2],[2,4],[3,6],[4,8],[5,10]]
    print("INPUT", dataPoints)

    # Calculate avg
    arr = np.array(dataPoints)
    avgX, avgY = np.mean(arr, axis=0)
    print("AVG X:", avgX)
    print("AVG Y:", avgY)

    # Avg distance
    distances = arr - np.array([avgX, avgY])

    distance_product_calculated = np.prod(distances, 1)
    print("DISTANCE PRODUCT CALCULATED:", distance_product_calculated)
    distance_product_sum = np.sum(distance_product_calculated)
    print("DISTANCE PRODUCT SUM:", distance_product_sum)

    # Calculate squared error
    squared_error_calculated = distances[:, 0] ** 2
    squared_error_sum = np.sum(squared_error_calculated)
    print("SQUARED ERROR SUM:", squared_error_sum)

    b_value = distance_product_sum/squared_error_sum
    a_value = avgY - b_value*avgX

    print("B:", b_value, "A:", a_value)

    return [round(a_value.item(), 5), round(b_value.item(), 5)]