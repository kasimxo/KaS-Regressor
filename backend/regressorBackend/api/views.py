from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
import json
from .regressions.linear_regression import Calculate_linear_regression
from .regressions.data_validation import Validate_data

@csrf_exempt
@require_POST
def regressor_view(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        data = Validate_data(body)
        linear_regression = Calculate_linear_regression(data)
        return HttpResponse(f"{linear_regression}", content_type="text/plain")
    except Exception as ex:
        return HttpResponse(str(ex), status=400)
