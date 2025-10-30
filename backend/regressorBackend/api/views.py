from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .regressions.linear_regression import calculate_linear_regression
from .regressions.logarithmic_regression import calculate_logarithmic_regression
from .regressions.cuadratic_regression import calculate_cuadratic_regression
from .regressions.exponential_regression import calculate_exponential_regression
from .regressions.data_validation import validate_data
import json

@csrf_exempt
@require_POST
def regressor_view(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        data = validate_data(body)
        linear_regression = calculate_linear_regression(data)
        logarithmic_regression = calculate_logarithmic_regression(data)
        cuadratic_regression = calculate_cuadratic_regression(data)
        exponential_regression = calculate_exponential_regression(data)
        return HttpResponse(f"{{\"linear_regression\":{linear_regression},\"logarithmic_regression\":{logarithmic_regression},\"cuadratic_regression\":{cuadratic_regression},\"exponential_regression\":{exponential_regression}}}", 
                            content_type="text/plain")
    except Exception as ex:
        return HttpResponse(str(ex), status=400)
