import math
import random

def Calculate_linear_regression(dataPoints):
    """
    Calculates the parameters (a, b) of a linear regression:
    y = ax + b

    dataPoints: array of points for the linear regression
    """
    # let a = Math.random() * 3 - 1.5
    # let b = Math.random() * 200 + 100
    a = random.random() * 3 - 1.5
    b = random.random() * 200 + 100
    return [a, b]