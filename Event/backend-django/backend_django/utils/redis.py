from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def test_redis(request):
     # Escribir datos en Redis
     cache.set('test_key', 'Hola, Redis!', timeout=30)  # 30 segundos de expiración

     # Leer datos de Redis
     value = cache.get('test_key')

     # Responder con el valor leído
     return Response({"message": value})
