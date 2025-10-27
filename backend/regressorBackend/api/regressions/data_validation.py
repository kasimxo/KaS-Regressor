def validate_data(request):
    
    if not isinstance(request, list):
        raise ValueError("El contenido de la petición no cumple con el formato correcto")

    if not all(isinstance(x, (int, float, list, tuple)) for x in request):
        raise ValueError("El contenido de la petición no cumple con el formato correcto")

    DATA_LENGTH = len(request)
    if DATA_LENGTH == 0:
        raise ValueError("La petición no puede estar vacía")
    
    return request