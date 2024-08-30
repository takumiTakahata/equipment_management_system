from django.http import JsonResponse
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
import os
from dotenv import load_dotenv

load_dotenv()

class BookView(APIView):
  def get(self, request, isbn):
    if not isbn:
        return JsonResponse({'error': 'ISBNが提供されていません'}, status=400)

    api_key = os.getenv('BOOK_API_KEY')
    url = f'https://www.googleapis.com/books/v1/volumes?q=isbn:{isbn}&key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if data['totalItems'] == 0:
            return JsonResponse({'error': '本が見つかりませんでした'}, status=404)

        book_data = data['items'][0]['volumeInfo']
        if 'title' in book_data:
            return JsonResponse({'title': book_data['title']})
        else:
            return JsonResponse({'error': '本が見つかりませんでした'}, status=404)
    except requests.RequestException as e:
        print("APIリクエスト中にエラーが発生しました:", e)
        return JsonResponse({'error': 'APIリクエスト中にエラーが発生しました'}, status=500)
