def calculate_mean(arr):
    return sum(arr) / len(arr)

def calculate_r2(y_real, y_pred):
    mean_y = calculate_mean(y_real)
    ss_res = sum( (y_real_value - y_pred_value) ** 2 for y_real_value, y_pred_value in zip(y_real, y_pred))
    ss_tot = sum( (y_real_value - mean_y) ** 2 for y_real_value in y_real )
    return 1 - ss_res / ss_tot