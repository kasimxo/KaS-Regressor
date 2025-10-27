from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
import json
from .regressions.linear_regression import Calculate_linear_regression

@csrf_exempt
@require_POST
def regressor_view(request):
    #print(request.body)
    body = json.loads(request.body.decode("utf-8"))
    linear_regression = Calculate_linear_regression(body)
    #print(linear_regression)
    return HttpResponse(f"{linear_regression}", content_type="text/plain")
